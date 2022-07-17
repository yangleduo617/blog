# Chapter01

## 什么是JDK、JRE

JDK = JRE + 开发工具集（javac、java编译工具）

JRE = JVM + JAVA SE 标准类库

JDK = JVM + JAVA SE标准类库 + 开发工具集

只想运行开发好的.class文件 只需要JRE

## 配置环境变量

dos命令行 {win + R} cmd

​		环境变量的作用是为了在dos的任意目录，可以去使用java和javac命令。

​		错误原因：当前执行的程序在当前目录下如果不存在，win10系统会在系统中已有的一个名为path的环境变量指定的目录中查找。如果仍未找到，会出现错误提示。所以进入到JDK安装目录\bin目录下，执行javac，会看到javac的参数提示信息。

步骤：

>1. 我的电脑-属性-高级系统设置-环境变量
>
>2. 增加 JAVA_HOME 环境变量，指向 JDK 安装的主目录
>
>3. 编辑path环境变量，增加 D:\Java\openjdk1.8.0.292\bin 或 %JAVA_HOME%\bin
>
>4. 打开DOS命令行，任意目录下敲入javac/java。如果出现参数信息，配置成功。

## Java运行机制

​javac 编译成 可执行文件java.class （字节码文件），通过 java.exe 对字节码文件进行执行。（本质就是.class装载到jvm执行）

```bash
javac -encoding UTF8 文件名.java
```

## 注意事项

1. **一个源文件中只能有一个public类，其他类个数不限。**
2. 源文件的public类必须与文件名一致。
3. 可以将main方法写在非public类中，然后指定运行非public类，这样入口方法就是非public的main方法。

## 转义字符

>\t：一个制表位，实现对齐功能
>
>\n：换行符
>
>\ \：一个\
>
>\ ''：一个''
>
>\ '：一个'
>
>\r：一个回车，例如：**注意\r是将光标在不换行的情况下移到行首。**

```java
public class Hello{

	public static void main(String[] args){
		System.out.println("北京上海\r广州");
	}

}
```

输出为：

![image-20210513181246101](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20210513181246101.png)


## 易犯错误

1. 找不到文件

    解决方法：源文件名不存在或写错，或当前路径错误。

2. 主类名和文件名不一致

   解决方法：声明为public的主类应该与文件名一致，否则编译失败。

3. 缺少分号

4. 拼写错误、业务逻辑错误、**环境错误**

## 注释（comment）

- 单行注释 // 

- 多行注释 /*    */

- 文档注释

```java
/**
*@author yang
*@version 1.0
*/
```

-  javadoc 解析，一般写在类。

```bash
javadoc -d 文件夹 -author -version Hello.java
```

## Java代码规范

1. Tab 整体右移, shift +  Tab 整体左移

2. 类、方法的注释用文档注释 javadoc 的方式写

3. 非 javadoc 的注释，对代码的说明，告诉维护者如何修改

4. 运算符和 = 两边习惯性加空格

5. 源文件使用 utf-8 编码

6. 行宽不要超过80字符

7. 代码编写**次行风格**和**行尾风格**

## DOS命令（Disk Operating System）

1. 查看当前目录有什么：dir   tree 目录树

2. 切换目录：切换到上一级：cd ..  切换到根目录：cd \

3. 清屏 cls

4. 创建目录md、删除目录rd、copy、del、输入内容到文件 echo  > type、move

**相对路径**：从当前目录开始定位，形成的一个路径  .. \ .. \文件夹1\文件夹2\文件

**绝对路径**：从顶级目录开始定位形成的路径 D：\文件夹\文件夹\文件





