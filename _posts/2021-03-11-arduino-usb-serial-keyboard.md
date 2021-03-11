---
layout: post
title: What (Not) to Do When You're Missing a Keyboard
description: Why I built idonthaveakeyboard, an Arduino based USB keyboard that uses a serial console as the input.
date: 2021-03-11 18:04 -0500
---
Yesterday, I was building a little home server out of some spare parts or I was until I hit a bit of a roadblock. When it came time to install the OS ([Ubuntu Server](https://ubuntu.com/download/server) in this case), I realized I didn't have a keyboard to configure the install.

A normal person would have just gone out and bought a keyboard and an experienced one would have [preseeded the install](https://help.ubuntu.com/lts/installation-guide/s390x/apbs02.html) so it could run unattended. 

Since I'm neither normal nor experienced, I built [idonthaveakeyboard](https://github.com/nadavami/idonthaveakeyboard). An Arduino based USB keyboard that uses a serial console as the input. In other words, it lets me use my laptop's keyboard as a USB keyboard for another machine. 

Here's a little run down of how to use it:
1. Get a compatible Arduino, program it and connect a USB<>Serial adapter to it's TX/RX pins
1. Plug the Arduino's USB cable into the computer that's missing a keyboard
1. Plug the USB<>Serial adapter into the laptop that has a keyboard
1. Open a terminal on the laptop and connect to the serial port (`screen /dev/ttyUSB0 9600`)

(Almost) anything you type into the terminal will show up on the other end as if it were being typed on a normal USB keyboard. Right now, it only sends arrow keys, return, backspace, and printable ASCII characters (because that's all I needed). 

And with that, I was able to successfully set up the OS! Job done!

Ok, maybe not... I had to change some BIOS settings and for whatever reason my fake keyboard wasn't being recognized, so I went out and bought a real one ¯\\\_(ツ)\_/¯