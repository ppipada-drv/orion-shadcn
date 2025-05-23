// stories/Accordion.stories.tsx
/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import { FiChevronDown, FiLock } from 'react-icons/fi';

import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

/* ──────────────────────────────────────────────────────────────────────────
   META
   ──────────────────────────────────────────────────────────────────────── */

const meta = {
	title: 'OrionShadcn/Accordion',
	component: Accordion,

	// enables the Docs tab and auto-generated controls
	tags: ['autodocs'],

	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
A wrapper around **Radix UI Accordion** rebuilt with shadcn/ui  
and styled with **Tailwind CSS 4**.  
Use it to show/hide sections of related content.

‣ _type="single"_   → Only one item open at a time (default)  
‣ _type="multiple"_ → Several items can stay open simultaneously

The component can be **uncontrolled** (default / controlled via \`defaultValue\`)
or **controlled** (manage state yourself through \`value\` / \`onValueChange\`).

For accessibility, each *AccordionTrigger* is rendered as a \`<button>\`
that controls the visibility of its associated *AccordionContent*.
				`.trim(),
			},
		},
	},

	// global argTypes / controls
	argTypes: {
		type: {
			description:
				'Whether the accordion behaves as a traditional single-open accordion or allows multiple items to stay open.',
			options: ['single', 'multiple'],
			control: { type: 'radio' },
			table: { defaultValue: { summary: 'single' } },
		},
		collapsible: {
			description: 'When **type="single"** this allows the currently open item to be collapsed by selecting it again.',
			control: { type: 'boolean' },
		},
		className: {
			description: 'Optional Tailwind utility classes applied to the root `<Accordion>` element.',
			control: { type: 'text' },
		},
		defaultValue: {
			description: 'Uncontrolled default value(s). String for _single_; string[] for _multiple_.',
			control: false,
		},
		value: {
			description: 'Controlled value(s). String for _single_; string[] for _multiple_.',
			control: false,
		},
		onValueChange: {
			description: 'Callback fired when the accordion’s value changes.',
			control: false,
		},
	},

	// default props so we don’t repeat them in every story
	args: {
		className: 'w-80',
		type: 'single',
		onValueChange: fn(),
	},
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ──────────────────────────────────────────────────────────────────────────
   BASIC
   ──────────────────────────────────────────────────────────────────────── */

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: 'A minimal accordion with two items running in uncontrolled mode.',
			},
		},
	},
	render: args => (
		<Accordion {...args}>
			<AccordionItem value="item-1">
				<AccordionTrigger>What is shadcn/ui?</AccordionTrigger>
				<AccordionContent>A beautifully designed collection of Radix-powered components.</AccordionContent>
			</AccordionItem>

			<AccordionItem value="item-2">
				<AccordionTrigger>Is it customizable?</AccordionTrigger>
				<AccordionContent>Yes. Everything is plain-old React + Tailwind, so you can tweak anything.</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
};

/* ──────────────────────────────────────────────────────────────────────────
   WITH ICONS
   ──────────────────────────────────────────────────────────────────────── */

export const WithIcons: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Using `react-icons` to add leading icons inside the trigger.',
			},
		},
	},
	render: args => (
		<Accordion {...args}>
			<AccordionItem value="item-1">
				<AccordionTrigger>
					<FiChevronDown className="mr-2 shrink-0" />
					Show details
				</AccordionTrigger>
				<AccordionContent>
					This row uses <code>react-icons</code>.
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="item-2">
				<AccordionTrigger>
					<FiLock className="mr-2 shrink-0" />
					Locked section
				</AccordionTrigger>
				<AccordionContent>Purely demonstrative.</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
};

/* ──────────────────────────────────────────────────────────────────────────
   DISABLED ITEM
   ──────────────────────────────────────────────────────────────────────── */

export const WithDisabledItem: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Items can be disabled individually via the Radix `disabled` prop.',
			},
		},
	},
	render: args => (
		<Accordion {...args}>
			<AccordionItem value="item-1">
				<AccordionTrigger>Active item</AccordionTrigger>
				<AccordionContent>Clicks work here ✔️</AccordionContent>
			</AccordionItem>

			<AccordionItem value="item-2" disabled>
				<AccordionTrigger>Disabled item (cannot open)</AccordionTrigger>
				<AccordionContent>You should never read this.</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
};

/* ──────────────────────────────────────────────────────────────────────────
   MULTIPLE (type = "multiple")
   ──────────────────────────────────────────────────────────────────────── */

export const MultipleOpen: Story = {
	args: { type: 'multiple' }, // override meta.args
	parameters: {
		docs: {
			description: {
				story: 'When `type="multiple"` several items can remain open at once.',
			},
		},
	},
	render: args => (
		<Accordion {...args}>
			{['One', 'Two', 'Three'].map((label, idx) => (
				<AccordionItem key={label} value={`item-${idx}`}>
					<AccordionTrigger>{label}</AccordionTrigger>
					<AccordionContent>Multiple items can stay open simultaneously.</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	),
};

/* ──────────────────────────────────────────────────────────────────────────
   DEFAULT-OPEN ITEM (uncontrolled)
   ──────────────────────────────────────────────────────────────────────── */

export const DefaultOpen: Story = {
	args: { defaultValue: 'item-1' },
	parameters: {
		docs: {
			description: {
				story: 'Uncontrolled example where `defaultValue` pre-opens an item on mount.',
			},
		},
	},
	render: args => (
		<Accordion {...args}>
			<AccordionItem value="item-1">
				<AccordionTrigger>Opened by default</AccordionTrigger>
				<AccordionContent>👋 Hello world.</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-2">
				<AccordionTrigger>Closed by default</AccordionTrigger>
				<AccordionContent>Still hidden on load.</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
};

/* -------------------------------------------------------------------------
   CONTROLLED – SINGLE
   ---------------------------------------------------------------------- */

export const ControlledSingle: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Fully **controlled** accordion (single mode). State lives in the story.',
			},
		},
	},
	render: ({ className }) => {
		const [value, setValue] = React.useState<string | undefined>('item-1');

		return (
			<>
				<p className="mb-2 text-sm text-muted-foreground">Current value: {JSON.stringify(value)}</p>

				<Accordion className={className} type="single" collapsible value={value} onValueChange={setValue}>
					<AccordionItem value="item-1">
						<AccordionTrigger>First</AccordionTrigger>
						<AccordionContent>First content</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>Second</AccordionTrigger>
						<AccordionContent>Second content</AccordionContent>
					</AccordionItem>
				</Accordion>
			</>
		);
	},
};

/* -------------------------------------------------------------------------
   CONTROLLED – MULTIPLE
   ---------------------------------------------------------------------- */

export const ControlledMultiple: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Controlled accordion in **multiple** mode.',
			},
		},
	},
	render: ({ className }) => {
		const [value, setValue] = React.useState<string[]>(['item-1']);

		return (
			<>
				<p className="mb-2 text-sm text-muted-foreground">Current value: {JSON.stringify(value)}</p>

				<Accordion className={className} type="multiple" value={value} onValueChange={setValue}>
					<AccordionItem value="item-1">
						<AccordionTrigger>First</AccordionTrigger>
						<AccordionContent>First content</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>Second</AccordionTrigger>
						<AccordionContent>Second content</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger>Third</AccordionTrigger>
						<AccordionContent>Third content</AccordionContent>
					</AccordionItem>
				</Accordion>
			</>
		);
	},
};

/* ──────────────────────────────────────────────────────────────────────────
   NESTED ACCORDIONS
   ──────────────────────────────────────────────────────────────────────── */

export const Nested: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Demonstrates **nested** accordions (inner accordion fully independent).',
			},
		},
	},
	render: args => (
		<Accordion {...args}>
			<AccordionItem value="outer-1">
				<AccordionTrigger>Outer item</AccordionTrigger>
				<AccordionContent>
					<Accordion type="single" collapsible className="w-full border-l pl-4 mt-2">
						<AccordionItem value="inner-1">
							<AccordionTrigger>Inner item 1</AccordionTrigger>
							<AccordionContent>Nested content A</AccordionContent>
						</AccordionItem>
						<AccordionItem value="inner-2">
							<AccordionTrigger>Inner item 2</AccordionTrigger>
							<AccordionContent>Nested content B</AccordionContent>
						</AccordionItem>
					</Accordion>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
};

/* ──────────────────────────────────────────────────────────────────────────
   INTERACTIVE TEST (play function)
   ──────────────────────────────────────────────────────────────────────── */

export const Interactive: Story = {
	parameters: {
		docs: {
			description: {
				story: 'UI test verifying that the accordion opens on click.',
			},
		},
	},
	render: args => (
		<Accordion {...args}>
			<AccordionItem value="item-1">
				<AccordionTrigger data-testid="trigger">Accordion</AccordionTrigger>
				<AccordionContent data-testid="description">A vertically stacked set of interactive headings.</AccordionContent>
			</AccordionItem>
		</Accordion>
	),

	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const trigger = await canvas.findByTestId('trigger');

		await expect(trigger).toBeVisible();

		await step('Toggle accordion', async () => {
			await userEvent.click(trigger);
			const content = await canvas.findByTestId('description');
			await expect(content).toBeVisible();
		});
	},
};
