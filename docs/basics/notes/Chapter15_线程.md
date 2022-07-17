# Chapter15

## 线程入门

### 创建方式

 - 继承`Thread`类，重写`run()`方法

 - 实现`Runnable`接口，重写`run()`方法。`Java`是单继承的，一个类已经继承了某个父类，这时在用继承`Thread`方法就不行了。此处使用了设计模式（代理模式）。

 - 实现`Runnable`接口更加适合多线程共享一个资源的情况，并且避免了单继承机制。

### 常用方法

1. `yield()`：线程的礼让。让出CPU，让其他线程执行，礼让的时间不确定，不一定礼让成功。

2. `join()`：线程的插队。插队的线程一旦插队成功，先执行完插入线程的所有任务。

 - 用户线程：工作线程，当线程的任务执行完，或者通知方式结束

 - 守护线程：一般是为工作线程服务的，当所有的用户线程结束，守护线程自动结束。常见的守护线程：`垃圾回收机制`

   ```java
   线程对象.setDaemon(true);
   ```

### 线程生命周期

OS 中有5种，初始、就绪、运行、阻塞、结束。

 Java API 中 RUNNABLE 对应 OS 中的就绪、运行、阻塞。

线程状态。线程可以处于以下状态之一：

- `NEW`尚未启动的线程处于此状态。 

- `RUNNABLE` 在Java虚拟机中执行的线程处于此状态。 

   - `Ready`线程被挂起、Thread.yeild。
   - `Running`线程被调度器选中执行。

- `BLOCKED` 被阻塞等待，监视器锁定的线程处于此状态。 synchronized

- `WAITING`正在等待另一个线程执行特定动作的线程处于此状态。 其他线程.join()，其他线程没有运行完，对于本线程来说就是 waiting

- `TIMED_WAITING`正在等待另一个线程执行动作达到**指定等待时间**的线程处于此状态。 sleep(100)

- `TERMINATED`已退出的线程处于此状态。

## 线程同步机制

多线程编程，一些敏感的数据不允许被多个线程同时访问，使用同步访问技术，保证数据在`任何同一时刻`，最多只有一个线程访问，来确保数据的完整性。

### 同步方法

1. 同步代码块

   ```java
   synchronized (对象) {
       // 得到对象的锁，才能操作同步代码
       // 同步的代码
   }
   ```

2. synchronized还可以放在方法声明中，表示整个方法为同步方法

   ```java
   class Test {
       public synchronized void method(String name) {
           // 需要同的代码
       }
   }
   // 等价于
   class Test {
       public void method(String name) {
           synchronized (this) {
                // 需要同的代码
           }
       } 
   }
   // 静态方法
   class Test {
       public static synchronized void method(String name) {
           // 需要同的代码
       }
   }
   // 等价于
   class Test {
       public void method(String name) {
           synchronized (Test.class) {
                // 需要同的代码
           }
       } 
   }
   ```

```java
/**
 * @author yywqd
 * 三个窗口售票
 */
public class SellTicket {
    public static void main(String[] args) {
        Ticket ticket = new Ticket();
        new Thread(ticket).start();
        new Thread(ticket).start();
        new Thread(ticket).start();
    }
}

class Ticket implements Runnable {
    private int ticketNum = 100;
    private boolean loop = true;

    // 同步，非公平锁，哪个对象抢到锁就执行
    public synchronized void sell() {
        if (ticketNum <= 0) {
            System.out.println("Sold out!");
            loop = false;
            return;
        }
        try {
            Thread.sleep(20);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Window " + Thread.currentThread().getName() +
                " sells one ticket," + " the remaining ticket is " + (--ticketNum));
    }

    @Override
    public void run() {
        while (loop) {
            sell();
        }
    }
}
```

### 互斥锁

1. 同步方法没有使用`static`修饰，默认锁对象为this，也可以改写为其他对象，要求多个线程的`锁对象`为同一对象。

2. 如果方法使用`static`修饰，默认锁对象：`当前类名.class`

### 释放锁

1. 当前线程的同步方法、同步代码块执行结束。

2. 当前线程在同步代码块、同步方法中遇到`break`、`return`。

3. 当前线程在同步代码块、同步方法中出现了未处理的`Error`或`Exception`，锁异常地结束。

4. 当前线程在同步代码块、同步方法中执行了线程对象的`wait()`方法，当前线程暂停，并释放锁。

#### 不会释放锁

1. 线程执行同步代码块、同步方法时，程序调用`Thread.sleep()`、`Thread.yield()`方法暂停当前线程的执行，不会释放锁。

2. 线程执行同步代码块时，其他线程调用了该线程的`suspend()`方法将该线程挂起，该线程不会释放锁。

   - suspend()、resume()两个方法已经**Deprecated**，不推荐使用。

### 两阶段终止模式

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20220716161423014.png)

打断标记为 true 时，LockSupport.park() 就会失效，线程会继续运行下去。









