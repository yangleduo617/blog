#  Chapter13


## 集合

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/image-20220309165013379.png)

## PriorityQueue

| compare |   升序    |   降序    |
| :-----: | :-------: | :-------: |
| o1 < o2 | return -1 | return 1  |
| o1 = o2 | return 0  | return 0  |
| o1 > o2 | return 1  | return -1 |

## Deque

ArrayDeque 底层使用**循环数组**实现，任何一点都可以看成起点或终点，其中的 head 不一定比 tail 小，不允许元素为空，**线程不安全**。

### 用做 FIFO 队列

向 deque 尾部添加，从头部删除元素

| Queue Method | Equival Deque Method |            Description            |
| :----------: | :------------------: | :-------------------------------: |
|   offer(e)   |    offerLast(e);     |   队尾插入元素，失败返回 false    |
|    poll()    |     pollFirst()      | 获取并删除队首元素，失败返回 null |
|    peek()    |     peekFirst()      | 获取不删除队首元素，失败返回 null |
|    add(e)    |      addLast(e)      |    队尾插入元素，失败抛出异常     |
|   remove()   |    removeFirst()     | 获取并删除队首元素，失败抛出异常  |
|  element()   |      getFirst()      | 获取不删除队首元素，失败抛出异常  |

### 用做 LIFO 栈

向 deque 头部添加，从头部删除元素

| Stack Method | Equival Deque Method |            Description            |
| :----------: | :------------------: | :-------------------------------: |
|   push(e)    |     addFirst(e)      |    栈顶添加元素，失败抛出异常     |
|    pop()     |    removeFirst()     |  获取并删除栈顶元素，失败抛异常   |
|    peek()    |      getFirst()      |  获取不删除栈顶元素，失败抛异常   |
|      ~       |    offerFirst(e)     |   栈顶添加元素，失败返回 false    |
|      ~       |     pollFirst()      | 获取并删除栈顶元素，失败返回 null |
|      ~       |     peekFirst()      | 获取不删除栈顶元素，失败返回 null |



集合的简介，点击[这里](https://blog.csdn.net/qq_39683227/article/details/119322662?spm=1001.2014.3001.5501#_31 )。

### 集合选型

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/集合选型.png)

## Collection

1. Collection实现子类可以存放多个元素，每个元素可以是**Object**。

2. Collection的实现类，可存放重复的元素，有些不可以。

3. Collection的实现类，有的是有序的（**List**），有的是无序的（**Set**）。

4. Collection接口没有直接的实现子类，是通过它的子接口 Set 和 List 来实现的。

### Collection常用方法

> add、remove、contains、addAll、removeAll、containsAll、size、isEmpty、clear

#### Iterator

- Iterator对象称为迭代器，主要用于遍历Collection集合中的元素。

- 实现了Collection接口的集合类都有**iterator()**方法，用以返回一个实现了Iterator接口的**对象**，即一个迭代器。

- Iterator的结构

  ![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/Iterator.png)

- Iterator仅用于**遍历集合**，Iterator本身不存放对象。如果重新遍历，需要重新调用iterator方法。

#### 遍历方式

```java
Collection list = new ArrayList();
......
Iterator iterator = list.iterator();
while (iterator.hasNext()) {
    Object next = iterator.next();
    System.out.println(next);
}
for (Object o : list) {
    System.out.println(o);
}
// 普通的for循环
for (int i = 0; i < list.size(); i++) {
    Object obj = list.get(i);
    System.out.println(obj);
}
```

## List

List集合中元素是有序的，并且可以重复。

### List常用方法

- add(int index, Object ele)、addAll(int index, Collection eles)、get(int index)、indexOf(Object obj)、lastIndexOf(Object obj)、remove(int index)、set(int index, Object ele)`替换，在冒泡排序时使用`、subList(int fromIndex, int toIndex)`[fromIndex, toIndex)`

### ArrayList & Vector

1. ArrayList是用**数组**来存储数据的。

2. ArrayList基本等同于Vector，ArrayList是**线程不安全**的，但是执行效率高。多线程建议使用Vector，Vector是线程同步的，线程安全，其中的方法有**synchronized**关键字。

#### 分析

 - 底层维护的是一个 **Object类型**的数组 elementData[] 

 - 使用无参构造器时，初始的elementData的容量为0，第一次添加，扩容为10，如果需要再次扩容，则扩容elementData为**1.5**倍。

 - 使用指定大小的构造器时，初始的elementData的容量为指定大小 ，如果需要再次扩容，则扩容elementData为**1.5**倍。

|           | 底层结构          | 同步、效率     | 扩容倍数                                                   |
| :-------- | :---------------- | -------------- | ---------------------------------------------------------- |
| ArrayList | 可变数组 Object[] | 不安全，效率高 | 有参构造，1.5倍。无参构造 第一次10，从第二次开始 1.5倍扩容 |
| Vector    | 可变数组          | 安全，效率不高 | 有参构造，2倍扩容。无参构造，默认10，满后按2倍扩。         |

### LinkedList

底层实现了双向链表和双端队列的特点，**线程不安全，没有实现同步。**

|            | 底层结构     | 增删的效率         | 改查的效率 |
| ---------- | ------------ | ------------------ | ---------- |
| ArrayList  | 可变数组     | 较低、数组的扩容   | 较高       |
| LinkedList | **双向链表** | 较高、通过链表追加 | 较低       |

## Set

**无序**，没有索引，但是**取出**的顺序是一定的。**不允许重复元素**，最多包含一个null。

### Set常用方法

Set常用方法与Collection一样。

#### 遍历方式

1. 可以使用迭代器
2. 增强for
3. **不能用索引**的方式来获取

### HashSet

 - 实际上是HashMap，HashMap底层是**数组 + 链表 + 红黑树**。

 - 添加一个元素时，先得到**哈希值**，将其转成一个索引值。

 - 找到存储表**table**，看这个索引位置是否已经存放元素。

 - 没有的话，直接加入。

 - 如果有，调用**equals**(每个类都有自己的方法，**标准**可以由程序员重写规定)方法比较，如果相同，放弃添加；如果不同，则添加到其后面，形成链表。
 
 - 在jdk8中，如果一条链表的元素的个数到 **TREEIFY_THRESHOLD = 8**，并且table的大小 >= **MIN_TREEIFY_CAPACITY = 64**，就会转成红黑树。

 - 第一次添加时，table数组扩容到16，临界值threshold是 16 * 加载因子（loadFactor = 0.75） = 12。

 - 如果table的容量没有到64，按两倍进行扩容。

### LinkedHashSet

 - 底层是一个LinkedHashMap，是HashMap的子类，维护的是 **数组table + 双向链表**。

 - 根据元素的hashCode 值来决定元素的索引，使用链表维护元素的次序，使得元素看起来是以插入顺序保存的。

 - 不允许添加重复的元素。

1. LinkedHashSet 加入顺序和取出元素/数据的顺序一致。

2. LinkedHashSet 底层维护的是一个LinkedHashMap(是HashMap的子类)。

3. LinkedHashSet 底层结构 (数组table+双向链表)。

4. 添加第一次时，直接将 数组table 扩容到 16 ,存放的结点类型是 LinkedHashMap$Entry。

5. 数组是 `HashMap$Node[]` ，存放的元素/数据是 `LinkedHashMap$Entry`类型。多态数组的知识，是一种多态现象。

```java
//继承关系是在内部类完成
static class Entry<K,V> extends HashMap.Node<K,V> {
	Entry<K,V> before, after;
	Entry(int hash, K key, V value, Node<K,V> next) {
		super(hash, key, value, next);
	}
}
```

## Map

 - map保存具有映射关系的 Key-Value。

 - Map 中的 key 和  value 可以是**任何引用类型的数据**，会封装到`HashMap$Node` 对象中。因为Node实现了Entry接口，另一个说法是一对 K-V 就是一个Entry。

 - Map 中的 key 不允许重复，Map 中的 value 可以重复。

 - 当有相同的 key , 添加时就等价于替换。

 - Map 的 key 可以为 null, value 也可以为null ，注意 **key 为null，只能有一个**，value 为null ,可以有多个。

 - **常用String类作为Map的 key**。

 - key 和 value 之间存在单向一对一关系，即通过指定的 key 总能找到对应的 value。

### 常用方法

- put、remove、get、size、isEmpty、clear、containsKey

#### 遍历方式

```java
// 通过获得key值集合KeySet,遍历
Set set = map.keySet();
for (Object key : set) {
    System.out.println(key + "-" + map.get(key));
}
Iterator iter = set.iterator();
while (iter.hasNext()) {
    Object key = iter.next();
    System.out.println(key + "-" + map.get(key));
}

// 通过获得value的集合Values,遍历
Collection values = map.values();
for (Object val : values) {
    System.out.println(val);
}
Iterator iterator = values.iterator();
while (iterator.hasNext()) {
    Object next = iterator.next();
    System.out.println(next);
}

// 使用Entry
Set set1 = map.entrySet();
for (Object obj : set1) {
    Map.Entry entry = (Map.Entry) obj;
    System.out.println(entry.getKey() + " " + entry.getValue());
}

Iterator iterator1 = set1.iterator();
while (iterator1.hasNext()) {
    Object next = iterator1.next();
    Map.Entry entry = (Map.Entry) next;
    System.out.println(entry.getKey() + " " + entry.getValue());
}
```

### HashMap

（来自 **[小傅哥](https://blog.csdn.net/generalfu?spm=1001.2014.3001.5509)** 的 [面经](https://download.csdn.net/download/Yao__Shun__Yu/14932325)）

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/HashMapFlowDiagram.png)

#### 扰动函数

在HashMap中存放元素时，对其哈希值进行了处理，目的是优化散列效果，就是`java8`中的散列值**扰动函数**。

```java
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

 使用扰动函数就是为了增加随机性，让数据元素更加均衡的散列，减少碰撞。

#### 负载因子

 数据越来越多时，选择一个合理的大小下进行扩容，默认值0.75。就是说当阀值容量占了3/4时赶紧扩容，**减少Hash碰撞**。同时0.75是一个默认构造值，在创建 HashMap 也可以调整，比如你希望用更多的空间换取时间，可以把负载因子调的更小一些，减少碰撞。

#### 扩容元素拆分

 扩容最直接的问题，就是需要把元素拆分到新的数组中。拆分元素的过程中，原`jdk1.7`中会需要重新计算哈希值，但是到`jdk1.8`中已经进行优化，不在需要重新计算，提升了拆分的性能。

### Hashtable

1. key、value不能为**null**。

2. Hashtable是线程安全的。

3. 底层有数组 `Hashtable$Entry[]` 初始化大小为 11，临界值 threshold 8 = 11 * 0.75。

4. 按照 `int newCapacity = (oldCapacity << 1) + 1;` 的大小扩容。

5. 执行 方法 `addEntry(hash, key, value, index);` 添加 K-V 封装到`Entry`。

### Properties

1. Properties可用于从 `xxx.properties` 文件中，加载数据到Properties类对象，进行读取和修改。

2. `xxx.properties` 文件通常为配置文件。









