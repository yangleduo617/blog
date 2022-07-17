#  Chapter11

## 异常

程序执行发生的不正常情况，但开发过程的语法或者逻辑错误不是异常。

### 分类

 - **Error（错误）**

   Java虚拟机无法解决的问题。JVM系统内部错误，资源耗尽，StackOverflowError（栈溢出），OOM（out of memory），程序崩溃。

 - **Exception**

   编程错误或者外在因素引起的一般性问题，空指针访问，读取不存在的文件，网络连接中断等

   - 运行时异常
   - 编译时异常

### 异常体系图

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/Throwable.png)

### 异常处理

1. `try - catch - finally`

   在代码中捕获发生的异常，自行处理。finally始终执行，通常将释放资源的代码放在此处。

2. `throws`

   将发生的异常抛出，交给调用者（方法）来处理，最顶级的处理者JVM。没有显式地处理异常，则默认使用throws。

#### 注意

1. 异常发生了，则异常发生后面的代码不会执行，直接进入到catch块。

2. 没有异常发生，则跳过catch块。

3. 不管异常有没有发生，**释放资源的代码**可以写在**finally块**中。

4. 可以有多个catch块，捕获不同的异常，但要求父类异常在后面，子类异常在前面，且发生异常只会匹配一个catch。

   ```java
   try {
   } catch (NullPointerException e) {
   } catch (Exception e) {
   } finally {
   }
   ```

5. try - finally 配合使用，应用场景，不管有没有异常就要执行的代码。但是有异常时，执行过后程序崩掉，因为没有catch。

**用户一致输入，直到输入为整数为止。**

```java
Scanner scanner = new Scanner(System.in);
String inputStr;
int num;
while (true) {
    System.out.println("请输入一个整数:");
    inputStr = scanner.next();
    try {
        num = Integer.parseInt(inputStr);
        break;
    } catch (NumberFormatException e) {
        System.out.print("你输入的不是一个整数！ ");
    }
}
System.out.println("输入的为:" + num);
```

#### throws细节

1. 对于编译时异常，程序中必须处理。

2. 对于运行时异常，程序中没有处理，默认就是throws的方式处理。

3. 子类重写父类方法时，对抛出的异常规定：子类重写的方法，所抛出的**异常类型是和父类抛出的异常类型一致或者是对应的子类**。

4. 在throws过程中，如果有方法 try - catch ，就不必throws。

5.  当一个方法`调用`另一个`抛出了编译时异常`的方法，处理办法：throws、或者try - catch显式处理，否则报错。

6.  当一个方法`调用`另一个`抛出了运行时异常`的方法，不会报错。

|            |             意义             |    位置    | 后接类型 |
| :--------: | :--------------------------: | :--------: | :------: |
| **throws** |      异常处理的一种方式      | 方法声明处 | 异常类型 |
| **throw**  | 手动生成**异常对象**的关键字 |  方法体内  | 异常对象 |

### 自定义异常

```java
public class CustomException {
    public static void main(String[] args) {
        int age = 1001;
        if (!(age >= 0 && age <= 100)) {
            throw new AgeException("年龄必须在0 - 100之间");
        }
        System.out.println("你的你年龄范围正确");
    }
}
class AgeException extends RuntimeException {
    public AgeException(String message) {
        super(message);
    }
}

Exception in thread "main" com.yyw.customexception_.AgeException: 年龄必须在0 - 100之间
	at com.yyw.customexception_.CustomException.main(CustomException.java:7)
```





















