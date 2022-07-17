# Chapter10


## 枚举

### 自定义枚举

自定义类实现枚举，不用setXxx()方法，是只读的。构造器私有化，用**final、static**关键字修饰枚举对象/属性。

1. 构造器私有化

2. 本类创建一组对象

3. 对外暴露对象（public final static修饰符）

4. 可以提供get方法，但是不提供set

### enum关键字实现枚举

```java
public class Enumeration01 {
    public static void main(String[] args) {
        System.out.println(Season.SPRING);
        System.out.println(Season.WINTER);
    }
}

enum Season {
    // 自定义枚举时的用法
    // public static final Season SPRING = new Season("spring", "warm");

    // enum实现枚举，多个常量使用逗号间隔。并且定义的常量对象要写在最前面。
    SPRING("spring", "warm"), AUTUMN("autumn", "cool"), WINTER;

    private String name;
    private String desc;

    private Season() {}
    private Season(String name, String desc) {
        this.name = name;
        this.desc = desc;
    }

    public String getName() {
        return name;
    }

    public String getDesc() {
        return desc;
    }

    @Override
    public String toString() {
        return "Season{" +
                "name='" + name + '\'' +
                ", desc='" + desc + '\'' +
                '}';
    }
}
```

### 注意

1. 用 enum 开发一个枚举类，默认会继承 Enum 类。javap反编译如下，看到**extends Enum**。所以不能有extends其他类了，但可以实现接口。

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/javap_enum.png)

2. 使用无参构造器，创建枚举对象，则**实参列表和小括号**都可省略。

3. 多个枚举对象，使用**逗号分开**，最后一个分号结尾。

4. 枚举对象必须放在枚举类首行。

### enum常用方法

1. toString()：Enum类重写了，**返回的是当前对象名**，子类也可重写该方法，用于返回对象的信息。

2. name()：返回当前对象名（常量名），子类中不能重写。

3. ordinal()：返回当前对象的**位置号**，从0开始。

4. values()：返回当前枚举类中所有的常量，该方法隐藏，使用反编译才可见。

5. valueOf()：**将字符串转换成枚举对象**，要求字符串必须为已有的常量名，否则报异常。

   ```java
   Season spring = Season.SPRING;
   
   Season season = Season.valueOf("SPRING");
   System.out.println(season == spring);  // true
   ```

6. compareTo()：比较两个枚举常量，比较的就是**位置号**的差值。

## 注解

**Annotation**也被称为元数据（Metadata），用于修饰解释包、类、方法、属性、构造器、局部变量等。和注释一样，注解不影响程序逻辑，但注解可以被编译运行，相当于嵌入在代码中的补充信息。在JavaSE中，注解的使用目的为标记过时的功能，忽略警告等。在JavaEE中占据重要角色，用来配置应用程序的任何切面，代替Java EE旧版本中所遗留的繁冗的代码和XML配置等。

 - @Override：重写父类的方法，该注解只能用于方法
 - @Deprecated：用于表示某个程序元素（类、方法）**已经过时**
 - @SuppressWarnings：**抑制编译器警告**
 - @interface，不是接口，是注解类。

 ```java
 @Target(ElementType.METHOD)
 @Retention(RetentionPolicy.SOURCE)
 public @interface Override {
 }
 ```

  **元注解**：修饰注解的注解

 - @Target：指定被修饰的Annotation能用于修饰哪些程序元素。
 - @Retention：指定Annotation可以保留多久，SOURCE, CLASS, RUNTIME
 - @Documented：被它修饰的Annotation类将被**javadoc工具提取成文档**，即在生成文档时，可以看到该注解。
 - @inherited：被它修饰的Annotation类具有**继承性**。



















