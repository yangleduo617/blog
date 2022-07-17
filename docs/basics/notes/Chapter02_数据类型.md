# Chapter02

## 变量

变量在同一作用域不能重名

## "+"号运算

1. 当左右两边都是数值型时，做加法运算

2. 当左右两边是字符串时，做拼接运算

3. 运算顺序从左向右

## 数据类型

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/java数据类型.png)

说明：

1.  基本数据类型：byte（-128 ~ 127）、short（-2^15^ ~ 2^15^ - 1 ）、int(-2^31^ ~ 2^31^ -1)、long(-2^63^ ~ 2^63^ -1)、float、double、char、boolean

2. String 是类，类型是引用数据类型。

### 整数类型

1. Java 的整型常量默认为 int 类型，声明 long 型常量必须后加‘l’或‘L’

2. bit：计算机中的最小存储单位，byte：计算机中基本存储单元，

   1 byte = 8 bit

### 浮点类型

浮点数在机器中存放形式：`浮点数 = 符号位 + 指数位 + 尾数位`

尾数部分可能丢失，造成精度损失（小数都是近似值）

1. Java 浮点型常量默认为 double 型，声明 float 型常量必须后加‘f’或‘F’

2. 浮点型常量两种表示形式：

   十进制：5.12  512.0f  .512（可省略0，但是必须有小数点） 

   科学计数法：5.12e2 [5.12 × 10^2^]	5.12E-2 [5.12 × 10^-2^]

3. ```java
   double num4 = 8.1 / 3;
   ```

   结果：2.6999999999999997

   注意：对运算结果是小数的进行判断时，小心，应该是以两个数的差值的绝对值，在某个精度范围内判断

   ```java
   if(Math.abs(num3 - num3) < 0.000001)
   ```

### 字符类型

1. 字符常量是用单引号（‘’）括起来

2. Java 中还允许使用转义字符'\'来将其后的字符转变为特殊字符型常量

   ```java
   // 表示换行符
   char c = '\n'
   ```

3. 在 Java 中，char 的本质是一个整数，在输出时，是 unicode 码对应的字符

4. 字符类型可以直接存放一个数字，但是会输出对应表示的字符

5. char 类型是可以进行运算的，相当于一个整数，因为它都对应有unicode 码

面试注意：**字符类型的本质讨论**

1. 字符型存储到计算机中，需要将字符对应的码值找出来，例如：

   存储：'a' --> 码值97 --> 二进制 --> 存储
   
   读取：二进制 --> 97 --> 'a' --> 显示
   
2. 字符和码值的对应关系是通过字符编码表决定的

#### 字符编码表：

1. ASCII 编码表，一个字节表示，一共128个字符。**实际上一个字节可以表示256个字符，只用128个。**

2. Unicode 编码表，固定大小的编码，两个字节表示，字母和汉字统一占用两个字节。兼容ASCII码。

3. utf-8，大小可变的编码，字母使用一个字节，汉字使用3个字节

4. gb2312，可以表示汉字，gb2312 < gbk

5. big5码，繁体中文，台湾，香港

### 布尔类型

1. boolean 类型，只允许 true、false，没有 null

2. 占一个字节

3. 不能将0或非0的值转变为boolean类型

## 基本数据类型转换

自动类型转换：当 Java 程序进行赋值或者运算时，精度小的自动转换为精度大的数据类型。

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/01.png)

注意和细节：

1. 有多种类型的数据混合运算时，系统首先自动将所有的数据转换成容量最大的那种数据类型，然后再进行计算

2. 将精度大的数据赋值给精度小的数据类型时，就会报错，反之进行自动类型转换

3. byte、short 和 char 之间不会相互自动转换。**当把数赋给 byte 时**，先判断该数是否在byte范围内，如果是就可以

```java
byte b1 = 10; // 正确 -128~127
int n2 = 10;
byte b2 = n2; // 错误 变量赋值，判断类型。
```

4. byte、short、char三者可以计算，在计算时首先转换为int类型

5. **boolean不参与转换**

6. 自动提升原则，表达式结果的类型自动提升为操作数中最大的类型

## 基本数据类型转换

### 强制类型转换

​自动类型转换的逆过程，将容量大的数据类型转换为容量小的数据类型。使用时要加上强制转换符（），但可能造成**精度降低或溢出**，格外要注意。

### 注意细节

1. 数据的大小从大到小，需要用强制转换

2. 强制转换只针对最近的操作数有效，会用小括号提升优先级

3. char类型可以保存int的常量值，但不能保存 int 的变量值，需要强转

   ```java
   char c1 = 100;//ok
   int m =100;  //ok
   char c2 = m; // 错误
   char c3 = (char)m; //ok
   ```

4. byte 和 short，char 类型在进行运算时，当作int类型处理

## 练习

```java
short s = 12;//ok
s = s - 9;//error int -> short

byte b = 10;//ok
b = b + 11;//error int -> byte
b = (byte)(b + 11);//ok

char c = 'a';//ok
int i = 16;//ok
float d = .314F;//ok
double result = c + i + d;//ok float -> double

byte b = 16;//ok
short s = 14;//ok
short t = s + b;//error int -> short
```

## 基本数据类型和String类型的转换

### 基本类型转String类型

​语法：将基本类型的值 `+""` 即可

```java
int n1= 100;
float f1 = 1.1F;
double d1 = 4.5;
boolean b1 = true;
String s1 = n1 + "";
String s2 = f1 + "";
String s3 = d1 + "";
String s4 = b1 + "";
```

### String类型转基本数据类型

语法：通过基本类型的包装类调用 `parseXX` 方法即可

```java
String s5 = "123";
int num1 = Integer.parseInt(s5);
double num2 = Double.parseDouble(s5);
long num3 = Long.parseLong(s5);
boolean b = Boolean.parseBoolean("true");
```

**怎么把字符串转成字符 char ?**

含义是指把字符串的第一个字符取到

```java
System.out.println(s5.charAt(0));//得到字符串"123"的第一个字符
```

### 注意

1. 在将 String 类型转换成基本数据类型时，要确保 String 类型能够转成有效的数据，例如可以将 “123”，转换成一个整数，但是不能把 “hello” 转成一个整数

2. 如果格式不正确，就会抛出异常，程序就会终止，要进行异常处理

```java
String s = "hello";
int num = Integer.parseInt(s);
System.out.println(num);
//编译会通过，但是会有异常
```

```
Exception in thread "main" java.lang.NumberFormatException: For input string: "hello"
```






















