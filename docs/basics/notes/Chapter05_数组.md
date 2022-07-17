# Chapter05

## 数组、排序、查找

### 数组初始化

#### 动态初始化

```java
int[] arrayDemo = new int[6];
double[] arrayDemo2;
arrayDemo2 = new double[5];
```

#### 静态初始化

```java
int[] array = {1,2,3};
```

注意细节：

1. 数组是引用类型，数组型数据是对象

2. 索引是从0开始

### 数组赋值机制

1. 数组默认情况下是引用传递，附的值是地址。方式是引用传递。

2. 区别于基本类型的赋值，是数值的拷贝，而数组是地址的传递。

```java
int[] arr1 = {1,2,3};
int[] arr2 = arr1;
// 改变arr2的值，arr1的值也会改变
```

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/Jvm.png)

### 数组拷贝

数据空间要求是独立的

```java
int[] arr1 = {1,2,3};
//开辟新的数据空间
int[] arr2 = new int[arr1.length];
arr2 = arr1;
```

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/数组拷贝.png)

### 数组反转

```java
int[] arr = {11,22,33,44,55,66,77,88,99};
int len = arr.length;
int[] arr2 = new int[len];

for(int i = len - 1, j = 0; i >= 0; i--, j++) {
	arr2[j] = arr[i];
}
arr = arr2; // 让 arr 指向 arr2数据空间，arr原来的数据空间
		    // 就没有变量引用，会被当作垃圾，销毁
for(int i = 0; i < len; i++){
	System.out.print(arr[i] + " ");
}
```

```java
int[] arr = {11,22,33,44,55,66,77};
int temp = 0;
int len = arr.length;

for(int i = 0; i < len / 2; i++) {
    temp = arr[len - 1 - i];
    arr[len - 1 - i] = arr[i];
    arr[i] = temp;
}

for(int i = 0; i < len; i++){
 	System.out.print(arr[i] + " ");
}
```

### 数组添加                                                                   

```java
Scanner myScanner = new Scanner(System.in);
int[] arr = {1,2,3};

do {
    int[] arrNew = new int[arr.length + 1];

    for(int i = 0; i < arr.length; i++) {
        arrNew[i] = arr[i];
    }

    // 将输入的addNum添加到arrNew
    System.out.println("请输入添加的整数：");
    arrNew[arrNew.length - 1] = myScanner.nextInt();

    arr = arrNew; // 原来堆空间中的arr指向的数据空间被销
    for (int i = 0; i < arr.length; i++){
        System.out.print(arr[i] + " ");
    }

    System.out.println("\n" + "添加成功，是否继续，请输入y/n");
    char key = myScanner.next().charAt(0);
    if(key == 'n') {
        break;
    }
} while(true);
```

### 排序

1. 内部排序：将处理的数据加载到内存中，例如交换式排序、选择式排序和插入式排序

2. 外部排序：大量的数据在内存不够存储，借助外部存储进行排序，例如合并排序法，直接合并排序法

#### 冒泡排序法（Bubble Sorting）

将五个无序的数字：24,69,80,57,13 使用冒泡排序法将其排成一个从小到大的有序数列。

**思路：**

数组：[24,69,80,57,13]

第一轮排序：将最大的数放在最后的位置

1. 第一次比较：[**24,69**,80,57,13]，不变
2. 第二次比较：[24,**69,80**,57,13]，不变
3. 第三次比较：[24,69,**80,57**,13] -> [24,69,**57,80**,13] 
4. 第四次比较：[24,69,57,**80,13**] -> [24,69,57,**13,==80==**] 

第二轮排序：将第二大的数放在倒数第二的位置

1. 第一次比较：[**24,69**,57,13,80] ，不变
2. 第二次比较：[24,**69,57**,13,80] -> [24,**57,69**,13,80]
3. 第三次比较：[24,57,**69,13**,80] -> [24,57,**13,==69==**,80]

第三轮排序：将第三大的数放在倒数第三的位置

1. 第一次比较：[**24,57**,13,69,80]，不变
2. 第二次比较：[24,**57,13**,69,80] -> [24,**13,==57==**,69,80]

第四轮比较：将第四大的数放在倒数第四的位置

1. 第一次比较：[**24,13**,57,69,80] -> [**13,==24==**,57,69,80]

**特点：**

1. 一共 n 个元素则需要经过（n-1）次排序
2. 每一轮确定一个数的位置
3. 当进行比较时，前面的数大于后面的数，进行交换
4. 每轮的比较在减少

```java
public class BubbleSort{

	public static void main(String[] args) {
		
		int[] arr = {10,5,32,78,1,2,0,1,4,9};
		int len = arr.length;
		int temp = 0; // 临时变量

		for(int i = 0; i < len - 1 ; i++){
			for(int j = 0; j < len - 1 - i; j++) {
				// 如果前面的数大于后面的数，则交换
				if(arr[j] > arr[j + 1]) {
					temp = arr[j];
					arr[j] = arr[j + 1];
					arr[j + 1] = temp;
				}
			}

			System.out.println("\n第" + (i+1) + "轮排序");
			for(int k = 0; k < len; k++)
				System.out.print(arr[k] + " ");
		}

	}
}
```

### 查找

顺序查找

编程思想：判断有没有成功，用一个标识符判断，如果值变化，则成功

```java
import java.util.Scanner;
public class SeqSearch{
	public static void main(String[] args) {
		String[] names = {"柯南","毛利兰","灰原哀","怪盗基德","园子"};
		System.out.println("输入想找的民侦探柯南成员：");
		Scanner myScanner = new Scanner(System.in);
		String findName = myScanner.next();
		int index = -1; // 标识符，用于判断是否找到
		for(int i = 0; i < names.length; i++) {
			if(findName.equals(names[i])) {
			 System.out.println("恭喜，找到了！" + "序号为" + (i + 1));
				index = i;
				break;
			}
		}
		if(index == -1) {
			System.out.println("Sorry,there is no such name that you want to find.");
		}
	}
}
```

二分查找（数组是有序的）

### 二维数组

```java
int[][] arr = new int[2][3];
// 第一个是数组包含的一维数组的个数，第二个是一维数组的大小
```

```java
int[][] arr = {{}};
for (int i = 0; i < arr.length; i++) {
    for (int j = 0; j < arr[i].length; j++) {
        System.out.print(arr[i][j] + " ");
    }
}
```

二维数组int[2] [3]在内存中

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/twoDimensional.png)

注意：

二维数组中的一维数组中的元素可以不相等

```java
/* 动态创建如下数组
1
1 2
1 2 3
......
*/
// 动态创建数组如下，arr指向堆中一个空间，但是该空间包含了三个null
int[][] arr = new int[9][];
for (int i = 0; i < arr.length ;i++) {
    // 给每个一维数组开空间
    arr[i] = new int[i + 1];
    for (int j = 0; j < arr[i].length; j++) {
        arr[i][j] = j + 1;
    }
}
```

二维数组的声明方式：int[][] arr、int[] arr[]、int arr[][]。

```java
int x,y[];// x,y分别为一，二维数组
x[0] = y;// error
y[0] = x;// ok
y[0][0] = x;//error
x[0][0] = y;//error
y[0][0] = x[0];//ok
x = y;//error
```

### 练习

字符串数组的声明：

```java
String[] strs = new String[]{"yang"};// 第二个综括号不能有数字
```





















