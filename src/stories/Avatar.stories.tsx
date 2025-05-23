import { FiUser } from 'react-icons/fi';

import type { Meta, StoryObj } from '@storybook/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

/* -----------------------------------------------------------------------------
| Helpers
| --------------------------------------------------------------------------- */
const sizeClassName = (size: AvatarSize) => {
	switch (size) {
		case 'xs':
			return 'h-6 w-6';
		case 'sm':
			return 'h-8 w-8';
		case 'md':
			return 'h-10 w-10';
		case 'lg':
			return 'h-12 w-12';
		case 'xl':
			return 'h-16 w-16';
		default:
			return 'h-10 w-10';
	}
};

const initials = (label?: string) =>
	(label ?? '')
		.split(' ')
		.map(word => word.charAt(0).toUpperCase())
		.join('')
		.slice(0, 2);

/* -----------------------------------------------------------------------------
| Storybook Meta
| --------------------------------------------------------------------------- */
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface Args {
	src: string;
	alt: string;
	size: AvatarSize;
}

const meta = {
	title: 'OrionShadcn/Avatar',
	component: Avatar,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
Avatar component powered by **shadcn/ui**.

An image that automatically falls back to **initials** or **icon** when it
fails to load.  
Fully styleable with **Tailwind CSS** utility classes.
        `,
			},
		},
	},
	argTypes: {
		src: {
			control: 'text',
			description: 'Image source URL',
			table: { category: 'AvatarImage' },
		},
		alt: {
			control: 'text',
			description: 'alt / label used to create initials',
			table: { category: 'AvatarImage' },
		},
		size: {
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
			control: { type: 'inline-radio' },
			description: 'Pre-defined Tailwind size variant',
			table: { category: 'Modifiers' },
		},
	},
	args: {
		src: '/context.png',
		alt: '@shadcn',
		size: 'md',
	},
	render: ({ src, alt, size }) => (
		<Avatar className={sizeClassName(size)}>
			<AvatarImage src={src} alt={alt} />
			<AvatarFallback>{initials(alt)}</AvatarFallback>
		</Avatar>
	),
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -----------------------------------------------------------------------------
| Stories
| --------------------------------------------------------------------------- */
export const Playground: Story = {
	name: '⚡ Playground',
	parameters: {
		docs: {
			description: {
				story: 'Interactive playground with controls for **src**, **alt** and **size**.',
			},
		},
	},
};

export const WithImage: Story = {
	name: 'With Image',
	args: {
		src: '/context.png',
		alt: '@shadcn',
	},
	parameters: {
		docs: {
			description: {
				story: 'Displays the user photo when a **valid image URL** is provided.',
			},
		},
	},
};

export const WithFallbackText: Story = {
	name: 'With Fallback (Text)',
	args: {
		src: '',
		alt: 'Carlos Nguyen',
	},
	render: ({ src, alt, size }) => (
		<Avatar className={sizeClassName(size)}>
			<AvatarImage src={src} alt={alt} />
			<AvatarFallback>{initials(alt)}</AvatarFallback>
		</Avatar>
	),
	parameters: {
		docs: {
			description: {
				story: 'When the image fails, the component falls back to **initials** generated from `alt`.',
			},
		},
	},
};

export const WithFallbackIcon: Story = {
	name: 'With Fallback (Icon)',
	args: {
		src: '',
		alt: '',
	},
	render: ({ src, alt, size }) => (
		<Avatar className={sizeClassName(size)}>
			<AvatarImage src={src} alt={alt} />
			<AvatarFallback>
				<FiUser className="h-4/5 w-4/5" />
			</AvatarFallback>
		</Avatar>
	),
	parameters: {
		docs: {
			description: {
				story: 'Uses a **react-icons/fi** placeholder when no initials can be generated.',
			},
		},
	},
};

export const WithStatusRing: Story = {
	name: 'With Status Ring',
	args: {
		src: '/context.png',
		alt: '@shadcn',
	},
	render: ({ src, alt, size }) => (
		<div className="relative inline-block">
			<Avatar className={`${sizeClassName(size)} ring-2 ring-green-500`}>
				<AvatarImage src={src} alt={alt} />
				<AvatarFallback>{initials(alt)}</AvatarFallback>
			</Avatar>

			{/* Online indicator ----------------------------------------------------- */}
			<span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-neutral-900" />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Adds a **Tailwind ring** and a **small badge** to denote online status.',
			},
		},
	},
};
