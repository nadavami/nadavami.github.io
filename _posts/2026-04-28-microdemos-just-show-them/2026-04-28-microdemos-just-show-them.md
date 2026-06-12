---
layout: post
title: "Microdemos: Just 🤬 Show Them"
description: "Build throwaway demos instead of docs and iterate with product in real time."
interactive: true
redirect_from: /2026/04/28/microdemos-just-show-them/
---

<div class="callout callout--note" markdown="1">

**TL;DR**\\
Skip the doc and use agentic coding to build a [microdemo](#microdemo-def). Building it forces you to scope the problem and understand it well. Then, put it in front of product and iterate live.

**Want to skip ahead and see one?**\\
[example 1 ↓](#example-1-recommendation-scoring) · [example 2 ↓](#example-2-harping-on-it)

**Want to try it?**\\
[Download the Claude Code skill](microdemo-skill.zip)

</div>

I keep running into the same problem. I'm building something where good results are subjective. Search results, recommended movies, restaurants sorted by "relevance." It usually boils down to engineers crossing our fingers, combining a bunch of competing signals and making a judgment call about what needs to get built. It often goes something like:

> *Product wants something ambiguous built.*
>
> *Engineer writes a doc.*
>
> *Product reads it. Everyone aligns.*
>
> *It gets built.*
>
> *"That's not what we expected."*
> 
> *"You weren't clear enough about what you wanted."*
> 
> *and the blame gets passed back and forth while the feature still isn't what customers want*

Nobody was really *wrong*, but who can actually make useful sense of 
> *"better recommendations"*

or

> *well if distance weight is 3 and rating weight is 0.5...*

User acceptance testing and feature-flagged experiments help validate ideas, but I'd argue they're still too slow for ambiguous requirements. They force us to build a full thing and then see. 

What if we could get on the same page *before* we build or loop a customer in?

Enter microdemos.

<div class="callout callout--note" markdown="1" id="microdemo-def">

**microdemo** /ˈmī-krō-ˌde-mō/\\
*n.* A tightly-scoped, throwaway, interactive demo that exposes implicit assumptions about ambiguous problems.

</div>

---

### example 1: recommendation scoring

Product wants a restaurant recommendation feature. It's currently sorted by rating, but users say results don't feel relevant.

*Prompt:*
> Look at the restaurant model in the codebase and build me a one-page interactive spike doc for our "recommended for you" ranking. There's no user input, this is system-generated. Frame it as a problem statement with an interactive demo. Generate synthetic data that matches the schema. Signals: distance, rating, review count, recency. Sliders for each weight so product can tune them. Include open questions and out of scope from the attached requirements doc. The output should be a single HTML file with no external data calls.

The microdemo is ready in minutes and you can talk about *what the customer sees* in concrete terms.

Here's a quick version, drag the sliders:

{% include_relative _rec-teaser.html %}

Here's <a href="microdemos/rec-ranking.html" target="_blank">the full version</a> that is way more demoable, you can have an actual conversation around this.

### the point

**You get to a useful conversation faster.**

**Your repo is 90% of the prompt.** A short prompt generates outsized results because the tool already has your context. I didn't need to pull a frontend repo or stuff the context window with code I don't normally work in.

**Nobody thinks it's done before it is.** The full recommendation demo has rough edges. The layout shifts, the open questions section sits a little off. Nobody in a product meeting gets hung up on that in a throwaway spike. Contrast that with the actual product UI, where every misaligned pixel detracts from the conversation and a polished prototype accidentally communicates "we can just ship this, right?"

**It accelerates the conversation.** Build it before the meeting and bake in the controls you think people will want, or do it live and figure it out together. First prompt doesn't get it? Scrap it and try again. Someone asks "what about recency?" Add the slider then and there, it only takes five minutes.

**One page keeps it honest.** There's only so much you can fit in a prompt, which forces you to (de)scope aggressively, that's a feature. Like making a cheat sheet for an exam, building the demo teaches you the material. You can't ask for sliders for signals you haven't identified.

### example 2: harping on it

I needed to pick colors for this site. Usually you mock up options, flip between them, try to remember what B looked like while staring at C, but oh shit, what about accessibility and contrast ratings? 

One prompt to Claude Code and bam! Another microdemo, the <a href="microdemos/color-lab.html" target="_blank">color lab</a>.

It pulled the actual fonts, actual layouts, actual color roles from the repo because it could read my HTML and SCSS. Every token has a picker that updates live, contrast scores are right there, and all the key elements are on one page.

### still thinking about

- HTML doesn't diff well in code review, is there any value in keeping these somewhere or is throwaway really throwaway?
- If we do keep them, where do these live? Next to the code they informed? A docs folder? Somewhere else?
- Should the demo bundle docs into itself? Problem statement, approach comparison, open questions, one artifact? I'm leaning yes, but it makes async collaboration harder since you can't comment on an HTML file the way you can a doc. Maybe that's fine?
- Does this only work synchronously? The magic is pointing at a list together and saying "should this be higher?" That's hard to do in a Slack thread. When does a demo stop being the right tool and a doc take over?

If you've tried something like this or have thoughts on any of the above, I'd love to hear about it: {% include post-feedback.html %}
