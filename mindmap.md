# Mind Map

- Virtualization Tool : Vagrant
- Base box            : bento/ubuntu-20.04
- flags               : abacus{RANDOM_FLAG}



#### 1. FTP [Anonymous Login] (port 20,21)

    1. [username] in a stegnography image       { flag1 }
    2. [password] in a x64 binary file stripped to be reverse engineered { flag2 } 

#### 2. SMB [username and password in FTP] (port 445)

    1. python pickle dumped object [ internal employee secret ] {flag 3}
    2. wireshark chat file with passphrase for jwt secret encrypted with sha512 [passphrase] {flag 4}

#### 3. Website (Some Random High port) 5555 

    1. SSRF X-Forwarded-Header to leak ssh-key passphrase
        [The password will be in the famous rockyou.txt] {{flag 5}}

#### 4. Website (80)

    1. A Login Page with nosql injection exploit [password]{ flag 6 } and internal employee secret 
    required

    2. Bypassing by creating new jwt token with leaked secret and login as admin [leaked secret]
        jwt token struct 
            { userid : <random> , isadmin : false }

    3. Admin can see the ssh-private key in his login page [ssh-passphrase in website 5555]{ flag 7}

### Foothold at the Box

    1. Low previliged user --- user.txt {flag 8}

    2. Exploit the binary set suid bit and become root
        Steps:
            Need to combine ret2libc , ROP , bufferoverflow and format string 

    3. Root access , find hidden in somewhere around the filesystem root.txt {flag 9}

    