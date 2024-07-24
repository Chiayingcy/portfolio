import { Head } from '@inertiajs/react';
import React from 'react'

interface LayoutProps {
    children: React.ReactNode;
    title: string;
}


const Layout : React.FC<LayoutProps> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            {children}
        </>
    )
}

export default Layout