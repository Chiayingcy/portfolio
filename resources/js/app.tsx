import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Portfolio';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        return resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx'))
        // let folder = name.split('/')[0];
        // let glob
        // switch (folder) {
        //     case 'Eduadmin':
        //         glob = import.meta.glob('./Pages/**/*.tsx')
        //         break;
        //     // case 'StudentPortal':
        //     //     glob = import.meta.glob('./StudentPortal/**/*.tsx')
        //     //     break;
        //     // case 'SuperAdmin':
        //     //     glob = import.meta.glob('./SuperAdmin/**/*.tsx')
        //     //     break;
        //     default:
        //         glob = import.meta.glob('./Pages/**/*.tsx')
        //         break;
        // }
        // return resolvePageComponent(`./${name}.tsx`, glob as any);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
