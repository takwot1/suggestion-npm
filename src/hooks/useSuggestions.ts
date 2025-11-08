import { useCallback, useState, Dispatch, SetStateAction } from 'react';
import { Selections } from '../types';

type UseSuggestionsProps = {
    selections?: Selections;
    setSelections?: Dispatch<SetStateAction<Selections>>;
};

/**
 * Hook for managing selections (can use external state)
 */
export const useSuggestions = (props?: UseSuggestionsProps) => {
    const [internalSelections, internalSetSelections] = useState<Selections>(
        {}
    );
    const selections = props?.selections ?? internalSelections;
    const setSelections = props?.setSelections ?? internalSetSelections;

    const toggle = useCallback(
        (categoryId: string, itemId: string, isMultiple = false) => {
            setSelections(prev => {
                const current = prev[categoryId] || [];
                const next = isMultiple
                    ? current.includes(itemId)
                        ? current.filter(i => i !== itemId)
                        : [...current, itemId]
                    : current.includes(itemId)
                    ? []
                    : [itemId];

                return { ...prev, [categoryId]: next };
            });
        },
        [setSelections]
    );

    return { selections, setSelections, toggle };
};
