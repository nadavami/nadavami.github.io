---
layout: default
title: Home
---

Hello! If you want to say hi back or get to know me, check out my [about page]({{site.base_url }}{% link about.md %}).  
Below you'll find list of all my posts, there is also an [RSS feed]({{site.base_url }}{% link atom.xml %}) if that's more your thing.  

# Posts
<dl>
{% for post in site.posts  %}
{%- capture this_date %}{{ post.date | date: "%b %Y" }}{% endcapture %}
{%- capture next_date %}{{ post.next.date | date: "%b %Y" }}{% endcapture %}
  <dt>{% if this_date != next_date %}{{ this_date }}{% endif %}</dt>
  <dd><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></dd>
{% endfor %}
</dl>