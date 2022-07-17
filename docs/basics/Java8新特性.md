## Java8

### 函数式接口

声明仅有一个抽象方法的接口，可以在一个接口上使用 `@FunctionalInterface` 注解。

#### 四大核心函数式接口

`Consumer<T>、Supplier<T>、Function<T,R>、Predicate<T>`

| 接口                      | 参数类型 | 返回类型 | 用途                                                         |
| :------------------------ | :------- | :------- | ------------------------------------------------------------ |
| Consumer\<T> 消费型接口    | T        | void     | 对类型为 T 的对象应用操作，包含方法，`void accept(T t)`      |
| Supplier\<T> 供给型接口    | 无       | T        | 返回类型为 T  的对象，包含方法，`T get()`                    |
| Function\<T, R> 函数型接口 | T        | R        | 对类型为 T 的对象应用操作，并返回结果。结果是 R 类型的对象。包含方法，`R apply(T t)` |
| Predicate\<T> 断定型接口   | T        | boolean  | 确定类型为 T 的对象是否满足某约束，并返回 boolean 值。包含方法，`boolean test(T t)` |

### Lambda表达式

`->` ：lambda 操作符，左边是形参列表，就是接口中的抽象方法的形参列表。右边是 lambda 体，就是重写的抽象方法的方法体。

本质就是**函数式接口的一个实例**，当需要对函数式接口实例化的时候才使用 Lambda 表达式。

1. 无参，无返回值
2. 需要一个参数，无返回值
3. 数据类型可以省略，由编译器推断出，类型推断
4. 需要一个参数，参数的小括号可以省略
5. 需要两个或以上的参数，多条执行语句，并有返回值
6. 只有一条语句，return 与 大括号都可以省略

### 方法引用与构造器引用

当要传递给 Lambda 体的操作，已经有实现的方法了，可以使用方法引用。要求接口中的抽象方法的形参列表和返回值类型与方法引用的方法的形参列表和返回值类型相同（针对一下情况1、2）。

- 对象 :: 非静态方法
- 类 :: 静态方法
- 类 :: 非静态方法  

```java
// 空参构造器引用
Supplier<Employee> sup1 = new Supplier<Employee>() {
    @Override
    public Employee get() {
        return new Employee();
    }
};
Supplier<Employee> sup2 = () -> new Employee();
Supplier<Employee> sup3 = Employee :: new;


Function<Integer, Employee> fun1 = id -> new Employee(id);
Function<Integer, Employee> fun2 = Employee::new;
```

### Stream API

Stream 关注的是对数据的运算，与 CPU 打交道，集合关注的是数据的存储，与内存打交道。

#### 执行流程

Stream 实例化、一系列的中间操作（过滤，映射）、终止操作。

1. 一个中间操作链，对数据源的数据进行处理。
2. 一旦执行终止操作，就执行中间操作链，并产生结果，之后不会被使用。

#### 中间操作

**筛选与切片**

- `filter(Predicate p)` 接收 Lambda，从流中排除某些元素
- `limit(n)` 截断流，使其元素不超过给定数量
- `skip(n)` 跳过元素，返回一个扔掉了前 n 个元素的流。若流中元素数量不足 n 个，则返回一个空流。
- `distinct()` 筛选，通过流所生成元素的 hashCode() 和 equals() 去除重复元素

**映射**

- `map(Function f)` 接收一个函数作为参数，将元素转换成其他形式或提取信息，该函数会被应用到每个元素上，并将其映射成一个新的元素。
- `flatMap(Function f)` 接收一个函数作为参数，将流中的每个值都换成另外一个流，然后把所有的流连接成一个流。

**排序**

- `sorted()` 自然排序
- `sorted(Comparator com)` 定制排序

#### 终止操作

**匹配与查找**

- `allMatch(Predicate p)` 检查是否匹配所有元素
- `anyMatch(Predicate p)` 检查是否至少匹配一个元素
- `noneMatch(Predicate p)` 检查是否没有匹配所有元素
- `findFirst()` 返回第一个元素
- `findAny()` 返回当前流中的任意元素
- `count()`
- `max(Comparator c)`
- `min(Comparator c)`
- `forEach(Comsumer c)`

**归约**

- `reduce(T identity, BinaryOperator)` 将流中的元素反复结合起来，得到一个值。返回 T
- `reduce(BinaryOperator)` 将流中元素反复结合起来，得到一个值。返回 Optional\<T>

**收集**

- `collect(Collector c)` 将流转换为其他形式。接收一个 Collector 接口的实现，用于给 Stream 中元素做汇总的方法。Collector 接口中方法的实现决定了如何对流执行收集的操作。

### Optional 类

是一个容器类，它可以保存类型 T 的值，代表这个值存在，或者仅仅保存 null ，表示这个值不存在。可以避免空指针的存在。













