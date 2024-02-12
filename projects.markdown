---
layout: default
title: Projects
---

<div class="breadcrumbs"><a href="/">Home</a> &gt; Digital Altar Projects</div>

<h1>Projects</h1>

<p>The following explorations are available online:</p>

{% assign projects_list = site.data.projects %}
<div class="projects-list">
	{% for project in projects_list %}
	  <div class="project">
	  	<a href="{{ project.url }}" target="_blank">
	  		<img src="{{ project.image_url }}" alt="">
	  		<div>
	  			<h2 class="name">{{ project.name }}</h2>
	  			<p class="description">{{ project.description }}</p>
	  		</div>
	  	</a>
	  </div>
	{% endfor %}
</div>