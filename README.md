# Orion-shadcn

## Dependencies

- Basic

  - Corepack + yarn
  - vite > 6
  - tailwind > 4
  - react > 19
  - shadcn > 2.5 with newyork style
  - icons (used in storybook): lucide-react

- Lint/Fmt

  - eslint > 9
  - prettier > 3.5
  - prettier-plugin-sort-imports > 5.2
  - Note: May want to validate the configs for these properly and closely to match other consumers

- Storybook for dev, docs and tests

## Some choices to discuss/act on

- Peer dependencies
- Reconfirm on: vite/tailwind config
- Reconfirm on: eslint/prettier/vscode configs
- No app for demo, use storybook for writing docs, maintaining component tests
- CSS
  - Currently I bundle css too using tailwind so that it is available to consumers. If not needed, remove.
  - If css needs to be made available as a tailwind preset to consumers, that needs to be done separately. Can be done by creating a preset/index.ts and modifying the package.json exports.

## Components

| Component Name                    | Old Orion | Shadcn  | Comment                                                       |
| --------------------------------- | :-------: | :-----: | ------------------------------------------------------------- |
| Accordion                         |    yes    |   yes   | Direct mapping                                                |
| ActionButton                      |    yes    |   no    | Deprecated in Orion; use Dropdown with icon                   |
| Alert                             |    yes    |   yes   | Direct mapping                                                |
| AlertDialog                       |    no     |   yes   | Its a modal type dialog in shadcn                             |
| AutoSuggest                       |    yes    |   no    | Can be composed using Combobox/Autocomplete in shadcn         |
| Avatar                            |    yes    |   yes   | Direct mapping                                                |
| Badge                             |    yes    |   yes   | Direct mapping                                                |
| Bouncer                           |    yes    |   no    | Not present in shadcn; custom implementation needed           |
| Bread crumbs                      |    yes    |   yes   | Called "Breadcrumb" in shadcn                                 |
| Button                            |    yes    |   yes   | Direct mapping                                                |
| Button group                      |    yes    | partial | Can be composed using Button + Grouping                       |
| Card                              |    yes    |   yes   | Direct mapping                                                |
| Checkbox                          |    yes    |   yes   | Direct mapping                                                |
| Collapse                          |    yes    | partial | Accordion can be used for collapse                            |
| ConfirmationModal                 |    yes    | partial | Can be composed using AlertDialog/Modal                       |
| Container                         |    yes    |   no    | Layout component; use div/flex/grid in shadcn                 |
| Data Collection                   |    yes    |   no    | Composite; can be composed from Table, Pagination, etc.       |
| Data grid                         |    yes    |   no    | Not present; can use Table + custom logic                     |
| Date picker                       |    yes    |   yes   | Direct mapping                                                |
| Divider                           |    yes    |   yes   | Direct mapping                                                |
| Dropdown                          |    yes    |   yes   | Direct mapping                                                |
| Filter button                     |    yes    | partial | Can be composed using Button + Icon                           |
| Floater                           |    yes    |   no    | Not present; custom implementation needed                     |
| Footer-links                      |    yes    |   no    | Not present; can be composed                                  |
| Form and form group               |    yes    |   yes   | Direct mapping; FormField in shadcn                           |
| Frequently-visited-links          |    yes    |   no    | Not present; can be composed                                  |
| Global-footer                     |    yes    |   no    | Not present; can be composed                                  |
| Header-bar                        |    yes    |   no    | Not present; can be composed                                  |
| Heading                           |    yes    |   yes   | Direct mapping                                                |
| Icon                              |    yes    | partial | Use lucide-react                                              |
| Information modal                 |    yes    | partial | Can be composed using Modal/AlertDialog                       |
| Input                             |    yes    |   yes   | Direct mapping (Input, Textarea, etc.)                        |
| Input feedback                    |    yes    | partial | Can be composed using FormField + Description/Error in shadcn |
| Input group                       |    yes    | partial | Can be composed using Input + Addons                          |
| Label                             |    yes    |   yes   | Direct mapping                                                |
| Label value                       |    yes    |   no    | Can be composed using Label + Text                            |
| Loader                            |    yes    | partial | Use Spinner/Progress in shadcn                                |
| Message box                       |    yes    | partial | Can be composed using Alert/Toast                             |
| Modal                             |    yes    |   yes   | Direct mapping                                                |
| Motion diagram                    |    yes    |   no    | Not present; custom implementation needed                     |
| Number text                       |    yes    |   no    | Can be composed using Input type="number"                     |
| Orion Context                     |    yes    |   no    | App-specific; not in shadcn                                   |
| Orion Icons/icons/...             |    yes    | partial | Use lucide-react                                              |
| Page                              |    yes    |   no    | Layout component; can be composed                             |
| Pagination                        |    yes    |   yes   | Direct mapping                                                |
| Phone input                       |    yes    |   no    | Not present; can use third-party or custom                    |
| Popover                           |    yes    |   yes   | Direct mapping                                                |
| Powered by Druva                  |    yes    |   no    | App-specific; not in shadcn                                   |
| Progress                          |    yes    |   yes   | Direct mapping                                                |
| Radio                             |    yes    |   yes   | Direct mapping                                                |
| Range slider                      |    yes    |   yes   | Direct mapping                                                |
| Row/Col                           |    yes    |   no    | Layout; use flex/grid in shadcn                               |
| Select                            |    yes    |   yes   | Direct mapping                                                |
| Sidenav                           |    yes    | partial | Can be composed using Sidebar/Nav components                  |
| Sidebar                           |    yes    | partial | Can be composed using Sidebar/Nav components                  |
| Slider                            |    yes    |   yes   | Direct mapping                                                |
| Sortable                          |    yes    |   no    | Not present; custom implementation needed                     |
| Spinner                           |    yes    | partial | Use Loader/Progress in shadcn                                 |
| Table                             |    yes    |   yes   | Direct mapping                                                |
| Tabs                              |    yes    |   yes   | Direct mapping                                                |
| Tag                               |    yes    | partial | Use Badge or custom component                                 |
| Tag-select                        |    yes    |   no    | Not present; can be composed                                  |
| Templates/Global header template  |    yes    |   no    | Not present; can be composed                                  |
| Templates/Global sidebar template |    yes    |   no    | Not present; can be composed                                  |
| Text box                          |    yes    |   yes   | Input component in shadcn                                     |
| Time picker                       |    yes    |   yes   | Direct mapping                                                |
| Toast                             |    yes    |   yes   | Direct mapping                                                |
| Toggle                            |    yes    |   yes   | Direct mapping                                                |
| Tooltip                           |    yes    |   yes   | Direct mapping                                                |
| Trial badge                       |    yes    |   no    | Not present; can be composed using Badge                      |
| Trial progress                    |    yes    |   no    | Not present; can be composed using Progress                   |
| Tree                              |    yes    |   no    | Not present; custom implementation needed                     |
| Wizard                            |    yes    | partial | Can be composed using Steps + Modal                           |

## Composite ones that are added as example in shadcn docs

- combobox
- datatable
- datepicker
- toast - deprecated, use sooner

## Prompt

Always use Markdown format for output
tech stack: shadcn 2.5, react 19, ts, lucide react icons, tailwind 4, vite 6, storybook 8 (jest and testing library utils merged into test)
always give docs too inside stories
always give playground story too.
title of story OrionShadcn/<componentName>

transform, add and enhance below stories to match my tech stack.
always give full code back
