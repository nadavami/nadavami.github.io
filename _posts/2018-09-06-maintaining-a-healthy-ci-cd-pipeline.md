---
layout: post
title: Maintaining a Healthy CI/CD Pipeline
date: 2018-09-06 10:44 -0400
---

### First, a bit of context
Yesterday, I took part in a discussion with a few colleagues about how we should be maintaining our CI/CD pipelines. Recently, some of them have been staying in a failed state for longer than usual or failing test cases are simply skipped/commented out. Below is a first draft of my opinions on the matter.

### Golden Rule: Keep It Green
The pipeline should always be green or be in the process of being made green.

### A red pipeline is a "stop the presses" event
In other words, when the pipeline fails new feature development stops and the team fixes it. Fixing the pipeline does not have to mean always fixing the underlying bug. In some cases fixing the issue is not straight forward, when this happens the commit can be reverted. With the pipeline back in the green state, a subset of team members can continue debugging and others can continue integrating new features.

### Fix False Positives
If we notice a bug make it through the pipeline. Add a test case to catch it and fix the bug. This way we maintain confidence in our pipeline status.

### Fix False Negatives
If our pipeline fails unexpectedly, we need to investigate and fix it as though the pipeline failed a test case. It's important to remember that pipeline code is the same as any other piece of code in our codebase; as developers it is our job to maintain it. 

It might be tempting to make the pipeline "artificially green" by commenting out a section or skipping a test. This shouldn't be done at all cost. Doing so essentially turns your false negative into a false positive and defeats the purpose of having a pipeline for a few reasons:
    1. It reduces confidence in the pipeline; all the written tests should be valid against the codebase.
    2. It hides the real state of the pipeline from anyone looking in (and who might be in a capacity to help).
    3. It pollutes the code. Commented code and skipped test cases can be hard to notice later on and are often missed by other developers who may not understand their significance.

**Also...**  
With regards to fixing false positives and negatives: If the team looks at the pipeline with a sort of "knowing smile" when it's 'green', it's a safe bet that there are false positives.
