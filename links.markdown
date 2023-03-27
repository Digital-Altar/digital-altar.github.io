---
layout: default
title: Links
---

<h1>Links</h1>
<p>Thank you for visiting. Your time and support are appreciated.</p>

{% assign links = site.data.links %}
<ul class="linklist">
	{% for link in links %}
	  <li>
	  	<a href="{{ link.url }}">{{ link.name }}</a>
	  	<span>{{ link.description }}</span>
	  </li>
	{% endfor %}
</ul>