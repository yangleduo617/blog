# Chapter07


## 成员方法

### 成员方法传参机制

#### 基本数据类型的传参机制

基本数据类型，传递的是值（值拷贝）；形参的任何改变不影响实参。

#### 引用数据类型的传参机制

引用类型传递的是地址（传递的也是值，但是值是地址），可以通过形参的变化改变实参的值。

#### 案例

```java
public class MethodParameter01 {
	public static void main(String[] args) {
		B b = new B();
		// int[] arr = {1, 2, 3};
		// b.test100(arr);
		// for (int i = 0; i < arr.length; i++) {
		// 	System.out.print(arr[i] + "\t");
		// }
		// System.out.println();
		// 测试
		Person p = new Person();
		p.name = "yang";
		p.age = 10;
		b.test200(p);
		System.out.println(p.age);
         // 结果是 10
	}
}
class Person {
	String name;
	int age;
}
class B {
	public void test200 (Person p) {
		// p = null;
		// 只是将方法栈中的对象p改变，main主栈中的对象p没有改变
		p = new Person();
		p.name = "tom";
		p.age = 99;
		// 在堆中开辟了一个新的对象，p指向堆中不同的空间，与原来的对象没有关系。新的局部变量p没有被引用，会被当成垃圾回收。
	}
	public void test100 (int[] arr) {
		arr[0] = 200;
		for (int i = 0; i < arr.length; i++) {
			System.out.print(arr[i] + "\t");
		}
		System.out.println();
	}
}
```

### 方法递归调用

重要规则：

- 执行一个方法时，会创建一个受保护的独立空间（栈空间）。
- 方法的局部变量是独立的，不会相互影响。
- 若方法中使用的是引用数据类型（数组、对象），就会共享该类型的数据
- 递归必须向停止递归的方向逼近，否则就会出现无限递归（StackOverflowError）。
- 方法被谁调用就返回给谁。

打印问题：

```java
public class Recursion01 {
	public static void main(String[] args) {
		T t = new T();
		t.test(4);
	}
}
class T {
	public void test (int n) {
		if (n > 2)
			test(n - 1);
		System.out.println("n = " + n);
	}
}
结果：
n = 2
n = 3
n = 4
```

阶乘问题：

先从主栈开始，然后执行到方法时，开辟新栈，进行递归时，再开辟新栈，执行到最后一个栈然后从最后一个栈返回。

```java
public static int factorial (int num) {
    if (num == 1) {
        return 1;
    } else {
        return factorial(num - 1) * num;
    }
}
```

练习斐波那契数

```java
import java.util.Scanner;
public class RecursionExercise {
	public static void main(String[] args) {
		Scanner myScanner = new Scanner(System.in);
		int num = myScanner.nextInt();
		T t = new T();
		int res = t.fibonacci(num);
		System.out.println(res);
	}
}
class T {
	//递归实现斐波那契数
	public int fibonacci (int num) {
		if (num >= 1) {
			if (num == 1 || num == 2) {
				return 1;
			} else {
				return fibonacci(num - 1) + fibonacci(num - 2);
			}
		} else {
			System.out.println("要求n>=1");
			return -1;
		}
	}
}
```

汉诺塔问题

八皇后问题

### 方法重载

- java 允许同一个类中存在多个**相同名字**的方法，但是**形参列表不一样**，包括参数的顺序、类型，但是参数名称没有要求，且**返回类型无要求**。

```java
// 没有构成方法重载
public int calculate (int n1, int n2) {}
public void calculate (int a1, int a2) {}
```

- java允许将同一个类中多个`同名同功能`但**参数不同**的方法，封装成一个方法。可用*可变参数*实现。

注意：可变参数的实参可以为数组。其本质就是数组。可变参数可以和普通参数在一个形参列表中，但是必须保证可变参数在**最后**。一个形参列表中只能有一个可变参数。

```java
// 使用可变参数时，可以当作数组来使用
public int sum (int... nums) {
    int res = 0;
    for (int i = 0; i < nums.length; i++) {
        res += nums[i];
    }
    return res;
}
```

### 作用域

**全局变量、属性**有默认值，可以不赋值使用，**局部变量**必须先赋值再使用，没有默认值。

- 属性和局部变量可以重名，遵循就近原则。
- 同一个作用域局部变量不能重名。
- `属性生命周期长`，伴随着对象的销毁而销毁，`局部变量生命周期短`，与代码块的生命周期一样。
- 全局变量可以加修饰符，局部变量不能加修饰符。

### 构造方法/构造器

`constructor`是对新对象的属性初始化：方法名与类名一样、没有返回值、创建对象系统自动调用。

- 修饰符可以默认
-  `没有返回值`
- 方法名和`类名`必须一样
- 参数列表和成员方法一样的规则
- 构造器的调用，由系统完成
- 构造器可以重载
- 构造器并不是创建对象
- **没有定义构造器时**，系统自动生成默认无参构造器。**javap**反编译验证。
- 自己定义的构造器后默认的构造器就被覆盖，**除非显示定义**：

  ```java
  class Dog {
      String name;
      Dog () {}	// 显示定义
      public Dog (String dName) {
          name = dName;
      }
  }
  ```

  ### this关键字

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/this.png)

- 访问**成员方法**语法：this.方法名(参数列表)；区别于**直接调用**。
- 访问**构造器**的语法 ：this(参数列表)；注意**只能在构造器中访问另外一个构造器**，必须放在构造器第一条语句，成员方法不能调用。
- this只能在类定义的内部使用。

复用构造器：

```java
class Employee {
    String name;
    char gender;
    int age;
    String pos;
    double salary;
    public Employee (String pos, double salary) {
        this.pos = pos;
        this.salary = salary;
    }
    public  Employee (String name, char gender, int age) {
        this.name = name;
        this.gender = gender;
        this.age = age;
    }
     public Employee(String name, char gender, int age, String pos, double salary) {
        this(name, gender, age); // 构造器的复用
        this.pos = pos;
        this.salary = salary;
     }
}
```







  



