/*  ──────────────────────────────────────────────────────────────────────────
    AlertDialog.stories.tsx
    Storybook v8 • React 19 • TypeScript • Vite 6 • Tailwind 4 • shadcn/ui 2.5
    ────────────────────────────────────────────────────────────────────────── */
import { Fragment, useState } from 'react';

import { FiAlertTriangle, FiTrash2 } from 'react-icons/fi';

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

/*  Meta configuration
    ‣ CSF 3 (automatically inferred Args)                     */
const meta: Meta = {
	title: 'OrionShadcn/AlertDialog',
	component: AlertDialogContent,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'The **AlertDialog** component is a client-side primitive used to interrupt the user with an important decision. Below you can explore several common patterns.',
			},
		},
	},
	tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;

/* ──────────────────────────────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────────────────────────────── */

const BaseDialog = ({
	title = 'Are you absolutely sure?',
	description = 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
	actionLabel = 'Continue',
	cancelLabel = 'Cancel',
	destructive = false,
}: {
	title?: string;
	description?: string;
	actionLabel?: string;
	cancelLabel?: string;
	destructive?: boolean;
}) => (
	<AlertDialog>
		<AlertDialogTrigger
			className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/80 data-[destructive=true]:bg-destructive"
			data-testid="trigger"
			data-destructive={destructive}
		>
			{destructive ? <FiTrash2 className="size-4" /> : <FiAlertTriangle className="size-4" />}
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
	render: () => <BaseDialog />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// open the dialog
		await userEvent.click(canvas.getByTestId('trigger'));
		await expect(canvas.getByTestId('title')).toBeInTheDocument();

		// close the dialog
		await userEvent.click(canvas.getByTestId('cancel'));
		await expect(canvas.queryByTestId('title')).not.toBeInTheDocument();
	},
};

/* ──────────────────────────────────────────────────────────────────────────
   2. Destructive (accent color, icon & red action button)
   ────────────────────────────────────────────────────────────────────────── */
export const Destructive: Story = {
	args: {},
	render: () => <BaseDialog destructive actionLabel="Delete account" />,
};

/* ──────────────────────────────────────────────────────────────────────────
   3. WithLongContent (scrollable body)
   ────────────────────────────────────────────────────────────────────────── */
const longLorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed fringilla erat. '.repeat(12);

export const WithLongContent: Story = {
	render: () => (
		<BaseDialog
			title="Please read the following carefully"
			description={longLorem}
			actionLabel="I have read everything"
		/>
	),
};

/* ──────────────────────────────────────────────────────────────────────────
   4. Controlled (external open state example w/ React 19 useOptimistic)
   ────────────────────────────────────────────────────────────────────────── */
export const Controlled: Story = {
	render: () => {
		/* React 19: useOptimistic isn’t stable yet, so we’ll fallback to useState   */
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
					<AlertDialogTrigger asChild>
						{/* Hidden trigger for accessibility */}
						<span />
					</AlertDialogTrigger>

					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Manual control</AlertDialogTitle>
							<AlertDialogDescription>The dialog state is controlled from the parent component.</AlertDialogDescription>
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
};

/* ──────────────────────────────────────────────────────────────────────────
   5. Visual regression parameters
   ────────────────────────────────────────────────────────────────────────── */
Default.parameters = { ...Default.parameters, snapshot: { skip: false } };
Destructive.parameters = { ...Destructive.parameters, snapshot: { skip: false } };
WithLongContent.parameters = { ...WithLongContent.parameters, snapshot: { skip: false } };
Controlled.parameters = { ...Controlled.parameters, snapshot: { skip: false } };
