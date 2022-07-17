# Chapter18

## 反射

在一个类加载完成以后，在**堆**中会产生唯一一个 Class 对象，这个对象包含了类的完整信息，可以通过这个对象得到类的结构。

### 优点 

可以动态的创建和使用对象，使用灵活，是框架底层的核心。

### 缺点

反射基本是**解释执行**，对执行速度有影响。可以关闭访问检查，`setAccessible`设为 true，使用反射可以访问 private 构造器。

## Class 类

编译后的字节码文件加载到内存中，加载到内存中的类，就称为运行时类，作为一个 Class 的一个实例。 

- Class 也是类，继承 Object 

- Class 类对象不是 new 生成的，是由系统创建的

- 某个 Class 类对象，在内存中只有一份，类只加载一次

- 类的字节码二进制数据是放在方法区的，也称为类的元数据（方法代码、变量名、方法名、访问权限等）

## 类加载

静态加载，编译的时候加载相关的类，依赖性太强。

动态加载，在运行的时候加载相关的类。

## 动态代理

静态代理，代理类和被代理类在编译期间就确定了。

使用场合：调试，远程方法调用。

```java
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 * Dynamic Proxy
 * 如何根据加载到内存中的被代理类，动态创建一个代理类及其对象
 * 通过代理类的对象调用方法时，如何动态的去调用被代理类的同名方法
 *
 * @author yyw
 * @version 1.0
 * @date 2021/11/4
 */
interface Human {

    String getBelief();

    void eat(String food);
}

// 被代理类
class SuperMan implements Human {

    @Override
    public String getBelief() {
        return "I believe I can do it!";
    }

    @Override
    public void eat(String food) {
        System.out.println("I eat " + food);
    }
}

class ProxyFactory {

    /**
     * @param obj 被代理类的对象
     * @return 返回一个代理类的对象
     */
    public static Object getProxyInstance(Object obj) {
        MyInvocationHandler handler = new MyInvocationHandler();
        // 将被代理类传进 handler 进行实例化
        handler.bind(obj);
        return Proxy.newProxyInstance(obj.getClass().getClassLoader(), obj.getClass().getInterfaces(), handler);
    }
}

/**
 * 通过代理类的对象调用方法，自动调用 invoke 方法
 * 将被代理类执行的方法声明在 invoke 方法中
 */
class MyInvocationHandler implements InvocationHandler {

    // 需要被代理类进行实例化
    private Object obj;

    public void bind(Object obj) {
        this.obj = obj;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        // method 代理类对象调用的方法，此方法作为被代理类对象要调用的方法
        // obj 被代理类对象
        Object returnValue = method.invoke(obj, args);
        // 方法返回值就作为当前类中的 invoke 的返回值
        return returnValue;
    }
}

public class DynamicProxyTest {
    public static void main(String[] args) {
        SuperMan superMan = new SuperMan();
        // 代理类的对象
        Human proxyInstance = (Human) ProxyFactory.getProxyInstance(superMan);
        System.out.println(proxyInstance.getBelief());
        proxyInstance.eat("fish");
    }
}

```











