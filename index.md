---
layout: default
title: Home
sitemap:
  priority: 0.7
cycler:
  - backend engineer
  - vector search nerd
  - recovering CTO
  - film photographer
  - weekend tinkerer
---

Hi there! I'm Nadav, a {% include cycler.html words=page.cycler %}.\\
Welcome to my little slice of web.
{: .hero-line}

Below you'll find a list of everything I've written. If you want to get to know the person behind these ramblings (or just want to say hi), the [about page]({{ site.base_url }}{% link about.md %}) is your best bet. You can also read [my resume]({{ site.base_url }}{% link resume.md %}), find me on [GitHub](https://github.com/{{ site.author.github }}), or subscribe via [RSS]({{ site.base_url }}{% link atom.xml %}) if that's your thing.

Happy reading,  
Nadav

<!--  You're looking at the source of this page and that's cool, but this page is kinda boring...
      But since you're here I'll tell you a secret. There's something hidden on an even more boring page. -->

# Writing
<div class="post-list">
  {%- assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
  {%- for year in posts_by_year %}
  <div class="post-list-year">
    <span class="post-list-year-num">{{ year.name }}</span>
    <span class="post-list-year-rule"></span>
    <span class="post-list-year-count">{{ year.items.size }} post{% if year.items.size != 1 %}s{% endif %}</span>
  </div>
  {%- for post in year.items %}
  <div class="post-list-item">
    <span class="post-list-title"><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}{% if post.interactive %} <span class="post-mark">interactive</span>{% endif %}</a></span>
    <time class="post-list-date" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%Y-%m-%d' }}</time>
  </div>
  {%- endfor %}
  {%- endfor %}
</div>
