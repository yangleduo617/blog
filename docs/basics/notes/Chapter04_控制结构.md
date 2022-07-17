# Chapter04

## 程序控制结构

#### 多分支



```java
// 只有一个执行入口
if () {

} else if () {

} else {

}
```

### 嵌套分支

不要超过3层

### switch分支结构 

```java
switch（表达式）{
    case 常量1:
        语句；
        break；
    ......
    default：
        break；
}
```

程序执行流程图：

**穿透现象**：执行一条语句块后，没有break语句，则会执行下一个case的语句块。

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/break.png)

注意细节：

1. switch表达式的类型：byte、short、int、char、string、enum（枚举）。注意不能有double类型。

2. case语句只能是常量，不能是变量。

3. 实际开发中，若判断的条件数量比较少，用switch语句；若判断的条件是区间或者是Boolean类型的条件时，用if语句。

### 循环控制

#### for循环

1. for( ;循环条件判断; )中初始化变量可以写到别的地方，但是分号不能省略。

   ```java
   int i = 1;
   for(; i<= 10 ;){
       System.out.println("i = " + i);
       i++;
   } //i可以在循环体外使用，写在循环体内作用域只能在循环体内
   
   for(;;){
       //无限循环
   }
   ```

2. 循环初始值可以有多条语句，用逗号隔开

编程思想：

1. 化繁为简，将复杂的需求简化为简单的需求，逐步完成

2. 先死后活，先考虑固定的值，再转变为灵活变化的值

#### while循环

#### do..while循环

1. 循环变量初始化，

2. 至少执行一次

3. 最后要有一个分号;

   ```java
   int i = 1;
   do {
       //循环语句
       i++;
   } while( i <= 10 );
   ```

注意：最多使用两层循环

### 跳转控制语句-break、continue、return

1. break出现在多层嵌套语句块中，可以通过标签指定退出到哪一层语句块，标签可以自定

2. 实际开发中，尽量不使用标签

3. 没有指定break，退出最近的循环体

4. continue结束当前循环，进行下一个循环

5. return用在main方法，退出程序，用在方法，跳出该方法。

