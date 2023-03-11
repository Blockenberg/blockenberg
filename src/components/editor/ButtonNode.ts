import { mergeAttributes, Node } from '@tiptap/core';

export interface ButtonOptions {
	// rome-ignore lint/suspicious/noExplicitAny: hell I know what the type is
	HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		button: {
			/**
			 * Toggle a paragraph
			 */
			setButton: () => ReturnType;
		};
	}
}

export const Button = Node.create<ButtonOptions>({
	name: 'button',

	priority: 1000,

	addOptions() {
		return {
			HTMLAttributes: {
				class:
					'justify-center rounded border-2 border-violet-600 px-4 py-2 font-semibold text-violet-600',
			},
		};
	},

	group: 'block',

	content: 'inline*',

	parseHTML() {
		return [{ tag: 'button' }];
	},

	renderHTML({ HTMLAttributes }) {
		return [
			'button',
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			0,
		];
	},

	addCommands() {
		return {
			setButton: () => ({ commands }) => {
				return commands.setNode(this.name);
			},
		};
	},
});
