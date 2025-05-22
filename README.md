# Orion-shadcn

## Dependencies

- Basic

  - Corepack + yarn
  - vite > 6
  - tailwind > 4
  - react > 19
  - shadcn > 2.5

- Lint/Fmt

  - eslint > 9
  - prettier > 3.5
  - prettier-plugin-sort-imports > 5.2
  - Note: May want to validate the configs for these properly and closely to match other consumers

- Storybook for dev, docs and tests

## Some choices to discuss, act on

- Peer dependencies
- Reconfirm on: vite/tailwind config
- Reconfirm on: eslint/prettier/vscode configs
- No app for demo, use storybook for writing docs, maintaining component tests
- CSS
  - Currently I bundle css too using tailwind so that it is available to consumers. If not needed, remove.
  - If css needs to be made available as a tailwind preset to consumers, that needs to be done separately. Can be done by creating a preset/index.ts and modifying the package.json exports.
