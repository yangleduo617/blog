# Chapter06


接口与集合都是简介，在后面内容中详细介绍: 接口、集合

## 接口


接口就是给出一些没有实现的方法，封装到一起，到某个类要使用的时候，再根据具体情况把这些方法写出来。

语法：

```java
// 定义一个接口
interface 接口名 {
    // 属性
    // 方法
}
// 类中使用
class 类名 implements 接口 {
    自己属性
    自己方法
    必须实现的接口的抽象方法
}
```

注意：

1. 在JDK7前，接口里的所有方法都没有方法体，都是抽象方法

2. JDK8后接口可以有**静态方法**，**默认方法**，也就是说接口中可以有方法的具体实现

## 集合

### 简介

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/集合.png)

难点：

1. 理解底层机制
2. 看源码
3. 根据实际情况选择对应的集合

数组的不足：

1. 长度事先指定，一旦指定，不能更改
2. 保存的必须为同一类型的元素
3. 使用数组进行增加、删除元素比较麻烦

集合的理解与好处：

1. 可以动态保存任意多个对象
2. 提供一系列的操作对象的方法：add remove set get
3. 使用集合添加，删除新元素的代码简洁，不用直接去写底层代码

### 集合体系图

**单列集合**

Collection 接口有两个重要的子接口 List Set ，实现的子类都是单列集合

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/collection.png)

**双列集合**

Map 接口的实现子类 是双列集合，存放的是 键值对（K-V）

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/map.png)

## 类与对象

### 对象在内存中存在形式

Java内存的结构分析

- 栈：一般存放基本数据类型（局部变量）
- 堆：存放对象（Cat cat），数组等
- 方法区：常量池（常量，比如字符串），类加载信息（只会加载一次）

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/object.png)

### 属性/成员变量

成员变量 = 属性 = field（字段），属性一般是基本数据类型，也可以是引用类型（对象 数组），

> 例如：Cat() {name, price, color}

注意：

- 属性的定义语法同变量，访问修饰符 + 属性类型 + 属性名
- 属性的定义类型可以为任意类型
- 属性如果不赋值，有默认值，规则与数组一致

> 0: int short byte long 
>
> 0.0: float double
>
> \u0000 char
>
> false boolean
>
> null String 

```java
Person p1 = new Person(); // p1只是对象名，而真正的对象是等号后面的Person
```

### 内存分配机制

```java
public class Person {
	public static void main(String[] args) {
		Cat cat = new Cat();
		cat.age = 12;
		cat.name = "喵喵";
		Cat cat2 = cat;
		System.out.println(cat2.name + "\n" + cat2.age);
        cat2 = null;// 将栈中cat2指向的地址变成null，如果再在下面访问cat2中的属性 
                    // 会抛出异常
	}
public static class Cat {
	int age;
	String name;
	} 
}
```

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/内存分配.png)

## 成员方法

### 方法的调用机制

```java
public void cal(形参列表){}

Person p1 = new Person();
int returnRes = p1.getSum(10,12);
```

小结：

1. 当程序执行到方法时，就会开辟一个空间（栈空间）
2. 当方法执行完毕，执行到return语句就会返回
3. 返回到调用方法的地方
4. 返回后，继续执行方法后面的代码
5. 当main方法执行完毕，整个程序退出

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/method.png)

注意：

1. 访问修饰符（控制方法使用的范围），有四种：public、protected、默认（不写）、private。

2. 返回数据类型

   - 只能有一个返回值
   - 返回的类型可以为任意类型，包含基本类型或引用类型（数组、对象）。
   - 有返回类型的方法，其中最后一句执行的必须是return语句，且返回的类型与要求的一致。
   - 方法是void，方法体中可以没有return语句，或者只写return。

3. 方法名的命名规则：驼峰命名法，见名知义。

4. 形参列表：

   - 一个方法可以没有参数，也可以有多个参数，逗号隔开
   - 形参类型可以为任意类型
   - `方法定义时用的参数叫做形式参数，简称形参；方法调用时的参数称为实际参数，简称实参`，实参与形参类型要一致或兼容，个数、顺序必须一致。

5. 方法体，写完成具体功能的语句，可以为输入、输出、变量运算、分支、循环、方法调用。但`里面不能再定义方法，即方法不能嵌套定义`。

6. 方法调用的时候

   - 同一个类中的方法调用，直接调用即可
   - 不同类之间方法调用，需要通过对象名调用。比如：对象名.方法名(参数);

   ```java
   class Cat {
       public void printCat(int num) {
           System.out.println(num);
       }
       public void sayOk() {
           printCat(100);
       }
   }
   class Dog {
       public void sayHi() {
           Cat cat = new Cat();
           cat.sayOk();
       }
   }
   ```

   - 不同类之间方法调用与访问修饰符有关
























