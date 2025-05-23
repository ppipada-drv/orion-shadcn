import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import type { DateRange } from 'react-day-picker';

import { Calendar } from '@/components/ui/calendar';

/* ────────────────────────────────────────────────────────────
   Storybook meta
   ──────────────────────────────────────────────────────────── */
const meta = {
	title: 'OrionShadcn/Calendar',
	component: Calendar,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
A fully-featured Calendar built on top of **react-day-picker** v9 and styled
with **shadcn-ui** & **Tailwind CSS v4**.

Key features
• \`single\`, \`range\`, \`multiple\` selection  
• Disabled days (static or function predicate)  
• Fully keyboard-accessible & locale-aware  
        `,
			},
		},
	},
	argTypes: {
		mode: {
			options: ['single', 'range', 'multiple'],
			control: { type: 'radio' },
		},
		showOutsideDays: { control: 'boolean' },
	},
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ────────────────────────────────────────────────────────────
   SINGLE – mode="single"
   ──────────────────────────────────────────────────────────── */
export const Single: Story = {
	name: 'Single',
	render: () => {
		const [date, setDate] = useState<Date>();

		return (
			<Calendar mode="single" showOutsideDays selected={date} onSelect={setDate} className="rounded-md border shadow" />
		);
	},
	parameters: {
		docs: {
			description: {
				story: 'Select **one** date – great for “Date of birth”, “Due date”, etc.',
			},
		},
	},
};

/* ────────────────────────────────────────────────────────────
   RANGE – mode="range"
   ──────────────────────────────────────────────────────────── */
export const Range: Story = {
	render: () => {
		const [range, setRange] = useState<DateRange>();

		return (
			<div className="flex flex-col items-center gap-4">
				<Calendar
					mode="range"
					showOutsideDays
					selected={range}
					onSelect={setRange}
					className="rounded-md border shadow"
				/>
				<p className="text-sm">
					{range?.from ? range.from.toLocaleDateString() : 'from'} – {range?.to ? range.to.toLocaleDateString() : 'to'}
				</p>
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story: 'Pick a **start** and **end** date – common for booking flows.',
			},
		},
	},
};

/* ────────────────────────────────────────────────────────────
   MULTIPLE – mode="multiple"
   ──────────────────────────────────────────────────────────── */
export const Multiple: Story = {
	render: () => {
		const [days, setDays] = useState<Date[]>([]);

		return (
			<div className="flex flex-col items-center gap-4">
				<Calendar
					mode="multiple"
					showOutsideDays
					selected={days}
					onSelect={d => setDays(d ?? [])}
					className="rounded-md border shadow"
				/>

				<pre className="text-xs bg-muted rounded p-2 max-w-xs overflow-x-auto">{JSON.stringify(days, null, 2)}</pre>
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story: 'Choose **non-consecutive** days – e.g. “Select the days you are available”.',
			},
		},
	},
};

/* ────────────────────────────────────────────────────────────
   DISABLED DAYS – single mode with constraints
   ──────────────────────────────────────────────────────────── */
export const WithDisabledDays: Story = {
	render: () => {
		const [date, setDate] = useState<Date>();
		const today = new Date();
		const yesterday = new Date(today);
		yesterday.setDate(today.getDate() - 1);

		return (
			<Calendar
				mode="single"
				showOutsideDays
				selected={date}
				onSelect={setDate}
				disabled={[
					{ dayOfWeek: [0, 6] }, // weekends
					{ before: yesterday }, // all past dates
				]}
				className="rounded-md border shadow"
			/>
		);
	},
	parameters: {
		docs: {
			description: {
				story: 'Disables week-ends **and** every day before yesterday. Accepts an array of predicates / objects.',
			},
		},
	},
};

/* ────────────────────────────────────────────────────────────
   PLAYGROUND – fully controlled via SB Controls
   ──────────────────────────────────────────────────────────── */
export const Playground: Story = {
	args: {
		mode: 'single',
		showOutsideDays: true,
		selected: undefined,
	},
	render: (args, { updateArgs }) => (
		/*  
      We intentionally cast args to `any` so the Calendar prop
      signature can morph at runtime (single ↔ range ↔ multiple).
      This is isolated to the Playground story only.
    */
		<Calendar
			{...(args as any)}
			onSelect={(value: any) => updateArgs({ selected: value } as any)}
			className="rounded-md border shadow"
		/>
	),
	parameters: {
		controls: { expanded: true },
		docs: {
			description: {
				story: 'Tweak any prop via the **Controls** panel to experiment with the component live.',
			},
		},
	},
};
