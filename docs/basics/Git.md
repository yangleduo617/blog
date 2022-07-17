##      Git

### Git概述

​	Git是一个免费开源的分布式`版本控制系统`，可以快速高效地处理从小型到大型的各种项目。建立的库在本地的磁盘上，性能优于集中式版本控制系统Subversion（SVN）、CVS等。解决集中式版本控制系统的缺陷：

- 服务器断网情况下可以进行开发（版本控制在本地进行）

- 每个客户端保存完整项目（对文件仓库的完整备份）

​	在**工作区**（存项目的磁盘位置）写代码，`add`到暂存区，再提交（`commit`）到本地库，生成历史版本，删除不掉。

​	`代码托管中心`，基于网络服务器的远程代码仓库，即远程库。

### Git安装与命令

| 命令名称                             | 作用             |
| ------------------------------------ | ---------------- |
| git config --global user.name 用户名 | 设置用户签名     |
| git config --global user.email 邮箱  | 设置用户签名     |
| git init                             | 初始化本地库     |
| git status                           | 查看本地库状态   |
| git add 文件名                       | 添加到暂存区     |
| git commit -m "日志信息" 文件名      | 提交到本地库     |
| git reflog                           | 查看历史记录     |
| git log                              | 详细查看历史记录 |
| git reset --hard 版本号              | 版本穿梭         |
| git rm --cached 文件名               | 删除暂存区文件   |

```bash
yywqd@YLD MINGW64 ~/Desktop
$ git config --global user.name Yang

yywqd@YLD MINGW64 ~/Desktop
$ git config --global user.email yywqdu@163.com

```

**初始化本地库**

​	Windows操作系统采用两个字符来进行换行，即`CRLF`；Unix/Linux/Mac OS X操作系统采用单个字符`LF`来进行换行。

​	vim中输入i：写文件。yy：复制、p：粘贴。

​	查看文件最后一行的内容：

```bash
tail -n 1 hello.txt
```

**添加暂存区**

```bash
git add <file>
```

**提交本地库**

```bash
git commit -m "写版本信息" <file>
```

### Git穿梭

```bash
// 穿梭到指定的版本
git reset --hard 版本号
```

### Git分支

同时并行推进`多个功能的开发`，提高开发效率。各个分支在开发过程中，一个分支开发失败，不会对其他分支有任何影响。失败的分支删除重新开始即可。

| 命令名称            | 作用                     |
| ------------------- | ------------------------ |
| git branch 分支名   | 创建分支                 |
| git branch -v       | 查看分支                 |
| git checkout 分支名 | 切换分支                 |
| git merge 分支名    | 指定的分支合并到当前分支 |

**产生冲突**

原因：两个分支在同一文件的同一个位置有两套不同的修改。Git无法替我们决定使用哪一个，需要人为决定。人为决定的时候，使用vim命令，并且在commit的时候**不能有文件名**。

### IDEA集成Git     

------

## GitHub

### 创建远程库

创建远程库**别名**`tank-war`

```bash
git remote add tank-war https://github.com/yangleduo617/tank-war.git
```

| 命令名称                         | 作用                     |
| -------------------------------- | ------------------------ |
| git remote -v                    | 查看当前所有远程地址别名 |
| git remote add **别名** 远程地址 | 创建远程库别名           |
| git push **别名** 分支           | 推送本地仓库到远程库     |
| git pull **别名** 分支           | 拉取到本地               |
| git clone 远程地址               | 克隆远程地址到本地       |

### 代码推送、拉取、克隆

克隆会做的操作：**拉取代码、初始化本地库、创建别名**

同步远程分支

```bash
git branch -r | grep -v '\->' | while read remote; do git branch --track "${remote#origin/}" "$remote"; done
```

### SSH免密登录

1. 在Windows的用户文件夹中，查看是否有`.ssh`文件，没有就右击`Git Bash Here`，输入

```bash
ssh-keygen -t rsa -C yywqdu@163.com
```

后面是自己的`github`注册邮箱。再连续点三次`Enter`，出现如下界面，就成功了。

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/10004.png)

2. 再看用户文件夹下的`.ssh`文件就会出现下面两个文件。

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/10003.png)

3. 将`id_rsa.pub`公钥文件中的内容复制到`Seettings`-`SSH and GPG keys`-`SSH keys`-`New SSH keys`。

   ![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/10002.png)

   `id_rsa.pub`公钥文件中内容复制到此处的`Key`中，`Title`自取，添加成功就可以`push` 和 `pull` 了。

   ![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/10001.png)

### IDEA集成GitHub

#### 隐藏特定文件

1. 创建忽略规则文件 git.ignore，为了便于 ~/.gitconfig 文件引用，放在用户家目录下

2. 在 ~/.gitconfig 文件添加以下内容

   ```bash
   [core]
   	excludesfile = C:/Users/yywqd/git.ignore
   ```

3. 在改本地代码之前先检查本地和远程库中代码的区别，先 pull 远程库的代码，再修改。


#### Git 全局设置

```bash
git config --global user.name "Roger Seamus"
git config --global user.email "yywqdu@163.com"
```

#### 创建一个新仓库

```bash
git clone git@gitcode.net:qq_39683227/lottery.git
cd lottery
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master
```

#### 推送现有文件夹

```bash
cd existing_folder
git init
git remote add origin git@gitcode.net:qq_39683227/lottery.git
git add .
git commit -m "Initial commit"
git push -u origin master
```

#### 推送现有的 Git 仓库

```bash
cd existing_repo
git remote rename origin old-origin
git remote add origin git@gitcode.net:qq_39683227/lottery.git
git push -u origin --all
git push -u origin --tags
```
