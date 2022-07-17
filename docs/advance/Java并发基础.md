## 01 基础

### 线程与进程

- 上下文切换，并行和并发，同步与异步。

  导致线程上下文切换的原因大概有以下几种：

  1）线程的 CPU 时间片用完

  2）发生了垃圾回收

  3）有更高优先级的线程需要运行

  4）线程自己调用了 sleep、yield、wait、join、park、synchronized、lock 等方法

- Java 线程与操作系统的线程的区别。

用户级线程：在这种模型下，我们需要自己定义线程的数据结构、创建、销毁、调度和维护等，这些线程运行在操作系统的某个进程内，然后操作系统直接对进程进行调度。

内核级线程：我们可以直接使用操作系统中已经内置好的线程，线程的创建、销毁、调度和维护等，都是直接由操作系统的内核来实现，我们只需要使用**系统调用**就好了，不需要像用户级线程那样自己设计线程调度等。

**虚拟机中的线程状态，不反应任何操作系统中的线程状态**。

现今 Java 中线程的本质，其实就是操作系统中的线程，其线程库和线程模型很大程度上依赖于操作系统（宿主系统）的具体实现，比如在 Windows 中 Java 就是基于 Win32 线程库来管理线程，且 Windows 采用的是**一对一**的线程模型。

## 02 Java 线程

### 创建线程（3 种）

- Thread

```java
class Thread1 extends Thread {
    @Override
    public void run() {
        // 线程需要执行的任务
    }
}

// 一般的写法
Thread t1 = new Thread("t1") {
    @Override
    public void run() {
        // 线程需要执行的任务
    }
};
```

- Thread + Runnable

```java
Thread t2 = new Thread(() -> {
    // 要执行的任务	
}, "t2");
```

- Thread + Callable + `FutureTask`

```java
// 获取任务执行的结果 Callable，Thread 不接收 Callable，使用 FutureTask 将 Callable 包装成 Runnable
// Callable 和 FutureTask 的泛型填的就是 Callable 任务返回的结果类型（就是 call 方法的返回类型）。
// 可能会造成主线程的阻塞
class MyCallable implements Callable<Integer> {
    @Override
    public Integer call() throws Exception {
        // 要执行的任务
        
        return 1;
    }
}

FutureTask<Integer> task = new FutureTask<>(new MyCallable());
new Thread(task);
```

### Java 线程六种状态与操作系统五状态模型

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20220620152553161.png)

## 03 进阶

### 线程安全

#### Java 内存模型 （Java Memory Model，JMM）

为了屏蔽各种硬件和操作系统的内存访问差异，以实现让 Java 程序在各种平台下都能达到一致的内存访问效果。JMM 其实是在遵循一个基本原则，即只要不改变程序的执行结果（指的是单线程程序和正确同步的多线程程序），编译器和处理器怎么优化都行。

主内存是 Java 虚拟机内部的一部分，类比物理机的主内存，工作内存类比高速缓存。

- 原子性 

  锁，`java.util.concurrent.atomic`中的原子类(CAS 操作)

- 可见性

  就是指当一个线程修改了共享变量的值时，其他线程能够**立即**得知这个修改。

  `volatile`，`synchronized`，`final`

- 有序性

  **as-if-serial 语义**：不管怎么重排序，**单线程**环境下程序的执行结果不能被改变。**CPU 和编译器不会对存在数据依赖关系的操作做重排序**，**不同 CPU 之间和不同线程之间的数据依赖性是不被 CPU 和编译器考虑的**。

  `synchronized` 通过排他锁的方式保证了同一时间内，被 `synchronized` 修饰的代码是单线程执行的。

  as-if-serial 语义保证单线程内程序的执行结果不被改变，Happens-before 关系保证正确同步的多线程程序的执行结果不被改变。

### Happens-before 原则

判断数据是否存在竞争，线程是否安全的非常有用的手段。

1. 如果一个操作 Happens-before 另一个操作，那么第一个操作的执行结果将对第二个操作可见，而且第一个操作的执行顺序排在第二个操作之前。

2. 两个操作之间存在 Happens-before 关系，并不意味着 Java 平台的具体实现必须要按照 Happens-before 关系指定的顺序来执行。如果重排序之后的执行结果，与按 Happens-before 关系来执行的结果一致，那么这种重排序并不非法（也就是说，JMM 允许这种重排序）。

### 8 条 Happens-before 规则

- 程序次序规则（Program Order Rule）：在**一个线程**内，按照控制流顺序，书写在前面的操作先行发生（Happens-before）于书写在后面的操作。注意，这里说的是控制流顺序而不是程序代码顺序，因为要考虑分支、循环等结构。
- 管程锁定规则（Monitor Lock Rule）：一个 unlock 操作先行发生于后面对同一个锁的 lock 操作。这里必须强调的是 “同一个锁”，而 “后面” 是指时间上的先后。
- volatile 变量规则（Volatile Variable Rule）：对一个 volatile 变量的写操作先行发生于后面对这个变量的读操作，这里的 “后面” 同样是指时间上的先后。
- 线程启动规则（Thread Start Rule）：Thread 对象的 start() 方法先行发生于此线程的每一个动作。
- 线程终止规则（Thread Termination Rule）：线程中的所有操作都先行发生于对此线程的终止检测，我们可以通过 Thread 对象的 join() 方法是否结束、Thread 对象的 isAlive() 的返回值等手段检测线程是否已经终止执行。
- 线程中断规则（Thread Interruption Rule）：对线程 interrupt() 方法的调用先行发生于被中断线程的代码检测到中断事件的发生，可以通过 Thread 对象的 interrupted() 方法检测到是否有中断发生。
- 对象终结规则（Finalizer Rule）：一个对象的初始化完成（构造函数执行结束）先行发生于它的 finalize() 方法的开始。
- 传递性（Transitivity）：如果操作 A 先行发生于操作 B，操作 B 先行发生于操作 C，那就可以得出操作 A 先行发生于操作 C 的结论。

#### 锁类型

- 悲观锁和乐观锁
- 自旋锁
- 重入锁和不可重入锁
- 公平锁和非公平锁
- 共享锁和排他锁
- 偏向锁
- 重量级锁和轻量级锁
  
  优先使用偏向锁（101），然后是轻量级锁（00），重量级锁（10）。正常情况下的 `MarkWord` 是01。Java 中的 synchronized 有偏向锁、轻量级锁、重量级锁，分别对应了锁只被一个线程持有、不同线程交替持有锁、多线程竞争锁三种情况。当条件不满足时，锁就会按照顺序进行升级。

wait() notify()，当多个线程 wait 时，notify 可能会产生虚假唤醒问题。`notifyAll()`解决一部分问题，但是其他业务相关线程的条件还没有满足就被唤醒，出现问题，使用 while 循环判断。

```java
synchronized (lock) {
    while (Condition untenable) {
        lock.wait();
    }
    // doing
}

// others thread
synchronized (lock) {
    // doing
    lock.notifyAll();
}
```

#### 锁的实现

`Lock`接口（`java.util.concurrent.locks`），AQS（`AbstractQueuedSynchronizer`）

#### AQS

使用了模板方法设计模式。

- AQS 是一个抽象类，是用来构建锁或者其他同步组件的基础框架，它使用了一个 `volatile` 修饰的 int 成员变量 `state` 表示同步状态，通过内置的 FIFO 双向队列（源码注释上写的 CLH（Craig，Landin，and Hagersten） 队列（三个人名的简称），其实就是一个先进先出的双向队列）来完成线程们获取资源的时候的排队工作。
- 具体来说，如果某个线程请求锁（共享资源）失败，则该线程就会被加入到 CLH 队列的末端。当持有锁的线程释放锁之后，会唤醒其后继节点，这个后继节点就可以开始尝试获取锁。


## 04 原理

### JUC

- Lock 框架（locks 包）

- 原子类 （atomic 包）

- 并发集合

- 线程池

- 工具类

  `CountDownLatch`

  `CyclicBarrier`

  `Semaphore`

  `Exchanger`

- `ThreadLocal`



