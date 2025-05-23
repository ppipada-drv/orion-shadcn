import { Image } from 'lucide-react';

import { Meta, StoryObj } from '@storybook/react';
import clsx from 'clsx';
import EmblaAutoPlay from 'embla-carousel-autoplay';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

/* -------------------------------------------------------------
 * Fake slide data
 * ----------------------------------------------------------- */
const slides = ['addon-library.png', 'random-image.jpg', 'share.png'];

/* -------------------------------------------------------------
 * Helpers
 * ----------------------------------------------------------- */
function Slide({ src, alt, className }: { src?: string; alt?: string; className?: string }) {
	return (
		<div
			className={clsx('relative flex h-64 items-center justify-center overflow-hidden rounded-lg bg-muted', className)}
		>
			{src ? (
				<img src={src} alt={alt} className="h-full w-full object-cover object-center" />
			) : (
				<Image className="h-10 w-10 text-muted-foreground" />
			)}
		</div>
	);
}

/* -------------------------------------------------------------
 * Meta
 * ----------------------------------------------------------- */
const meta: Meta<typeof Carousel> = {
	title: 'OrionShadcn/Carousel',
	component: Carousel,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
A responsive, touch-friendly **Carousel** built on top of shadcn/ui (Embla) & TailwindCSS 4.  
This story demonstrates multiple usage patterns including autoplay, custom controls and dynamic content.

For detailed setup, refer to the official docs: https://ui.shadcn.com/docs/components/carousel
`,
			},
		},
	},
};
export default meta;

/* -------------------------------------------------------------
 * Stories
 * ----------------------------------------------------------- */

/* --- 1️⃣  Basic ------------------------------------------------ */
export const Basic: StoryObj<typeof Carousel> = {
	name: 'Basic',
	render: args => (
		<Carousel {...args} className="w-full max-w-lg">
			<CarouselContent>
				{slides.map((src, idx) => (
					<CarouselItem key={idx}>
						<Slide src={src} alt={`Slide ${idx + 1}`} />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	),
	parameters: {
		docs: {
			description: {
				story:
					'The default carousel with previous and next controls. Swipe on touch screens or use the controls to navigate.',
			},
		},
	},
};

/* --- 2️⃣  Autoplay -------------------------------------------- */
export const Autoplay: StoryObj<typeof Carousel> = {
	name: 'Autoplay',
	render: args => (
		<Carousel
			{...args}
			className="w-full max-w-lg"
			opts={{
				...args.opts,
				loop: true,
			}}
			plugins={[
				EmblaAutoPlay({
					delay: 4000,
				}),
			]}
		>
			<CarouselContent>
				{slides.map((src, idx) => (
					<CarouselItem key={idx}>
						<Slide src={src} alt={`Slide ${idx + 1}`} />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Autoplay example using **embla-carousel-autoplay**. The carousel loops infinitely and pauses on user interaction.',
			},
		},
	},
};

/* --- 3️⃣  WithIndicators -------------------------------------- */
export const WithIndicators: StoryObj<typeof Carousel> = {
	name: 'With Indicators',
	render: args => (
		<div className="flex w-full max-w-lg flex-col space-y-2">
			<Carousel {...args}>
				<CarouselContent>
					{slides.map((src, idx) => (
						<CarouselItem key={idx}>
							<Slide src={src} alt={`Slide ${idx + 1}`} />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>

			{/* Indicators */}
			<div className="flex items-center justify-center space-x-2">
				{slides.map((_, idx) => (
					<button
						key={idx}
						className="h-2 w-2 rounded-full bg-muted transition-colors data-[active=true]:bg-primary"
						data-index={idx}
						/* --------------
						 * You can wire these buttons to Embla API via refs.
						 * -------------- */
					/>
				))}
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					"Demonstrates how you might add custom pagination indicators outside of the core Carousel component. You'll need to hook them up to Embla's API using refs & `selectedScrollSnap`.",
			},
		},
	},
};

/* --- 4️⃣  Responsive ----------------------------------------- */
export const Responsive: StoryObj<typeof Carousel> = {
	name: 'Responsive (multiple slides)',
	render: args => (
		<Carousel
			{...args}
			className="w-full max-w-4xl"
			opts={{
				align: 'start',
				loop: true,
				skipSnaps: false,
				...args.opts,
			}}
		>
			<CarouselContent className="-ml-2">
				{[...Array(10).keys()].map(idx => (
					<CarouselItem key={idx} className="pl-2 basis-1/2 md:basis-1/3 lg:basis-1/4">
						<Slide src="/random-image.jpg" alt={`Random ${idx}`} className="h-40 md:h-56" />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="-left-4" />
			<CarouselNext className="-right-4" />
		</Carousel>
	),
	parameters: {
		docs: {
			description: {
				story:
					"Shows multiple slides per viewport width. Tailwind's `basis-*` utilities make it easy to define responsive grid-like behaviour.",
			},
		},
	},
};

/* --- 5️⃣  Playground ----------------------------------------- */
export const Playground: StoryObj<typeof Carousel> = {
	name: 'Playground',
	args: {
		opts: {
			loop: false,
			// Embla options can be provided here
		},
	},
	argTypes: {
		opts: {
			description: 'Pass-through options for Embla Carousel',
			control: { type: 'object' },
		},
		className: {
			control: { type: 'text' },
		},
	},
	render: ({ opts, className }) => (
		<Carousel className={clsx('w-full max-w-lg', className)} opts={opts}>
			<CarouselContent>
				{slides.map((src, idx) => (
					<CarouselItem key={idx}>
						<Slide src={src} alt={`Slide ${idx + 1}`} />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Use the controls panel to tweak `opts` and see how the carousel reacts. This is a fully interactive playground.',
			},
		},
	},
};
