#!/bin/bash

# installing necessary softwares
sudo apt-get update
sudo apt-get install -y vsftpd
sudo apt-get install -y samba
sudo apt-get install -y gcc

# installing nodejs
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y npm

#configuring mongodb daemon
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
sudo apt-get install gnupg
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# configuring firewall
sudo ufw allow 20/ftp
sudo ufw allow 21/ftp
sudo ufw allow 'Samba'

                ### 1. configuring ftp ###
sudo cp /data/configs/myvsftpd.conf /etc/vsftpd.conf
sudo systemctl restart vsftpd

# creating public directory
sudo mkdir -p /var/ftp/public
sudo chown nobody:nobody /var/ftp/public

#copying ftp files from /data
sudo cp /data/utilities/ftp/crackme /var/ftp/public/crackme

                ### 2. configuring samba ###
sudo mkdir /samba
sudo chgrp sambashare /samba

# configuring samba users
sudo useradd -M -d /samba/thomasthecat -s /usr/sbin/nologin -G sambashare thomasthecat
sudo mkdir /samba/thomasthecat
sudo chown thomasthecat:sambashare /samba/thomasthecat
sudo chmod 2770 /samba/thomasthecat

# Adding the user to samba database
echo -e "fr13nd5f0r3v3r\nfr13nd5f0r3v3r" | sudo smbpasswd -a thomasthecat
sudo smbpasswd -e thomasthecat

# copying the config file
sudo cp /data/configs/mysmb.conf /etc/samba/smb.conf
sudo systemctl restart smbd
sudo systemctl restart nmbd

#copying smb files from /data
sudo cp /data/utilities/smb/test.txt /samba/thomasthecat/text.txt
sudo cp /data/utilities/smb/chutney /samba/thomasthecat/chutney


        #### 3. Setting up port 5000 #######
        
sudo npm install pm2@latest -g
npm i /data/utilities/port80
pm2 start /data/utilities/port80/index.js


        ### 4. setting up port 8000 #####


        #### 5. Privilige Escalation from user to root webserver #####
sudo cp /data/utilities/privesc/webserver.c /var/webserver.c
sudo gcc /var/webserver.c -o /var/webserver
sudo chmod 600 /var/webserver.c
sudo strip /var/webserver
sudo chmod 744 /var/webserver

### loading the daemon webserver
sudo cp /data/utilities/privesc/mywebserver.service /etc/systemd/system/mywebserver.service
sudo systemctl daemon-reload
sudo systemctl start mywebserver
sudo systemctl enable mywebserver
