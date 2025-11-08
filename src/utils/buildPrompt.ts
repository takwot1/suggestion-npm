import { Options, Selections } from '../types';

/**
 * Builds a text prompt from user selections.
 * Keeps category order as in options.
 */
export function buildPrompt(
    selections: Selections,
    options: Options,
    opts?: { joinWith?: string; excludeEmpty?: boolean }
): string {
    const joinWith = opts?.joinWith ?? ', ';
    const excludeEmpty = opts?.excludeEmpty ?? true;

    const parts: string[] = [];

    for (const cat of options) {
        const selected = selections[cat.categoryId] || [];
        if (excludeEmpty && selected.length === 0) continue;

        const labels = selected.map(
            id => cat.items.find(i => i.id === id)?.label ?? id
        );

        parts.push(...labels);
    }

    return parts.join(joinWith);
}
