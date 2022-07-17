 # 剑指offer

 ## 剑指 Offer 09. 用两个栈实现队列

[剑指 Offer 09. 用两个栈实现队列](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/)


用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )

```java
class CQueue {

    Deque<Integer> stack1;
    Deque<Integer> stack2;

    public CQueue() {
        stack1 = new ArrayDeque<>();
        stack2 = new ArrayDeque<>();
    }
    
    public void appendTail(int value) {
        stack1.push(value);
    }
    
    public int deleteHead() {
        if (stack2.isEmpty()) {
            if (stack1.isEmpty()) {
                return -1;
            }
            while (!stack1.isEmpty()) {
                int temp = stack1.pop();
                stack2.push(temp);
            }
        }
        return stack2.pop();
    }
}

// 时间复杂度：对于插入和删除操作，时间复杂度均为 O(1)。
// 空间复杂度：O(N)。需要使用两个栈存储已有的元素。
```
## 剑指 Offer 30. 包含min函数的栈

 [剑指 Offer 30. 包含min函数的栈](https://leetcode-cn.com/problems/bao-han-minhan-shu-de-zhan-lcof/)

定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 **O(1)**。

```java
class MinStack {

    // 存储元素 
    Deque<Integer> stack1;
    // 存储非严格降序的元素
    Deque<Integer> stack2;

    /** initialize your data structure here. */
    public MinStack() {
        stack1 = new ArrayDeque<>();
        stack2 = new ArrayDeque<>();
    }
    
    public void push(int x) {
        stack1.push(x);
        // 没有加 = 会出现空指针异常，栈顶大加入
        if (stack2.isEmpty() || stack2.peek() >= x) {
            stack2.push(x);
        }
    }
    
    public void pop() {
        // 要保持数据的一致性
        int temp = stack1.pop();
        if (temp == stack2.peek()) {
            stack2.pop();
        }
    }
    
    public int top() {
        return stack1.peek();
    }
    
    public int min() {
        return stack2.peek();
    }
}
// 时间复杂度：O(1)
// 空间复杂度：O(N)

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack obj = new MinStack();
 * obj.push(x);
 * obj.pop();
 * int param_3 = obj.top();
 * int param_4 = obj.min();
 */
```
## 剑指 Offer 06. 从尾到头打印链表

 [剑指 Offer 06. 从尾到头打印链表](https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/)

输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public int[] reversePrint(ListNode head) {
        // 临时变量记录头节点
        ListNode cur = head;
        int index = 0;
        while (cur != null) {
            index++;
            cur = cur.next;
        }
        int[] arr = new int[index];
        while (head != null) {
            arr[--index] = head.val;
            head = head.next;
        }
        return arr;
    }
}

// 时间复杂度：O(N)
// 空间复杂度：O(N)
```
## 剑指 Offer 24. 反转链表

 [剑指 Offer 24. 反转链表](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/)

定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode nxt = head;
        while (head != null) {
            nxt = head.next;
            head.next = prev;
            prev = head;
            head = nxt;
        }
        return prev;
    }
}

// 时间复杂度：O(N)
// 空间复杂度：O(1)
```
## 剑指 Offer 35. 复杂链表的复制

 [剑指 Offer 35. 复杂链表的复制](https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/)

请实现 copyRandomList 函数，复制一个复杂链表。在复杂链表中，每个节点除了有一个 next 指针指向下一个节点，还有一个 random 指针指向链表中的任意节点或者 null。

```JAVA
/*
// Definition for a Node.
class Node {
    int val;
    Node next;
    Node random;

    public Node(int val) {
        this.val = val;
        this.next = null;
        this.random = null;
    }
}
*/
class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) {
            return null;
        }
        
        Node cur = head;
        Node nxt = null;

        // 复制出新节点
        while (cur != null) {
            nxt = cur.next;
            cur.next = new Node(cur.val);
            cur.next.next = nxt;
            cur = nxt;
        }

        // 设置随机指针
        cur = head;
        Node copyNode = null;
        while (cur != null) {
            nxt = cur.next.next;
            copyNode = cur.next;
            copyNode.random = (cur.random != null) ? cur.random.next : null;
            cur = nxt;
        }

        // 分离链表
        cur = head;
        Node res = head.next;
        while (cur != null) {
            nxt = cur.next.next;
            copyNode = cur.next;
            // 原来的链表
            cur.next = nxt;
            // 复制的链表
            copyNode.next = (nxt != null) ? nxt.next : null;
            cur = nxt; 
        }
        return res;
    }
}

// 时间复杂度：O(N)，其中 N 是链表的长度。我们只需要遍历该链表三次。
// 空间复杂度：O(1)。
```
## 剑指 Offer 05. 替换空格

 [剑指 Offer 05. 替换空格](https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/)

请实现一个函数，把字符串 `s` 中的每个空格替换成"%20"。

```java
class Solution {
    public String replaceSpace(String s) {
     	// 使用双指针，l 指向原字符串最右边的字符
        int l = s.length() - 1;
        StringBuilder sb = new StringBuilder();
        // 空格数量的两倍
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == ' ') {
                sb.append("  ");
            }          
        }
        s += sb.toString();
        // 新字符串的结尾
        int r = s.length() - 1;
		char[] chs = s.toCharArray();
        while (l < r && l >= 0) {
            char ch = chs[l--];
            if (ch == ' ') {
                chs[r--] = '0';
                chs[r--] = '2';
                chs[r--] = '%';
            } else {
                chs[r--] = ch;
            }
        }
        return new String(chs); 
    }
}

class Solution {
    public String replaceSpace(String s) {
        char[] chs = s.toCharArray();
        char[] res = new char[chs.length * 3];
        int len = 0;

        for (char c : chs) {
            if (c != ' ') {
                res[len++] = c;
            } else {
                res[len++] = '%';
                res[len++] = '2';
                res[len++] = '0';
            }
        }

        return new String(res, 0, len);
    }
}

// 时间复杂度：O(N)
// 空间复杂度：O(N)
```
## 剑指 Offer 58 - II. 左旋转字符串

[剑指 Offer 58 - II. 左旋转字符串](https://leetcode-cn.com/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/)

字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"。

```java
class Solution {
    public String reverseLeftWords(String s, int n) {
        char[] chs = s.toCharArray();
        int len = chs.length;
        // 三次翻转字符串
        reverse(chs, 0, n - 1);
        reverse(chs, n, len - 1);
        reverse(chs, 0, len - 1);
        return new String(chs);
    }

    public void reverse(char[] chs, int start, int end) {
        // 双指针原地反转
        while (start < end) {
            char temp = chs[start];
            chs[start] = chs[end];
            chs[end] = temp;
            start++;
            end--;
        }
    }
}

// 时间复杂度：O(N)
// 空间复杂度：O(1)，因为Java不支持对字符串的修改，所以转化成字符数组，实际上空间复杂度还是O(1)
```
## 剑指 Offer 03. 数组中重复的数字

[剑指 Offer 03. 数组中重复的数字](https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/)

在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

```java
class Solution {
    public int findRepeatNumber(int[] nums) {
        // 修改数组，利用数组的下标
        for (int i = 0; i < nums.length; i++) {
            // 将数组元素与下标一一对应起来，如果swap找到相同的，肯定就是重复的元素
            while (nums[i] != i) {
                if (nums[i] == nums[nums[i]]) {
                    return nums[i];
                } 
                swap(nums, i, nums[i]);
            }
        }
        return -1;
    } 

    public void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

// 时间复杂度：O(N)
// 空间复杂度：O(1)
```
## 剑指 Offer 53 - I. 在排序数组中查找数字 I

[剑指 Offer 53 - I. 在排序数组中查找数字 I](https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/)

统计一个数字在排序数组中出现的次数。

```java
// 二分查找
class Solution {
    public int search(int[] nums, int target) {
        int len = nums.length;
        if (len == 0) {
            return 0;
        }
        int l = 0, r = len - 1;
        int mid = 0, res = 0;
        while (l <= r) {
            mid = l + (r - l) / 2;
            if (nums[mid] < target) {
                l = mid + 1;
            } else if (nums[mid] > target) {
                r = mid - 1;
            } else {
                // 相等
                int tmp = mid;
                while (true) {
                    if (tmp < 0 || nums[tmp] != target) {
                        break;
                    }
                    res++;
                    tmp -= 1;
                }
                tmp = mid + 1;
                while (true) {
                    if (tmp >= len || nums[tmp] != target) {
                        break;
                    }
                    res++;
                    tmp += 1;
                }
                return res;
            }
        }
        return 0;
    }
}


class Solution {
    public int search(int[] nums, int target) {
        int leftIdx = getBorder(nums, target, true);
        int rightIdx = getBorder(nums, target, false) - 1;
        // 返回的下标对用数组中判断是否等于 target
        if (leftIdx <= rightIdx && rightIdx < nums.length && nums[leftIdx] == target && nums[rightIdx] == target) {
            return  rightIdx - leftIdx + 1;
        }
        return 0;
    }

    // 用一个形参表示找最低还是最高下标
    private int getBorder(int[] nums, int target, boolean lower) {
        int right = nums.length - 1, left = 0;
        // 终止条件是 left = right + 1
        while (left <= right) {
            int mid = left + ((right - left) >> 1);
            if ((lower && nums[mid] >= target) || nums[mid] > target) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }
 
}
// 时间复杂度：O(logN)，其中 N 为数组的长度。二分查找一共会执行两次
// 空间复杂度：O(1) 。只需要常数空间存放若干变量。
```
## 剑指 Offer 53 - II. 0～n-1中缺失的数字

[剑指 Offer 53 - II. 0～n-1中缺失的数字](https://leetcode-cn.com/problems/que-shi-de-shu-zi-lcof/)

一个长度为 n - 1 的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围 0～n - 1 之内。在范围 0 ～ n - 1 内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。

```java
// 二分，根据下标与对应的数组元素是否相等将数组划分两部分，找的缺失的元素就是不相等那一部分首位元素的下标
class Solution {
    public int missingNumber(int[] nums) {
		int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) >> 1;
            if (mid == nums[mid]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return left;
    }
}

class Solution {
    public int missingNumber(int[] nums) {
        int left = 0, right = nums.length - 1;
        // 查找第一个与下标不相等的位置
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] != mid) {
                if (mid == 0 || nums[mid - 1] == mid - 1) {
                    return mid;
                }
                // 下标不相等，并且前一个也不相等，向左查找
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        // 没有查到，left 来到最后返回
        return left;
    }
}

// 时间复杂度：O(logN)，其中 N 为数组的长度。
// 空间复杂度：O(1) 。只需要常数空间存放若干变量。

```
## 剑指 Offer 04. 二维数组中的查找

[剑指 Offer 04. 二维数组中的查找](https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/)

在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

- 选取右上角的数字，如果等于 target 就返回，如果大于 target 剔除该列，如果小于 target 剔除该行。

```java
class Solution {
    public boolean findNumberIn2DArray(int[][] matrix, int target) {
        boolean res = false;
        int rows = matrix.length;
        if (matrix != null && rows > 0) {
            int row = 0;
            int column = matrix[0].length - 1;
            while (row < rows && column >= 0) {
                if (matrix[row][column] == target) {
                    res = true;
                    return res;
                } else if (matrix[row][column] > target) {
                    // 剔除列
                    column--;
                } else {
                    row++;
                }
            }
        }
        return res;
    }
}
// 时间复杂度：O(n+m)。访问到的下标的行最多增加 n 次，列最多减少 m 次，因此循环体最多执行 n + m 次。
// 空间复杂度：O(1)。

```
## 剑指 Offer 11. 旋转数组的最小数字

[剑指 Offer 11. 旋转数组的最小数字](https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/)

把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。

给你一个可能存在 重复 元素值的数组 numbers ，它原来是一个升序排列的数组，并按上述情形进行了一次旋转。请返回旋转数组的最小元素。例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一次旋转，该数组的最小值为1。  

- 性质：最小值右侧的元素一定小于区间最右侧的元素，最小值左侧的元素全部大于最小值右侧的元素。

```java
class Solution {
    public int minArray(int[] numbers) {
        int left = 0;
        int right = numbers.length - 1;
        // 相等就查到了
        while (left < right) {
            int mid = left + (right - left) / 2;
            // 与最右边的比较
            if (numbers[mid] > numbers[right]) {
                // 大于了肯定就不是最小值了
                left = mid + 1;
            } else if (numbers[mid] < numbers[right]) {
                // 小于最右边可能是最小值
                right = mid;
            } else {
                // 有重复的值，就循环减小
                right--;
            }
        }
        return numbers[left];
    }
}

// 时间复杂度：平均O(logN)，最坏是元素都是重复的，O(N)，最右边的下标一直减减
// 空间复杂度：O(1)。
```
## 剑指 Offer 50. 第一个只出现一次的字符

[剑指 Offer 50. 第一个只出现一次的字符](https://leetcode-cn.com/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/)

在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。

```java
// 哈希表
class Solution {
    public char firstUniqChar(String s) {
        char[] chs = s.toCharArray();
        HashMap<Character, Integer> map = new HashMap<>();
        
        for (int i = 0; i < chs.length; i++) {
            map.put(chs[i], map.getOrDefault(chs[i], 0) + 1);
        }

        for (int i = 0; i < chs.length; i++) {
            if (map.get(chs[i]) == 1) {
                return chs[i];
            }
        }
        return ' ';
    }
}
// 时间复杂度：O(N)，其中 N 是字符串 s 的长度。我们需要进行两次遍历。
// 空间复杂度：O(∣Σ∣)，其中 Σ 是字符集，在本题中 s 只包含小写字母，因此∣Σ∣≤26。我们需要 O(∣Σ∣) 的空间存储哈希映射。

// 数组
class Solution {
    public char firstUniqChar(String s) {
        int n;
        if ((n = s.length()) == 0) {
            return ' ';
        }
        // 只包含小写字母
        int[] counter = new int[26];
        for (int i = 0; i < n; i++) {
            int index = s.charAt(i) - 'a';
            counter[index]++;
        }
        for (int i = 0; i < n; i++) {
            int index = s.charAt(i) - 'a';
            if (counter[index] == 1) {
                return s.charAt(i);
            }
        }
        return ' ';
    }
}
// 时间复杂度：O(N)
// 空间复杂度：O(N)
```
## 剑指 Offer 32 - I. 从上到下打印二叉树

[剑指 Offer 32 - I. 从上到下打印二叉树](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-lcof/)

从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public int[] levelOrder(TreeNode root) {
        if (root == null) {
            return new int[0];
        }
        // 使用队列
        Queue<TreeNode> queue = new LinkedList<>();
        ArrayList<Integer> list = new ArrayList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            TreeNode cur = queue.poll();
            list.add(cur.val);
            if (cur.left != null) {
                queue.add(cur.left);
            }
            if (cur.right != null) {
                queue.add(cur.right);
            }
        }
        int[] res = new int[list.size()];
        int i = 0;
        for (Integer e : list) {
            res[i++] = e;
        }
        return res;
    }
}

// 时间复杂度：O(N)，N为二叉树节点的数量
// 空间复杂度：O(N)，最差情况下，即当树为平衡二叉树时，最多有 N/2个树节点同时在 queue 中，使用 O(N) 大小的额外空间。
```
## 剑指 Offer 32 - II. 从上到下打印二叉树 II
 [剑指 Offer 32 - II. 从上到下打印二叉树 II](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof/)

从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        Queue<TreeNode> queue = new LinkedList<>();
        List<List<Integer>> res = new ArrayList<>();

        if (root == null) {
            return res;
        }
        
        queue.add(root);
        while (!queue.isEmpty()) {
            // 新申请一个 list 存放每层的结果
            List<Integer> list = new ArrayList<>();
            int size = queue.size();
            while (size-- > 0) {
                TreeNode cur = queue.poll();
                list.add(cur.val);
                if (cur.left != null) {
                    queue.add(cur.left);
                }
                if (cur.right != null) {
                    queue.add(cur.right);
                }
            }
            res.add(list);
        } 
        return res;
    }
}

// 时间复杂度：O(N)
// 空间复杂度：O(N)
```
## 剑指 Offer 32 - III. 从上到下打印二叉树 III

[剑指 Offer 32 - III. 从上到下打印二叉树 III](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof/)

请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        Queue<TreeNode> queue = new LinkedList<>();
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) {
            return res;
        }
        queue.add(root);
        while (!queue.isEmpty()) {
            LinkedList<Integer> list = new LinkedList<>();
            int size = queue.size();
            while (size-- > 0) {
                TreeNode cur = queue.poll();
                // 通过 res 的大小判断来到了哪一层
                if ((res.size() & 1) == 1) {
                    // 当前添加的数字在偶数层，添加到头部
                    list.addFirst(cur.val);
                } else {
                    list.addLast(cur.val);
                }
                if (cur.left != null) {
                    queue.add(cur.left);
                }
                if (cur.right != null) {
                    queue.add(cur.right);
                }
            }
            res.add(list);
        }
        return res;
    }
}

// 时间复杂度：O(N)
// 空间复杂度：O(N)
```
## 剑指 Offer 26. 树的子结构

[剑指 Offer 26. 树的子结构](https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/)

输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)。B是A的子结构， 即 A中有出现和B相同的结构和节点值。

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */

class Solution {
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        // 遍历 root二叉树，判断每个节点与 subRoot 二叉树是否相同
        if (root == null) {
            return false;
        }
        // return isSame(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
        if (isSame(root, subRoot)) {
            return true;
        }
        return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
    }

    private boolean isSame(TreeNode p, TreeNode q) {
        if (p == null && q == null) {
            return true;
        }
        if (q == null || p == null || p.val != q.val) {
            return false;
        }
        return isSame(p.left, q.left) && isSame(p.right, q.right);
    }
}

class Solution {
    public boolean isSubStructure(TreeNode A, TreeNode B) {
        if (A == null || B == null) {
            return false;
        }
        return isSame(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B);
    }

    /**根节点相同，判断A中以该节点是否与B中的一样*/
    public boolean isSame(TreeNode A, TreeNode B) {
        // base case，顺序不能换，先判断A的为空就会漏掉正好B叶节点也为空的情况
        if (B == null) {
            return true;
        }
        if (A == null || A.val != B.val) {
            return false;
        }

        return isSame(A.left, B.left) && isSame(A.right, B.right);
    }
}
// 时间复杂度 O(MN)： 其中 M,N 分别为树 A 和 树 B 的节点数量；先序遍历树 A 占用 O(M) ，调用 isSame(A, B) 判断占用 O(N) 。
// 空间复杂度 O(M) ： 当树 A 和树 B 都退化为链表时，递归调用深度最大。
```
## 剑指 Offer 27. 二叉树的镜

[剑指 Offer 27. 二叉树的镜像](https://leetcode-cn.com/problems/er-cha-shu-de-jing-xiang-lcof/)

请完成一个函数，输入一个二叉树，该函数输出它的镜像。

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public TreeNode mirrorTree(TreeNode root) {
        if (root == null) {
            return null;
        }
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;
        mirrorTree(root.left);
        mirrorTree(root.right);
        return root;
    }
}

// 时间复杂度：O(N)，N 是二叉树节点的数量
// 空间复杂度：O(N)，最坏的情况下，树形成链状。平均情况下二叉树的高度与节点个数为对数关系 O(logN)
```
## 剑指 Offer 28. 对称的二叉树

[剑指 Offer 28. 对称的二叉树](https://leetcode-cn.com/problems/dui-cheng-de-er-cha-shu-lcof/)

请实现一个函数，用来判断一棵二叉树是不是对称的。如果一棵二叉树和它的镜像一样，那么它是对称的。

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public boolean isSymmetric(TreeNode root) {
        if (root == null) {
            return true;
        }
        return isSymmetric(root.left, root.right);
    }

    /** 判断左右子树的节点值是否对称 */
    public boolean isSymmetric(TreeNode L, TreeNode R) {
        // L 和 R 同时越过叶节点
        if (L == null && R == null) {
            return true;
        }
        // L 和 R 只有一个越过叶节点或者左右的值不相等，不对称
        if (L == null || R == null || L.val != R.val) {
            return false;
        }
        return isSymmetric(L.left, R.right) && isSymmetric(L.right, R.left);
    }
}

// 时间复杂度：O(N)，N 是二叉树的节点的数量
// 空间复杂度：O(N)，子树退化成链表的时候。
```
## 剑指 Offer 10- I. 斐波那契数列

[剑指 Offer 10- I. 斐波那契数列](https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/)

写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项（即 F(N)）。斐波那契数列的定义如下：

F(0) = 0,   F(1) = 1
F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

```java
class Solution {
    public int fib(int n) {
        int a = 0, b = 1;
        for (int i = 0; i < n; i++) {
            int temp = (a + b) % 1000000007;
            b = a;
            a = temp;
        }
        return a;
    }
}
// 时间复杂度：O(N)
// 空间复杂度：O(1)
```
## 剑指 Offer 10- II. 青蛙跳台阶问题

[剑指 Offer 10- II. 青蛙跳台阶问题](https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/)

一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

```JAVA
class Solution {
    public int numWays(int n) {
        // 斐波那契数列
        int pre = 0, cur = 1;
        for (int i = 0; i < n; i++) {
            int tmp = (pre + cur) % 1000000007;
            pre = cur;
            cur = tmp;
        }
		return cur;
    }
}
// 时间复杂度：O(N)
// 空间复杂度：O(1)
```
## 剑指 Offer 63. 股票的最大利润

[剑指 Offer 63. 股票的最大利润](https://leetcode-cn.com/problems/gu-piao-de-zui-da-li-run-lcof/)

假设把某股票的价格按照时间先后顺序存储在数组中，请问买卖该股票一次可能获得的最大利润是多少？

> 输入: [7,1,5,3,6,4]	输出: 5
> **解释:** 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。

```java
class Solution {
    public int maxProfit(int[] prices) {
        int len = prices.length;
        if (len < 2) {
            return 0;
        }
        // 将最小的数存下来
        int min = prices[0];
        // 默认最大0
        int max = 0;
        for (int i = 1; i < len; i++) {
            min = prices[i] < min ? prices[i] : min;
            max = prices[i] - min > max ? prices[i] - min : max;
        }
        return max;
    }
}

// 贪心，时间复杂度：O(N)
// 空间复杂度：O(1)
```
## 剑指 Offer 42. 连续子数组的最大和
    
[剑指 Offer 42. 连续子数组的最大和](https://leetcode-cn.com/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/)

输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。

要求时间复杂度为O(n)。

```java
class Solution {
    public int maxSubArray(int[] nums) {
        int res = nums[0], cur = nums[0];
        for (int i = 1; i < nums.length; i++) {
            cur = Math.max(cur + nums[i], nums[i]);
            res = cur >= res ? cur : res;
        } 
        return res;
    }
}

// 时间复杂度：O(N)
// 空间复杂度：O(1)
```

## 剑指 Offer 47. 礼物的最大价值

[剑指 Offer 47. 礼物的最大价值](https://leetcode-cn.com/problems/li-wu-de-zui-da-jie-zhi-lcof/)

在一个 m*n 的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于 0）。你可以从棋盘的左上角开始拿格子里的礼物，并每次向右或者向下移动一格、直到到达棋盘的右下角。给定一个棋盘及其上面的礼物的价值，请计算你最多能拿到多少价值的礼物？

```JAVA
class Solution {
    public int maxValue(int[][] grid) {
        int row = grid.length;
        int col = grid[0].length;
        // 多开一层，减少了边界条件的设置
        int[][] dp = new int[row + 1][col + 1];
        for (int i = 1; i <= row; i++) {
            for (int j = 1; j <= col; j++) {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) + grid[i - 1][j - 1];
            }
        }
        return dp[row][col];
    }
}

// 时间复杂度：O(MN)
// 空间复杂度：O(MN)

class Solution {
    public int maxValue(int[][] grid) {
        int col = grid[0].length;
        int row = grid.length;
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                if (i == 0 && j == 0) {
                    continue;
                } else if (i == 0) {
                    grid[i][j] += grid[i][j - 1];
                } else if (j == 0) {
                    grid[i][j] += grid[i - 1][j];
                } else {
                    grid[i][j] += Math.max(grid[i][j - 1], grid[i - 1][j]);
                }
            }
        }
        return grid[row - 1][col - 1];
    }
}
// 时间复杂度：O(MN)
// 空间复杂度：O(1)，在原数组上进行修改
```

## 剑指 Offer 46. 把数字翻译成字符串

[剑指 Offer 46. 把数字翻译成字符串](https://leetcode-cn.com/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/)

给定一个数字，我们按照如下规则把它翻译为字符串：0 翻译成 “a” ，1 翻译成 “b”，……，11 翻译成 “l”，……，25 翻译成 “z”。一个数字可能有多个翻译。请编程实现一个函数，用来计算一个数字有多少种不同的翻译方法。

```JAVA
// 青蛙跳台阶加判断
class Solution {
    // 递归
    public int translateNum(int num) {
        return process(String.valueOf(num));
    }

    public int process(String str) {
        int len = str.length();
        // base case
        if (len < 2) {
            return 1;
        }
        int pre = Integer.parseInt(str.substring(0, 2));
        return pre > 25 || pre < 10 ? process(str.substring(1)) : 
            process(str.substring(1)) + process(str.substring(2));
    }
}
// 时间复杂度：O(2^N)
// 空间复杂度：O(N)

// 动态规划
class Solution {
    public int translateNum(int num) {
        String str = String.valueOf(num);

        // int[] dp = new int[str.length() + 1];
        // dp[0] = 1;
        // dp[1] = 1;

        // 当字符串前两位在10 - 25之间时，推前两个相加得pre = 1
        int pre = 1;
        int cur = 1;

        for (int i = 2; i <= str.length(); i++) {
            String tmp = str.substring(i - 2, i);

            // if (tmp.compareTo("25") <= 0 && tmp.compareTo("10") >= 0) {
            //     dp[i] = dp[i - 1] + dp[i - 2];
            // } else {
            //     dp[i] = dp[i - 1];
            // }

            int temp = tmp.compareTo("25") <= 0 && tmp.compareTo("10") >= 0 ? pre + cur : cur;
            pre = cur;
            cur = temp;

        }
        // return dp[str.length()];
        return cur;
    }
}

// 时间复杂度 O(N)： N 为字符串 s 的长度（即数字 num 的位数），其决定了循环次数。
// 空间复杂度 O(N)： 字符串 s 使用 O(N) 大小的额外空间。
```
## 剑指 Offer 48. 最长不含重复字符的子字符串

[剑指 Offer 48. 最长不含重复字符的子字符串](https://leetcode-cn.com/problems/zui-chang-bu-han-zhong-fu-zi-fu-de-zi-zi-fu-chuan-lcof/)

请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。

```java
// 滑动窗口 + 哈希表
class Solution {
    public int lengthOfLongestSubString(String s) {
        int max = 0;
        // 空间换时间
        int[] arr = new int[128];
        // 记录有重复字母的下一个
        int left = 0;
        for (int i = 0; i < s.length(); i++) {
            arr[s.charAt(i)]++;
            while (arr[s.charAt(i)] > 1) {
                // 来到该重复字符第一次出现的下一位
                arr[s.charAt(left++)]--;
            }
            max = Math.max(max, i - left + 1);
        }
        return max;
    }
}

// 时间复杂度：O(N)
// 空间复杂度：O(1)
```
## 剑指 Offer 18. 删除链表的节点

[剑指 Offer 18. 删除链表的节点](https://leetcode-cn.com/problems/shan-chu-lian-biao-de-jie-dian-lcof/)

给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。

返回删除后的链表的头节点。

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode deleteNode(ListNode head, int val) {
        // 虚拟头节点
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        // 一个指针找到要删除节点的前一个节点
        ListNode pre = dummy;
        while (pre.next != null && pre.next.val != val) {
            pre = pre.next;
        }
        // 删除头节点时这里处理到
        pre.next = pre.next == null ? null : pre.next.next;
        return dummy.next;
    }
}

// 时间复杂度：O(N)
// 空间复杂度：O(1)
```
## 剑指 Offer 22. 链表中倒数第k个节点

[剑指 Offer 22. 链表中倒数第k个节点](https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/)

输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。

```java
// 定义快慢指针，都指向头节点，fast 指针先走 k 步，slow 再同时走，fast指向 null，slow 就是倒数第k个节点
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode getKthFromEnd(ListNode head, int k) {
        ListNode slow = head, fast = head;
        while (k-- > 0) {
            fast = fast.next;
        }
        while(fast != null) {
            slow = slow.next;
            fast = fast.next;
        } 
        return slow;
    }
}
```
## 剑指 Offer 25. 合并两个排序的链表

[剑指 Offer 25. 合并两个排序的链表](https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/)

输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。

```java
// 遍历两个链表，归并插入新链表
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        while (l1 != null && l2 != null) {
            if (l1.val >= l2.val) {
                cur.next = l2;
                l2 = l2.next;
            } else {
                cur.next = l1;
                l1 = l1.next;
            }
            cur = cur.next;
        }
        // 两个链表其中一个为空就结束上述循环，将不为空的链表接在后面
        cur.next = l1 == null ? l2 : l1;
        return dummy.next;
    }
}

// 时间复杂度：O(M + N)，两个链表的长度
// 空间复杂度：O(1)
```
## 剑指 Offer 52. 两个链表的第一个公共节点

[剑指 Offer 52. 两个链表的第一个公共节点](https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/)

输入两个链表，找出它们的第一个公共节点。

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode cur1 = headA, cur2 = headB;
        while (cur1 != cur2) {
            cur1 = cur1 == null ? headB : cur1.next;
            cur2 = cur2 == null ? headA : cur2.next;
        }
        return cur1;
    }
}

// 时间复杂度：O(M + N)
// 空间复杂度：O(1)
```
## 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面

[剑指 Offer 21. 调整数组顺序使奇数位于偶数前面](https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/)

输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数在数组的前半部分，所有偶数在数组的后半部分。

```java
class Solution {
    public int[] exchange(int[] nums) {
        // 定义两个指针
        int begin = 0, end = nums.length - 1;
        while (begin < end) {
            while (begin < end && (nums[begin] & 1) != 0) {
                begin++;
            }
            while (begin < end && (nums[end] & 1) == 0) {
                end--;
            }
            int temp = nums[begin];
            nums[begin] = nums[end];
            nums[end] = temp;
        }
        return nums;
    }
}

// 时间复杂度 O(N)：N 为数组 nums 长度，双指针共同遍历整个数组。
// 空间复杂度 O(1)：双指针使用常数大小的额外空间。
```
## 剑指 Offer 57. 和为s的两个数字

[剑指 Offer 57. 和为s的两个数字](https://leetcode-cn.com/problems/he-wei-sde-liang-ge-shu-zi-lcof/)

输入一个递增排序的数组和一个数字s，在数组中查找两个数，使得它们的和正好是s。如果有多对数字的和等于s，则输出任意一对即可。

```java
// 双指针，如果和比 target 大，右边的指针向前，和比 target 的小，前面的指针向后。
class Solution {
    public int[] twoSum(int[] nums, int target) {
        int i = 0, j = nums.length - 1;
        while (i < j) {
            int sum = nums[i] + nums[j];
            if (sum == target) {
                return new int[]{nums[i], nums[j]};
            } else if (sum > target) {
                j--;
            } else {
                i++;
            }
        }
        return new int[0];
    }
}

// 时间复杂度 O(N)：N 为数组 nums 长度，双指针共同遍历整个数组。
// 空间复杂度 O(1)：双指针使用常数大小的额外空间。
```
## 剑指 Offer 57 - II. 和为s的连续正数序列

[剑指 Offer 57 - II. 和为s的连续正数序列](https://leetcode-cn.com/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/)

输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。

序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。

```java
class Solution {
    public int[][] findContinuousSequence(int target) {
        List<int[]> list = new ArrayList<>();
		// 使用双指针、滑动窗口
        int l = 1, r = 2;
        while (l < r) {
            int sum = (l + r) * (r - l + 1) >> 1;
            if (target == sum) {
                int[] res = new int[r - l + 1];
                for (int i = 0; i < res.length; i++) {
                    res[i] = l + i;
                }
                list.add(res);
                // 找到一组，继续找下一组
                l++;
            } else if (target > sum) {
                r++;
            } else {
                l++;
            }
        }
        
        int[][] res = new int[list.size()][];
        for (int i = 0; i < res.length; i++) {
        	res[i] = list.get(i);
        }
        return res;
        // return list.toArray(new int[list.size()][]);
    }
}

// 时间复杂度：O(target)，因为两个指针只增不减，最多移动到 target/2，因此时间复杂度为O(target)
// 空间复杂度：O(1)，除了答案数组，其他只用了常数空间存放变量
```

## 剑指 Offer 58 - I. 翻转单词顺序

[剑指 Offer 58 - I. 翻转单词顺序](https://leetcode-cn.com/problems/fan-zhuan-dan-ci-shun-xu-lcof/)

输入一个英文句子，翻转句子中单词的顺序，但单词内字符的顺序不变。为简单起见，标点符号和普通字母一样处理。例如输入字符串"I am a student. "，则输出"student. a am I"。

```java
// 利用双指针
class Solution {// 快
    public String reverseWords(String s) {
        // 源字符数组
        char[] pre = s.toCharArray();
        // 新字符数组
        char[] res = new char[pre.length + 1];
        int index = 0;
        // 从后向前进行遍历
        int i = pre.length - 1;
        while (i >= 0) {
            // 去掉后面的空格
            while (i >= 0 && pre[i] == ' ') i--;

            // 记录当前字符串的最后字符的下标
            int end = i;
            // 为了找到字符串第一个字符下标
            while (i >= 0 && pre[i] != ' ') i--;

            for (int j = i + 1; j <= end; j++) {
                res[index++] = pre[j];
                if (j == end) {
                    res[index++] = ' ';
                }
            }

        }
        if (index == 0) {
            return "";
        } else {
            return new String(res, 0, index - 1);
        }
    }
}
// 时间复杂度 O(N) 
// 空间复杂度 O(N)


class Solution {// 慢
    public String reverseWords(String s) {
        // 去掉首尾空格
        s = s.trim();
        int i = s.length() - 1, j = i;
        StringBuilder sb = new StringBuilder();
        while (i >= 0) {
            while (i >= 0 && s.charAt(i) != ' ') {
                i--;
            }
            sb.append(s.substring(i + 1, j + 1) + " ");
            // 跳过单词间的空格
            while (i >= 0 && s.charAt(i) == ' ') {
                i--;
            }
            // 指向下个单词的尾字符
            j = i;
        }
        return sb.toString().trim();
    }
}

// 时间复杂度 O(N) ： 其中 N 为字符串 s 的长度，线性遍历字符串。
// 空间复杂度 O(N) ： 新建的StringBuilder 中的字符串总长度 ≤ N ，占用 O(N) 大小的额外空间。
```

## 剑指 Offer 12. 矩阵中的路径

[剑指 Offer 12. 矩阵中的路径](https://leetcode-cn.com/problems/ju-zhen-zhong-de-lu-jing-lcof/)

给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

```java
class Solution {
    public boolean exist(char[][] board, String word) {
        char[] chs = word.toCharArray();
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[0].length; j++) {
                if (dfs(board, chs, i, j, 0)) {
                    return true;
                }
            }
        }
        return false;
    }

    /** 回溯法，i,j 当前 board 中的位置，index 是要找的 word 字符的索引 */
    public boolean dfs(char[][] board, char[] word, int i, int j, int index) {
        int row = board.length, col = board[0].length;
        // base case
        if (i < 0 || i == row || j < 0 || j == col || board[i][j] != word[index]) {
            return false;
        }
        if (index == word.length - 1) {
            return true;
        }
        // 将查询到的 word 字符在 board 中置空，防止重复查
        board[i][j] = '\0';
        boolean res = dfs(board, word, i + 1, j, index + 1) ||
                      dfs(board, word, i - 1, j, index + 1) ||
                      dfs(board, word, i, j + 1, index + 1) ||
                      dfs(board, word, i, j - 1, index + 1);  
        // 将 board 中置空的位置填回去，别的路径需要查
        board[i][j] = word[index];
        return res;
    }
}
// 时间复杂度 O(3^K MN)： 最差情况下，需要遍历矩阵中长度为 K 字符串的所有方案，时间复杂度为 O(3^K)；矩阵中共有 MN 个起点，时间复杂度为 O(MN)。方案数计算：设字符串长度为 K ，搜索中每个字符有上、下、左、右四个方向可以选择，舍弃回头（上个字符）的方向，剩下 3 种选择，因此方案数的复杂度为 O(3^K) 
// 空间复杂度 O(K)： 搜索过程中的递归深度不超过 K ，因此系统因函数调用累计使用的栈空间占用O(K) （因为函数返回后，系统调用的栈空间会释放）。最坏情况下 K = MN ，递归深度为 MN ，此时系统栈使用 O(MN) 的额外空间。
```
## 剑指 Offer 13. 机器人的运动范围

[剑指 Offer 13. 机器人的运动范围](https://leetcode-cn.com/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/)

地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于k的格子。例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子？

```java
// 回溯法
class Solution {

    private boolean[][] visited;

    public int movingCount(int m, int n, int k) {
        visited = new boolean[m][n];
        return dfs(m, n, 0, 0, k);
    }

    public int dfs(int m, int n, int i, int j, int k) {
        // base case
        if (i < 0 || i == m || j < 0 || j == n || visited[i][j] || cal(i) + cal(j) > k) {
            return 0;
        }
        int count = 0;
        visited[i][j] = true;
        count = 1 + dfs(m, n, i + 1, j, k) +
                    dfs(m, n, i - 1, j, k) + 
                    dfs(m, n, i, j + 1, k) +
                    dfs(m, n, i, j - 1, k);            
        return count;
    }

    public int cal(int x) {
        int res = 0;
        while (x != 0) {
            res += x % 10;
            x /= 10;
        } 
        return res;
    }
}

// 时间复杂度：O(MN)
// 空间复杂度：O(MN)
```
## 剑指 Offer 34. 二叉树中和为某一值的路径

[剑指 Offer 34. 二叉树中和为某一值的路径](https://leetcode-cn.com/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/)

给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。叶子节点 是指没有子节点的节点。

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    
    private List<List<Integer>> res;
    private List<Integer> path;

    public List<List<Integer>> pathSum(TreeNode root, int target) {
        res = new ArrayList<>();
        path = new ArrayList<>();
        // 先序遍历，路径记录
        dfs(root, target);
        return res;
    }

    private void dfs(TreeNode root, int target) {
        if (root == null) {
            return;
        }
        path.add(root.val);
        target -= root.val;
        // 到达叶节点并且符合条件
        if (target == 0 && root.left == null && root.right == null) {
            res.add(new ArrayList<>(path));
        }
        dfs(root.left, target);
        dfs(root.right, target);

        // 回溯的时候将不符合条件的从 path 中移除
        path.remove(path.size() - 1);
    }
}

// 时间复杂度 O(N) ： N 为二叉树的节点数，先序遍历需要遍历所有节点。
// 空间复杂度 O(N) ： 最差情况下，即树退化为链表时，path 存储所有树节点，使用 O(N) 额外空间。
```

## 剑指 Offer 36. 二叉搜索树与双向链表

[剑指 Offer 36. 二叉搜索树与双向链表](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-yu-shuang-xiang-lian-biao-lcof/)

输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的循环双向链表。要求不能创建任何新的节点，只能调整树中节点指针的指向。

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public Node left;
    public Node right;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val,Node _left,Node _right) {
        val = _val;
        left = _left;
        right = _right;
    }
};
*/
class Solution {
    /** 头节点，中间临时保存前一个节点 */
    Node head, pre;
    public Node treeToDoublyList(Node root) {
        if (root == null) {
            return null;
        }
        dfs(root);
        // 中序遍历完以后 head->头节点 pre->最后节点
        head.left = pre;
        pre.right = head;
        return head;
    }

    /** 搜索二叉树中序遍历就是递增的 */
    private void dfs(Node cur) {
        if (cur == null) {
            return;
        }
        dfs(cur.left);
        if (head == null) {
            // 第一次将 head 节点指向 cur
            head = cur;
        } else {
            // 往后将前一个节点的 right 指向当前节点
            pre.right = cur;
        }
        cur.left = pre;
        pre = cur;
        dfs(cur.right);
    }
}
// 时间复杂度：O(N)，N 为二叉树的节点数，中序遍历需要访问所有节点。
// 空间复杂度 O(N) ： 最差情况下，即树退化为链表时，递归深度达到 N，系统使用 O(N) 栈空间。
```
## 剑指 Offer 54. 二叉搜索树的第k大节点

[剑指 Offer 54. 二叉搜索树的第k大节点](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/)

给定一棵二叉搜索树，请找出其中第 `k` 大的节点的值。

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    int res,cur;
    public int kthLargest(TreeNode root, int k) {
        cur = k;
        inorder(root);
        return res;
    }

    private void inorder(TreeNode root) {
        if (root == null) {
            return; 
        }
        inorder(root.right);
        cur--;
        if (cur == 0) {
            res = root.val;
            return;
        }
        inorder(root.left);
    }
}

// 时间复杂度：O(N)，N 为二叉树的节点数，倒序遍历需要访问所有节点。
// 空间复杂度 O(N) ： 最差情况下，即树退化为链表时，递归深度达到 N，系统使用 O(N) 栈空间。
```

## 剑指 Offer 45. 把数组排成最小的数

[剑指 Offer 45. 把数组排成最小的数](https://leetcode-cn.com/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/)

输入一个非负整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。

```java
class Solution {
    public String minNumber(int[] nums) {
        String[] strs = new String[nums.length];
        for (int i = 0; i < nums.length; i++) {
            strs[i] = String.valueOf(nums[i]);
        }
        quickSort(strs, 0, strs.length - 1);
        StringBuilder res = new StringBuilder();
        for (String s : strs) {
            res.append(s);
        }
        return res.toString();
    }

    /** 定制排序 */
    private void quickSort(String[] strs, int begin, int end) {
        // base case
        if (begin >= end) {
            return;
        }
        // 两个指针
        int l = begin, r = end;
        String base = strs[begin], tmp;

        while (l < r) {
            while ((strs[r] + strs[begin]).compareTo(strs[begin] + strs[r]) >= 0 && l < r) {
                r--;
            }
            while ((strs[l] + strs[begin]).compareTo(strs[begin] + strs[l]) <= 0 && l < r) {
                l++;
            }
            tmp = strs[l];
            strs[l] = strs[r];
            strs[r] = tmp;
        }
        // 将基准数交换到 l 位置
        strs[begin] = strs[l];
        strs[l] = base;
        quickSort(strs, begin, l - 1);
        quickSort(strs, l + 1, end);
    }
}

// 时间复杂度 O(NlogN) ： N 为最终返回值的字符数量（ strs 列表的长度 ≤ N ）；使用快排或内置函数的平均时间复杂度为 O(NlogN) ，最差为 O(N^2)
// 空间复杂度 O(N) ： 字符串列表 strs 占用线性大小的额外空间。
```
## 剑指 Offer 61. 扑克牌中的顺子

[剑指 Offer 61. 扑克牌中的顺子](https://leetcode-cn.com/problems/bu-ke-pai-zhong-de-shun-zi-lcof/)

从若干副扑克牌中随机抽 5 张牌，判断是不是一个顺子，即这5张牌是不是连续的。2～10为数字本身，A为1，J为11，Q为12，K为13，而大、小王为 0 ，可以看成任意数字。A 不能视为 14。

```java
class Solution {
    public boolean isStraight(int[] nums) {
        // 除了两个0，有重复的或者max - min >= 5 就是 不符合条件的
        boolean[] repeat = new boolean[14];
        int max = 0, min = 14;
        for (int num : nums) {
            if (num == 0) {
                continue;
            }
            if (repeat[num]) {
                return false;
            }
            repeat[num] = true;
            max = Math.max(max, num);
            min = Math.min(min, num);
        }
        return max - min < 5;
    }
}

// 时间复杂度：O(N) = O(5) = O(1)，遍历整个数组，数组的大小是常数级别的
// 空间复杂度：O(N) = O(14) = O(1)，使用额外的存储空间
```
## 剑指 Offer 40. 最小的k个数

[剑指 Offer 40. 最小的k个数](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/)

输入整数数组 `arr` ，找出其中最小的 `k` 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。

```java
class Solution {
    public int[] getLeastNumbers(int[] arr, int k) {
        if (k >= arr.length) {
            return arr;
        }
        return quickSort(arr, k, 0, arr.length - 1);
    }

    public int[] quickSort(int[] arr, int k, int begin, int end) {
        int l = begin, r = end;
        int base = arr[begin];
        while (l < r) {
            while (l < r && arr[r] >= base) {
                r--;
            }
            while (l < r && arr[l] <= base) {
                l++;
            }
            swap(arr, l, r);
        }
        swap(arr, l, begin);
        // 根据下标索引进行优化，不用考虑输出数据的顺序
        // 第 k + 1 小的数字在左子数组中
        if (l > k) {
            quickSort(arr, k, begin, l - 1);
        }
        if (l < k) {
            quickSort(arr, k, l + 1, end);
        }
        // l == k
        return Arrays.copyOf(arr, k);
    }

    public void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

// 时间复杂度 O(N) ： 其中 N 为数组元素数量；对于长度为 N 的数组执行哨兵划分操作的时间复杂度为 O(N)。
// 空间复杂度 O(logN) ： 划分函数的平均递归深度为 O(logN) 。
```
## 剑指 Offer 55 - I. 二叉树的深度

[剑指 Offer 55 - I. 二叉树的深度](https://leetcode-cn.com/problems/er-cha-shu-de-shen-du-lcof/)

输入一棵二叉树的根节点，求该树的深度。从根节点到叶节点依次经过的节点（含根、叶节点）形成树的一条路径，最长路径的长度为树的深度。

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) {
        	return 0;
        }
        return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
    }
}
// 时间复杂度：O(N)，N 是树的所有节点
// 空间复杂度：O(N)，当树为链表的时候，递归的深度可达到 N

// BFS
class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) {
        	return 0;
    	}
        Queue<TreeNode> queue = new LinkedList<>();
        int depth = 0;
        queue.add(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            while (size-- > 0) {
                TreeNode cur = queue.poll();
                if (cur.left != null) {
                    queue.add(cur.left);
                }
                if (cur.right != null) {
                    queue.add(cur.right);
                }
            }
            depth++;
        }
        return depth;
    }
}

// 时间复杂度：O(N)，N 为树的所有节点
// 空间复杂度：O(N)，当树平衡的时候，需要存储 N / 2 的节点
```
## 剑指 Offer 55 - II. 平衡二叉树

[剑指 Offer 55 - II. 平衡二叉树](https://leetcode-cn.com/problems/ping-heng-er-cha-shu-lcof/)

输入一棵二叉树的根节点，判断该树是不是平衡二叉树。如果某二叉树中任意节点的左右子树的深度相差不超过1，那么它就是一棵平衡二叉树。

```java
// 从底至顶，后序遍历 + 剪枝，最优
class Solution {
    public boolean isBalanced(TreeNode root) {
        return height(root) != -1;
    }
    
    public int height(TreeNode root) {
        if (root == null) {
            return 0;
        }
        int left = height(root.left);
        if (left == -1) {
            return -1;
        }
        int right = height(root.right);
        if (right == -1) {
            return -1;
        }
        return Math.abs(left - right) < 2 ? Math.max(left, right) + 1 : -1; 
    }
}
// 时间复杂度 O(N)， N 为树的节点数；最差情况下，需要递归遍历树的所有节点。
// 空间复杂度 O(N)，最差情况下（树退化为链表时），系统递归需要使用 O(N) 的栈空间

// 自顶向下的递归 时间复杂度 O(N^2) 空间复杂度 O(N)
class Solution {
    public boolean isBalanced(TreeNode root) {
        if (root == null) {
            return true;
        }
        return isBalanced(root.left) && isBalanced(root.right) 
            	&& Math.abs(depth(root.left) - depth(root.right)) <= 1;
    }
    
    public int depth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        return Math.max(depth(root.left), depth(root.right)) + 1;
    }
}
```
## 剑指 Offer 41. 数据流中的中位数

[剑指 Offer 41. 数据流中的中位数](https://leetcode-cn.com/problems/shu-ju-liu-zhong-de-zhong-wei-shu-lcof/)

如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。

```java
class MedianFinder {

    Queue<Integer> minHeap, maxHeap;

    /** initialize your data structure here. */
    public MedianFinder() {
        // 创建小顶堆存储较大的一半，大顶堆存储较小的一半
        minHeap = new PriorityQueue<>();
        maxHeap = new PriorityQueue<>((x, y) -> (y - x));
    }
    
    public void addNum(int num) {
        if (minHeap.size() == maxHeap.size()) {
            maxHeap.offer(num);
            minHeap.offer(maxHeap.poll());
        } else {
            minHeap.offer(num);
            maxHeap.offer(minHeap.poll());
        }
    }
    
    public double findMedian() {
        return minHeap.size() == maxHeap.size() ? (minHeap.peek() + maxHeap.peek()) / 2.0 : 
                   minHeap.peek();
    }
}

// 时间复杂度：查找中位数是 O(1)，添加是 O(logN)
// 空间复杂度：O(N)，其中 N 为数据流中的元素数量
```
## 剑指 Offer 07. 重建二叉树

[剑指 Offer 07. 重建二叉树](https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof/)

输入某二叉树的前序遍历和中序遍历的结果，请构建该二叉树并返回其根节点。

假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    /** 存储中序遍历中根节点与索引 */ 
    HashMap<Integer, Integer> map = new HashMap<>();

    public TreeNode buildTree(int[] preorder, int[] inorder) {
        for (int i = 0; i < inorder.length; i++) {
            map.put(inorder[i], i);
        }
        return build(preorder, 0, 0, inorder.length - 1);
    }

    /** 参数：前序数组，根节点在前序数组索引，子树在中序数组的左边界，子树在中序数组中的右边界 */
    public TreeNode build(int[] preorder, int root, int left, int right) {
        if (left > right) {
            return null;
        }
        // 根节点在中序数组中的索引
        int i = map.get(preorder[root]);
        TreeNode node = new TreeNode(preorder[root]);
        node.left = build(preorder, root + 1, left, i - 1);
        // 根节点索引root + 左子树长度 i - left + 1
        node.right = build(preorder, i - left + root + 1, i + 1, right);
        // 回溯返回根节点
        return node;
    }
}
// 时间复杂度：O(N)，初始化 map，有一个循环；在递归建立节点的时候，搜索的时间复杂度是 O(1)，因此总的时间复杂度为 O(N)
// 空间复杂度：HashMap 占用 O(N) 的额外空间；当树退化为链表的时候，递归深度为 N， 占用栈帧空间为 O(N)
```
## 剑指 Offer 14- I. 剪绳子

[剑指 Offer 14- I. 剪绳子](https://leetcode-cn.com/problems/jian-sheng-zi-lcof/)

给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1），每段绳子的长度记为 k[0],k[1]...k[m-1] 。请问 k[0]*k[1]*...*k[m-1] 可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。 `2 <= n <= 58`

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/剪绳子.jpg)

```java
// 将绳子以长度为 3 等分，乘积最大，贪婪
class Solution {
    public int cuttingRope(int n) {
        if (n < 4) {
            return n - 1;
        }
        int ans = 1;
        while (n > 4) {
            ans *= 3;
            n -= 3;
        }
        return ans * n;
    }
}

class Solution {
    public int cuttingRope(int n) {
        if (n < 4) {
            return n - 1;
        }
        int a = n / 3;
        int b = n % 3;
        if (b == 0) {
            return (int) Math.pow(3, a);
        } 
        if (b == 1) {
            return (int) Math.pow(3, a - 1) * 4;
        }
        return (int) Math.pow(3, a) * 2;
    }
}
// 时间复杂度：O(1)，仅有求整、求余、次方运算
// 空间复杂度：O(1)

class Solution {
    public int cuttingRope(int n) {
        if (n < 4) {
            return n - 1;
        }
        // dynamic programming
        // dp[i] 将长度为 n 的绳子剪成若干段后的乘积
        int[] dp = new int[n + 1];
        dp[0] = 0;
        dp[1] = 1;
        dp[2] = 2;
        dp[3] = 3;
        int max = 0;

        for (int i = 4; i <= n; i++) {
            max = 0;
            for (int j = 1; j <= i/2; j++) {
                max = Math.max(max, dp[j] * dp[i - j]);
            }
            dp[i] = max;
        }
        return dp[n];
    }
}
// 时间复杂度：O(N^2)
// 空间复杂度：O(N)
```
## 剑指 Offer 14- II. 剪绳子 II

[剑指 Offer 14- II. 剪绳子 II](https://leetcode-cn.com/problems/jian-sheng-zi-ii-lcof/)

给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1），每段绳子的长度记为 k[0],k[1]...k[m - 1] 。请问 k[0]*k[1]*...*k[m - 1] 可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。 `2 <= n <= 1000`

```java
class Solution {
    public int cuttingRope(int n) {
        if (n < 4) {
            return n - 1;
        }
        long res = 1;
        int m = 1000000007;
        while (n > 4) {
            res = res * 3 % m;
            n -= 3;
        }
        return (int) (res * n % m);
    }
}
```

## 剑指 Offer 15. 二进制中1的个数

[剑指 Offer 15. 二进制中1的个数](https://leetcode-cn.com/problems/er-jin-zhi-zhong-1de-ge-shu-lcof/)

编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 的个数（也被称为 [汉明重量](http://en.wikipedia.org/wiki/Hamming_weight))。

```java
public class Solution {
    // you need to treat n as an unsigned value
    public int hammingWeight(int n) {
        int res = 0;
        while (n != 0) {
            // res += n & 1;
            // n >>>= 1;
            res++;
            // 消除最右边的一个1
            n &= (n - 1);
        }
        return res;
    }
}
// 时间复杂度：O(M)，M 为二进制中1的个数
// 空间复杂度：O(1)
```

##剑指 Offer 16. 数值的整数次方

[剑指 Offer 16. 数值的整数次方](https://leetcode-cn.com/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/)

实现 [pow(*x*, *n*)](https://www.cplusplus.com/reference/valarray/pow/) ，即计算 x 的 n 次幂函数（即，xn）。不得使用库函数，同时不需要考虑大数问题。

```java
class Solution {
    public double myPow(double x, int n) {
        if (n == 0) {
            return 1.0;
        }
        if (n == 1) {
            return x;
        }
        if (n == -1) {
            return 1.0 / x;
        }
        double half = myPow(x, n >> 1);
        if ((n & 1) == 1) {
            return half * half * x;
        } 
        return half * half;
    }
}
// 时间复杂度：O(logN)，开辟的栈空间log级别的
// 空间复杂度：O(logN)
```

## 剑指 Offer 17. 打印从1到最大的n位数

[剑指 Offer 17. 打印从1到最大的n位数](https://leetcode-cn.com/problems/da-yin-cong-1dao-zui-da-de-nwei-shu-lcof/)

输入数字 `n`，按顺序打印出从 1 到最大的 n 位十进制数。比如输入 3，则打印出 1、2、3 一直到最大的 3 位数 999。

```java
class Solution {
    public int[] printNumbers(int n) {
        int len = (int) (Math.pow(10, n) - 1);
        int[] res = new int[len];
        for (int i = 0; i < len; i++) {
            res[i] = i + 1;
        }
        return res;
    }
}
// 时间复杂度：O(10^n)
// 空间复杂度：O(1) (列表作为返回结果，不计入额外空间)

// 考虑 n 比较大，超过 int32 的范围，要进行大数打印
// n 位 0 ~ 9 的全排列
class Solution {
    int[] res;
    int count = 0, n;
    char[] num;
    public int[] printNumbers(int n) {
        if (n <= 0) {
            return new int[]{0};
        }
        this.n = n;
        num = new char[n];
        res = new int[(int) Math.pow(10, n) - 1];
        dfs(0);
        return res;
    }
    private void dfs(int x) {
        if (x == n) {
            String str = String.valueOf(num);
            int curNum = Integer.parseInt(str);
            // 去掉 0 
            if (curNum != 0) {
                res[count++] = curNum;
            }
            return;
        }
        // 从第 x 位开始添加数字，添加完添加下一位
        for (char i = '0'; i <= '9'; i++) {
            num[x] = i;
            dfs(x + 1);
        }
    }
}

// 时间复杂度：O(10^n)
// 空间复杂度：O(10^n)
```
## 剑指 Offer 19. 正则表达式匹配

[剑指 Offer 19. 正则表达式匹配](https://leetcode-cn.com/problems/zheng-ze-biao-da-shi-pi-pei-lcof/)

请实现一个函数用来匹配包含 ' . ' 和 ' * ' 的正则表达式。模式中的字符 ' . ' 表示任意一个字符，而 ' * ' 表示它前面的字符可以出现任意次（含0次）。在本题中，匹配是指字符串的所有字符匹配整个模式。

例如，字符串 "aaa" 与模式 "a.a" 和 "ab * ac * a" 匹配，但与 "aa.a" 和 "ab*a" 均不匹配。

```java
// dp[i][j] 代表 s[:i-1]与p[:j-1]是否可以匹配
class Solution {
    public boolean isMatch(String s, String p) {
        int m = s.length(), n = p.length();
        // p 为 null，判断 s 是否为空
        if (n == 0) {
            return m == 0;
        }
        boolean[][] dp = new boolean[m + 1][n + 1];
        // base case
        dp[0][0] = true;
        for (int j = 2; j <= n; j += 2) {
            if (p.charAt(j - 1) == '*') {
                dp[0][j] = dp[0][j - 2];
            }
        }
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (p.charAt(j - 1) == '*') {
                    // p[j - 2]* 出现多次
                    if (p.charAt(j - 2) == s.charAt(i - 1) || p.charAt(j - 2) == '.') {
                        dp[i][j] = dp[i - 1][j] || dp[i][j - 2];
                    } else {
                        // p[j - 2]* 出现0次
                        dp[i][j] = dp[i][j - 2];
                    }
                } else {
                    // p[j - 1] != '*'
                    if (s.charAt(i - 1) == p.charAt(j - 1) || p.charAt(j - 1) == '.') {
                        dp[i][j] = dp[i - 1][j - 1];
                    }
                }
            }
        }
        return dp[m][n];
    }
}

// 时间复杂度 O(MN) ： 其中 M,N 分别为 s 和 p 的长度，状态转移需遍历整个 dp 矩阵。
// 空间复杂度 O(MN) ： 状态矩阵 dp 使用 O(MN) 的额外空间。
```

## 剑指 Offer 20. 表示数值的字符串

[剑指 Offer 20. 表示数值的字符串](https://leetcode-cn.com/problems/biao-shi-shu-zhi-de-zi-fu-chuan-lcof/)

请实现一个函数用来判断字符串是否表示**数值**（包括整数和小数）。

```java
// [+|-]A[.[B]][E|eC]、.B[E|eC]
class Solution {
    public boolean isNumber(String s) {
        if (s == null || s.trim().length() == 0) {
            return false;
        }
        char[] chars = s.trim().toCharArray();
        boolean findNum = false, findDot = false, findE = false;
        for (int i = 0; i < chars.length; i++) {
            if (chars[i] == '+' || chars[i] == '-') {
                if (i != 0 && chars[i - 1] != 'E' && chars[i - 1] != 'e') {
                    return false;
                }
            } else if (chars[i] >= '0' && chars[i] <= '9') {
                findNum = true;
            } else if (chars[i] == '.') {
                if (findDot || findE) {
                    return false;
                }
                findDot = true;
            } else if (chars[i] == 'e' || chars[i] == 'E') {
                if (findE || !findNum) {
                    return false;
                }
                findE = true;
                // 为了确保 e 之后也能找到数
                findNum = false;
            } else {
                return false;
            }
        }
        return findNum;
    }
}

// 时间复杂度：O(N)，N 是字符串的长度
// 空间复杂度：O(N)，存储字符串的字符数组
```
## 剑指 Offer 29. 顺时针打印矩阵

[剑指 Offer 29. 顺时针打印矩阵](https://leetcode-cn.com/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/)

输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

```java
class Solution {
    public int[] spiralOrder(int[][] matrix) {
		if (matrix.length == 0) {
            return new int[0];
        }
        int l = 0, r = matrix[0].length - 1, t = 0, b = matrix.length - 1, x = 0;
        int[] res = new int[(r + 1) * (b + 1)];
        while (true) {
            // 从左向右
            for (int i = l; i <= r; i++) {
                res[x++] = matrix[t][i];
            }
            if (++t > b) break;
            // 从上往下
            for (int i = t; i <= b; i++) {
                res[x++] = matrix[i][r];
            }
            if (l > --r) break;
            // 从右向左
            for (int i = r; i >= l; i--) {
                res[x++] = matrix[b][i];
            }
            if (--b < t) break;
            // 从下往上
            for (int i = b; i >= t; i--) {
                res[x++] = matrix[i][l];
            }  
            if (++l > r) break;
        }
        return res;
    }
}

// 时间复杂度 O(MN) ：M,N 分别为矩阵行数和列数。 
// 空间复杂度 O(1) ： 四个边界 l , r , t , b 使用常数大小的额外空间（res为必须使用的空间）。
```
## 剑指 Offer 31. 栈的压入、弹出序列

[剑指 Offer 31. 栈的压入、弹出序列](https://leetcode-cn.com/problems/zhan-de-ya-ru-dan-chu-xu-lie-lcof/)

输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如，序列 {1,2,3,4,5} 是某栈的压栈序列，序列 {4,5,3,2,1} 是该压栈序列对应的一个弹出序列，但 {4,3,5,1,2} 就不可能是该压栈序列的弹出序列。

```java
class Solution {
    public boolean validateStackSequences(int[] pushed, int[] popped) {
        // 建立辅助栈，如果下一个弹出的数字刚好是辅助栈顶的数字，直接弹出；若不在栈顶，就将在pushed中还没有压入的
        // 数字进辅助栈，直到压入的数字等于下一个需要弹出的数字为止；所有数字压入栈没有找到下一个弹出的数字就不是弹出序列
        Deque<Integer> stack = new ArrayDeque<>();
        int p = 0;
        for (int num : pushed) {
            stack.push(num);
            while (!stack.isEmpty() && stack.peek() == popped[p]) {
                stack.pop();
                p++;
            }
        }
        return stack.isEmpty();
    }
}
// 时间复杂度：O(N)，其中 N 为列表 pushed 的长度；每个元素最多入栈与出栈一次，即最多共 2N 次出入栈操作。
// 空间复杂度：O(N)，辅助栈 stack 最多同时存储 N 个元素。

```

## 剑指 Offer 33. 二叉搜索树的后序遍历序列

[剑指 Offer 33. 二叉搜索树的后序遍历序列](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof/)

输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历结果。如果是则返回 `true`，否则返回 `false`。假设输入的数组的任意两个数字都互不相同。

```java
class Solution {
    public boolean verifyPostorder(int[] postorder) {
        return recur(postorder, 0, postorder.length - 1);
    }
    
    /**
    * 子树的边界点索引 [i,...,j]
    */
    private boolean recur(int[] postorder, int i, int j) {
        if (i >= j) {
            return true;
        }
        int index = i;
        // 右子树开始的索引
        while (postorder[j] > postorder[index]) {
            index++;
        }
        int pivot = index;
        // 右子树都是大于根节点的
        while (postorder[j] < postorder[index]) {
            index++;
        }
        // index == j 判断当前子树是否满足二叉搜索树
        return index == j && recur(postorder, i, pivot - 1) && recur(postorder, pivot, j - 1);
    }
}

// 时间复杂度：O(N^2)， 每次调用 recur(i,j) 减去一个根节点，因此递归占用 O(N)；最差情况下，树为链表的时候，每轮递归，遍历子树所有节点，占用 O(N)
// 空间复杂度：O(N)，树为链表的时候，递归深度达到 N
```
## 剑指 Offer 37. 序列化二叉树

[剑指 Offer 37. 序列化二叉树](https://leetcode-cn.com/problems/xu-lie-hua-er-cha-shu-lcof/)

请实现两个函数，分别用来序列化和反序列化二叉树。

你需要设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。

提示：输入输出格式与 LeetCode 目前使用的方式一致，详情请参阅 LeetCode 序列化二叉树的格式。你并非必须采取这种方式，你也可以采用其他的方法解决这个问题。

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class Codec {

    // Encodes a tree to a single string.
    public String serialize(TreeNode root) {
        if (root == null) {
            return " _";
        }
        String res = root.val + "_";
        res += serialize(root.left);
        res += serialize(root.right);
        return res;
    }

    // Decodes your encoded data to tree.
    public TreeNode deserialize(String data) {
        String[] strs = data.split("_");
        Queue<String> queue = new LinkedList<>();
        for (String str : strs) {
            queue.add(str);
        }
        return recoverPreOrder(queue);
    }

    private TreeNode recoverPreOrder(Queue<String> queue) {
        String value = queue.poll();
        if (value.equals(" ")) {
            return null;
        }
        TreeNode node = new TreeNode(Integer.valueOf(value));
        node.left = recoverPreOrder(queue);
        node.right = recoverPreOrder(queue);
        return node;
    }
}

// 时间复杂度：O(N)
// 空间复杂度：O(N)

// Your Codec object will be instantiated and called as such:
// Codec codec = new Codec();
// codec.deserialize(codec.serialize(root));
```
## 剑指 Offer 38. 字符串的排列

[剑指 Offer 38. 字符串的排列](https://leetcode-cn.com/problems/zi-fu-chuan-de-pai-lie-lcof/)

输入一个字符串，打印出该字符串中字符的所有排列。

你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。

```java
class Solution {
    private List<String> res = new ArrayList<>();
    private char[] chars;
    public String[] permutation(String s) {
        chars = s.toCharArray();
        // 递归实现全排列
        dfs(0);
        return res.toArray(new String[res.size()]);
    }

    private void dfs(int x) {
        // base case
        if (x == chars.length - 1) {
            res.add(String.valueOf(chars));
            return;
        }
        Set<Character> set = new HashSet<>();
        for (int i = x; i < chars.length; i++) {
            // 剪枝，防止重复的排列
            if (set.contains(chars[i])) {
                continue;
            }
            set.add(chars[i]);
            swap(i, x);
            dfs(x + 1);
            // 每次回溯的时候，交换还原字符串
            swap(i, x);
        }
    }

    private void swap(int i, int j) {
        char tmp = chars[i];
        chars[i] = chars[j];
        chars[j] = tmp;
    }
}

// 时间复杂度：O(N!N)，字符串的全排列有 N！，每种生成一个字符串需要 O(N) 复杂度
// 空间复杂度：O(N^2)，HashSet 集合每次递归栈中存储不同的字符，需要存储 N + (N - 1) +...+ 2 + 1 个。
```
## 剑指 Offer 39. 数组中出现次数超过一半的数字

[剑指 Offer 39. 数组中出现次数超过一半的数字](https://leetcode-cn.com/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/)

数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

```java
// 可以考虑排序，排好序，中间 n/2 位置的数就是多数
// 摩尔投票法，最佳
class Solution {
    public int majorityElement(int[] nums) {
        int count = 0, candidate = 0;
        for (int num : nums) {
            if (count == 0) {
                candidate = num;
            }
            count += (candidate == num) ? 1 : -1;
        }
        return candidate;
        // 若题目没有给条件，需要验证
        // int i = 0;
        // for (int num : nums) {
        //     if (candidate == num) {
        //        i++;
        //    }
        // }
        // return i > nums.length / 2 ? candidate : 0;
    }
}

// 时间复杂度：O(N)
// 空间复杂度：O(1)
```
## 剑指 Offer 43. 1～n 整数中 1 出现的次数

[剑指 Offer 43. 1～n 整数中 1 出现的次数](https://leetcode-cn.com/problems/1nzheng-shu-zhong-1chu-xian-de-ci-shu-lcof/)

输入一个整数 n ，求 1～n 这 n 个整数的十进制表示中1出现的次数。

例如，输入12，1～12这些整数中包含1 的数字有1、10、11和12，1一共出现了5次。

- n~i~ 当前位 cur
- n~x~ ... n~i+1~ 高位的数 high
- n~i-1~ ... n~1~ 低位的数 low
- 10^i^ 位因子 digit

```java
// cur = 0, high * digit
// cur = 1, high * digit + low + 1
// cur = 2...9, (high + 1) * digit
class Solution {
    public int countDigitOne(int n) {
    	int digit = 1, res = 0;
        int cur = n % 10, high = n / 10, low = 0;
        // high 和 cur 同时为0 的时候 跳出循环
        while (high != 0 || cur != 0) {
        	if (cur == 0) {
                res += high * digit; 
            } else if (cur == 1) {
                res += high * digit + low + 1;
            } else {
                res += (high + 1) * digit;
            }
            
            low += cur * digit;
            cur = high % 10;
            high /= 10;
            digit *= 10;
        }
        return res;
    }
}
// 时间复杂度：O(logN)，循环的次数为数字的位数 log10(n)，所以是 log 级别的
// 空间复杂度：O(1)，只有几个变量

// 分别统计每位上的数字1出现的次数，最后将所有的次数进行累加
// 当前位表示为 10^k
class Solution {
    public int countDigitOne(int n) {
        // 当前位
        int cur = 1;
        int res = 0;
        for (int k = 0; n >= cur; k++) {
            res += (n / (cur * 10)) * cur + Math.min(cur, Math.max(0, n % (cur * 10) - cur + 1));
            cur *= 10;
        }
        return res;
    }
}

// 时间复杂度：O(logN)
// 空间复杂度：O(1)
```

## 剑指 Offer 44. 数字序列中某一位的数字

[剑指 Offer 44. 数字序列中某一位的数字](https://leetcode-cn.com/problems/shu-zi-xu-lie-zhong-mou-yi-wei-de-shu-zi-lcof/)

数字以0123456789101112131415…的格式序列化到一个字符序列中。在这个序列中，第5位（从下标0开始计数）是5，第13位是1，第19位是4，等等。

请写一个函数，求任意第n位对应的数字。

```java
class Solution {
    public int findNthDigit(int n) {
        // cur 是当前数所在的整数的位数，cur * digitCount 是当前位数加起来的位数之和
	    int cur = 1, digitCount = 9;
        while (n > (long) cur * digitCount) {
            n -= cur * digitCount;
            digitCount *= 10;
            cur++;
        }
        // n 是所在的 cur 位数的第几位，one-based(从一开始)
        n--;
        int index = n % cur;
        // 第 n 位数字所在的整数
        int num = (int) Math.pow(10, cur - 1) + n / cur;
        // 从整数的右边第 (cur - index - 1) 位就是第几位数字
        return (num / (int) Math.pow(10, cur - index - 1)) % 10;
    }
}

// 时间复杂度：O(logN)，遍历 cur 次，cur = log10(N)
// 空间复杂度：O(1)。
```
## 剑指 Offer 49. 丑数 

[剑指 Offer 49. 丑数](https://leetcode-cn.com/problems/chou-shu-lcof/)

我们把只包含质因子 2、3 和 5 的数称作丑数（Ugly Number）。求按从小到大的顺序的第 n 个丑数。

![Picture1.png](https://pic.leetcode-cn.com/1613651468-icTuYo-Picture1.png)

```java
// 超出时间限制，从1开始逐个判断是不是丑数，时间复杂度过高
class Solution {
    public int nthUglyNumber(int n) {
        if (n <= 0) {
            return 0;
        }
        int index = 0, findUgly = 0;
        while (findUgly < n) {
            index++;
            if (isUgly(index)) {
                findUgly++;
            }
        }
        return index;
    }

    public boolean isUgly(int num) {
        while (num % 2 == 0) {
            num /= 2;
        }
        while (num % 3 == 0) {
            num /= 3;
        }
        while (num % 5 == 0) {
            num /= 5;
        }
        return num == 1 ? true : false;
    }
}

// 动态规划降低时间复杂度
class Solution {
    public int nthUglyNumber(int n) {
        if (n <= 0) {
            return 0;
        }
		// dp[i] 表示第 i + 1 个丑数
        int[] dp = new int[n];
        dp[0] = 1;
        // 指针指向乘 2、3、5 最接近dp[i]的丑数
        int p2 = 0, p3 = 0, p5 = 0;
        for (int i = 1; i < n; ++i) {
            int next2 = dp[p2] * 2, next3 = dp[p3] * 3, next5 = dp[p5] * 5;
            dp[i] = Math.min(next2, Math.min(next3, next5));
            if (next2 == dp[i]) {
                p2++;
            }
            if (next3 == dp[i]) {
                p3++;
            }
            if (next5 == dp[i]) {
                p5++;
            }
        }
        return dp[n - 1];
    }
}

// 时间复杂度：O(N)，循环从1遍历到第n个丑数
// 空间复杂度：O(N)，dp表开了N的额外空间
```

## 剑指 Offer 51. 数组中的逆序对

[剑指 Offer 51. 数组中的逆序对](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/)

在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。

```java
// 归并排序
class Solution {
    int[] temp;
    public int reversePairs(int[] nums) {
        if (nums == null || nums.length < 2) {
            return 0;
        }
        temp = new int[nums.length];
        return mergeSort(nums, 0, nums.length - 1);
    }
    
    public int mergeSort(int[] nums, int l, int r) {
        if (l >= r) {
            return 0;
        }
        int mid = l + ((r - l) >> 1);
        int res = mergeSort(nums, l, mid) + mergeSort(nums, mid + 1, r);
        
        int i = l, j = mid + 1;
        int k = 0;
        while (i <= mid && j <= r) {
            // 归并左边的部分大于右边的话，有 mid - i + 1 个逆序对，因为每个部分归并前，都进行了排序
            res += nums[i] > nums[j] ? (mid - i + 1) : 0;
            temp[k++] = nums[i] <= nums[j] ? nums[i++] : nums[j++];
        }
        while (i <= mid) {
            temp[k++] = nums[i++];
        }
        while (j <= r) {
            temp[k++] = nums[j++];
        }
        // 将排好的数组填回去
        k = 0;
        while (l <= r) {
            nums[l++] = temp[k++];
        }
        return res;
    } 
}

// 时间复杂度：O(NlogN)
// 空间复杂度：O(NS)
```

## 剑指 Offer 56 - I. 数组中数字出现的次数

[剑指 Offer 56 - I. 数组中数字出现的次数](https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof/)

一个整型数组 `nums` 里除两个数字之外，其他数字都出现了两次。请写程序找出这两个只出现一次的数字。要求时间复杂度是O(n)，空间复杂度是O(1)。

```java
class Solution {
    public int[] singleNumbers(int[] nums) {
        // 位运算，eor 存储 a^b
        int eor = 0;
        for (int num : nums) {
            eor ^= num;
        }
        // 取得最右边的一个1
        int rightOne = eor & (~eor + 1);
        int one = 0;
        for (int num : nums) {
            // 其他偶数次的数字满足条件异或以后抵消
            if ((num & rightOne) == 0) {
                one ^= num;
            }
        }
        // 异或运算的结合律
        return new int[]{one, one ^ eor};
    }
}
// 时间复杂度：O(N)，用两个循环
// 空间复杂度：O(1)，使用几个变量
```

## 剑指 Offer 56 - II. 数组中数字出现的次数 II

[剑指 Offer 56 - II. 数组中数字出现的次数 II](https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-ii-lcof/)

在一个数组 `nums` 中除一个数字只出现一次之外，其他数字都出现了三次。请找出那个只出现一次的数字。

```java
class Solution {
    public int singleNumber(int[] nums) {
        // 统计每个数字在每个二进制位置上的和，出现3次的数在该位置上的除以三余数为0，为一的话就是只出现一次的数在
        // 该二进制位上的数值
        int[] count = new int[32];
        for (int num : nums) {
            for (int i = 0; i < count.length; i++) {
                count[i] += (num & 1);
                num >>>= 1;
            }
        }
        int res = 0;
        for (int i = 0; i < count.length; i++) {
            if (count[i] % 3 == 1) {
                res += (1 << i);
            }
        }
        return res;
    }
}

// 时间复杂度：O(N)，遍历整个数组的长度
// 空间复杂度：O(1)，使用长度为32的常数额外空间
```
## 剑指 Offer 59 - I. 滑动窗口的最大值

[剑指 Offer 59 - I. 滑动窗口的最大值](https://leetcode-cn.com/problems/hua-dong-chuang-kou-de-zui-da-zhi-lcof/)

给定一个数组 `nums` 和滑动窗口的大小 `k`，请找出所有滑动窗口里的最大值。

```java
// 递减单调队列，没有必要维护窗口中的全部元素，只要维护可能成为最大值的元素就可以了，队列中的元素是从大到小的
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        if (nums.length == 0) {
            return new int[0];
        }
        // 单调队列存储的是窗口中的下标
		LinkedList<Integer> queue = new LinkedList<>();
        int index = 0, len = nums.length;
        int[] res = new int[len - k + 1];
        for (int i = 0; i < len; i++) {
            // monotonic queue 的入队列操作
            while (!queue.isEmpty() && nums[i] >= nums[queue.peekLast()]) {
                queue.pollLast();
            }
            queue.offerLast(i);
            // 出队列操作
            if (i - k == queue.peekFirst()) {
                queue.pollFirst();
            }
            if (i >= k - 1) {
                res[index++] = nums[queue.peekFirst()];
            }
        }
        return res;
    }
}

// 时间复杂度：O(N)，N 是数组的长度，每个元素最多出队列、入队列一次
// 空间复杂度：O(K)，队列最多存储窗口大小的元素
```

## 剑指 Offer 59 - II. 队列的最大值

[剑指 Offer 59 - II. 队列的最大值](https://leetcode-cn.com/problems/dui-lie-de-zui-da-zhi-lcof/)

请定义一个队列并实现函数 max_value 得到队列里的最大值，要求函数max_value、push_back 和 pop_front 的均摊时间复杂度都是O(1)。

若队列为空，pop_front 和 max_value 需要返回 -1

```java
class MaxQueue {
	    
	Deque<Integer> queue1;
    Deque<Integer> queue2;
    
    public MaxQueue() {
		queue1 = new ArrayDeque<>();
        queue2 = new ArrayDeque<>();
    }
    
    public int max_value() {
		return queue2.isEmpty() ? -1 : queue2.peekFirst(); 
    }
    
    public void push_back(int value) {
		queue1.offer(value);
        // 维护一个单调递减队列
        while (!queue2.isEmpty() && queue2.peekLast() < value) {
            queue2.pollLast();
        }
        queue2.offer(value);
    }
    
    public int pop_front() {
		if (queue1.isEmpty()) {
            return -1;
        }
        int tmp = queue1.poll();
        if (tmp == queue2.peekFirst()) {
            queue2.pollFirst();
        }
        return tmp;
    }
}

// 时间复杂度：O(1)
// 空间复杂度：O(N)

/**
 * Your MaxQueue object will be instantiated and called as such:
 * MaxQueue obj = new MaxQueue();
 * int param_1 = obj.max_value();
 * obj.push_back(value);
 * int param_3 = obj.pop_front();
 */
```
## 剑指 Offer 60. n个骰子的点数

[剑指 Offer 60. n个骰子的点数](https://leetcode-cn.com/problems/nge-tou-zi-de-dian-shu-lcof/)

把n个骰子扔在地上，所有骰子朝上一面的点数之和为s。输入n，打印出s的所有可能的值出现的概率。

你需要用一个浮点数数组返回答案，其中第 i 个元素代表这 n 个骰子所能掷出的点数集合中第 i 小的那个的概率。

```java
// dynamic programming
// 点数之和的范围[n, 6n]，一共有 5n+1 种
// 假设dp[i][j]表示扔 i 个骰子，出现点数之和 j 的次数。n 个骰子，i 的范围在 1~n，j 的范围在[1, 6n]
// 单看第 n 枚骰子，它的点数可能为 1,2,3,..,6，扔完 n 枚骰子后点数之和 j 出现的次数，
// 可以由扔完 n-1 枚骰子后，对应点数 j-1,j-2,j-3,...,j-6 出现的次数之和转化过来。

class Solution {
    public double[] dicesProbability(int n) {
        // 次数
		int[][] dp = new int[n + 1][6 * n + 1];
        // 扔一次骰子，点数在[1, 6]
        for (int j = 1; j <= 6; j++) {
            dp[1][j] = 1;
        }
        for (int i = 2; i <= n; i++) {
            for (int j = i; j <= 6 * i; j++) {
                for (int k = 1; k <= 6 && j > k; k++) {
                    dp[i][j] += dp[i - 1][j - k];
                }
            }
        }
        double[] res = new double[5 * n + 1];
        double all = Math.pow(6, n);
        for (int i = 0; i <= 5 * n; i++) {
            res[i] = dp[n][n + i] * 1.0 / all;
        }
        return res;
    }
}

// 时间复杂度：O(N ^ 2)，外层循环（n-1）次，第二层循环是最大（5 * n + 1）次，第三层循环 6 次
// 空间复杂度：需要一个二维数组，O(N ^ 2)
```

## 剑指 Offer 62. 圆圈中最后剩下的数字

[剑指 Offer 62. 圆圈中最后剩下的数字](https://leetcode-cn.com/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/)

0,1,···,n-1 这 n 个数字排成一个圆圈，从数字 0 开始，每次从这个圆圈里删除第 m 个数字（删除后从下一个数字开始计数）。求出这个圆圈里剩下的最后一个数字。

例如，0、1、2、3、4 这 5 个数字组成一个圆圈，从数字 0 开始每次删除第 3 个数字，则删除的前4个数字依次是2、0、4、1，因此最后剩下的数字是3。

```java
// 约瑟夫环问题
// 手动循环链表实现，时间复杂度太高了
// 模拟链表实现
// 数学实现

class Solution {
    public int lastRemaining(int n, int m) {
        // 数学方法，f(n, m) 表示 n 个人报数，每报到 m 时去掉，最终留下的数字
        // f(n, m) = (f(n - 1, m) + m) % n
        // 胜利者的下标是如何变化的，每次去掉一位，这一列数字相当于向前移动了m位
        // 最初只有一个人，返回他自己，从下向上迭代
        if (m == 1) {
            return n - 1;
        }
        int last = 0;
        for (int i = 2; i <= n; i++) {
            last = (last + m) % i;
        }
        return last;
    }
}

// 时间复杂度：O(N)
// 空间复杂度：O(1)

class Solution {
    public int lastRemaining(int n, int m) {
        // 有序集合模拟链表实现
        ArrayList<Integer> list = new ArrayList<>();
        // 将 n 个数加入到集合中
        for (int i = 0; i < n; i++) {
            list.add(i);
        }
        int index = 0;
        while (n > 1) {
            index = (index + m - 1) % n;
            list.remove(index);
            n--;
        }
        return list.get(0);
    }
}

// 时间复杂度：O(N^2)，因为集合 remove 的时间复杂度是O(N)，循环遍历 N 次
// 空间复杂度：O(N)

class Solution {
	/** 
	手动实现循环链表
	*/
	class Node {
		int val;
		Node next;
		
		public Node(int val) {
			this.val = val;
		}	
	}
	
    public int lastRemaining(int n, int m) {
        // 一次一个直接返回最后一个
		if (m == 1) {
			return n - 1;
		}
		Node head = new Node(0);
		Node group = head;
		// 创建一个链表
		for (int i = 1; i < n; i++) {
			group.next = new Node(i);
			group = group.next;
		}
		// 成环
		group.next = head;
		// 从0开始计数
		int index = 0;
		while (head.next != head) {
			// 当index = m - 2说明下一个节点（m-1）该删除了
			if (index == m - 2) {
				head.next = head.next.next;
				index = 0;
			} else {
				index++;
			}
			head = head.next;
		}
		return head.val;
    }
}
```
## 剑指 Offer 64. 求1+2+…+n

[剑指 Offer 64. 求1+2+…+n](https://leetcode-cn.com/problems/qiu-12n-lcof/)

求 `1+2+...+n` ，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。

```java
// 使用逻辑运算符的短路效应
class Solution {
    public int sumNums(int n) {
		boolean tmp = n > 1 && (n += sumNums(n - 1)) > 0;
        return n;
    }
}

// 时空复杂度都是O(N)
```
## 剑指 Offer 65. 不用加减乘除做加法

[剑指 Offer 65. 不用加减乘除做加法](https://leetcode-cn.com/problems/bu-yong-jia-jian-cheng-chu-zuo-jia-fa-lcof/)

写一个函数，求两个整数之和，要求在函数体内不得使用 “+”、“-”、“*”、“/” 四则运算符号。

 ```java
 class Solution {
     public int add(int a, int b) {
 		while (b != 0) {
             // 无进位相加
             int sum = a ^ b;
             // 进位信息
             b = (a & b) << 1;
             a = sum;
         }
         return a;
     }
 }
 // 时间复杂度：O(32)，最坏的情况 0xfffffff + 1，需要循环 32 次
 // 空间复杂度：O(1) 
 
 // 递归形式
 class Solution {
     public int add(int a, int b) {
         if (b == 0) {
             return a;
         }
         return add(a ^ b, (a & b) << 1);
     }
 }
 ```
## 剑指 Offer 66. 构建乘积数组

[剑指 Offer 66. 构建乘积数组](https://leetcode-cn.com/problems/gou-jian-cheng-ji-shu-zu-lcof/)

给定一个数组 A[0, 1, …, n - 1]，请构建一个数组 B[0, 1, …, n - 1]，其中 B[i] 的值是数组 A 中除了下标 i 以外的元素的积, 即 B[i] = A[0] × A[1] × … × A[i - 1] × A[i + 1] × … × A[n - 1]。不能使用除法。

```java
class Solution {
    public int[] constructArr(int[] a) {
	    int len = a.length;
        int[] res = new int[len];
        int left = 1, right = 1;
        for (int i = 0; i < len; i++) {
            res[i] = left;
            left *= a[i];
        }
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= right;
            right *= a[i];
        }
        return res;
    }
}

// 空间复杂度：O(1)，变量使用常数大小额外空间（数组 res 作为返回值，不计入复杂度考虑）
// 时间复杂度：O(N)，两个 for 循环都执行 N 次
```

## 剑指 Offer 67. 把字符串转换成整数

[剑指 Offer 67. 把字符串转换成整数](https://leetcode-cn.com/problems/ba-zi-fu-chuan-zhuan-huan-cheng-zheng-shu-lcof/)

写一个函数 StrToInt，实现把字符串转换成整数这个功能。不能使用 atoi 或者其他类似的库函数。 

首先，该函数会根据需要丢弃**无用的开头空格字符**，直到寻找到第一个非空格的字符为止。

当我们寻找到的第一个非空字符为**正或者负号**时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号；假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。

该字符串除了有效的整数部分之后也可能会存在**多余的字符**，这些字符可以被忽略，它们对于函数不应该造成影响。

注意：假如该字符串中的第一个非空格字符**不是**一个有效**整数字符**、**字符串**为**空或字符串仅包含空白字符**时，则你的函数不需要进行转换。

在任何情况下，若函数不能进行有效的转换时，请返回 0。

说明：假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−2^31,  2^31 − 1]。如果数值超过这个范围，请返回  INT_MAX (2^31 − 1) 或 INT_MIN (−2^31) 。

```java
// 迭代变换成数字，res = res * 10 + str.charAt(i) - '0'
// 越界的情况，结果 res > Integer.MAX_VALUE；res == Integer.MAX_VALUE / 10，并且当前要加的数字大于7

class Solution {
    public int strToInt(String str) {
        // i 字符串的字符下标，sign 存储正负数
        // res 结果，flag 判断是否溢出
        int len = str.length(), i = 0, sign = 1;
        int res = 0, flag = Integer.MAX_VALUE / 10;
        if (len == 0 || str == null) {
            return 0;
        }     
        // 只有空白字符
        while (str.charAt(i) == ' ') {
            if (++i == len) {
                return 0;
            }
        }
        if (str.charAt(i) == '-') {
            sign = -1;
        }
        if (str.charAt(i) == '-' || str.charAt(i) == '+') {
            i++;
        }
        for (; i < len; i++) {
            // 非数字跳出循环
            if (str.charAt(i) < '0' || str.charAt(i) > '9') {
                break;
            }
            // 溢出
            if (res > flag || (res == flag && str.charAt(i) > '7')) {
                return sign == 1 ? Integer.MAX_VALUE : Integer.MIN_VALUE;
            }
            res = res * 10 + str.charAt(i) - '0';
        }
        return res * sign;
    }
}

// 时间复杂度：O(N)
// 空间复杂度：O(1)
```

## 剑指 Offer 68 - I. 二叉搜索树的最近公共祖先

[剑指 Offer 68 - I. 二叉搜索树的最近公共祖先](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-zui-jin-gong-gong-zu-xian-lcof/)

给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        while (root != null) {
            if (root.val > p.val && root.val > q.val) {
                root = root.left;
            } else if (root.val < p.val && root.val < q.val) {
                root = root.right;
            } else {
                // 在两个数值之间
                return root;
            }
        }
        return root;
    }
}

// 时间复杂度：O(N)，N是二叉树节点数量，最坏是链表的情况，一直遍历到结尾。满二叉树为 O(logN)
// 空间复杂度：O(1)
```
## 剑指 Offer 68 - II. 二叉树的最近公共祖先

[剑指 Offer 68 - II. 二叉树的最近公共祖先](https://leetcode-cn.com/problems/er-cha-shu-de-zui-jin-gong-gong-zu-xian-lcof/)

给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) {
            // 遇到 o1 o2 null 就一直向上返回 
            return root;
        }
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        // 向上返回的过程中判断左右子树的信息
        if (left != null && right != null) {
            // 在左右子树中包含 o1 o2，向上返回当前节点
            return root;
        }
        return left != null ? left : right;
    }
}

// 时间复杂度：O(N)，所有二叉树的节点只会访问到一次
// 空间复杂度：O(N)，N是二叉树的节点数，递归调用的深度取决于二叉树的高度，二叉树最坏条件下为一条链，高度为N
```





