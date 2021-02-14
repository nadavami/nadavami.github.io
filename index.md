---
layout: default
title: Home
---

Hi there!

Below you'll find a list everything I've written. There is also an [RSS feed]({{site.base_url }}{% link atom.xml %}) if that's your thing. If you want know the person behind these silly posts (or want to say hi), check out my [about page]({{site.base_url }}{% link about.md %}). You can also follow me on [GitHub](https://github.com/{{ site.author.github }}). Oh and please forgive me in advance for my bad jokes and occasional spelling mistakes.

Happy reading,  
Nadav

<!--  You're looking at the source of this page and that's cool, but this page is kinda boring...
      But since you're here I'll tell you a secret. There's something hidden on an even more boring page. -->

### Posts
<dl>
{% for post in site.posts  %}
{%- capture this_date %}{{ post.date | date: "%b %Y" }}{% endcapture %}
{%- capture next_date %}{{ post.next.date | date: "%b %Y" }}{% endcapture %}
  <dt>{% if this_date != next_date %}{{ this_date }}{% endif %}</dt>
  <dd><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></dd>
{% endfor %}
</dl>