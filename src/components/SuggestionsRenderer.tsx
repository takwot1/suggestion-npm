import React from 'react';
import type {
    OptionCategory,
    Selections,
    BaseContainerProps,
    HorizontalContainerProps,
    ItemContainerProps
} from '../types';

type Containers = {
    BaseContainer?: React.FC<BaseContainerProps>;
    HorizontalContainer?: React.FC<HorizontalContainerProps>;
    ItemContainer?: React.FC<ItemContainerProps>;
};

type Props = {
    options: OptionCategory[];
    containers?: Containers;
    selections: Selections;
    onToggle: (categoryId: string, itemId: string, isMultiple: boolean) => void;
};

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
                    (({ children }: BaseContainerProps) => (
                        <div>{children}</div>
                    ));
                const Horizontal =
                    containers.HorizontalContainer ??
                    (({ children }: HorizontalContainerProps) => (
                        <div className='flex flex-wrap gap-2'>{children}</div>
                    ));
                const Item =
                    containers.ItemContainer ??
                    (({ item, isSelected, children }: ItemContainerProps) => (
                        <button
                            className={`px-3 py-1 rounded-full border ${
                                isSelected ? 'bg-blue-500 text-white' : ''
                            }`}
                            onClick={() =>
                                onToggle(
                                    category.categoryId,
                                    item.id,
                                    category.isMultiple
                                )
                            }
                        >
                            {item.label}
                            {children}
                        </button>
                    ));

                return (
                    <Base key={category.categoryId} category={category}>
                        <Horizontal category={category}>
                            {category.items.map(item => {
                                const selectedItems =
                                    selections[category.categoryId] || [];
                                const isSelected = selectedItems.includes(
                                    item.id
                                );

                                return (
                                    <Item
                                        key={item.id}
                                        item={item}
                                        isSelected={isSelected}
                                        category={category}
                                    />
                                );
                            })}
                        </Horizontal>
                    </Base>
                );
            })}
        </>
    );
};
