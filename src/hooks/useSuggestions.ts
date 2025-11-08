import type { Selections } from '../types';

type UseSuggestionsProps = {
    selections: Selections;
    setSelections: React.Dispatch<React.SetStateAction<Selections>>;
};

export const useSuggestions = ({
    selections,
    setSelections
}: UseSuggestionsProps) => {
    const toggle = (
        categoryId: string,
        itemId: string,
        isMultiple: boolean
    ) => {
        setSelections(prev => {
            const selectedItems = prev[categoryId] || [];

            if (isMultiple) {
                const exists = selectedItems.includes(itemId);
                return {
                    ...prev,
                    [categoryId]: exists
                        ? selectedItems.filter(id => id !== itemId)
                        : [...selectedItems, itemId]
                };
            } else {
                return { ...prev, [categoryId]: [itemId] };
            }
        });
    };

    return { toggle };
};
