---
layout: post
title: Exploring and Modifying Electron Apps on macOS
description: A few commands to help explore, debug and modify signed electron apps
  on macOS.
date: 2023-04-01 19:37 -0700
---
In my previous job, I was building a side-car app using Electron. I occasionally found myself needing to debug a packaged production app and this post is just a few commands I that have been helpful to me. 

**Unpack and Repack ASAR archives:**
Electron apps often store their resources in ASAR files, which are simple archives. You can easily extract/modify/repack the contents using the asar package.

```bash
npm i -g asar
asar extract app.asar destfolder
asar pack sourcefolder app.asar
```

**Allow modified signed package to run:**
If you've modified a signed Electron app macOS Gatekeeper will prevent you from running it, displaying a "Damaged app" dialog. To bypass this restriction and skip the Gatekeeper checks, you can strip the quarantine attribute like this:

```bash
xattr -r -d com.apple.quarantine /path/to/xyz.app
```