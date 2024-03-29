export default [
    {
        header: 'User Interface',
    },
    {
        title: 'User Info',
        icon: 'UserIcon',
        tagVariant: 'light-danger',
        children: [
            {
                title: 'Account Settings',
                route: 'pages-account-setting',
            },
            {
                title: 'Profile',
                route: 'pages-profile',
            },
            {
                title: 'Faq',
                route: 'pages-faq',
            },
        ],
    },
    {
        title: 'Swagger documentation',
        icon: 'TwitchIcon',
        children: [
            {
                title: 'Swagger UI',
                href: 'http://localhost:8112/doc.html',
            },
            {
                title: 'Swagger API',
                href: 'http://localhost:8112/swagger-ui/index.html',
            },
        ],
    },
    {
        title: 'Knowledge Base',
        icon: 'TwitterIcon',
        route: 'pages-knowledge-base',
    },
    // {
    //   title: 'Typography',
    //   route: 'ui-typography',
    //   icon: 'TypeIcon',
    // },
    // {
    //   title: 'Colors',
    //   route: 'ui-colors',
    //   icon: 'DropletIcon',
    // },
    // {
    //   title: 'Feather',
    //   route: 'ui-feather',
    //   icon: 'EyeIcon',
    // },
    // {
    //   title: 'Cards',
    //   icon: 'CreditCardIcon',
    //   tag: 'new',
    //   tagVariant: 'light-success',
    //   children: [
    //     {
    //       title: 'Basic',
    //       route: 'card-basic',
    //     },
    //     {
    //       title: 'Advance',
    //       route: 'card-advance',
    //     },
    //     {
    //       title: 'Statistics',
    //       route: 'card-statistic',
    //     },
    //     {
    //       title: 'Analytics',
    //       route: 'card-analytic',
    //     },
    //     {
    //       title: 'Card Actions',
    //       route: 'card-action',
    //     },
    //   ],
    // },
    // {
    //   title: 'Components',
    //   icon: 'ArchiveIcon',
    //   children: [
    //     {
    //       title: 'Alert',
    //       route: 'components-alert',
    //     },
    //     {
    //       title: 'Aspect',
    //       route: 'components-aspect',
    //     },
    //     {
    //       title: 'Avatar',
    //       route: 'components-avatar',
    //     },
    //     {
    //       title: 'Badge',
    //       route: 'components-badge',
    //     },
    //     {
    //       title: 'Breadcrumb',
    //       route: 'components-breadcrumb',
    //     },
    //     {
    //       title: 'Button',
    //       route: 'components-button',
    //     },
    //     {
    //       title: 'Button Group',
    //       route: 'components-button-group',
    //     },
    //     {
    //       title: 'Button Toolbar',
    //       route: 'components-button-toolbar',
    //     },
    //     {
    //       title: 'Calendar',
    //       route: 'components-calendar',
    //     },
    //     {
    //       title: 'Carousel',
    //       route: 'components-carousel',
    //     },
    //     {
    //       title: 'Collapse',
    //       route: 'components-collapse',
    //     },
    //     {
    //       title: 'Dropdown',
    //       route: 'components-dropdown',
    //     },
    //     {
    //       title: 'Embed',
    //       route: 'components-embed',
    //     },
    //     {
    //       title: 'Image',
    //       route: 'components-image',
    //     },
    //     {
    //       title: 'List Group',
    //       route: 'components-list-group',
    //     },
    //     {
    //       title: 'Media Objects',
    //       route: 'components-media',
    //     },
    //     {
    //       title: 'Modal',
    //       route: 'components-modal',
    //     },
    //     {
    //       title: 'Nav',
    //       route: 'components-nav',
    //     },
    //     {
    //       title: 'Overlay',
    //       route: 'components-overlay',
    //     },
    //     {
    //       title: 'Pagination',
    //       route: 'components-pagination',
    //     },
    //     {
    //       title: 'Pagination Nav',
    //       route: 'components-pagination-nav',
    //     },
    //     {
    //       title: 'Pill',
    //       route: 'components-pill',
    //     },
    //     {
    //       title: 'Pill Badge',
    //       route: 'components-pill-badge',
    //     },
    //     {
    //       title: 'Popover',
    //       route: 'components-popover',
    //     },
    //     {
    //       title: 'Progress',
    //       route: 'components-progress',
    //     },
    //     {
    //       title: 'Sidebar',
    //       route: 'components-sidebar',
    //     },
    //     {
    //       title: 'spinner',
    //       route: 'components-spinner',
    //     },
    //     {
    //       title: 'Tab',
    //       route: 'components-tab',
    //     },
    //     {
    //       title: 'Time',
    //       route: 'components-time',
    //     },
    //     {
    //       title: 'Timeline',
    //       route: 'components-timeline',
    //     },
    //     {
    //       title: 'Toasts',
    //       route: 'components-toasts',
    //     },
    //     {
    //       title: 'Tooltip',
    //       route: 'components-tooltip',
    //     },
    //   ],
    // },
    // {
    //   title: 'Extensions',
    //   icon: 'PlusCircleIcon',
    //   children: [
    //     {
    //       title: 'Sweet Alert',
    //       route: 'extensions-sweet-alert',
    //     },
    //     {
    //       title: 'Toastification',
    //       route: 'extensions-toastification',
    //     },
    //     {
    //       title: 'Slider',
    //       route: 'extensions-slider',
    //     },
    //     {
    //       title: 'Drag & Drop',
    //       route: 'extensions-drag-and-drop',
    //     },
    //
    //     {
    //       title: 'Tour',
    //       route: 'extensions-tour',
    //     },
    //
    //     {
    //       title: 'Clipboard',
    //       route: 'extensions-clipboard',
    //     },
    //     {
    //       title: 'Context Menu',
    //       route: 'extensions-context-menu',
    //     },
    //
    //     {
    //       title: 'Swiper',
    //       route: 'extensions-swiper',
    //     },
    //
    //     // {
    //     //   title: 'Tree',
    //     //   route: 'extensions-tree',
    //     // },
    //
    //     {
    //       title: 'I18n',
    //       route: 'extensions-i18n',
    //     },
    //   ],
    // },
    // {
    //   title: 'Page Layouts',
    //   icon: 'LayoutIcon',
    //   children: [
    //     {
    //       title: 'Collapsed Menu',
    //       route: 'page-layout-collapsed-menu',
    //     },
    //     {
    //       title: 'Layout Boxed',
    //       route: 'page-layout-boxed-layout',
    //     },
    //     {
    //       title: 'Without Menu',
    //       route: 'page-layout-without-menu',
    //     },
    //     {
    //       title: 'Layout Empty',
    //       route: 'page-layout-layout-empty',
    //     },
    //     {
    //       title: 'Layout Blank',
    //       route: 'page-layout-layout-blank',
    //     },
    //   ],
    // },
]
