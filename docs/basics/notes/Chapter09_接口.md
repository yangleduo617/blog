# Chapter09


## 类变量和类方法

### 类变量

类变量（静态变量）是同一个类所有对象共享的，在**类加载**的时候生成static类变量，即使没有创建对象实例也可访问，且须遵守访问修饰符的权限。

JDK8以前，类变量存放于方法区，而JDK8以后则存放于类在**堆中对应的class对象的最后**。

```java
访问修饰符 static 类型 变量名
```

注意：

1. 实例变量（非静态变量）不能通过**类名.变量**访问，类变量可以。
2. **类变量生命周期随着类加载开始，类销毁而结束。**

### 类方法

方法中不涉及到任何对象相关的成员，设计成静态方法，提高开发效率。

```java
访问修饰符 static 返回类型 方法名（形参列表） {}
```

注意：

1. 类方法中不能有this和super关键字，普通方法可以有。
2. **类方法只能访问静态成员，非静态方法既可以访问静态成员又可以访问非静态成员。**

### main方法

```java
public static void main(String[] args) {}
// 字符串数组在Java运行的时候传入
// > java Hello 参数1 参数2 参数3
```

IDEA传递srgs 参数：

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/args.png)

## 代码块

代码块（初始化块），属于类中成员，类似于方法。但没有方法名、返回、形参，只有方法体，而且不通过对象或类显示调用，而是类加载时，或创建对象时**隐式调用**。

> [修饰符] {
>
> ​	代码
>
> }；

### 注意

1. 修饰符可选，写的话，只能是**static**
2. ；可省略
3. 理解为另外一种形式的**构造器**，多个构造器中有重复的语句，可以抽取到初始化块中。不管调用哪个构造器，优先调用代码块的内容。

### 细节

1. static静态代码块，对类进行初始化，随着**类的加载**而执行，只会执行一次。普通的代码块，每创建一个对象就执行。

2. **类什么时候加载**

    - 创建对象实例时（new）
    - 创建子类对象实例，**父类**也会被加载
    - 使用类的静态成员（静态属性、静态方法）

3. 普通代码块，在创建对象实例时，会被隐式调用。若只使用类的静态成员时，普通代码块不会执行。

4. **创建一个对象时，在一个类中 相关成员 调用的顺序：**

    ① 调用**静态代码块和静态属性初始化**。静态代码块与静态属性初始化的调用**优先级**一样，调用顺序由他们在类中的书写顺序决定。

    ② 调用**普通代码块和普通属性初始化**。二者调用优先级一样，调用顺序由书写的顺序决定。

    ③ 调用构造器。

5. **构造器**的最前面隐藏了**super() 和 调用普通代码块**。静态代码块和属性初始化是在类加载的时候执行的，因此调用优先级比普通代码块和构造器的高。

```java
class A extends B {
	public A() {
        // 没写super时，默认调用父类的无参构造器
        super();
        // 调用普通代码块
        System.out.println("OK");
    }
}
```

6. 当创建了一个子类，存在继承关系，他们的静态代码块、静态属性初始化、普通代码块、普通属性初始化，构造器调用顺序：

    ① 父类的静态代码块和静态属性初始化（优先级一样，按定义顺序执行）
   
    ② 子类的静态代码块和静态属性初始化（优先级一样，按定义顺序执行）
   
    ③ 父类的普通代码块和普通属性初始化（优先级一样，按定义顺序执行）
   
    ④ 父类的构造器
   
    ⑤ 子类的普通代码块和普通属性初始化（优先级一样，按定义顺序执行）
   
    ⑥ 子类的构造器

7. **静态代码块只能调用静态成员（静态属性和静态方法），普通代码块可以调用任何成员**。

## 单例设计模式

### 饿汉式

没有创建对象，在加载类时就自动创建了一个**实例**（下面例子的 gf）。可能创建了没有使用。

1. 构造器私有化
2. 类的内部创建对象
3. 向外暴露一个静态的公共方法: getInstance

```java
/**
 * 单例模式，饿汉式
 */
public class SingleTon {
    public static void main(String[] args) {
        GirlFriend instance = GirlFriend.getInstance();
        GirlFriend instance1 = GirlFriend.getInstance();
        System.out.println(instance);
        System.out.println(instance == instance1);
    }
}

class GirlFriend {
    private String name;
    private GirlFriend(String name) {
        this.name = name;
    }
    private static GirlFriend gf = new GirlFriend("xue");
    // 公共方法获取实例
    public static GirlFriend getInstance() {
        return gf;
    }

    @Override
    public String toString() {
        return "GirlFriend{" +
                "name='" + name + '\'' +
                '}';
    }
}

结果：
GirlFriend{name='xue'}
true
```

### 懒汉式

在使用对象时才创建这个**实例**。

```java
/**
 * 单例模式，懒汉式
 */
public class SingleTon01 {
    public static void main(String[] args) {
        Cat instance = Cat.getInstance();
        System.out.println(instance);
        Cat instance1 = Cat.getInstance();
        System.out.println(instance1);
        System.out.println(instance == instance1);
    }
}

class Cat {
    private String name;
    private static Cat cat;

    private Cat(String name) {
        System.out.println("构造器调用");
        this.name = name;
    }

    /**
     * 只有调用getInstance() 方法才创建实例
     * @return cat
     */
    public static Cat getInstance() {
        if (cat == null) {
            cat = new Cat("喵喵");
        }
        return cat;
    }

    @Override
    public String toString() {
        return "Cat{" +
                "name='" + name + '\'' +
                '}';
    }
}

结果：
构造器调用
Cat{name='喵喵'}
Cat{name='喵喵'}
true
```

**区别**：

1. 创建对象的时机不同，饿汉式在类加载就创建了对象实例，懒汉式是在使用时才创建。
2. 懒汉式存在**线程安全**问题，而饿汉式不存在线程安全问题。
3. 饿汉式存在资源浪费的可能，懒汉式则没有。

## final关键字

### 使用情况

1. 一个类不希望被其他类**继承**时；
2. 父类的**方法**不希望被子类重写（override）时；
3. 类的某个**属性**不希望被修改时；
4. 不希望修改某个**局部变量**时。

### 细节

1. final修饰属性又叫常量，XX_XX_XX表示。

2. final修饰属性定义时**必须赋值**，并以后不能修改，赋值的位置如下：

    - 定义时：public final double TAX_RATE = 0.08;
    - 构造器中
    - 在代码块中

3. 如果final修饰的属性是**静态**的，则初始化位置只能是

    - 定义时
    - 在静态代码块 
    - **不能在构造器中赋值**，因为静态属性初始化在类加载就必须执行，构造器是在定义对象实例才调用。

4. final类不能继承，但是可以实例化对象。如果类不是final类，其中有final方法，类可以继承，但是final方法不能重写。

5. final类中的方法不用再用final修饰了，因为final类不能继承，其中方法自然不能被重写了。

6. `final不能修饰构造器`。

7. **final与static搭配使用，效率更高，不会导致类加载**。底层编译做了优化处理。

8. 包装类（Integer、Double、Float、Boolean），String都是final类。

## 抽象类

父类要子类继承，但是其方法不确定其内容，可以将方法做成抽象（abstract）方法，没有方法体，该类也声明为抽象类。一般来说，抽象类被子类继承，又由子类实现其方法。设计模式与框架中使用较多。

### 细节

1. 抽象类**不能被实例化**
2. 抽象类不一定包含abstract方法，也可以有实现的方法
3. 一旦类中声明了abstract方法，则类必须声明为抽象类
4. abstract只能修饰**类或方法**，不能修饰属性等其他
5. 抽象类还是类，含有：非抽象方法、构造器、静态属性、非静态属性等
6. 抽象方法不能有方法体 way() **{ } ❌**
7. 如果一个类继承了抽象类，则必须实现其抽象方法，除非它自己也声明为抽象类
8. 抽象方法不能使用**private、final、static**关键字修饰，这些关键字都是和重写相违背

### 模板设计模式

抽象类的最佳实践

```java
/**
 * 模板设计模式案例
 */
abstract public class Template {

    public abstract void job();

    public void calculateTime() {
        long start = System.currentTimeMillis();
        job();
        long end = System.currentTimeMillis();
        System.out.println("程序执行时间：" + (end - start));
    }
}
```

## 接口

在接口中抽象方法可以**省略abstract**关键字，一个类 implements 一个接口，须实现全部的抽象方法。JDK7以前接口中全部是抽象方法，JDK8以后可以有默认实现方法，使用**default**修饰，可以有静态方法，**static**修饰。

### 细节

1. 接口**不能实例化**

2. 接口中的方法都是`public方法`，可以不用abstract修饰

3. 一个类 implements 一个接口，须实现全部的抽象方法

4. **抽象类实现接口**，可以不用重写接口的方法

5. 一个类可以同时 implements 多个 interface

6. interface 中的属性只能是**final**，而且是**public static final**修饰的， 

   ```java
   int a = 1;// 实际上是 public static final int a = 1; 
   ```

7. 接口属性访问形式：**接口名.属性名**

8. 接口不能继承其他类，但是可以继承多个别的接口

9. 接口的修饰符只能是**默认的或者public**，与类的修饰符规则一样

###  继承类 VS 实现接口

实现接口是单继承机制的一种补充。子类继承了父类，就有了父类的功能，要扩展子类，就要通过接口方式扩展。

1. 接口和继承解决的问题不同

    - 继承：解决代码的**复用性和可维护性**
    - 接口：设计，**设计好各种规范**（方法），让其他类去实现这些方法

2. 接口比继承更灵活

   继承满足 is - a 的关系，而接口只需满足 like - a 的关系。

3. 接口在一定程度上实现代码解耦，**接口规范性 + 动态绑定机制**。

### 接口多态

#### 多态参数

接口引用可以指向实现了接口的类的对象。

```java
// 接口引用engine 指向实现了Engine接口的类的对象
public static void main(String[] args) {
    Engine engine = new Car();
    engine = new Bus();
}

interface Engine {}
class Car implements Engine {}
class Bus implements Engine {}


// 方法接收了实现Interface接口的类的对象实例
方法名 (Interface interfance) {}
```

#### 多态数组

```java
public class InterfacePolyArr {
    public static void main(String[] args) {
        Usb[] usbs = new Usb[2];
        usbs[0] = new Phone();
        usbs[1] = new Camera();
        for (int i = 0; i < usbs.length; i++) {
            usbs[i].start();
            // 判断运行类型是否为Phone
            if (usbs[i] instanceof Phone) {
                ((Phone) usbs[i]).call();
            }
            usbs[i].stop();
        }
    }
}

interface Usb {
    void start();
    void stop();
}

class Phone implements Usb {

    @Override
    public void start() {
        System.out.println("Phone is starting...");
    }

    @Override
    public void stop() {
        System.out.println("Phone is stopping...");
    }

    public void call() {
        System.out.println("Calling phone!");
    }
}

class Camera implements Usb {

    @Override
    public void start() {
        System.out.println("Camera is starting...");
    }

    @Override
    public void stop() {
        System.out.println("Camera is stopping...");
    }
}
结果：
Phone is starting...
Calling phone!
Phone is stopping...
Camera is starting...
Camera is stopping...
```

#### 多态传递

一个接口继承了另外一个接口，两者接口引用都可指向**实现了前接口的类的对象实例**。

类的五大成员：**属性、构造器、方法、代码块、内部类**

## 内部类

一个类的内部又完整嵌套了另一个类结构。被嵌套的类称为内部类（inner class）。内部类最大的特点就是可以直接**访问私有属性**，并体现类与类之间的包含关系 。

### 分类

 定义在外部**类局部位置**上（方法、代码块内）

 - 局部内部类（有类名）
 - `匿名内部类`（没有类名，重点）

 定义在外部类的**成员位置**上

 - 成员内部类（没有static修饰）
 - 静态内部类（使用static修饰）

#### 局部内部类

1. 可以直接访问外部类的所有成员，包括`私有的`。
2. `不能添加访问修饰符`，但是可以用final修饰。因为它的位置就是一个局部变量，局部变量是不可用访问修饰符的，局部变量可以用final。
3. 作用域：仅仅在`定义它的方法或代码块`中。
4. 局部内部类-->直接访问-->外部类的成员，外部类-->使用-->局部内部类，在**对应的方法**中创建该类的对象，直接调用即可。注意，必须在其**作用域**内。
5. 外部其他类-->不能访问-->局部内部类（局部内部类地位是一个局部变量）
6. 如果外部类与局部内部类的成员重名时，默认遵循**就近原则**，如果使用外部类的成员，使用（`外部类名.this.成员`）访问。

     外部类名.this本质就是外部类的对象，即哪个对象调用了局部内部类所在的方法，就指向这个对象

#### 匿名内部类

本质是类、内部类、该类没有名字（jdk底层分配了隐藏的标识）、**同时还是一个对象**。

1. 语法：

```java
new 类或接口 (参数列表) {
    类体
};
```

```java
package com.yyw.innerclass;

/**
 * 演示匿名内部类的使用
 */
public class AnonymousInnerClass {
    public static void main(String[] args) {
        Outer outer = new Outer();
        outer.method();
    }
}

class Outer {// 外部类
    private int n1 = 10;

    /**
     * 1. 基于接口的匿名内部类
     * 实现接口传统方式，写一个类实现接口，并创建对象。
     * 需求：Cat类只是使用一次，后面不再使用。
     * 解决：使用匿名内部类简化开发
     * 2. 基于类的匿名内部类
     */
    public void method() {
        // 传统方法
        // Cat cat = new Cat();
        // cat.cry();

        // 基于接口的匿名内部类
        // 1. cat编译类型？IA
        // 2. cat运行类型？匿名内部类 XXX => Outer$1
        /*
            底层中,分配 类名 Outer$1，只运行一次
            class XXX implements IA {
                @Override
                public void cry() {
                    System.out.println("Cat cry...");
                }
            }
         */
        // 3. JDK底层创建匿名内部类 Outer$1，立即创建 Outer$1实例，
        //    并且把地址返回给 cat
        // 4. 匿名内部类使用一次，就不能再使用，并不是 cat
        IA cat = new IA() {
            @Override
            public void cry() {
                System.out.println("Cat cry...");
            }
        };
        System.out.println("cat运行类型 " + cat.getClass());
        cat.cry();

        // 基于类的匿名内部类
        // 1. father编译类型？Father
        // 2. father运行类型？匿名内部类 Outer$1
        //    注意没有 {} 时，运行类型就是 Father
        // 3. 底层会创建匿名内部类
        // 4. 参数列表会传递给构造器
        /*
            继承 Father
            class Outer$1 extends Father {
                @Override
                public void test() {
                    System.out.println("匿名内部类重写了test()方法");
                }
            }
         */
        Father father = new Father("yang") {
            @Override
            public void test() {
                System.out.println("匿名内部类重写了test()方法");
            }
        };
        System.out.println("Father运行类型 " + father.getClass());
        father.test();

        // 基于抽象类的匿名内部类
        // 必须重写 eat()方法
        Animal animal = new Animal() {
            @Override
            void eat() {
                System.out.println("Dog eat...");
            }
        };
        animal.eat();
    }
}

interface IA {
    public void cry();
}

//class Cat implements IA {
//    @Override
//    public void cry() {
//        System.out.println("Cat cry...");
//    }
//}
//
//class Dog implements IA {
//    @Override
//    public void cry() {
//        System.out.println("Dog cry...");
//    }
//}

class Father {
    public Father(String name) {
        System.out.println("接收到 name = " + name);
    }

    public void test() {
    }
}

abstract class Animal {
    abstract void eat();
}

结果：
cat运行类型 class com.yyw.innerclass.Outer$1
Cat cry...
接收到 name = yang
Father运行类型 class com.yyw.innerclass.Outer$2
匿名内部类重写了test()方法
Dog eat...
```

##### 细节

1. 匿名内部类语法奇特 ，匿名内部类既是一个类的定义，同时也是一个对象。既有创建类的特征，也有创建对象的特征。

2. 可以访问外部类的所有成员，包括**私有的**。

3. **不能加访问修饰符**

4. 作用域：仅仅在定义它的方法或代码块中。

5. 匿名内部类-->直接访问-->外部类的成员

6. 外部其他类-->不能访问-->匿名内部类

7. 如果外部类与匿名内部类的成员重名时，默认遵循**就近原则**，如果使用外部类的成员，使用（`外部类名.this.成员`）访问。

##### 实践

匿名内部类当作实参直接传递。

```java
public class InnerClassExercise {
    public static void main(String[] args) {
        f1(new IB() {
            @Override
            public void show() {
                System.out.println("匿名内部类作为实参");
            }
        });

        f1(new Picture());
    }

    // 形参是接口类型
    public static void f1(IB ib) {
        ib.show();
    }
}

interface IB {
    void show();
}

// 硬编码
class Picture implements IB {
    @Override
    public void show() {
        System.out.println("传统方式 类实现接口");
    }
}

结果：
匿名内部类作为实参
传统方式 类实现接口
```

```java
public class InnerClassExercise02 {
    public static void main(String[] args) {
        CellPhone cellPhone = new CellPhone();
        // 类的声明形式
        Bell bell = new Bell() {
            @Override
            public void ring() {
                System.out.println("alarming");
            }
        };
        cellPhone.alarmclock(bell);

        // 1. 直接new一个对象，作为实参，传递的是实现了Bell接口的匿名内部类
        // 2. 重写了ring()方法
        // 3. 形参 Bell bell = new Bell() {
        //              @Override
        //         }
        // 运行类型是匿名内部类，InnerClassExercise02$2
        cellPhone.alarmclock(new Bell() {
            @Override
            public void ring() {
                System.out.println("懒猪起床了");
            }
        });
        cellPhone.alarmclock(new Bell() {
            @Override
            public void ring() {
                System.out.println("小伙伴上课了");
            }
        });

        // 使用 lambda 表达式
        Bell bell = () -> System.out.println("alarming");
        cellPhone.alarmclock(bell);
        cellPhone.alarmclock(() -> System.out.println("懒猪起床了"));
        cellPhone.alarmclock(() -> System.out.println("小伙伴上课了"));
    }
}

interface Bell {
    void ring();
}

class CellPhone {
    public void alarmclock(Bell bell) {
        System.out.println(bell.getClass());
        // 动态绑定机制
        bell.ring();
    }
}

结果：
class com.yyw.innerclass.InnerClassExercise02$1
alarming
class com.yyw.innerclass.InnerClassExercise02$2
懒猪起床了
class com.yyw.innerclass.InnerClassExercise02$3
小伙伴上课了
```

#### 成员内部类

1. 定义在外部类的**成员位置**上，没有 static 关键字修饰。

2. 可以添加任意访问修饰符（public、protected、默认、private）。因为它的地位就是一个成员。

3. 作用域：整个类体

4. 成员内部类-->访问-->外部类成员，直接访问，包括私有的。

5. 外部类-->访问-->内部类，外部类方法中创建对象再访问。

6. 外部其他类-->访问-->成员内部类

    - 使用 **外部类对象.new 成员内部类（）**方式访问
   
      ```java
      Outer outer = new Outer();
      Outer.Inner inner = outer.new Inner();
      ```
   
    - 在外部类中写一个方法，返回内部类实例。
   
      ```java
      Outer.Inner innerInstance = outer.getInnerInstance();       
      public Inner getInnerInstance() {
        return new Inner();
      }
      ```

7. 如果外部类与成员内部类的成员重名时，默认遵循**就近原则**，如果使用外部类的成员，使用（`外部类名.this.成员`）访问。

#### 静态内部类

1. 定义在外部类的**成员位置**上，**static关键字**修饰。

2. 可以添加任意访问修饰符（public、protected、默认、private）。

3. 作用域：整个类体

4. 静态内部类-->访问-->外部类成员，直接访问**静态的**成员，非静态的访问不到。

5. 外部类-->访问-->内部类，外部类方法中，创建对象再访问。

6. 外部其他类-->访问-->静态内部类

    - 静态内部类可以通过**类名直接访问**，遵循访问修饰符权限
    - 在外部类中写一个方法，返回内部类实例。











​     