---
layout: post
title: My First Open Source Project - 11.5 Years Later
description: A code review and some thoughts on an open source project I published when I was fourteen.
date: 2021-02-01 17:56 -0500
---
This past weekend I was digging through an old hard drive when I came across a piece of software I wrote a while ago. In fact, it's the very first thing I ever opensourced. In the spirit of writing more and personal growth, I figured I would do a sort of code review and see if i've improved at all from age 14 (fingers crossed). 

So with out further ado, let me introduce you to dSearchr! You might be wondering what it does, so here is some quick info taken straight ~~out of 2009~~ from the [Google Code repo](https://code.google.com/archive/p/dsearchr/).

> dSearchr is a simple single file, directory content search script written in PHP5.  
  It is highly customizable, and super easy to incorporate with your existing website.  
  Hiding files and and adding error messages is just as easy to do.  
  &mdash; Me
  Best of all, there's no SQL or databases, just point it to a directory and start searching.  

Look at that beautifully crafted pitch, and PHP5 - oh boy! Ok enough sarcasm, let's see the code.

{% gist dca3e8d85fed71583dde8db17175f592 search.php %}
<small>*search.php, released Aug 28, 2009 in all of it's original glory*</small>

Ok, so it's pretty bad. I'll start with the most general issues and then work my way down from the top. 

1. Linting & code format. Was linting a word in 2009? I'm not sure, but I clearly had never head it.
1. Unrelated code. Lines 5 - 15 and pretty much all the HTML in the document should have been removed. Side note, at the time I was building a music player webapp so that I could learn the then newfangled HTML5 spec. The fact that you could use `<audio>` to embed audio was amazing, such simpler times!
1. Variable names. What is $des? <sup><small>[get it, what is this?... sorry...]</small></sup> Variable names could have been much more clear and made the coder easier to read.
1. Useless variable reassignment. I'm really not sure what's up with lines 22 & 23...
1. Weird conditional on line 27. Why not invert it at get rid of the else clause.


A few years later, I was motivated me to release a few minor revisions, let's take a quick look at the last one.

{% gist 17c10b0685918bf8a26dee05e3e86855 search.php %}
<small>*search.php v1.2! Now with less eye bleeding!*</small>

It's still not great, but it's better! So... progress 🎉! At it's peak, it had about 2000 downloads, a little wiki, and even a few bugs opened. 

As a last little experiment, I thought it might be interesting to see what the code would look like if I refactored it today. Shout-out to [@sylhare](https://sylhare.github.io/) for the suggestion.
{% gist a80927a3a2ef872a8db37fd779752dad search.php %}

Is it better? I mean, it's still PHP. <sup><small>I'm teasing of course, I write js for a living</small></sup>

After basic linting, probably the most valuable change is moving the important (from a dev/user point of view) variables to the top of the file. Other then that it's just small enhancements. Putting the files to exclude in an array, excluding the name of the current file without hardcoding it, making a little utility function to make the code read a more naturally.

It's been quite some time since I've done any PHP, so i'm sure there is still room for improvement.

Anyways, the code itself is not what actually matters with these kinds of projects and I hope this post proves that. I think what matters is making shit and putting it out there. It doesn't matter how small, how simple or how useless. Someone else might find value in it and to me that makes it worth it. Plus, I think it's also pretty cool to be able to look back on how you've improved (or haven't) over time!