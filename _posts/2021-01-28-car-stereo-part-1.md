---
layout: post
title: Car Stereo - Part 1 (Backstory)
date: 2021-01-28 19:47 -0500
---
I like my car, probably more then anyone should like a 2012 Hyundai Elantra. In 2021 terms it's not the most technologically advance thing but it does most of what I need. While driving, I use my phone for navigation and music - both are extremely essential.

My car was built around the time of "peak iPod" and like many from that era, have enhanced support for the iPod. The Elantra does this via a proprietary cable with a 30-pin dock connector on one end and usb on the other. Thankfully, the car also supports bluetooth audio and handsfree calling. It even has steering wheel playback controls. 

This is where my (entirely self-created) problems begin. You see, the playback controls are limited to volume up/down and track next/prev. Volume works great, no complaints there! However, the track next/prev only works when connected to an iPod. 

Sure, I can (and occasionally do) yell at Siri to change the track, but it's unreliable at best.

Like in most of my side projects, I set off to do what most reasonable wouldn't. Trick the car into thinking it's talking to an old school iPod and send back the track next/prev controls to my phone via bluetooth. 

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

In the following few posts, I'll be documenting my journey in attempting to build that thing<sup>[1]</sup>. *Edit: Part 2 is now up! You can [read it here]({% post_url 2021-02-11-car-stereo-part-2 %}).*

<small>P.S. This project was started in the summer of 2019 and at the time of writing is still not really working, mostly because i've gotten used to yelling at Siri :)</small>
