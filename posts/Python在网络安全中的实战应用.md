---
title: Python 能帮我们在安全上做点啥？
date: "2025-10-18"
cover: ""
tags:
  - Python
  - 安全开发
  - 自动化
description: 写几个简单的脚本，看看 Python 怎么用来扫端口、破密码、爬信息，把重复劳动自动化起来。
---

# 为什么选 Python？

安全工作者经常需要快速写一些工具来实现自动化，或者验证一个漏洞的利用思路。Python 的语法简单，库又丰富，从网络通信到数据分析都有现成的模块，用来写 PoC 或小工具再合适不过了。

常用的安全相关库有：`socket`（原生网络编程）、`requests`（发送 HTTP 请求）、`scapy`（构造和解析数据包）、`paramiko`（SSH 连接）、`pwntools`（做二进制利用）等等。基本上你想干的事都能找到对应的库。

# 写个端口扫描器

用 `socket` 模块几行就能写个简单的端口连通性测试：

```python
import socket

def scan_port(host, port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(0.5)
    result = s.connect_ex((host, port))
    s.close()
    return result == 0

for port in range(1, 1025):
    if scan_port('192.168.1.1', port):
        print(f"端口 {port} 开放")