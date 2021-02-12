---
layout: default
title: Home
---

# Posts

<dl>
{% for post in site.posts  %}
{%- capture this_date %}{{ post.date | date: "%b %Y" }}{% endcapture %}
{%- capture next_date %}{{ post.next.date | date: "%b %Y" }}{% endcapture %}
  <dt>{% if this_date != next_date %}{{ this_date }}{% endif %}</dt>
  <dd><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></dd>
{% endfor %}
</dl>