import { Fragment, useState } from 'react';

import { AlertTriangle, Trash2 } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

/* ── shadcn/ui alert-dialog primitives ──────────────────────────────────── */
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

/* ──────────────────────────────────────────────────────────────────────────
   Meta
   ────────────────────────────────────────────────────────────────────────── */
const meta: Meta<typeof AlertDialogContent> = {
	title: 'OrionShadcn/AlertDialog',
	component: AlertDialogContent,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'The **AlertDialog** primitive interrupts the user with an important decision.\
          \nIt follows the Radix UI behaviour and ships fully accessible by default.',
			},
		},
	},
	tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof meta>;

/* ──────────────────────────────────────────────────────────────────────────
   Helper – BaseDialog
   ────────────────────────────────────────────────────────────────────────── */
interface BaseDialogProps {
	title?: string;
	description?: string;
	actionLabel?: string;
	cancelLabel?: string;
	destructive?: boolean;
}

const BaseDialog = ({
	title = 'Are you absolutely sure?',
	description = 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
	actionLabel = 'Continue',
	cancelLabel = 'Cancel',
	destructive = false,
}: BaseDialogProps) => (
	<AlertDialog>
		<AlertDialogTrigger
			data-testid="trigger"
			data-destructive={destructive}
			className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/80 data-[destructive=true]:bg-destructive"
		>
			{destructive ? <Trash2 className="size-4" /> : <AlertTriangle className="size-4" />}
			Open dialog
		</AlertDialogTrigger>

		<AlertDialogContent className="max-w-lg">
			<AlertDialogHeader>
				<AlertDialogTitle data-testid="title">{title}</AlertDialogTitle>
				<AlertDialogDescription data-testid="description">{description}</AlertDialogDescription>
			</AlertDialogHeader>

			<AlertDialogFooter>
				<AlertDialogCancel data-testid="cancel">{cancelLabel}</AlertDialogCancel>
				<AlertDialogAction
					data-testid="action"
					className={destructive ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : undefined}
				>
					{actionLabel}
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
);

/* ──────────────────────────────────────────────────────────────────────────
   1. Default
   ────────────────────────────────────────────────────────────────────────── */
export const Default: Story = {
	render: args => <BaseDialog {...args} />,
	args: {
		destructive: false,
	},
	parameters: {
		docs: {
			description: {
				story: 'The default **AlertDialog** with a non-destructive confirmation action.',
			},
		},
		snapshot: { skip: false },
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		/* open the dialog */
		await userEvent.click(canvas.getByTestId('trigger'));
		await expect(canvas.getByTestId('title')).toBeInTheDocument();

		/* close the dialog */
		await userEvent.click(canvas.getByTestId('cancel'));
		await expect(canvas.queryByTestId('title')).not.toBeInTheDocument();
	},
};

/* ──────────────────────────────────────────────────────────────────────────
   2. Destructive (accent colour, icon & red action button)
   ────────────────────────────────────────────────────────────────────────── */
export const Destructive: Story = {
	render: args => <BaseDialog {...args} />,
	args: {
		destructive: true,
		actionLabel: 'Delete account',
	},
	parameters: {
		docs: {
			description: {
				story:
					'A destructive variant that leverages the **destructive** colour-scheme and iconography \
          to emphasise the gravity of the action.',
			},
		},
		snapshot: { skip: false },
	},
};

/* ──────────────────────────────────────────────────────────────────────────
   3. WithLongContent (scrollable body)
   ────────────────────────────────────────────────────────────────────────── */
const longLorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed fringilla erat. '.repeat(12);

export const WithLongContent: Story = {
	render: args => <BaseDialog {...args} />,
	args: {
		title: 'Please read the following carefully',
		description: longLorem,
		actionLabel: 'I have read everything',
	},
	parameters: {
		docs: {
			description: {
				story:
					'When the dialog content exceeds the viewport height, the body becomes scrollable \
          to maintain focus and prevent background interaction.',
			},
		},
		snapshot: { skip: false },
	},
};

/* ──────────────────────────────────────────────────────────────────────────
   4. Playground (fully-controlled)
   ────────────────────────────────────────────────────────────────────────── */
export const Playground: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		return (
			<Fragment>
				<button
					className="rounded bg-muted px-4 py-2 text-sm font-medium hover:bg-muted/70"
					onClick={() => setOpen(true)}
				>
					Programmatically open dialog
				</button>

				<AlertDialog open={open} onOpenChange={setOpen}>
					{/* hidden trigger for a11y – keeps Radix expectations happy */}
					<AlertDialogTrigger asChild>
						<span />
					</AlertDialogTrigger>

					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Manual control</AlertDialogTitle>
							<AlertDialogDescription>
								The dialog state (<code>open</code>) is controlled from the parent component.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel onClick={() => setOpen(false)}>Close</AlertDialogCancel>
							<AlertDialogAction
								onClick={() => {
									/* …submit / mutate… */
									setOpen(false);
								}}
							>
								Confirm
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</Fragment>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					'A fully-controlled story showcasing how the dialog can be toggled from upstream components, \
          ideal for complex flows or global state management.',
			},
		},
		snapshot: { skip: false },
	},
};
