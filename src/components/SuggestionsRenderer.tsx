import React from 'react';
import { Options, Containers } from '../types';

type Props = {
    options: Options; // dynamic data from app
    containers?: Containers;
    selections: Record<string, string[]>;
    onToggle: (categoryId: string, itemId: string, isMultiple: boolean) => void;
};

/**
 * Headless renderer — accepts dynamic data and optional containers.
 */
export const SuggestionsRenderer: React.FC<Props> = ({
    options,
    containers = {},
    selections,
    onToggle
}) => {
    return (
        <>
            {options.map(category => {
                const Base =
                    containers.BaseContainer ??
                    (({ children }: any) => <div>{children}</div>);
                const Horizontal =
                    containers.HorizontalContainer ??
                    (({ children }: any) => <div>{children}</div>);
                const Item =
                    containers.ItemContainer ??
                    (({ children }: any) => <div>{children}</div>);

                return (
                    <Base key={category.categoryId} category={category}>
                        <Horizontal category={category}>
                            {category.items.map(it => {
                                const isSelected = (
                                    selections[category.categoryId] || []
                                ).includes(it.id);
                                return (
                                    <Item
                                        key={it.id}
                                        item={it}
                                        isSelected={isSelected}
                                    >
                                        {!containers.ItemContainer && (
                                            <button
                                                onClick={() =>
                                                    onToggle(
                                                        category.categoryId,
                                                        it.id,
                                                        category?.isMultiple ||
                                                            false
                                                    )
                                                }
                                            >
                                                {it.label}
                                            </button>
                                        )}
                                    </Item>
                                );
                            })}
                        </Horizontal>
                    </Base>
                );
            })}
        </>
    );
};
