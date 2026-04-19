---
layout: post
title: "str[0] lies about emoji"
description: "An interactive post about JavaScript, Unicode, and the three ways to get the first character of a string."
date: 2026-04-18
---

Say you built an app and wanted to show a user's initial in an avatar, to do so you KISS:

```js
const avatar = displayName[0]
```

<div class="avatar-row"><code>const displayName = "Nadav"</code> <span class="avatar" data-step="1"></span></div>
<button class="run-btn" data-step="1">lgtm</button>

<div data-step="2" style="display:none">

One day, a user decides to make their display name:

<div class="avatar-row"><code>const displayName = "🇨🇦 Mike"</code> <span class="avatar"></span></div>
<div class="avatar-row">or <code>const displayName = "👍🏽 Dave"</code> <span class="avatar"></span></div>
<div class="avatar-row">or <code>const displayName = "👨‍👩‍👧‍👦 The Smiths"</code> <span class="avatar"></span></div>
<div class="avatar-row">or maybe <code>const displayName = "🤷 idk"</code> <span class="avatar"></span></div>

<button class="run-btn" data-step="2">should work right?</button>
</div>

<div data-step="3" style="display:none" markdown="1">

*\*slack bloop\** avatars are broken, pls fix.

```js
const avatar = [...displayName][0]
```

<button class="run-btn" data-step="3">that should fix it</button>

<div data-step="3-results" style="display:none" markdown="1">
<div class="avatar-inline">
<span class="avatar"></span> <span class="avatar"></span> <span class="avatar"></span> <span class="avatar"></span>
</div>

Closer, but notice how the flag split into a letter, the thumbs up lost its skin tone, and the family is just a man now? Hold that thought.

</div>
</div>

<div data-step="4" style="display:none" markdown="1">

```js
const seg = new Intl.Segmenter('en', { granularity: 'grapheme' })
const avatar = [...seg.segment(displayName)].map(x => x.segment)[0]
```

<button class="run-btn" data-step="4">will that fix it?</button>

<div class="avatar-inline">
<span class="avatar"></span> <span class="avatar"></span> <span class="avatar"></span> <span class="avatar"></span>
</div>
</div>

<div id="debrief" style="display:none" markdown="1">

## ok but why

`str[0]` doesn't give you a character, it gives you a code unit. A chunk of UTF-16, which is how JavaScript stores strings internally. For `a`, `1`, or `$`, one code unit is the whole character and you never notice. But most emoji live outside the Basic Multilingual Plane (*they're like on a different dimension maaaan*) and need two code units to fit (aka surrogate pairs). `str[0]` hands you the first one, half an emoji. That's the garbage in those avatars.

Spread helps. `[...str]` splits on codepoints instead of code units. Closer, but emoji like 👨‍👩‍👧‍👦 are actually four emoji joined by zero-width joiners. Spreading rips the family apart (rough I know). Skin tone is a separate modifier codepoint, gone. Flags are actually two regional indicator letters that render as a flag when paired, also gone.

`Intl.Segmenter` splits on graphemes, one visual character each, regardless of how many codepoints it takes to make them.

That's it. If a user still sees <span class="hint" title="you know those little blank boxes...">tofu</span>, their OS is older than the emoji. Tell them to update or eat it (the tofu I mean...).

</div>

<link rel="stylesheet" href="emoji-chaos.css" />
<script src="emoji-chaos.js"></script>
