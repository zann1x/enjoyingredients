# Backing up the Ghost docker volume

Remember to also export/import the JSON file from within the admin panel of Ghost.

To make a backup of Ghost content data and save it into backup.tar.gz, execute the following commands.
```
ssh vps_host
sudo docker run --rm --volumes-from ghost -v ~/:/backup ubuntu bash -c "cd /var/lib/ghost/content && tar -czvf /backup/backup.tar.gz ."
exit
scp vps_host:~/backup/backup.tar.gz:~/
```

To recover Ghost content data that was saved into backup.tar.gz, execute the following commands.
```
scp ./backup.tar.gz vps_host:~
ssh vps_host
sudo docker run --rm -v enjoy_ghost_content:/recover -v ~/:/backup ubuntu bash -c "cd /recover && tar -xzvf /backup/backup.tar.gz"
```
