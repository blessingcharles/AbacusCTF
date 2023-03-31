#!/bin/bash

# installing necessary softwares
sudo apt-get update
sudo apt-get install -y vsftpd
sudo apt-get install -y samba
sudo apt-get install -y gcc
 
# installing nodejs
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y npm

#configuring mongodb daemon
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
sudo apt-get install gnupg
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update -y
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

#Adding mongodb collection data
mongoimport -d krk -c users --file users.json
mongoimport -d krk -c articles --file articles.json

# configuring firewall
sudo ufw allow 20/ftp
sudo ufw allow 21/ftp
sudo ufw allow 'Samba'

                ### 1. configuring ftp ###
sudo cp /data/configs/myvsftpd.conf /etc/vsftpd.conf
sudo systemctl restart vsftpd

# creating public directory
sudo mkdir -p /var/ftp/public
sudo chown nobody:nogroup /var/ftp/public

#copying ftp files from /data
sudo cp /data/utilities/ftp/crackme  /var/ftp/public/crackme
sudo cp /data/utilities/ftp/message.txt  /var/ftp/public/message.txt

                ### 2. configuring samba ###
sudo mkdir /samba
sudo chgrp sambashare /samba

# configuring samba users
sudo useradd -M -d /samba/thomasthecatoonz -s /usr/sbin/nologin -G sambashare thomasthecatoonz
sudo mkdir /samba/thomasthecatoonz
sudo chown thomasthecatoonz:sambashare /samba/thomasthecatoonz
sudo chmod 2770 /samba/thomasthecatoonz

# Adding the user to samba database
echo -e "fr13nd5f0r3v3r\nfr13nd5f0r3v3r" | sudo smbpasswd -a thomasthecatoonz
sudo smbpasswd -e thomasthecatoonz

# copying the config file
sudo cp /data/configs/mysmb.conf /etc/samba/smb.conf
sudo systemctl restart smbd
sudo systemctl restart nmbd

#copying smb files from /data
sudo cp /data/utilities/smb/message.txt /samba/thomasthecatoonz/message.txt
sudo cp /data/utilities/smb/chutney /samba/thomasthecatoonz/chutney
sudo cp /data/utilities/smb/secretchat /samba/thomasthecatoonz/secretchat
sudo cp /data/utilities/smb/sss.zip /samba/thomasthecatoonz/sss

        #### 3. Setting up port 5000 #######


sudo npm install pm2@latest -g
npm i /data/utilities/port80

sudo cp -rf /data/utilities/port80 /var
 
# node daemon process
sudo cp /data/configs/webnode.service /etc/systemd/system/webnode.service
sudo systemctl daemon-reload
sudo systemctl start webnode
sudo systemctl enable webnode

#### creating new user 
sudo useradd -m user_31k4n1h4n125td
echo -e "f4vj0mdh44mkb4r\nf4vj0mdh44mkb4r" | sudo passwd user_31k4n1h4n125td

        #### 5. Privilige Escalation from user to root webserver #####
sudo apt-get install -y gcc
sudo cp /data/utilities/privesc/webserver.c /var/webserver.c
sudo gcc /var/webserver.c -o /var/webserver
sudo chmod 600 /var/webserver.c
sudo strip /var/webserver
sudo chmod 744 /var/webserver

### loading the daemon webserver
echo "[+]Starting the daemon server"
sudo cp /data/utilities/privesc/mywebserver.service /etc/systemd/system/mywebserver.service
sudo systemctl daemon-reload
sudo systemctl start mywebserver
sudo systemctl enable mywebserver


### setting up flags in the box

#### user flag
echo "abacus{cecf1e1944bf59293e2e310a2307121f}" > .user.txt
sudo cp .user.txt /home/user_31k4n1h4n125td/
sudo chown user_31k4n1h4n125td:user_31k4n1h4n125td /home/user_31k4n1h4n125td/.user.txt
 
### root flag
echo "abacus{0218f1bfbb086d70f33e0ceb5ba30144}" > .root.txt
sudo cp .root.txt /root/


## cleaning up work
chmod -R 700 /data