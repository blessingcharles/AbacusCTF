#!/bin/bash

# installing necessary softwares
sudo apt-get update
sudo apt-get install -y vsftpd
sudo apt-get install -y samba
sudo apt-get install -y gcc

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



#### Privilige Escalation from user to root
sudo cp /data/utilities/privesc/webserver.c /var/webserver.c
sudo gcc /var/webserver.c -o /var/webserver
sudo chmod 600 /var/webserver.c
sudo strip /var/webserver
sudo chmod 744 /var/webserver

sudo cp /data/utilities/privesc/mywebserver.service /etc/systemd/system/mywebserver.service
sudo systemctl daemon-reload
sudo systemctl start mywebserver
sudo systemctl enable mywebserver
