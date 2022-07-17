# Chapter17


### 端口

1. 用于标识计算机上某个特定的网络程序。范围 0 ~ 65535 (2 个字节)。

2. 0 ~ 1024 已经被占用，ssh 22，ftp 21，smtp 25，http 80。

3. 常见网络程序端口号：
   - tomact 8080
   - mysql 3306
   - oracle 1521
   - sqlserver 1433

### 网络协议

在网络编程中数据的组织形式。`Transmission Control Protocol / Internet Protocol`

#### TCP 

传输控制协议，进行通信的两个应用进程：客户端、服务端。 采用“三次握手”方式，是可靠的，但是传输完毕，需要释放已建立的连接，效率低。

#### UDP 

`User Datagram Protocol`，用户数据协议，不需要建立连接，不可靠，但无需释放资源，速度快。每个数据包的大小限制在 **64K** 以内，不适合传输大量文件。   

### Socket

套接字开发网络应用程序，通信的两端都要有 `Socket` ，是两台机器间通信的端点。Socket 允许程序将网络连接当成一个流，数据在两个 Socket 间通过 IO 传输。一般主动发起通信的应用程序属于客户端，等待通信请求的为服务端。

### TCP 编程

可靠的

### UDP 编程

不可靠的   

`netstat -an` 查看主机网络端口监听和网络连接的情况。

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/port.png)

`netstat -an | more`  分页显示

## TCP/IP 协议

### 网络层

`ICMP` 当发送端发送数据到接收端异常时，ICMP 向发送端发送一个异常信息，用于诊断网络的健康状况。

`ARP` 从分组数据包的 IP 地址解析出 MAC 地址的一种协议。

### 传输层

TCP UDP

### 应用层

会话层以上的分层，浏览器与服务端之间的通信使用的协议是 `HTTP`（HyperText Transfer Protocol），属 OSI 模型中的应用层。传输数据的主要格式是 HTML （HyperText Markup Language），属 OSI 模型中的表示层。

- SMTP 电子邮件协议

- FTP 文件传输，建立两个 TCP 连接，控制连接与数据连接。

- SSH 与 TELNET 远程登录

- SNMP 网络管理。使用 SNMP 管理的主机、路由器、网桥等称作 SNMP 代理（Agent）。

### 数据包

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1204/dataPacket.png)

IP 数据包生成后，参考路由控制表决定接收此包的路由或主机，随后，该 IP 包将被发送给连接这些路由器或主机网络接口的驱动程序。



