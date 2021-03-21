---
layout: post
title: Mounting HFS+ Drives on Ubuntu
description: How to mount and read from an HFS/HFS+ drive on Ubuntu. 
date: 2021-03-20 19:33 -0400
---
As part of a little home server I've been building, I wanted to reuse some old mac hard drives I had laying around. Before reusing the drives, I was really curious to see what was on them. 

In order to do this, I needed a way to mount the HFS+ formatted drives on Linux.

First thing was to install hfsprogs, this will let us read from the drive (Ubuntu can only read from non-journaled HFS drives).
```
sudo apt install hfsprogs
```

Next, find out what device the drive is attached to
```
sudo fdisk --list
```
Which will return something like this.
```
Disk /dev/sda: 149.1 GiB, 160041885696 bytes, 312581808 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: E55FCDF7-6658-4DEE-8478-33707537F42A

Device       Start       End   Sectors  Size Type
/dev/sda1     2048      4095      2048    1M BIOS boot
/dev/sda2     4096   2101247   2097152    1G Linux filesystem
/dev/sda3  2101248 312578047 310476800  148G Linux filesystem


Disk /dev/sdb: 232.9 GiB, 250059350016 bytes, 488397168 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: A2D23874-863A-4F6E-AFB4-4F025A563528

Device         Start       End   Sectors  Size Type
/dev/sdb1         40    409639    409600  200M EFI System
/dev/sdb2     409640 398847143 398437504  190G Apple HFS/HFS+
/dev/sdb3  399110144 488396799  89286656 42.6G Microsoft basic data
```

Looking at the type column, we can see an HFS/HFS+ drive attached to `/dev/sdb2`. It also appears that this drive has a bootcamp partition, cool! 

From here on out, all the commands will reference my particular device on /dev/sdb2, but be sure to change it for the value you found. 

Now let's try and actually mount the drive. First by creating the mount point.
```
sudo mkdir /media/machd
```

Then, by mounting the drive
```
sudo mount -t hfsplus -o force,rw /dev/sdb2 /media/machd
```

That's it! With any luck, when you go to `/media/machd` you should see all the drives contents!

When you're done, we can unmount the drive like this
```
sudo umount /media/machd
```

We can also check the status of the drive (it doesn't need to be mounted for this).
```
sudo fsck.hfsplus -f /dev/sdb2
```

Which returns something like: 
```
** /dev/sdb2
** Checking HFS Plus volume.
** Checking Extents Overflow file.
** Checking Catalog file.
...
```