---
layout: default
title: Links
---

<div class="breadcrumbs"><a href="/">Home</a> &gt; Follow Digital Altar</div>

<h1>Links</h1>

<h2>Social Media</h2>
<p>Find me with the following platforms and handles:</p>

{% assign social_links = site.data.social_links %}
<ul class="linklist">
	{% for social_link in social_links %}
	  <li>
	  	<a href="{{ social_link.url }}">{{ social_link.name }}</a>
	  	<span>{{ social_link.description }}</span>
	  </li>
	{% endfor %}
</ul>

<h2>Web3</h2>
<p>Find me with the following aliases:</p>

{% assign web3_links = site.data.web3_links %}
<ul class="linklist">
	{% for web3_link in web3_links %}
	  <li>
	  	<a href="{{ web3_link.url }}">{{ web3_link.name }}</a>
	  	<span>{{ web3_link.description }}</span>
	  </li>
	{% endfor %}
</ul>

<h2>Additional Links</h2>
<p>Some resources and friends:</p>

{% assign additional_links = site.data.additional_links %}
<ul class="linklist">
	{% for additional_link in additional_links %}
	  <li>
	  	<a href="{{ additional_link.url }}">{{ additional_link.name }}</a>
	  	<span>{{ additional_link.description }}</span>
	  </li>
	{% endfor %}
</ul>