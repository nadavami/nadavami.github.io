---
layout: default
title: Home
---

# Posts

{% for post in site.posts  %}
{% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
{% capture this_month %}{{ post.date | date: "%B" }}{% endcapture %}
{% capture next_year %}{{ post.previous.date | date: "%Y" }}{% endcapture %}
{% capture next_month %}{{ post.previous.date | date: "%B" }}{% endcapture %}

{% if forloop.first %}
<dl>
  <dt>{{ this_month }} {{ this_year }}</dt>
{% endif %}

  <dd><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></dd>

{% if forloop.last %}
</dl>
{% elsif this_year != next_year or this_month != next_month  %}
  <dt>{{ next_month }} {{ next_year }}</dt>
{% endif %}
{% endfor %}
