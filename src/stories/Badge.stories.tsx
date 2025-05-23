import type { Meta, StoryObj } from '@storybook/react';
import { Check } from 'lucide-react';

import { Badge, badgeVariants } from '@/components/ui/badge';

/* -------------------------------------------------------------------------- */
/*                                    Meta                                    */
/* -------------------------------------------------------------------------- */

const meta = {
	title: 'OrionShadcn/Badge',
	component: Badge,
	// Global “args” are merged into every story unless explicitly overridden.
	args: {
		variant: 'default',
		children: 'Badge',
	},
	tags: ['autodocs'],
	// Controls / Docs
	argTypes: {
		variant: {
			description: 'Visual style of the badge',
			control: { type: 'radio' },
			options: ['default', 'secondary', 'outline', 'destructive'],
			table: { category: 'Style' },
		},
		children: {
			description: 'Badge content',
			control: 'text',
			table: { category: 'Content' },
		},
		// Hide “internal” props that devs rarely tweak from controls
		asChild: { table: { disable: true } },
		className: { table: { disable: true } },
	},
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
Use it to highlight statuses, categories, or any short snippet of info.

\`\`\`tsx
import { Badge } from '@/components/ui/badge'

<Badge variant="secondary">New</Badge>
\`\`\`
      `,
			},
		},
	},
	// Default render — can be overridden per-story.
	render: ({ children, ...rest }) => <Badge {...rest}>{children}</Badge>,
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*                                   Stories                                  */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Color styles ------------------------------ */

export const Default: Story = {
	name: 'Default',
	args: { variant: 'default', children: 'Default' },
	parameters: {
		docs: { description: { story: 'Primary/brand badge for general use.' } },
	},
};

export const Secondary: Story = {
	args: { variant: 'secondary', children: 'Secondary' },
	parameters: {
		docs: { description: { story: 'Subtle neutral-toned badge.' } },
	},
};

export const Outline: Story = {
	args: { variant: 'outline', children: 'Outline' },
	parameters: {
		docs: { description: { story: 'Transparent background with border.' } },
	},
};

export const Destructive: Story = {
	args: { variant: 'destructive', children: 'Destructive' },
	parameters: {
		docs: {
			description: { story: 'Use for dangerous or irreversible actions.' },
		},
	},
};

/* ---------------------------- Composition demos --------------------------- */

export const LinkStyled: Story = {
	name: 'Link styled badge',
	// We create a completely custom render in order to use <a>.
	render: ({ variant, children }) => (
		<a
			href="#"
			// `badgeVariants` returns the appropriate TW classes
			className={badgeVariants({ variant, className: 'cursor-pointer' })}
		>
			{children}
		</a>
	),
	args: {
		variant: 'default',
		children: 'Anchor tag',
	},
	parameters: {
		docs: {
			description: {
				story: '`badgeVariants` lets you apply Badge styles to arbitrary elements (e.g., anchor tags).',
			},
		},
	},
};

export const WithIcon: Story = {
	render: ({ children, ...rest }) => (
		<Badge {...rest} className="inline-flex items-center gap-1.5">
			<Check className="size-3" /> {children}
		</Badge>
	),
	args: {
		variant: 'secondary',
		children: 'With Icon',
	},
	parameters: {
		docs: {
			description: { story: 'Badges compose nicely with React Icons.' },
		},
	},
};

/* ----------------------------- Interactive -------------------------------- */

export const Playground: Story = {
	args: {
		variant: 'default',
		children: 'Playground',
	},
	parameters: {
		docs: {
			description: {
				story: 'Use the controls panel to play with `variant` and `children` props.',
			},
		},
	},
};
