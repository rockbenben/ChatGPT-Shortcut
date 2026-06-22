---
sidebar_label: Keeping Your Fork in Sync
title: AI Short Sync Updates | Keep Your Fork Following Upstream
description: Keep your AI Short fork automatically following upstream updates — fix the "update available" prompt on Vercel deployments and enable automatic GitHub Actions syncing.
---

# Keeping Your Fork in Sync

A one-click Vercel deployment may keep showing an "update available" prompt — because Vercel creates a new project rather than a fork, so it can't detect upstream updates. To fix this:

1. Delete the original repository
2. Use the **Fork** button at the top-right of the page to fork this project
3. On the [Vercel new-project page](https://vercel.com/new), re-import the forked repository under Import Git Repository and deploy

## Enable Auto-Update

> If you hit an Upstream Sync error, run Sync Fork manually once!

After forking, manually enable Workflows on the Actions page and run the Upstream Sync action once. Once enabled, the project syncs automatically every day:

![Auto-update](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Enable auto-update](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

## Manual Update

Want to update immediately by hand? See the [GitHub fork-syncing docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork).

You can also star / watch this project to get notified of new features.
