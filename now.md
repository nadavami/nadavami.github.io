---
layout: page
title: Now
---

{%- assign snapshots = site.data.now.snapshots | sort: "date" -%}
{%- assign snap_count = snapshots | size -%}
{%- assign current_idx = snap_count | minus: 1 -%}
{%- assign current = snapshots[current_idx] -%}

<p class="now-lede">A snapshot of what's <em>actually</em> taking up my time, attention, and bench space.</p>

  {%- if snap_count > 1 -%}
    {%- assign prev_prompt_idx = current_idx | minus: 1 -%}
    {%- assign prev_for_prompt = snapshots[prev_prompt_idx] -%}
  <p class="terminal-prompt now-prompt"><span class="terminal-cmd">now --diff=</span><span class="terminal-arg" data-now-prompt>{{ prev_for_prompt.date }}..{{ current.date }}</span><span class="now-caret" aria-hidden="true"></span></p>
  {%- else -%}
  <p class="terminal-prompt now-prompt"><span class="terminal-cmd">now --at=</span><span class="terminal-arg" data-now-prompt>{{ current.date }}</span><span class="now-caret" aria-hidden="true"></span></p>
  {%- endif -%}

  {%- if snap_count > 1 -%}
  <div class="now-tl-row">
    <div class="now-tl" role="group" aria-label="Snapshot timeline">
      {%- for snap in snapshots -%}
      <button class="now-tl-tick{% if forloop.last %} active{% endif %}" data-now-tick="{{ forloop.index0 }}" aria-label="Snapshot {% if forloop.last %}now{% else %}{{ snap.date | date: "%b '%y" }}{% endif %}">
        <span class="now-tl-dot"></span>
        <span class="now-tl-label">{% if forloop.last %}now{% else %}{{ snap.date | date: "%b '%y" }}{% endif %}</span>
      </button>
      {%- endfor -%}
    </div>
  </div>
  {%- endif -%}

  {%- for snap in snapshots -%}
  {%- assign snap_idx = forloop.index0 -%}
  {%- assign is_latest = forloop.last -%}
  {%- if snap_idx > 0 -%}
    {%- assign prev_idx = snap_idx | minus: 1 -%}
    {%- assign prev_snap = snapshots[prev_idx] -%}
  {%- else -%}
    {%- assign prev_snap = nil -%}
  {%- endif -%}
  <div class="now-snapshot" data-snapshot="{{ snap_idx }}" data-date="{{ snap.date }}"{% unless is_latest %} hidden{% endunless %}{% if prev_snap %} data-prev-date="{{ prev_snap.date }}"{% endif %}>

    {%- comment -%} Count flags for the legend {%- endcomment -%}
    {%- assign add_count = 0 -%}
    {%- assign chg_count = 0 -%}
    {%- assign rem_count = 0 -%}

    <table class="now-table">
      <thead>
        <tr>
          <th style="width: 2ch"></th>
          <th style="width: 7em">category</th>
          <th>item</th>
        </tr>
      </thead>
      <tbody>
        {%- for item in snap.items -%}
          {%- assign item_id = item.cat | append: " " | append: item.name | slugify -%}
          {%- assign flag = "" -%}
          
          {%- if prev_snap -%}
            {%- assign found_in_prev = false -%}
            {%- for prev_item in prev_snap.items -%}
              {%- assign prev_id = prev_item.cat | append: " " | append: prev_item.name | slugify -%}
              {%- if prev_id == item_id -%}
                {%- assign found_in_prev = true -%}
                {%- if prev_item.detail != item.detail -%}
                  {%- assign flag = "chg" -%}

                  {%- assign chg_count = chg_count | plus: 1 -%}
                {%- endif -%}
                {%- break -%}
              {%- endif -%}
            {%- endfor -%}
            {%- unless found_in_prev -%}
              {%- assign flag = "add" -%}
              {%- assign add_count = add_count | plus: 1 -%}
            {%- endunless -%}
          {%- else -%}
            {%- comment -%} No previous snapshot — everything is new {%- endcomment -%}
            {%- assign flag = "add" -%}
            {%- assign add_count = add_count | plus: 1 -%}
          {%- endif -%}

          <tr>
            <td><span class="now-flag {{ flag }}">{% if flag == "add" %}+{% elsif flag == "chg" %}~{% endif %}</span></td>
            <td><span class="now-cat {{ flag }}">{{ item.cat }}</span></td>
            <td>
              <span class="now-item">
                {%- if item.url -%}
                <a href="{{ item.url }}" target="_blank" rel="noopener" class="now-name">{{ item.name }}</a>
                {%- else -%}
                <span class="now-name">{{ item.name }}</span>
                {%- endif -%}
                {%- if item.detail %}<span class="now-detail">{{ item.detail }}</span>{% endif -%}
              </span>
            </td>
          </tr>
        {%- endfor -%}

        {%- comment -%} Removed items: in prev but not in current {%- endcomment -%}
        {%- if prev_snap -%}
          {%- for prev_item in prev_snap.items -%}
            {%- assign prev_id = prev_item.cat | append: " " | append: prev_item.name | slugify -%}
            {%- assign still_exists = false -%}
            {%- for item in snap.items -%}
              {%- assign item_id = item.cat | append: " " | append: item.name | slugify -%}
              {%- if item_id == prev_id -%}
                {%- assign still_exists = true -%}
                {%- break -%}
              {%- endif -%}
            {%- endfor -%}
            {%- unless still_exists -%}
              {%- assign rem_count = rem_count | plus: 1 -%}
          <tr>
            <td><span class="now-flag rem">&minus;</span></td>
            <td><span class="now-cat rem">{{ prev_item.cat }}</span></td>
            <td>
              <span class="now-item">
                {%- if prev_item.url -%}
                <a href="{{ prev_item.url }}" target="_blank" rel="noopener" class="now-name">{{ prev_item.name }}</a>
                {%- else -%}
                <span class="now-name">{{ prev_item.name }}</span>
                {%- endif -%}
                {%- if prev_item.detail %}<span class="now-detail">{{ prev_item.detail }}</span>{% endif -%}
              </span>
            </td>
          </tr>
            {%- endunless -%}
          {%- endfor -%}
        {%- endif -%}
      </tbody>
    </table>

    <div class="now-legend">
      <span class="add"><code>+</code> added <strong>{{ add_count }}</strong></span>
      <span class="chg"><code>~</code> changed <strong>{{ chg_count }}</strong></span>
      <span class="rem"><code>&minus;</code> done <strong>{{ rem_count }}</strong></span>
      {%- if prev_snap -%}
      <span class="now-legend-sep">since {{ prev_snap.date }}</span>
      {%- endif -%}
    </div>
  </div>
  {%- endfor -%}

  <div class="now-end" data-now-hint="scrub"{% if snap_count < 2 %} hidden{% endif %}>scrub the timeline to see older diffs · <span style="opacity: 0.7">&larr; / &rarr;</span></div>
  <div class="now-end" data-now-hint="jump" hidden><button class="now-jump-btn" data-now-jump>jump to now &rarr;</button></div>

  <p class="now-colophon"><small>Inspired by <a href="https://nownownow.com/about" target="_blank" rel="noopener">nownownow.com</a>.</small></p>
