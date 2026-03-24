import { Zap, Code2, Database, Shield } from 'lucide-react';

export const FEATURES = [
    {
        icon: Zap,
        text: '50+ Ready-made crawlers'
    },
    {
        icon: Code2,
        text: 'Simple REST API'
    },
    {
        icon: Database,
        text: 'Structured JSON output'
    },
    {
        icon: Shield,
        text: '99.5% success rate'
    },
];

export const HOW_IT_WORKS = [
    {
        step: 1,
        title: 'Choose a crawler',
        desc: 'Google Maps, LinkedIn, Instagram, Twitter, and 50+ more ready to use.',
        link: '/list-crawlers',
    },
    {
        step: 2,
        title: 'Create a squid',
        desc: 'Your scraping configuration.',
        link: '/create-squid',
    },
    {
        step: 3,
        title: 'Configure settings',
        desc: 'Set country, language, and result limits.',
        link: '/update-squid',
    },
    {
        step: 4,
        title: 'Add tasks',
        desc: 'URLs or parameters via API or CSV.',
        link: '/add-tasks',
    },
    {
        step: 5,
        title: 'Start the run',
        desc: 'Launch and monitor progress.',
        link: '/start-run',
    },
    {
        step: 6,
        title: 'Get results',
        desc: 'Retrieve structured JSON or auto delivery.',
        link: '/get-results',
    },
];

export const API_REFERENCE = [
    {
        title: 'Authentication',
        desc: 'Get your API key',
        slug: 'authentication'
    },
    {
        title: 'Crawlers',
        desc: 'Browse available scrapers',
        slug: 'list-crawlers'
    },
    {
        title: 'Squids',
        desc: 'Create configurations',
        slug: 'create-squid'
    },
    {
        title: 'Tasks',
        desc: 'Add URLs and params',
        slug: 'add-tasks'
    },
    {
        title: 'Runs',
        desc: 'Execute jobs',
        slug: 'start-run'
    },
    {
        title: 'Results',
        desc: 'Retrieve data',
        slug: 'get-results'
    },
    {
        title: 'Delivery',
        desc: 'Webhooks & S3',
        slug: 'configure-webhook-delivery'
    },
    {
        title: 'Rate Limits',
        desc: 'Usage limits',
        slug: 'rate-limiting'
    },
];

