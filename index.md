---
layout: default
title: Home
sitemap:
  priority: 0.7
---

Hi there! Welcome to my slice of web.

Below you'll find a list of everything I've written. If you want to get to know the person behind these ramblings (or just want to say hi), the [about page]({{ site.base_url }}{% link about.md %}) is your best bet. You can also read [my resume]({{ site.base_url }}{% link resume.md %}), find me on [GitHub](https://github.com/{{ site.author.github }}), or subscribe via [RSS]({{ site.base_url }}{% link atom.xml %}) if that's your thing.

Happy reading,  
Nadav

<!--  You're looking at the source of this page and that's cool, but this page is kinda boring...
      But since you're here I'll tell you a secret. There's something hidden on an even more boring page. -->

# Writing
<div class="post-list">
  {%- for post in site.posts %}
  <div class="post-list-item">
    <span class="post-list-title"><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></span>
    <time class="post-list-date" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%Y-%m-%d' }}</time>
  </div>
  {%- endfor %}
</div>
