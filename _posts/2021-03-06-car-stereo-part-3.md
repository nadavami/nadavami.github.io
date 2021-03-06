---
layout: post
title: Attempting to Spoof an iPod with an OrangePi Zero
description: Part 3 in a series on spoofing an iPod for car stereo shenanigans.
youtube_id: 9rhg50xrdAg
date: 2021-03-06 16:30 -0500
---
*This is the third part of a series on spoofing an iPod for car stereo shenanigans. You can find [part 1 here]({% post_url 2021-01-28-car-stereo-part-1 %}) or [part 2 here]({% post_url 2021-02-11-car-stereo-part-2 %}).*

In the previous part, I found out that my car stereo is trying to talk to an iPod over serial. Here I will cover my first attempt at bridging that serial connection with my phone via bluetooth. I'll mostly be focusing on what went wrong, but feel free to [dig through the code](https://github.com/nadavami/iAP-to-AVRCP) if you want all the details.

First a few basics to get out of the way. iPods of the era communicate over Apple's iPod Accessory Protocol. There [have been some attempts](http://www.ipodlinux.org/Apple_Accessory_Protocol/) to reverse engineer this protocol, but unfortunately the only way to get the full documentation is to join Apple's MFI program. That said, if you look hard enough you might be able to find more specifications, but I'm not saying I did or you that you should...

The second piece of the puzzle is bluetooth. For this project there are two bluetooth profiles that are important, [Audio/Video Remote Control Profile (AVRCP)](https://en.wikipedia.org/wiki/List_of_Bluetooth_profiles#Audio/Video_Remote_Control_Profile_(AVRCP)) and [Advanced Audio Distribution Profile (A2DP)](https://en.wikipedia.org/wiki/List_of_Bluetooth_profiles#Advanced_Audio_Distribution_Profile_(A2DP)). Without going into too much detail (because I don't really understand them), AVRCP is how to control and get media info from the connected device and A2DP is how to get the actual audio stream.

Putting both pieces together, I made something that looks like this :point_down:.

{% include youtube.html %}

The demo is short (and buggy!) but there's quite a lot going on, so I'll break it down. 
1. Yes, I'm parked in the street and I get as many weird looks as you might expect someone to be hacking his car would get.
1. The audio quality is terrible. That's not an artifact of recording but noise on the Pi's analog audio output. A USB soundcard would probably fix this.  
1. When I hit the up button on the steering wheel (at around the 10s mark), it restarts the song. If you have eagle eyes, you'll see the time counter to the right of the artist name restarting.
1. Pressing on the button again goes to the previous song, but doesn't update the track info.

There are a also few other things that make this just about unusable.
1. The Pi takes about 45 seconds to a minute to boot. The car detects an "iPod" right when it starts and times out on connecting to it before the Pi is ready to respond to commands. In practice, this means starting the car waiting for the Pi to boot and then trying to go back into the iPod mode.
1. There's no easy way to pair/reconnect a bluetooth device. If my phone doesn't connect, I'm SOL. 
1. Every so often, the car will see an "iPod" but no audio comes out even though the phone is connected. 9 times out of 10, this is because the audio stack has crashed.

So to how to wrap this up? I built a thing! It works - but not well enough to be useful.

There are still a few things I'd like to try to get this working but some of them require taking trim pieces off the dash. Since it's still winter, I'll have to hold off until the weather gets a bit warmer. Should be just enough time for me to build up the courage... :upside_down_face: