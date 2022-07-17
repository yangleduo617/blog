# Chapter12 


## 包装类

八种基本数据类型对应的**引用类型**—包装类，下表中后六个包装类的父类为**Number**。

| 基本数据类型 |   包装类    |
| :----------: | :---------: |
|   boolean    |   Boolean   |
|     char     |  Character  |
|     byte     |  **Byte**   |
|    short     |  **Short**  |
|     int      | **Integer** |
|     long     |  **Long**   |
|    float     |  **Float**  |
|    double    | **Double**  |

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/Boolean.png)

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/Character.png)

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/Number.png)

### 装箱和拆箱

**装箱**：基本数据类型 -> 包装类型；反之就是拆箱。

1. jdk5以前是手动装箱、拆箱。

   ```java
   int n1 = 100;
   // 手动装箱
   Integer integer = new Integer(n1);
   Integer integer1 = new Integer.valueOf(n1);
   // 手动拆箱
   int i = integer.intValue();
   ```

2. jdk5以后就可以自动装箱和拆箱。

   ```java
   int n2 = 200;
   // 自动装箱
   Integer integer2 = n2;
   // 自动拆箱
   int i2 = integer2;
   ```

3. ```java
   Object obj1 = true ? new Integer(1) : new Double(2.0);
   // 输出1.0，因为三元运算符是一个整体，后面精度是double，自动提升优先级。
   ```

### 包装类与String之间的转换

```java
// Integer -> String
Integer i = 10;
// 方式1，i本身没有改变
String str = i + "";
// 方式2
String str2 = i.toString();
// 方式3
String str3 = String.valueOf(i);

// String -> Integer
String str4 = "123";
// 方式1
Integer i1 = Integer.parseInt(str4);
// 方式2
Integer i2 = new Integer(str4);
```

### Integer类面试题

```java
Integer i = new Integer(1);
Integer j = new Integer(1);
System.out.println(i == j);

Integer m = 1;
Integer n = 1;
System.out.println(m == n);

Integer x = 128;
Integer y = 128;
System.out.println(x == y);

// false true false
// 1. i,j是两个指向对象的引用，此时==判断的是地址，不同的对象，地址不同，所以返回false
// 2. 底层使用的是m = Integer.valueOf(1); -> 阅读源码，缓存了[-128 ~ 127]之间的值，
//    直接返回对应的实例
// 3. 128不在缓存的区间内，返回的是 new Integer(i) 实例，就不是同一个实例了，拥有不同的地址。
// public static Integer valueOf(int i) {
//     if (i >= IntegerCache.low && i <= IntegerCache.high)
//         return IntegerCache.cache[i + (-IntegerCache.low)];
//     return new Integer(i);
// }
```

```java
Integer i1 = 127;
Integer i2 = new Integer(127);
System.out.println(i1 == i2);

Integer i3 = 127;
int i4 = 127;
System.out.println(i3 == i4);

Integer i5 = 128;
int i6 = 128;
System.out.println(i5 == i6);

// false true true
// i1是缓存数组中直接取得，i2是新创建的，两个实例不同。
// 后面两个比较的是基本数据类型，比较的是值，值相同。
```

### String

1. 字符串的**字符**是用Unicode字符编码，一个字符（不区分字母还是汉字）占两个字节。

   实现**Serializable**接口，可以串行化，可在网络上传输；实现**Comparable**接口，说明该对象可以进行比较。

2. String类是final类，不能被继承。字符串是不可变的。

   ```java
   String s1 = "yyw";
   s1 = "smx"; // 在常量池中创建了两个对象
   
   String a = "hello" + "world"; // 编译器优化后等价于 String a = "helloworld";
   
   String b = s1 + a;
   // 1. 先 创建一个 StringBuilder sb = new StringBuilder()
   // 2. 执行 sb.append("smx");
   // 3. 执行 sb.append("helloworld");
   // 4. String b = sb.toString()
   // 最后其实是 b 指向堆中的对象(String) value[] -> 池中 "smxhelloworld"
   String c = "smxhelloworld";
   String d = (s1 + a).intern();
   
   System.out.println(d == c);
   System.out.println(d.equals(c));
   // true true
   ```

3. 字段：private **final** char **value[]**，用于存放字符串内容，value是final类型，不可修改`其地址`，但是其内容可以变化。

4. 构造器

   ```java
   String s = new String();
   String s1 = new String("String original");
   String s2 = new String(char[] a);
   String s3 = new String(char[] a, int startIndex, int count);
   String s4 = new String(byte[] bytes);
   ```

5. 方法**intern()**返回的是**常量池**的地址。

   ```java
   String a = "hsp";            //a 指向 常量池的 “hsp”
   String b =new String("hsp"); //b 指向堆中对象
   System.out.println(a.equals(b)); 
   System.out.println(a==b); 
   //b.intern() 方法返回常量池地址
   System.out.println(a==b.intern()); 
   System.out.println(b==b.intern()); 
   // T F T F
   ```

6. ```java
   class Test {
       String str = new String("hsp");
       final char[] ch = {'j', 'a', 'v', 'a'};
   
       public void change(String str, char ch[]) {
           str = "java";
           ch[0] = 'h';
       }
   
       public static void main(String[] args) {
           Test ex = new Test();
           ex.change(ex.str, ex.ch);
           System.out.print(ex.str + " and ");
           System.out.println(ex.ch);
       }
   }
   // hsp and hava
   ```

7. String类是保存字符常量的，每次更新都需要重新开辟空间，效率低。Java设计者提供了**StringBuilder**和**StringBuffer**来增强String的功能，提高效率。       

### String类常见方法

 - **equals(Object)** ：区分大小写，判断内容是否相等

 - equalsIgnoreCase(String) ：忽略大小写，判断内容是否相等

 - **length()** ：获取字符的个数，字符串的长度

 - **indexOf** ：获取字符在字符串中**第一次**出现的索引，索引从0开始，不存在就返回 -1

 - lastIndexOf ：获取字符在字符串中**最后一次**出现的索引，索引从0开始， 不存在就返回 -1

 - substring ：`截取指定范围的字串`

   ```java
   name.substring(6)  // 从索引6开始截取后面所有的内容
   name.substring(0,5)  // 表示从索引0开始截取，截取到索引 5-1=4 位置
   ```

 - trim ：去掉前后**空格**

 - charAt ：`获取某索引处的字符`，注意不能用**类似数组的方式**

 - toUpperCase ：转换成大写

 - toLowerCase ：转换成小写

 - concat ：拼接字符串

 - replace : 替换字符串中的字符

 - split : 分割字符串，如果有特殊字符，需要加入 **转义符 \ **

 - compareTo ：比较两个字符串的大小，ASCII码的比较

 - toCharArray ：转换成字符数组

 - format ：格式字符串 **%s 字符串 %c 字符 %d 整型 %.2f 浮点型**

### StringBuffer

java.lang.StringBuffer代表可变的字符序列，可以对字符串内容进行增删，也是可变长度的，是一个容器。

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/StringBuffer.png)

1. 在父类**AbstractStringBuilder**中，有属性 char[] value，**不是 final**，该数组存放字符串的内容，存放在**堆**中。

2. StringBuffer是final类，不能被继承。

3. StringBuffer不是每次都更新地址（即不是每次都创建对象），当存储空间满了后才创建新的对象。若常量池中没有对应字符串，String每次都创建新的对象。

#### 构造器

 - StringBuffer() ：构造一个不带字符的字符串缓冲区，初始容量为16个字符。

 - StringBuffer(String str) ：构造一个字符串缓冲区，初始化为指定字符串的内容。字符串缓冲区的初始容量是**16加上字符串参数的长度**。

 - StringBuffer(CharSequence seq) ：构造包含与指定的CharSequence相同字符的字符串缓冲区。字符串缓冲区的初始容量是**16加上CharSequence参数的长度**。

 - StringBuffer(int capacity) ：构造一个字符串缓冲区，其中不包含任何字符，并**指定初始容量**。

#### 常见方法

 - 增 append

 - 删 delete(int start, int end) ：start - 起始索引，**包括**。end - 结束索引，排除。**[start, end)**
 
 - 改 replace(int start, int end, String str) ：**[start, end)**

 - 查 indexOf(String str) ：返回该字符串中指定子字符串从指定索引处开始的第一个出现项的索引。

 - 插 insert(int offset, String str) ：String参数的字符按指定的偏移量依次插入到该序列中，将原先位于该位置之上的任何字符**向后移动**，并使该序列的长度增加参数的长度。如果str为null，则将四个字符“null”插入到这个序列中。

### StringBuilder

1. 提供一个与StringBuffer兼容的API，但不保证同步（StringBuilder**不是线程安全**）。**该类用在字符串缓冲区被单个线程使用的时候**。

2. StringBuilder上主要的方法是append，insert。

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/StringBuilder.png)

- String不可变字符序列，效率低，但是复用率高。如果对String做大量的修改，就不能用String。

- StringBuffer可变字符序列，效率较高，线程安全。

- StringBuilder可变字符序列，效率最高，线程不安全。

### Arrays

包含一系列静态方法，用于管理或操作数组（排序，搜索）。

 `toString(int[])` : 返回指定数组内容的字符串表示形式。

 sort : 自然排序和**定制排序**

 ```java
 // 定制排序：匿名内部类 + 接口编程 + 动态绑定机制
 import java.util.Arrays;
 import java.util.Comparator;
 
 public class ArraysSortCustom {
     public static void main(String[] args) {
         int[] arr = {-56, -5, 0, 2, 1, 5, 9, 79};
         bubbleSort(arr);
         System.out.println(Arrays.toString(arr));
         System.out.println("===========================");
         bubbleSortCustom(arr, new Comparator() {
             @Override
             public int compare(Object o1, Object o2) {
                 int i1 = (Integer) o1;
                 int i2 = (Integer) o2;
                 // 通过修改下面代码完成顺序或倒序排列
                 return i1 - i2;
             }
         });
         System.out.println(Arrays.toString(arr));
     }
 
     public static void bubbleSort(int[] arr) {
         for (int i = 0; i < arr.length - 1; i++) {
             for (int j = 0; j < arr.length - 1 - i; j++) {
                 if (arr[j] > arr[j + 1]) {
                     int temp = arr[j];
                     arr[j] = arr[j + 1];
                     arr[j + 1] = temp;
                 }
             }
         }
     }
 
     public static void bubbleSortCustom(int[] arr, Comparator c) {
         for (int i = 0; i < arr.length - 1; i++) {
             for (int j = 0; j < arr.length - 1 - i; j++) {
                 if (c.compare(arr[j], arr[j + 1]) < 0) {
                     int temp = arr[j];
                     arr[j] = arr[j + 1];
                     arr[j + 1] = temp;
                 }
             }
         }
     }
 }
 result:
 [-56, -5, 0, 1, 2, 5, 9, 79]
 ===========================
 [79, 9, 5, 2, 1, 0, -5, -56]
 ```

 binarySearch : 通过二分法进行查找，要求排好序

 copyOf : 数组元素的复制

 ```java
 // 拷贝newLength个元素到newArr中
 Integer[] newArr = Arrays.copyOf(arr, arr.length);
 ```

 fill : 数组填充

 equals : 比较两个数组元素内容是否完全一致

 asList : 将一组值转换成ArrayList

### 日期类

**Date** : 精确到毫秒，特定的瞬间

**SimpleDateFormat** : 格式化和解析日期的类

| 字母 | 日期或时间元素           | 表示                                 | 示例                                        |
| ---- | ------------------------ | ------------------------------------ | ------------------------------------------- |
| `G`  | Era 标志符               | [Text](#text)                        | `AD`                                        |
| `y`  | 年                       | [Year](#year)                        | `1996`; `96`                                |
| `M`  | 年中的月份               | [Month](#month)                      | `July`; `Jul`; `07`                         |
| `w`  | 年中的周数               | [Number](#number)                    | `27`                                        |
| `W`  | 月份中的周数             | [Number](#number)                    | `2`                                         |
| `D`  | 年中的天数               | [Number](#number)                    | `189`                                       |
| `d`  | 月份中的天数             | [Number](#number)                    | `10`                                        |
| `F`  | 月份中的星期             | [Number](#number)                    | `2`                                         |
| `E`  | 星期中的天数             | [Text](#text)                        | `Tuesday`; `Tue`                            |
| `a`  | Am/pm 标记               | [Text](#text)                        | `PM`                                        |
| `H`  | 一天中的小时数（0-23）   | [Number](#number)                    | `0`                                         |
| `k`  | 一天中的小时数（1-24）   | [Number](#number)                    | `24`                                        |
| `K`  | am/pm 中的小时数（0-11） | [Number](#number)                    | `0`                                         |
| `h`  | am/pm 中的小时数（1-12） | [Number](#number)                    | `12`                                        |
| `m`  | 小时中的分钟数           | [Number](#number)                    | `30`                                        |
| `s`  | 分钟中的秒数             | [Number](#number)                    | `55`                                        |
| `S`  | 毫秒数                   | [Number](#number)                    | `978`                                       |
| `z`  | 时区                     | [General time zone](#timezone)       | `Pacific Standard Time`; `PST`; `GMT-08:00` |
| `Z`  | 时区                     | [RFC 822 time zone](#rfc822timezone) | `-0800`                                     |

**Calendar** : 没有专门的格式化方法，需要自己组合表示。

JDK8加入新的日期类：**LocalDate、LocalTime、LocalDateTime**，格式化使用**DateTimeFormatter**。时间戳**Instant**，类似于Date，二者可以相互转换。

































