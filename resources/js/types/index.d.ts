export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};


export interface NavItems {
    name: string;
    link: string;
    icon?: JSX.Element;
}

export interface NavItemsProps {
    navItems: NavItems[];
    className?: string;
    children?: React.ReactNode;
}

export interface Skills {
    icon: string
}
