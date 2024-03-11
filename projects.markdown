---
layout: default
title: Projects
permalink: /projects
---

{% include projects.html %}

<div class="instructions">
  <p>Please select a plant</p>
</div>

{% for project in site.data.projects %}
  <div class="project-details" id="{{ project.id }}" style="display:none;">
    <div class="project-image">
      <img src="{{ project.image }}" data-gif="{{ project.gif }}" alt="{{ project.title }}">
    </div>
    <div class="project-info">
      <h2>{{ project.title }}</h2>
      {% if project.description %}<p class="project-description">{{ project.description }}</p>{% endif %}
      {% if project.technology %}<p class="project-tech"><i class="gg-toolbox"></i> Technology used <span>{{ project.technology }}</span></p>{% endif %}
      {% if project.github_repo %}<p class="project-repo"><i class="gg-list-tree"></i> Github Repo <a href="{{ project.github_repo }}"><span>{{ project.github_repo | remove: 'https://github.com' }}</span></a></p>{% endif %}
      {% if project.features %}<p><i class="gg-moon"></i> Features <span>{{ project.features }}</span></p>{% endif %}
      {% if project.url %}<p class="project-url"><a href="{{ project.url }}"><i class="gg-website"></i> Visit project website</a></p>{% endif %}
    </div>
  </div>
{% endfor %}

{% comment %} Script for Next / Prev Buttons {% endcomment %}
<script>
let projects = [
  {% for project in site.data.projects %}
    {
      "id": "{{ project.id }}"
    }{% unless forloop.last %},{% endunless %}
  {% endfor %}
];
</script>

{% comment %} Script to Show / Hide Project Details {% endcomment %}
<script src="{{ '/assets/js/projects.js' | relative_url }}"></script>