import { FiImage } from 'react-icons/fi';

import type { Meta, StoryObj } from '@storybook/react';

import { AspectRatio } from '@/components/ui/aspect-ratio';

const meta = {
	title: 'OrionShadcn/AspectRatio',
	component: AspectRatio,
	tags: ['autodocs'],
	argTypes: {
		ratio: {
			control: { type: 'number', min: 0.1, max: 4, step: 0.05 },
			description:
				'Desired aspect ratio expressed as **width / height**. For a “16∶9” rectangle use `16 / 9` (≈ 1.777…).',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '16 / 9' },
			},
		},
		className: {
			control: { type: 'text' },
			description: 'Extra Tailwind classes forwarded to the root `div` (e.g. `rounded-md overflow-hidden`).',
		},
		children: {
			table: { disable: true },
		},
	},
	parameters: {
		docs: {
			description: {
				component: `
A layout helper that **locks the width/height proportion** of its children while remaining fully responsive.

Built on top of \`@radix-ui/react-aspect-ratio\` (wrapped by **shadcn/ui v2.5**) and styled with **Tailwind CSS v4**.

Typical use-cases:
- Images, videos, iframes
- Card & avatar placeholders
- Any element that must stay in a fixed proportion
        `,
			},
		},
	},
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ──────────────────────────────────────────────────────────
   Default: 16×9 responsive image
   ────────────────────────────────────────────────────────── */
export const Default: Story = {
	args: {
		ratio: 16 / 9,
		children: <img src="/random-image.jpg" alt="Random Unsplash" className="h-full w-full rounded-md object-cover" />,
	},
	parameters: {
		docs: {
			description: {
				story: 'A basic 16∶9 wrapper keeping the image perfectly scaled on any viewport.',
			},
			source: {
				code: `<AspectRatio ratio={16 / 9}>
  <img
    src="/random-image.jpg"
    alt="Random Unsplash"
    className="h-full w-full rounded-md object-cover"
  />
</AspectRatio>`,
				language: 'tsx',
			},
		},
	},
};

/* ──────────────────────────────────────────────────────────
   Square: 1×1 avatar/thumbnail slot
   ────────────────────────────────────────────────────────── */
export const Square: Story = {
	args: {
		ratio: 1,
		children: (
			<div className="flex h-full w-full flex-col items-center justify-center rounded-md border border-dashed border-muted/40 text-muted-foreground">
				<FiImage size="1.75rem" />
				<span className="mt-2 text-xs">1 × 1</span>
			</div>
		),
	},
	parameters: {
		docs: {
			description: {
				story: 'A perfect **square** placeholder — great for avatars or grid thumbnails.',
			},
			source: {
				code: `<AspectRatio ratio={1}>
  {/* … */}
</AspectRatio>`,
				language: 'tsx',
			},
		},
	},
};

/* ──────────────────────────────────────────────────────────
   Custom Ratio: 3×4 portrait card
   ────────────────────────────────────────────────────────── */
export const Portrait34: Story = {
	name: '3×4 Portrait',
	args: {
		ratio: 3 / 4,
		children: (
			<div className="flex h-full w-full items-center justify-center rounded-md bg-primary/10 text-primary">3 × 4</div>
		),
	},
	parameters: {
		docs: {
			description: {
				story:
					'Any decimal is valid — here we lock the wrapper to **0.75** (`3 / 4`) for a portrait layout (e.g. posters).',
			},
		},
	},
};
