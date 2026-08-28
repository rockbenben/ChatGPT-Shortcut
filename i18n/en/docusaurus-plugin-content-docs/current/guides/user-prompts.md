---
sidebar_label: Custom Prompts
title: AI Short Custom Prompts | Create, Edit & Share
description: Create your own AI prompts and save them to your account for instant access. Share to the community or keep private, and export backups in one click.
---

# Custom Prompts

After logging in, you can create your own prompts and save them to your account for quick access later. Custom prompts appear in the "My collection" view.

## Create Prompt

1. After logging in, click the "**Create prompt**" button at the top of the page
2. Fill in the "Create prompt" dialog:
   - **Prompt Name** (required): A name for the prompt
   - **Prompt content** (required): The body of the prompt; text in square brackets `[...]` is highlighted as a placeholder when displayed
   - **Usage** (optional): A short description of what the prompt does
   - **Notes** (optional): Source, other-language versions, or supplementary notes
3. The share switch at the bottom is on by default — turn it off to keep the prompt private
4. Click "Create prompt" to submit

![Create Prompt Dialog](/img/docs/user-prompts-create.png)

> 💡 **Example** — a "Standup Update Generator" prompt:
> - **Prompt Name**: Standup Update Generator
> - **Prompt content**: You are a concise communication assistant. Turn the following notes into a daily standup update with three sections — Yesterday, Today, Blockers. Keep each bullet short and outcome-focused: [my raw notes]
> - **Usage**: Converts messy notes into a clean standup update
> - **Notes**: Run before the morning standup

## Edit Prompt

In the My Collection view, click the edit (pencil) button on a prompt card you created to open the "Edit prompt" dialog. You can:

- Modify name, content, usage, and notes
- Toggle sharing status (public / private)
- Click "Save" to update

![Edit Prompt Interface](/img/docs/user-prompts-edit.png)

## Delete Prompt

In the My Collection view, click the delete (trash) button on your prompt card and confirm. Deletion cannot be undone — proceed with care.

## Share to Community

When creating or editing, the share switch at the bottom controls visibility:

- **On (default)**: The prompt appears on the [Community Prompts](./community) page, where other users can see and collect it
- **Off**: Private — visible only to you

Sharing status can be toggled at any time.

## Export Prompts

1. Go to "My account" and find the "Data management → Export prompts" section
2. Click the "Export data" button
3. The system generates a JSON file and downloads it automatically

Exported content includes:

- Prompt name, content, usage, and notes
- Sharing status
- Your collections, collection order, and custom tags

Regular exports are recommended to prevent data loss.

## Import Prompts

Import prompts and collections from a JSON file:

1. Go to "My account" and find the "Data management → Import prompts" section
2. Click the "Import data" button
3. Select a JSON file
4. The system merges the data automatically (matched by ID: prompts sharing an ID with yours are updated, or skipped when identical; those with no ID or an ID from another account are imported as new entries, the latter forced to private)

### Team Collaboration

Recommended workflow for sharing prompts within a team:

1. **Filter and share**: After exporting, manually remove your collection list or filter down to the prompts you want to share, then send the file to team members to import
2. **Privacy protection**: Imported prompts owned by others (IDs not belonging to the current account) are automatically set to **private**, so each member's data stays separate

## Related Documentation

- [My Collection](./my-collection) - Collection and tag management
- [Community Prompts](./community) - Share and vote
- [Account Management](./account) - Login and settings
