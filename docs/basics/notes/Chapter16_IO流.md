​	
# Chapter16

## 文件

### 文件流

文件在程序中是以`流`的形式来操作的。`流`就是数据在数据源（文件）和程序（内存）之间经历的路径。

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/io.png)

##  IO流

### 流的分类

按操作数据单位：字节流（8 bit，处理**二进制文件**）、字符流（处理**文本文件**）

按数据流的流向：输入流、输出流

按流的角色：

- 节点流：**特定的数据源。**

- 处理流 / 包装流：对已存在的流的**连接和封装**，实现更为丰富的流数据处理，处理流的**构造方法**要包含其他流对象参数。

| 抽象基类 |     字节流     |  字符流  |
| :------: | :------------: | :------: |
|  输入流  | `InputStream`  | `Reader` |
|  输出流  | `OutputStream` | `Writer` |

将一部分`InputStream`的子类展示出来：

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/Stream.png)

### 对象流

ObjectInputStream：存储中的文件、通过网络接收过来 --> 内存中的对象，反序列化过程。

ObjectOutputStream：内存中的对象 -> 存储中的文件、通过网络传输出去，序列化过程。

### 序列化和反序列化

 - `序列化`就是在保存数据时，保存数据的**值和数据类型**，某个类要想实现序列化，必须实现`Serializable`、`Externalizable`两个接口之一。
 - `反序列化`就是在恢复数据时，恢复数据的**值和数据类型**

#### 注意

1. 读写顺序要一致。

2. 序列化的类中建议添加`serialVersionUID`版本号，提高序列化的兼容性。

3. 序列化对象时，除了`static`或`transient`修饰的成员，其他成员都被序列化。

4. 序列化对象时，要求里面的属性类型也需要实现序列化接口。

5. 序列化具备可继承性。

### 转换流

将字节流转换成字符流，可以指定编码方式，解决乱码问题。

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/InputStreamReader.png)

#### InputStreamReader

Reader 的子类，可以将`InputStream`（字节流）包装成`Reader`（字符流）

#### OutputStreamWriter

Writer 的子类，可以将`OutputStream`（字节流）包装成`Writer`（字符流）

- 处理文本数据时，使用字符流效率更高，并且可以解决**中文乱码**问题，  

### 打印流

打印流只有输出流，没有输入流。

#### PrintStream 

 - **标准输入**，编译类型 InputStream 运行类型 BufferedInputStream。字节流，处理流

 - **标准输出**，编译与运行类型都是 PrintStream。字节流，默认在显示器输出，也可以修改输出路径到文件

#### PrintWriter

字符打印流，可以指定输出的位置。

```java
PrintWriter writer = new PrintWriter(new FileWriter("D:\\Java\\TestFile\\test.txt"));
writer.write("fighting");
writer.close();
```

