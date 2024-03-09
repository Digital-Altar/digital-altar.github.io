---
layout: default
title: Links
permalink: /links
---


<div class="links">
	<div class="links-image">
	</div>
	<div class="links-text">
		{% for group in site.data.links.groups %}
		  <h2><i class="{{ group.icon }}"></i> {{ group.name }}</h2>
		  <p>{{ group.text }}</p>
		  <ul class="ul-{{ group.icon }}">
		    {% for link in group.links %}
		      <li><a href="{{ link.url }}">{{ link.title }}</a> <span>{{ link.comment }}</span></li>
		    {% endfor %}
		  </ul>
		{% endfor %}
	</div>
</div>