---
layout: post
title: Car Stereo - Part 1 (Backstory)
date: 2021-01-28 19:47 -0500
---
I like my car, probably more then anyone should like a 2012 Hyundai Elantra. It's not the most technologically advance thing (in 2021 terms) but it does most of what I need. While driving, I use my phone for navigation and music - both extremely essential.

My car was build around "peak iPod" and like many cars at the time, decided to support enhanced support for the iPod via a proprietary cable with the 30-pin dock connector on one end and usb on the other. Thankfully, car also supports bluetooth audio and handsfree calling. It even has steering wheel playback controls. 

This is where my (entirely self-created) problems begin. You see, the playback controls are limited to volume up/down and track next/prev. Volume works great, no complaints there! However, the track next/prev only works when connected to an iPod. 

Sure, I can (and occasionally do) yell at Siri to change the track, but it's unreliable at best.

Like in most of my side projects, I set off to do what most reasonable wouldn't. Trick the car into thinking it's talking to an old school iPod and trick my phone it's talking to a modern bluetooth device. 

```
  +-------+
  | Phone |
  +-------+
      |
  Bluetooth
      |
      v
+-----------+
|   Thing   +---------+
+-----------+         |
      |               |
iPod Protocol   Analog Audio
      |               |
      v               |
  +-------+           |
  |  Car  +<----------+
  +-------+
```
<small>Figure 1</small>

In the following few posts, I'll be documenting my journey in attempting to build that thing<sup>[1]</sup>.

<small>P.S. This project was started in the summer of 2019 and at the time of writing is still not really working, mostly because i've gotten used to yelling at Siri :)</small>