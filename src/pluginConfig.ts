import type { ExternalPluginConfig } from '@windy/interfaces';

const config: ExternalPluginConfig = {
    name: 'windy-plugin-wildfire-perimeters',
    version: '0.1.0',
    icon: '🔥',
    title: 'Canada Wildfire Perimeters',
    description: 'Overlay for wildfire perimeters from the Canadian Wildland Fire Information System (CWFIS)',
    author: 'Liam Buchart (UBC)',
    repository: 'https://github.com/LiamBuchart/onefire_wx',
    desktopUI: 'rhpane',
    mobileUI: 'fullscreen',
    routerPath: '/canfire-perimeters',
};

export default config;
