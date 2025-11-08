export type Item = {
    id: string;
    label: string;
};

export type Category = {
    categoryId: string;
    categoryLabel: string;
    isMultiple?: boolean;
    items: Item[];
};

export type Options = Category[];

export type Selections = Record<string, string[]>;

export type Containers = {
    BaseContainer?: React.FC<{ category: Category; children: React.ReactNode }>;
    HorizontalContainer?: React.FC<{
        category: Category;
        children: React.ReactNode;
    }>;
    ItemContainer?: React.FC<{
        item: Item;
        isSelected: boolean;
        children: React.ReactNode;
    }>;
};

export type BaseContainerProps = {
    category: Category;
    children: React.ReactNode;
};

export type HorizontalContainerProps = {
    category: Category;
    children: React.ReactNode;
};

export type ItemContainerProps = {
    item: Item;
    isSelected: boolean;
    children: React.ReactNode;
};
