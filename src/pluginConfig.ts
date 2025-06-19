import type { ExternalPluginConfig } from '@windy/interfaces';

const config: ExternalPluginConfig = {
    name: 'windy-plugin-canada-wildfire-perimeters',
    version: '0.1.0',
    icon: '🔥',
    title: 'Canada Wildfire Perimeters',
    description: 'Overlay for Canada wildfire perimeters from the Canadian Wildland Fire Information System (CWFIS)',
    author: 'Liam Buchart (UBC)',
    repository: 'https://github.com/LiamBuchart/onefire_wx',
    desktopUI: 'rhpane',
    mobileUI: 'fullscreen',
    routerPath: '/my-plugin',
};

export default config;
