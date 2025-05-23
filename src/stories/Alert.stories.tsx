import { FiAlertCircle, FiCheckCircle, FiInfo, FiTerminal, FiXCircle } from 'react-icons/fi';

import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { VariantProps } from 'class-variance-authority';

/* shadcn/ui primitive ------------------------------------------------------ */
import { Alert, AlertDescription, AlertTitle, alertVariants } from '@/components/ui/alert';

/* ────────────────────────────────────────────────────────────────────────────
   Types & helpers
   ────────────────────────────────────────────────────────────────────────── */
type AlertVariant = VariantProps<typeof alertVariants>['variant'];

interface BaseAlertProps {
	/* visual style ----------------------------------------------------------- */
	variant?: AlertVariant;
	/* textual content -------------------------------------------------------- */
	title?: string;
	description?: string;
	/* icon presets ----------------------------------------------------------- */
	icon?: keyof typeof iconMap | 'none';
}

/* map a string key to a react-icon component ------------------------------ */
const iconMap = {
	terminal: FiTerminal,
	alert: FiAlertCircle,
	info: FiInfo,
	success: FiCheckCircle,
	error: FiXCircle,
} as const;

/* base wrapper – keeps the example isolated from the design-system -------- */
const BaseAlert = ({
	variant = 'default',
	title = 'Heads up!',
	description = 'You can add components to your app using the CLI.',
	icon = 'terminal',
}: BaseAlertProps) => {
	const Icon = icon !== 'none' ? (iconMap[icon] ?? FiTerminal) : undefined;

	return (
		<Alert variant={variant} data-testid="alert">
			{Icon && <Icon className="size-4 shrink-0" data-testid="icon" />}
			{title && <AlertTitle data-testid="title">{title}</AlertTitle>}
			{description && <AlertDescription data-testid="description">{description}</AlertDescription>}
		</Alert>
	);
};

/* ────────────────────────────────────────────────────────────────────────────
   Meta
   ────────────────────────────────────────────────────────────────────────── */
const meta: Meta<BaseAlertProps> = {
	title: 'OrionShadcn/Alert',
	component: BaseAlert,
	tags: ['autodocs'],
	args: {
		variant: 'default',
		icon: 'terminal',
		title: 'Heads up!',
		description: 'You can add components to your app using the CLI.',
	},
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['default', 'destructive', 'success', 'warning'],
			description: 'Visual style of the alert.',
			table: { category: 'Style' },
		},
		icon: {
			control: { type: 'select' },
			options: [...Object.keys(iconMap), 'none'],
			description: 'Pick a built-in icon or hide it by choosing “none”.',
			table: { category: 'Content' },
		},
		title: {
			control: { type: 'text' },
			description: 'Heading text of the alert.',
			table: { category: 'Content' },
		},
		description: {
			control: { type: 'text' },
			description: 'Body text of the alert.',
			table: { category: 'Content' },
		},
	},
	parameters: {
		layout: 'centered',
		controls: { expanded: true },
		docs: {
			description: {
				component: 'shadcn/ui **Alert** component with opinionated defaults and extended variants.',
			},
		},
	},
};
export default meta;

type Story = StoryObj<BaseAlertProps>;

/* ────────────────────────────────────────────────────────────────────────────
   Stories
   ────────────────────────────────────────────────────────────────────────── */

/* 1 ▸ Default (interactive test) ----------------------------------------- */
export const Default: Story = {
	name: 'Default',
	render: args => <BaseAlert {...args} />,
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);

		/* structural assertions ------------------------------------------------ */
		await expect(canvas.getByTestId('alert')).toBeInTheDocument();
		await expect(canvas.getByTestId('title')).toHaveTextContent(args.title!);
		await expect(canvas.getByTestId('description')).toHaveTextContent(args.description!);
	},
	parameters: {
		docs: {
			description: {
				story: 'The default alert. Use the controls panel to tweak the props live and see the result instantly.',
			},
		},
		snapshot: { skip: false },
	},
};

/* 2 ▸ Destructive --------------------------------------------------------- */
export const Destructive: Story = {
	name: 'Destructive',
	args: { variant: 'destructive', icon: 'alert', title: 'Uh-oh!' },
	render: args => <BaseAlert {...args} />,
	parameters: {
		docs: {
			description: {
				story: 'Use `variant="destructive"` for **critical** errors that require immediate user attention.',
			},
		},
		snapshot: { skip: false },
	},
};

/* 3 ▸ Success ------------------------------------------------------------- */
export const Success: Story = {
	name: 'Success',
	args: {
		variant: 'default',
		icon: 'success',
		title: 'Great!',
		description: 'Everything worked just fine.',
	},
	render: args => (
		<Alert className="bg-green-100 border-green-500" variant="default" data-testid="alert">
			<FiCheckCircle className="size-4 shrink-0" data-testid="icon" />
			{<AlertTitle data-testid="title">Great!</AlertTitle>}
			<AlertDescription data-testid="description">Everything worked just fine.</AlertDescription>
		</Alert>
	),
	parameters: {
		docs: {
			description: {
				story: 'Green success alert, ideal for positive feedback messages.',
			},
		},
		snapshot: { skip: false },
	},
};

/* 4 ▸ Warning ------------------------------------------------------------- */
export const Warning: Story = {
	name: 'Warning',
	args: {
		variant: 'default',
		icon: 'alert',
		title: 'Warning!',
		description: 'Something might not be right – double-check your settings before proceeding.',
	},
	render: args => (
		<Alert className="bg-yellow-100 border-yellow-500" variant="default" data-testid="alert">
			<FiAlertCircle className="size-4 shrink-0" data-testid="icon" />
			{<AlertTitle data-testid="title">Warning!</AlertTitle>}
			<AlertDescription data-testid="description">
				Something might not be right – double-check your settings before proceeding.
			</AlertDescription>
		</Alert>
	),
	parameters: {
		docs: {
			description: {
				story: 'Subtle warning state to draw attention without the **destructive** styling.',
			},
		},
		snapshot: { skip: false },
	},
};

/* 5 ▸ WithLongDescription -------------------------------------------------- */
export const WithLongDescription: Story = {
	name: 'With long description',
	args: {
		description:
			'This is a **really long** description meant to demonstrate how the alert scales when the text wraps onto multiple lines. ' +
			'Make sure the icon, padding, and overall layout still look great even with lengthy content.',
	},
	render: args => <BaseAlert {...args} />,
	parameters: {
		docs: {
			description: {
				story: 'Showcases multiline text wrapping and spacing behaviour.',
			},
		},
		snapshot: { skip: false },
	},
};

/* 6 ▸ NoTitle ------------------------------------------------------------- */
export const NoTitle: Story = {
	name: 'No title',
	args: { title: undefined },
	render: args => <BaseAlert {...args} />,
	parameters: {
		docs: {
			description: {
				story: 'Sometimes a title is redundant – omit it by setting `title` to **undefined**.',
			},
		},
		snapshot: { skip: false },
	},
};

/* 7 ▸ NoIcon -------------------------------------------------------------- */
export const NoIcon: Story = {
	name: 'No icon',
	args: { icon: 'none' },
	render: args => <BaseAlert {...args} />,
	parameters: {
		docs: {
			description: {
				story: 'Hide the leading icon by selecting `icon="none"`.',
			},
		},
		snapshot: { skip: false },
	},
};

/* 8 ▸ Playground ---------------------------------------------------------- */
export const Playground: Story = {
	name: 'Playground',
	args: {},
	render: args => <BaseAlert {...args} />,
	parameters: {
		docs: {
			description: {
				story: 'Fully interactive playground. All props are exposed in the **Controls** panel – experiment freely!',
			},
		},
		/* snapshots disabled – Chromatic would generate duplicates ------------ */
		chromatic: { disableSnapshot: true },
	},
};
