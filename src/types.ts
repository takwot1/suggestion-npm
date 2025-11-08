export type OptionItem = {
    id: string;
    label: string;
    image?: string;
};

export type OptionCategory = {
    categoryId: string;
    categoryLabel: string;
    isMultiple: boolean;
    items: OptionItem[];
};

export type Selections = Record<string, string[]>;

export type BaseContainerProps = {
    category: OptionCategory;
    children: React.ReactNode;
};

export type HorizontalContainerProps = {
    category?: OptionCategory;
    children: React.ReactNode;
};

export type ItemContainerProps = {
    item: OptionItem;
    isSelected: boolean;
    children?: React.ReactNode;
};
