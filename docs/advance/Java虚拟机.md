#  JVM

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/jvmPosition.png)

Java 编译器输入指令流，一种是基于**栈**的指令集架构，另外一种是基于**寄存器**的指令集架构。

- 基于栈式架构：零地址指令方式分配，指令集更小（8位存储），使用指令多。不需要硬件支持，可移植性好，更好地实现跨平台。
- 基于寄存器式架构：使用指令少，速度快，需要硬件支持，可移植性差。

HotSpot，主流的虚拟机，解释器负责响应时间方面，编译器负责性能方面，二者都有。有方法区。

JRockit，最快的虚拟机，没有解释器，应用在服务端，没有方法区。

J9，多用途的 JVM，没有方法区。

## JVM生命周期

- VM的启动

  Java 虚拟机启动是通过引导类加载器（bootstrap class loader）创建一个初始类来完成的，这个类由虚拟机的具体实现指定。

- VM的执行

  执行 Java 程序的时候实际上执行的是一个叫做 Java 虚拟机的进程。

- VM退出

  程序正常执行结束，执行过程异常终止。

## 类加载子系统

类加载的信息存放于一块方法区的内存空间，除了类的信息外，还有运行时常量池，包括字符串字面量和数字常量。

### 加载 Loading

1. 通过类的**全限定名**获取定义此类的二进制字节流
2. 将字节流所代表的静态存储结构转化为方法区的运行时数据结构
3. 在内存中生成一个代表这个类的 `java.lang.Class` 对象，作为方法区中类数据的访问入口

### 链接 Linking

- 验证（Verify）

  确保 Class 文件包含的信息符合当前虚拟机，保证被加载类的正确性，文件格式、元数据、字节码、符号引用验证。

- 准备（Prepare）

  为**类变量**分配内存并设置该类变量的默认初始值0，不包含 final 修饰的 static 变量，final 在编译的时候就分配了，准备阶段会显式初始化。不会为**实例变量**分配初始化，类变量会分配在`方法区`中，而实例变量是会随着对象一起分配到 `Java 堆`中。

- 解析（Resolve）

  将常量池内的符号引用转换为直接引用，符号引用就是一组符号来描述所引用的目标，字面形式在 java 虚拟机规范中定义了。直接引用就是直接指向目标的指针、相对偏移量或一个间接定位到目标的句柄。解析动作主要针对类或接口、字段、类方法、接口方法、方法类型等。 

### 初始化 Initialization

- 初始化阶段就是执行**类构造器方法**`<clinit>()`的过程，不需要定义，不同于类的构造器，是 javac 编译器自动收集类中所有类变量的赋值动作和静态代码块中的语句合并而来。构造器方法中指令按照语句在源文件中出现的顺序执行。
- 构造器是虚拟机视角下的 `<init>()`，若具有父类，JVM 保证子类的`<clinit>()`执行前，父类的`<clinit>()`已经执行完毕。
- 虚拟机必须保证一个类的`<clinit>()`方法在多线程下被同步加锁，在直接内存缓存。

### 类加载器

引导类加载器（Bootstrap ClassLoader），自定义类加载器（User-Defined ClassLoader），所有派生自抽象类 `ClassLoader`的类加载器都为自定义类加载器。

- Bootstrap Class Loader

  `String` 类使用引导类加载器进行加载，系统的核心类库都是使用引导类加载器加载。没有父类加载器，只加载包名java、javax、sun开头的类。

- Extension Class Loader

  父类加载器是启动类加载器，java.ext.dirs 或 jre/lib/ext 子目录加载类库。

- System Class Loader

  父类加载器为扩展类加载器，用户自定义类默认是用系统类加载器来加载的。java.class.path 指定下的类库。

#### 自定义类加载器

隔离加载类，修改类加载的方式，扩展加载源，防止源码泄露

#### 双亲委派机制

加载某个类的 class 文件，Java 虚拟机采用的是双亲委派模式，即把请求交由父类处理，是一种任务委派模式。

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/双亲委派.png)

**接口**是由引导类加载器加载，**接口的具体实现类**是线程上下文类加载器去加载第三方 jar 包下的具体类。

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/反向委托.png)

优点：

- 避免类的重复加载
- 保护程序安全，防止核心的 API 不被篡改

#### 沙箱安全机制

保护核心 API 不被篡改。

> 两个 class 对象是否为同一个类的条件：完整类名一致，包括包名；加载这个类的 ClassLoader （`ClassLoader 实例对象`）必须相同。 
>
> 如果一个类是用户类加载器加载的，JVM 会将这个类加载器的一个引用作为类型信息的一部分保存在方法区中。

#### 类的主动使用

创建类的实例、访问某个类或接口的静态变量，或者对该静态变量赋值、调用类的静态方法、反射、初始化一个类的子类、Java 虚拟机启动时被标明为启动类的类、JDK 7 开始提供的动态语言支持。

除了以上7种，其他的都是被动使用，被动使用不会导致类加载**初始化**。

## 运行时数据区

- 单独线程独立拥有 JVM 栈，本地方法栈，程序计数器，多个线程共享方法区，堆区，堆外内存（永久代或元空间、代码缓存）。

- 每个 JVM 只有一个 Runtime 实例

### 线程

守护线程、普通线程。JVM 里每个线程与操作系统的本地线程直接映射。

### 程序计数器

- PC 寄存器，存储执行的代码的地址，由执行引擎读取。
- 任何时间线程只会运行一个方法，即**当前方法**。程序计数器会存储当前线程正在执行的 Java 方法的 JVM 指令地址，或者如果是 native 方法，则是未指定值。
- 唯一一个没有`OutOfMemoryError`和`GC`的区域

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/计数器.png)

CPU 需要不停的切换各个线程，这时候切换回来以后，就得知道接着从哪里开始继续执行。PC 寄存器记录当前线程的执行地址，JVM 字节码解释器需要改变 PC 寄存器的值来明确下一条应该执行什么样的字节码指令。  

### 虚拟机栈

不存在垃圾回收问题（GC），允许 Java 栈是动态的或者固定不变的（`-Xss` 设置栈的大小），线程请求分配的栈容量超过虚拟机栈的最大容量，会出现 `StackOverflowError`异常，无法动态扩展栈时，会抛出`OutOfMemoryError`异常。

#### 栈帧

每个线程都有自己的栈，数据是以栈帧（Stack Frame）为基本单位存储的。每个方法对应一个栈帧，栈帧是一个内存区块，是一个数据集。 不同线程的栈帧是不允许相互引用的。

#### 局部变量表

Local Variables

- 局部变量 vs 成员变量（或属性）
- 基本数据变量 vs 引用类型变量（类、数组、接口）

- 定义为一个**数字数组**，主要用于存储方法参数和定义在方法体内的局部变量，大小在编译期间就确定下来。基本的存储单元 Slot，32位以内的类型占用一个 slot ，64位的类型占用两个 slot。
- 局部变量表中的变量也是重要的垃圾回收根节点，只要被局部变量表中直接或间接引用的对象都不会被回收。

> 如果但前帧是**构造方法**或者**实例方法**（非静态方法）创建的，则该对象引用 this 将会存放在 index 为0的 slot 处，slot 还可以复用。
>
> 变量的分类：按照数据类型分：① 基本数据类型  ② 引用数据类型
> 按照在类中声明的位置分：
>
> ① 成员变量：在使用前，都经历过默认初始化赋值
>
> ​	类变量： linking 的 prepare阶段：给类变量默认赋值 ---> initial 阶段：给类变量显式赋值即静态代码块赋值
> ​	实例变量：随着对象的创建，会在堆空间中分配实例变量空间，并进行默认赋值
>
> ② 局部变量：在使用前，必须要进行显式赋值的！否则，编译不通过

#### 操作数栈

Operand Stack，表达式栈，后进先出。在方法执行过程中，根据字节码指令，往栈中写入数据或提取数据，入栈（push）或出栈（pop）。 

- 操作数栈主要用于保存计算过程的中间结果，新创建的栈帧的操作数栈是空的。
- 实际上是一个**数组**，32 bit 占一个栈单位深读，64 bit 占两个栈单位深读。

#### 动态链接 

Dynamic Linking，每一个栈帧内部都有一个指向**运行时常量池**中该栈帧所属方法的引用。 

#### 方法返回地址

Return Address，方法正常退出或异常退出的定义。存放该方法的 PC 寄存器的值

#### 方法的调用

将符号引用转换为调用方法的直接引用与方法的绑定机制相关，Java 中任何一个普通方法都具备虚函数的特征。

- 早期绑定，目标方法在编译期间可知，且不会改变，将方法与所属的类型绑定。
- 晚期绑定，被调用的方法在编译期间无法确定下来，只能够在程序运行期根据实际的类型绑定相关的方法。
- 非虚方法，在编译期间确定了具体的调用版本，运行时不可变，有静态方法、私有方法、final 方法、实例构造器、父类方法，不具备**多态**的特征。调用指令 `invokestatic invokespecial`
- 虚方法调用，`invokevirtual`
- `invokedynamic`，对类型的检查在编译期间，是静态类型语言，若在运行期间，就叫动态类型语言，动态类型语言是判断**变量值**的类型信息。

**方法的重写**，为了提高性能，JVM 采用在类的方法区建立一个虚方法表（virtual method table）来实现，使用索引表来代替查找。虚方法会在类加载的链接阶段被创建并开始初始化，类的变量初始值准备完成之后，JVM 会把该类的方法表也初始化完毕。 

### 本地方法

Native Method ，非 java 语言实现的 java 方法，不能用 abstract 修饰。Java 应用需要与 Java 外面的环境交互。

### 本地方法栈

Native Method Stack，管理本地方法的。 

## 堆 Heap

### 概述

- 一个进程拥有一个堆区，线程共享 ，有 GC 和 Error。
- Java 7及以前堆逻辑上划分：Young Generation Space（Eden区、Survivor0（from）区、Survivor1（to）区）、Tenure Generation Space、Permanent Space
- Java 8及以后堆逻辑上划分：Young Generation Space（Eden区、Survivor0（from）区、Survivor1（to）区）、Tenure Generation Space、Meta Space

> 设置堆空间大小的参数
> * `-Xms` 用来设置堆空间（年轻代+老年代）的初始内存大小。-X 是 jvm 的运行参数，ms 是 memory start
> * `-Xmx` 用来设置堆空间（年轻代+老年代）的最大内存大小
> * `-Xmn`用来设置新生代的大小（初始值及最大值）
>
> 默认堆空间的大小
> *    初始内存大小：物理电脑内存大小 / 64
> *    最大内存大小：物理电脑内存大小 / 4

### 年轻代与老年代

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20211114152730726.png)

> 具体查看某个参数的指令： `jps` ：查看当前运行中的进程	`jinfo -flag SurvivorRatio 进程id`
>
> `-XX:NewRatio` ： 设置新生代与老年代的比例。默认值是2
>
> `-XX:SurvivorRatio` ：设置新生代中 Eden 区与 Survivor 区的比例。默认值是8，实际测试的时候是 6 : 1 : 1
>
> `-XX:-UseAdaptiveSizePolicy` ：关闭自适应的内存分配策略
>
> `-XX:+PrintFlagsInitial` : 查看所有的参数的默认初始值 
>
> `-XX:+PrintFlagsFinal`  ：查看所有的参数的最终值（可能会存在修改，不再是初始值）      
>
> `-XX:MaxTenuringThreshold` ：设置新生代垃圾的最大年龄 
>
> `-XX:+PrintGCDetails` ：输出详细的GC处理日志
>
> 打印 GC 简要信息 ：① `-XX:+PrintGC`   ② `-verbose:gc`

### 对象分配

s0、s1区复制之后有交换，谁空谁是 to 。垃圾回收频繁在新生代收集，较少在老年代收集，几乎不在永久代和元空间收集。

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20211114154215503.png)

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20211114161215429.png)

### Minor GC、Major GC、Full GC

Young GC / Minor GC 伊甸园区满了触发，Survivor 区满了不会触发。Minor GC 会引发 STW，暂停其他用户线程，等垃圾回收结束，用户线程才恢复运行。Major GC 速度一般会比 Minor GC 慢10倍以上，STW 时间更长。

部分收集：

- 新生代收集（Minor GC / Young GC），只是新生代的垃圾收集

- 老年代收集（Major GC / Old GC），只是老年代的垃圾收集

  > 目前，只有 CMS GC 会有单独收集老年代的行为，很多时候 Major GC 和 Full GC 混淆使用，需要分辨具体是老年代回收还是整堆回收。

- 混合收集（Mixed GC），收集整个新生代以及部分老年代的垃圾，只有 G1 GC 会有这种行为

整堆收集（Full GC），收集整个 java 堆和方法区的垃圾。

### 堆空间分代思想

分代理由就是优化 GC 性能，将生命周期短的放在 Eden 区优化性能。

### 内存分配策略

- 优先分配到 Eden
- 大对象，长期存活的对象直接分配到老年代
- 动态对象年龄判断，如果 Survivor 区中相同年龄的所有对象大小的总和大于 Survivor 空间的**一半**，年龄大于或等于该年龄的对象直接进入老年代，不用等到 `MaxTenuringThreshold` 中要求的年龄。
- 空间分配担保 `-XX:HandlePromotionFailure`，JDK 7以后该参数没有影响。只要老年代的连续空间大于新生代对象总大小或历次晋升的平均大小就会进行 Minor GC，否则进行 Full GC。

### 为对象分配内存：TLAB

Thread Local Allocation Buffer，为避免多个线程操作同一个地址，需要使用加锁机制，影响分配速度。从内存模型角度看，Eden 区继续进行划分，JVM 为每个线程分配了一个私有缓存区域。

- 多线程同时分配内存时，使用 TLAB 可以避免一系列的非线程安全问题，同时能够提升内存分配的吞吐量，因此可以将这种内存分配方式称为**快速分配策略**。

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20211115100746528.png)

### 逃逸分析、代码优化

在 JVM Server 模式下适用。

- **栈上分配**，没有发生逃逸的对象，可分配到栈。一个对象在方法中定义，只在方法内使用，则没有发生逃逸。

- **同步省略，锁消除**，如果一个对象只能从一个线程被访问到，那么对于这个对象的操作可以不考虑同步。

- **分离对象或标量替换**，有的对象可能不需要作为一个连续的内存结构存在也可以被访问到，那么对象的部分可以不存储在主存，而是存储在 CPU 寄存器中。

  标量（Scalar）指无法再分解成更小的数据的数据，Java 中原始数据类型就是标量。

## 方法区

### 栈、堆、方法区交互

方法区看作是一块独立于 Java 堆的内存空间，`MetaSpace` 是方法区具体的逻辑实现，使用本地内存。实际的物理内存空间中和 Java 堆区一样都是可以不连续的。

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20211115145148532.png)

### 方法区结构与OOM

> jdk7及以前：`-XX:PermSize=100m -XX:MaxPermSize=100m`
>
> jdk8及以后：`-XX:MetaspaceSize=100m  -XX:MaxMetaspaceSize=100m`
>
> 64位服务器端 JVM 默认 `MetaspaceSize` 值为21 MB，`MaxMetaspaceSize` 值是 -1，没有 JVM 限制，受本地内存大小的限制。

方法区用于存储已被虚拟机加载的类型信息、常量、静态变量、即时编译器编译后的代码缓存。

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20211116170709515.png)

- 类型信息包含：该类及其父类的完整有效名称，该类的修饰符，这个类型直接接口的一个有序列表

- 域信息：域名称，域类型，域修饰符。JVM 须在方法区中保存类型的所有域的相关信息及其声明顺序。

- 方法信息：方法名称，返回类型，方法参数和类型，修饰符，方法的字节码、操作数栈、局部变量表、异常表（abstract 和 native 方法除外） 

#### 运行时常量池

- 字节码文件内部包含了常量池，经过类加载以后，存放到方法区内部的运行时常量池。相对于 Class 文件常量池，运行时常量池另一个重要的特征就是**动态性**。

- 当创建类或接口的运行时常量池时，如果构造运行时常量池所需的内存空间超过了方法区所能提供的最大值，JVM 会抛`OutOfMemoryError`。

#### 方法区演进细节

只有 `HotSpot` 才有永久代，BEA JRockit、IBM J9 没有。

- JDK1.6 之前，有永久代，静态变量存放在永久代上。

- JDK1.7 有永久代，但已经逐步去永久代，字符串常量池、静态变量移除，保存在堆中。

- JDK1.8 无永久代，类型信息、字段、方法、常量保存在本地内存的元空间，但**字符串常量池、静态变量**仍在堆中。

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20211116182421280.png)

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20211116182453817.png)

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20211116182620535.png)

- 为永久代设置空间大小是很难确定的

- 对永久代的调优是很困难的

- 静态引用对应的对象实体始终都存在堆空间。

### 方法区垃圾回收

运行时常量池中废弃的常量和不再使用的类型（费力不讨好）。类型回收满足以下条件：

- 类的所有实例及其子类的实例被回收

- 加载该类的类加载器被回收

- 该类对应的 `java.lang.Class` 对象没有任何地方被引用

## 对象实例化

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20211117204514543.png)

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20211118100716663.png)

### 对象的内存布局

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20211118104159395.png)

### 对象的访问定位

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20211118112334481.png)

#### 直接指针（Hotspot）

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20211118112814299.png)

#### 句柄访问

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20211118112455481.png)

## 执行引擎

- 解释器：当Java虚拟机启动时会根据预定义的规范对字节码采用逐行解释的方式执行，将每条字节码文件中的内容翻译为对应平台的本地机器指令执行。响应速度快
- JIT（Just In Time Compiler）编译器：就是虚拟机将源代码直接编译成和本地机器平台相关的机器语言。
- AOT（静态提前编译器），Ahead Of Time Compiler，直接将 java 文件编译成本地机器代码的过程。

> 前端编译器：Sun 的 Javac
>
> JIT 编译器：Hotspot VM 的 C1、C2 编译器，分别对应Client Compiler 和 Server Compiler，C2 进行耗时较长的优化。
>
> AOT 编译器：GCJ（GNU Compiler for Java）

### 热点代码及探测

执行频率高的代码，JIT 编译器直接编译为对应平台的机器指令。Hotspot VM 使用的是基于计数器的热点探测。

**方法调用计数器**用于记录方法被调用的次数，Client 端 1500 次，Server 端 10000 次。超过一段的时间，计数器会进行**热度衰减**。

**回边计数器**统计一个方法中循环体代码执行的次数。

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20211118164345223.png)

## StringTable

String 是不可变的字符序列，字符串常量池中是不会存储相同内容的字符串的，StringTable 底层是数组加链表。

### String操作

- 常量与常量（final 修饰的常量引用）的拼接结果在常量池，原理是编译期优化
- 字符串如果有变量的拼接，则在非常量池的堆中，变量拼接的原理是 StringBuilder，JDK 5.0 之前使用的是 StringBuffer
- 如果拼接的结果调用 intern() 方法，主动将常量池中还没有的字符串对象放入池中，并返回此对象的地址

### intern()使用

尝试将字符串放入字符串常量池

- 如果有相同的字符串，则不会放入，返回已有的池中的对象的地址
- 如果池中没有，jdk6 会创建一个**新的对象**，内容是相同的，返回池中的地址；jdk7 及以后会把对象的**引用地址**复制一份放入池中，返回池中的引用地址。

```java
String s = "yang"; // 直接放入常量池中，并指向常量池中的地址

new String("ab"); // 存储于堆中，存储的是指向常量池的引用。会创建2个对象，一个是堆空间中的 new 的对象，一个是常量池中的对象 "ab"。

new String("a") + new String("b");
/*  
*  对象1： new StringBuilder()
*  对象2： new String("a")
*  对象3： 常量池中的"a"
*  对象4： new String("b")
*  对象5： 常量池中的"b"
*
*  深入剖析： StringBuilder的toString():
*  对象6 ：new String("ab")
*  强调一下，toString()的调用，在字符串常量池中，没有生成"ab"
*/
```

```java
String s = new String("1"); // 创建两个对象，一个堆中，一个常量池中
s.intern(); // 常量池中已经有"1"对象，不会再创建了
String s2 = "1"; // 指向常量池中的对象
System.out.println(s == s2); // false

String s3 = new String("1") + new String("1"); // 记录的是 new String("11")的地址，但是在字符串常量池中没有"11"对象
s3.intern(); // 在常量池中生成"11"  jdk6会创建新的对象，新的地址  jdk7以后没有创建"11"，是指向堆空间中的"11"的地址
String s4 = "11"; // 记录的是常量池中生成的指向堆中"11"的地址
System.out.println(s3 == s4); // jdk6 false  jdk7 true

String s3 = new String("1") + new String("1"); 
String s4 = "11"; // 字符串常量池中创建没有的"11"对象
String s5 = s3.intern(); 
System.out.println(s3 == s4); // false
System.out.println(s5 == s4); // true
```

### G1的String去重 

不是在常量池中的去重操作，而是在非常量池的堆区中对 new 的 String 对象底层 `char 型数组`进行的去重操作。

## 垃圾回收

垃圾是指在运行程序中没有任何指针指向的对象。

### Java垃圾回收机制

频繁收集Young区，较少收集Old区，基本不动Perm区（元空间）。

### 引用计数、可达性分析（根搜索）算法

- Reference Counting，对每个对象保存一个整形的引用计数器属性，记录对象被引用的情况。实现简单，便于标识；判定效率高，回收没有延迟性。无法处理**循环引用**的场景，不使用它。

- Tracing Garbage Collection 可以解决循环引用的问题，防止内存泄漏的发生。可达性分析算法是以根对象集合（`GC Roots`）为起点，按照从上至下的方式搜索被根对象集合所连接的目标对象是否可达。

- > `GC Roots`包含虚拟机栈中引用的对象，本地方法栈内 JNI 引用的对象，方法区中类静态属性引用的对象，方法区中常量引用的对象，所有被同步锁 synchronized 持有的对象，Java 虚拟机内部的引用（基本数据类型的 Class 对象，系统类加载器，常驻的异常对象），反映 JVM 内部情况的 JMXBean、JVMTI 中注册的回调、本地代码缓存。其他临时性的对象，分代收集和局部回收（Partial GC）。

- `jmap`获取 dump 文件。

### 对象finalization机制

`finalize()`允许子类重写，用于在对象被回收时进行资源释放，只能调用一次。不能主动调用此方法，用垃圾回收机制调用。类比 C++ 中的析构函数。

- 虚拟机中对象的三种状态，可触及的，可复活的（对象可能在 finalize() 中复活），不可触及的。

### 标记-清除(Mark-Sweep)、复制、标记-压缩算法

#### Mark - Sweep  

- 标记，Collector 从根结点出发，标记被引用的对象，在对象的 Header 中记录为可达对象。
- 清除，Collector 对堆内存的对象全部遍历一次，Header 没有被标记的对象就是垃圾，清除。
- 效率不算高；进行 GC 时，会停止整个程序，用户体验不好；清理出来的内存空间不是连续的。

#### Copying

- 将内存空间分为两块，将被引用的对象复制到另一个区，原来的区所有对象清除。
- 运行高效；清理出来的空间是连续的。需要两倍的内存空间；内存中存活的对象比较多，就不适用了。

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20211122154352195.png)

#### Mark - Compact

- 标记，Collector 从根结点出发，标记被引用的对象。
- Compact，将所有存活的对象压缩到内存的另外一端，按顺序排放，清除剩下的。

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20211122160122024.png)

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20211122161649337.png)

### 分代收集算法

不同生命周期的对象采用不同的垃圾回收算法，heap 中新生代与老年代的垃圾回收。

### 增量收集算法、分区算法

- Incremental Collecting 解决应用软件处于 Stop the world 的状态，让垃圾回收与用户线程交替执行。因为线程切换和上下文转换的消耗，会使得垃圾回收的总体成本上升，造成系统吞吐量的下降。
- 分区算法为了降低停顿的时间，将堆空间划分为连续的几个小空间region，独立使用，独立回收。

### Memory Leak

内存泄漏，对象不再被程序用到，但是 GC 又不能回收他们，称为 Memory Leak（JVM 的内存）。

- **单例模式**中，单例的生命周期和应用程序是一样长的，如果单例程序中持有了外部对象的引用，则这个外部对象是不会被回收的，导致memory leak。
- 一些提供 close 的资源未关闭导致 memory leak。数据库、网络连接、IOs

可达性分析算法中枚举根节点会导致 Java 执行线程停顿。



**垃圾回收器的并发与并行**

并行（parallel），指多条垃圾收集线程并行工作，用户线程处于 STW 状态。串行（serial），单线程执行。

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20220107141405917.png)

并发（concurrent），用户线程与垃圾收集线程同时执行。

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20220107141421507.png)



**如何在 GC 发生时，检查所有线程都跑到最近的的安全点停顿下来呢？**
主动式中断：
设置一个中断标志，各个线程运行到 Safe Point 的时候主动轮询这个标志，如果中断标志为真，则将自己进行中断挂起。

线程处于Blocked 状态，这时候线程无法响应 JVM 的中断请求，“走”到安全点去中断挂起，JVM 也不太可能等待线程被唤醒。对于这种情况，就需要安全区域（Safe Region）来解决。



### 强、软、弱、虚引用

**强引用**（StrongReference）：最传统的“引用”的定义，是指在程序代码之中普遍存在的引用赋值，即类似“Object obj=new Object(）”这种引用关系。无论任何情况下只要强引用关系还存在，垃圾收集器就不会回收掉被引用的对象。

**软引用**（SoftReference）：内存足够时不会回收，内存不足就回收。高速缓存就用到软引用。

**弱引用**（WeakReference）：在下一次垃圾回收之前就回收，GC 发现就回收。`WeakHashMap`

**虚引用**（PhantomReference）一个对象是否有虚引用的存在，完全不会对其生存时间构成影响，也无法通过虚引用来获得一个对象的实例。为一个对象设置虚引用关联的唯一目的就是**能在这个对象被收集器回收时收到一个系统通知**。用于对象回收跟踪。

当垃圾回收器准备回收一个对象时，如果发现它还有虚引用，就会在回收对象后，将这个虚引用加入引用队列，以通知应用程序对象的回收情况。

## 垃圾回收器

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20220111144753269.png)

### 性能指标

- **吞吐量**：运行用户代码的时间占总运行时间的比例（总运行时间：程序的运行时间 + 内存回收的时间）
- 垃圾收集开销：吞吐量的补数，垃圾收集所用时间与总运行时间的比例。
- **暂停时间**：执行垃圾收集时，程序的工作线程被暂停的时间。
- 收集频率：相对于应用程序的执行，收集操作发生的频率。
- **内存占用**：Java 堆区所占的内存大小。
- 快速：一个对象从诞生到被回收所经历的时间。

> 如果选择以吞吐量优先，那么必然需要降低内存回收的执行频率，但是这样会导致GC需要更长的暂停时间来执行内存回收。
> 相反的，如果选择以低延迟优先为原则，那么为了降低每次执行内存回收时的暂停时间，也只能频繁地执行内存回收，但这又引起了年轻代内存的缩减和导致程序吞吐量的下降。

标准：在最大吞吐量优先的情况下，降低暂停时间。

### 分类

`JDK11之前`

如果你想要最小化地使用内存和并行开销，请选 Serial GC

如果你想要最大化应用程序的吞吐量，请选 Parallel GC

如果你想要最小化 GC 的中断或停顿时间，请选 CMS GC

- 串行回收器：Serial（复制算法）、Serial Old（标记压缩）
- 并行回收器：ParNew（复制）、Parallel Scavenge（复制，吞吐量优先）、Parallel Old（标记压缩 ）
- 并发回收器：CMS(Concurrent Mark Sweep，低延迟)、G1

- 新生代：Serial、Parallel Scavenge、ParNew
- 老年代：Serial Old、Parallel Old、CMS
- 整堆：G1

各收集器之间的组合关系：

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20220107182845561.png)

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20220111145231295.png)

JDK9 变化是红色虚线（去除该组合）。JDK14变化是绿色的线（deprecate 组合），删除CMS。

CMS 与 Parallel Scavenge 底层不兼容。  

#### CMS

并发收集、低延迟

缺点：

- 产生内存碎片
- CMS 收集器对 CPU 资源非常敏感，低延迟，吞吐量降低
- 无法收集浮动垃圾，并发标记的阶段产生的垃圾     

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20220110155255249.png)

当堆内存使用率达到某一阈值的时候，就开始进行回收。

#### G1

区域化分代 。在延迟可控的情况下，获得尽可能高的吞吐量。

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20220111111452895.png)

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20220111133440522.png)

新生代进行垃圾回收，要考虑是否被老年代所指向，需要用到**记忆集**。 

对象超过 1.5 个Region 放到 H  

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20220110171608288.png)

- `并行与并发`，并行性，回收时多个GC线程同时工作；并发性，G1与应用程序交替执行。
- `分代收集`，堆空间分为若干个区域，这些区域中包含了逻辑上的年轻代和老年代。
- `空间整合`，Region 之间**复制算法**，整体上实际可以看成标记-压缩。
- `可预测的停顿时间`，G1 跟踪各个Region里面的垃圾堆积的价值大小（回收所获得的空间大小以及回收所需时间的经验值），在后台维护一个优先列表，每次根据允许的收集时间，优先回收价值最大的Region。保证了 G1 收集器在有限的时间内可以获取尽可能高的收集效率。

缺点：

- G1 无论是为了垃圾收集产生的内存占用（Footprint）还是程序运行时的额外执行负载（Overload）都要比 CMS 高，占用额外的内存空间。

调优步骤：

- 开启 G1 垃圾收集器
- 设置堆的最大内存
- 设置最大的停顿时间 

#### ZGC

## GC 日志

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20220111152833840.png)

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20220111153445490.png)



 

