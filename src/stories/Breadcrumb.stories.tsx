import React from 'react';

import { FiChevronRight } from 'react-icons/fi';

import type { Meta, StoryObj } from '@storybook/react';

import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

/* ────────────────────────────────────────────────────────────────────────── */
/*                                   META                                    */
/* ────────────────────────────────────────────────────────────────────────── */

const meta = {
	title: 'OrionShadcn/Breadcrumb',
	component: Breadcrumb,
	subcomponents: {
		BreadcrumbList,
		BreadcrumbItem,
		BreadcrumbLink,
		BreadcrumbSeparator,
		BreadcrumbEllipsis,
		BreadcrumbPage,
	},
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		controls: { expanded: true },
		docs: {
			description: {
				component: `
A **shadcn/ui**-compliant breadcrumb composed of seven atomic parts:

| Sub-component          | Role                                                                    |
| ---------------------- | ----------------------------------------------------------------------- |
| \`Breadcrumb\`          | Wrapper (\`<nav aria-label="breadcrumb">\`)                             |
| \`BreadcrumbList\`      | Ordered list (\`<ol>\`) for proper semantics                           |
| \`BreadcrumbItem\`      | List item (\`<li>\`)                                                    |
| \`BreadcrumbLink\`      | Clickable link with hover/focus states                                  |
| \`BreadcrumbPage\`      | Marks the current location (\`aria-current="page"\`)                   |
| \`BreadcrumbSeparator\` | Separator glyph (defaults to \`/\`)                                     |
| \`BreadcrumbEllipsis\`  | Optional overflow indicator                                            |

All styles are Tailwind-4 classes, so the breadcrumb automatically picks up
your design-system tokens.

Examples are interactive – open the **Canvas** tab or jump straight to the
**Playground** story to experiment.
        `,
			},
		},
	},
} satisfies Meta<typeof Breadcrumb>;

export default meta;

/* A handy alias for stories that match \`Breadcrumb\` props exactly */
type Story = StoryObj<typeof Breadcrumb>;

/* ────────────────────────────────────────────────────────────────────────── */
/*                                 STORIES                                   */
/* ────────────────────────────────────────────────────────────────────────── */

/* 1. Basic usage ─────────────────────────────────────────────────────────── */
export const Basic: Story = {
	name: 'Basic',
	render: () => (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink href="/library">Library</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Data</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
	parameters: {
		docs: {
			description: {
				story: 'A classic three-level breadcrumb with the current page disabled.',
			},
		},
	},
};

/* 2. With Ellipsis ───────────────────────────────────────────────────────── */
export const WithEllipsis: Story = {
	name: 'With Ellipsis',
	render: () => (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink href="/library">Library</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbEllipsis />
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink href="/guides">Guides</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use **`BreadcrumbEllipsis`** to collapse intermediate paths when horizontal space is scarce.',
			},
		},
	},
};

/* 3. Custom separator (icon) ─────────────────────────────────────────────── */
export const CustomSeparator: Story = {
	name: 'Custom Separator',
	render: () => (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>
					<FiChevronRight className="inline-block text-muted-foreground" />
				</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbLink href="/react">React</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>
					<FiChevronRight className="inline-block text-muted-foreground" />
				</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Any React node can live inside **`BreadcrumbSeparator`**. Here we use `FiChevronRight` from **react-icons/fi**.',
			},
		},
	},
};

/* 4. Playground (interactive) ──────────────────────────────────────────────
 * We need extra args (\`useIconSeparator\`, \`levels\`) that do **not** exist
 * on the \`Breadcrumb\` component itself.  Therefore we extend the props type.
 */
type PlaygroundArgs = {
	/** Toggle between “/” and an icon for the separator. */
	useIconSeparator: boolean;
	/** Number of breadcrumb levels (2-6). */
	levels: number;
};

/* By passing <PlaygroundArgs> to StoryObj we satisfy TypeScript.
 * Storybook 8 will still show controls for our custom args.
 */
export const Playground: StoryObj<PlaygroundArgs> = {
	name: 'Playground',
	args: {
		useIconSeparator: true,
		levels: 3,
	},
	argTypes: {
		useIconSeparator: {
			description: 'Toggle between `/` and an icon as the separator',
			control: 'boolean',
		},
		levels: {
			description: 'Number of breadcrumb levels (2-6)',
			control: { type: 'range', min: 2, max: 6, step: 1 },
		},
	},
	render: ({ useIconSeparator, levels }) => {
		const items = Array.from({ length: levels }, (_, i) => `Level ${i + 1}`);

		return (
			<Breadcrumb>
				<BreadcrumbList>
					{items.map((label, idx) => {
						const isLast = idx === items.length - 1;
						return (
							<React.Fragment key={label}>
								<BreadcrumbItem>
									{isLast ? (
										<BreadcrumbPage>{label}</BreadcrumbPage>
									) : (
										<BreadcrumbLink href="#">{label}</BreadcrumbLink>
									)}
								</BreadcrumbItem>

								{!isLast && (
									<BreadcrumbSeparator>
										{useIconSeparator ? <FiChevronRight className="inline-block text-muted-foreground" /> : '/'}
									</BreadcrumbSeparator>
								)}
							</React.Fragment>
						);
					})}
				</BreadcrumbList>
			</Breadcrumb>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					'An **interactive sandbox** backed by Storybook Controls. Adjust the number of levels and the separator style in real time.',
			},
		},
	},
};
