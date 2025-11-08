import { useState, useCallback } from 'react';
import { Selections } from '../types';

/**
 * Hook for managing selected suggestion options.
 */
export const useSuggestions = (initial?: Selections) => {
    const [selections, setSelections] = useState<Selections>(initial || {});

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
        []
    );

    return { selections, setSelections, toggle };
};
