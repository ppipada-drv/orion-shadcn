// src/components/ui/__stories__/Button.stories.tsx
/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { Button } from '@/components/ui/button';

/* ──────────────────────────────────────────────────────────────────────────
   META
   ──────────────────────────────────────────────────────────────────────── */

const meta: Meta<typeof Button> = {
	title: 'OrionShadcn/Button',
	component: Button,

	// show the Docs tab with automatic prop table
	tags: ['autodocs'],

	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
The **Button** component from **shadcn/ui**.  
Built with **Radix UI's \`<Primitive.button>\`** and styled using **Tailwind CSS 4**.

### Variants
• \`default\` – Primary action  
• \`secondary\` – Low-emphasis action  
• \`destructive\` – Dangerous / irreversible action  
• \`ghost\` – Borderless, transparent background  
• \`link\` – Looks like an inline link  
• \`outline\` – Bordered button

### Sizes
• \`sm\` – Small (28 px height)  
• \`default\` – Medium (32 px height)  
• \`lg\` – Large (40 px height)  
• \`icon\` – Square button for icons (height = width)

The component forwards refs and supports **\`asChild\`** to render any element (e.g. Next.js \`<Link>\`) while inheriting styles.
				`.trim(),
			},
		},
	},

	// global controls
	argTypes: {
		variant: {
			description: 'Visual style of the button.',
			control: { type: 'select' },
			options: ['default', 'secondary', 'destructive', 'ghost', 'link', 'outline'],
			table: { defaultValue: { summary: 'default' } },
		},
		size: {
			description: 'Pre-defined size of the button.',
			control: { type: 'select' },
			options: ['default', 'sm', 'lg', 'icon'],
			table: { defaultValue: { summary: 'default' } },
		},
		disabled: {
			description: 'Whether the button is disabled.',
			control: { type: 'boolean' },
		},
		children: {
			description: 'Button label / content.',
			control: 'text',
		},
		asChild: {
			description: 'Render a different element (e.g. Next.js Link) while keeping button styles.',
			control: false,
		},
	},

	args: {
		variant: 'default',
		size: 'default',
		children: 'Button',
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

/* ──────────────────────────────────────────────────────────────────────────
   VARIANT STORIES
   ──────────────────────────────────────────────────────────────────────── */

export const Default: Story = {
	parameters: {
		docs: { description: { story: '`variant="default"` – primary action.' } },
	},
	args: { variant: 'default' },
};

export const Secondary: Story = {
	parameters: {
		docs: { description: { story: '`variant="secondary"` – low-emphasis.' } },
	},
	args: { variant: 'secondary' },
};

export const Destructive: Story = {
	parameters: {
		docs: { description: { story: '`variant="destructive"` – dangerous action.' } },
	},
	args: { variant: 'destructive' },
};

export const Ghost: Story = {
	parameters: {
		docs: { description: { story: '`variant="ghost"` – minimal, no border.' } },
	},
	args: { variant: 'ghost' },
};

export const Link: Story = {
	parameters: {
		docs: { description: { story: '`variant="link"` – looks like hyperlink.' } },
	},
	args: { variant: 'link' },
};

export const Outline: Story = {
	parameters: {
		docs: { description: { story: '`variant="outline"` – bordered button.' } },
	},
	args: { variant: 'outline' },
};

/* ──────────────────────────────────────────────────────────────────────────
   SIZE STORIES
   ──────────────────────────────────────────────────────────────────────── */

export const SizeDefault: Story = {
	parameters: {
		docs: { description: { story: '`size="default"` – 32 px high.' } },
	},
	args: { size: 'default' },
};

export const SizeSmall: Story = {
	parameters: {
		docs: { description: { story: '`size="sm"` – 28 px high.' } },
	},
	args: { size: 'sm' },
};

export const SizeLarge: Story = {
	parameters: {
		docs: { description: { story: '`size="lg"` – 40 px high.' } },
	},
	args: { size: 'lg' },
};

export const SizeIcon: Story = {
	parameters: {
		docs: { description: { story: '`size="icon"` – square icon button.' } },
	},
	args: {
		size: 'icon',
		children: '🔔',
	},
};

/* ──────────────────────────────────────────────────────────────────────────
   DISABLED EXAMPLE
   ──────────────────────────────────────────────────────────────────────── */

export const Disabled: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Buttons can be disabled via the native `disabled` attribute.',
			},
		},
	},
	args: {
		variant: 'default',
		disabled: true,
		children: 'Disabled',
	},
};

/* ──────────────────────────────────────────────────────────────────────────
   AS CHILD (CUSTOM ELEMENT)
   ──────────────────────────────────────────────────────────────────────── */

export const AsChildLink: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Using `asChild` to render a Next.js `<Link>` (or any element) **while preserving button styles**.',
			},
		},
	},
	render: args => (
		<Button {...args} asChild>
			<a href="https://example.com" target="_blank" rel="noopener noreferrer">
				Go to example.com ↗︎
			</a>
		</Button>
	),
};

export const Playground: Story = {
	parameters: {
		docs: { description: { story: 'Interactive playground with a basic test.' } },
	},
	args: { children: 'Click me' },
	render: args => {
		const [label, setLabel] = React.useState('Click me');
		return (
			<Button {...args} onClick={() => setLabel('Clicked!')}>
				{label}
			</Button>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: 'Click me' });

		await userEvent.click(button);

		await expect(button).toHaveTextContent('Clicked!');
	},
};
