export default [
// *===============================================---*
// *--------- Apps & app-automation -------------------------------*
// *===============================================---*
    {
        path: '/apps/app-automation',
        name: 'app-element-management',
        component: () => import('@/views/apps/app-automation/AppAutoPageElementManagement.vue'),
    },
    {
        path: '/apps/app-automation',
        name: 'app-case-management',
        component: () => import('@/views/apps/app-automation/AppAutoTestCaseManagement.vue'),
    },
    {
        path: '/apps/app-automation',
        name: 'app-page-execution',
        component: () => import('@/views/apps/app-automation/AppAutoExecution.vue'),
    },
    {
        path: '/apps/app-automation',
        name: 'app-test-report',
        component: () => import('@/views/apps/app-automation/AppAutoTestReport.vue'),
    },

    // *===============================================---*
// *--------- WebUI & web-automation -------------------------------*
// *===============================================---*
    {
        path: '/apps/web-automation',
        name: 'page-element-management',
        component: () => import('@/views/apps/web-automation/PageElementManagement.vue'),
    },
    {
        path: '/apps/web-automation',
        name: 'test-case-management',
        component: () => import('@/views/apps/web-automation/WebTestCaseManagement.vue'),
    },
    {
        path: '/apps/web-automation',
        name: 'web-page-execution',
        component: () => import('@/views/apps/web-automation/WebUIExecution.vue'),
    },
    {
        path: '/apps/web-automation',
        name: 'web-test-report',
        component: () => import('@/views/apps/web-automation/WebUITestReport.vue'),
    },

    // *===============================================---*
// *--------- Interface & inter-automation -------------------------------*
// *===============================================---*
    {
        path: '/apps/interface-automation',
        name: 'interface-management',
        component: () => import('@/views/apps/interface-automation/InterfaceManagement.vue'),
    },
    {
        path: '/apps/interface-automation',
        name: 'interface-scene-management',
        component: () => import('@/views/apps/interface-automation/InterfaceSceneManagement.vue'),
    },
    {
        path: '/apps/interface-automation',
        name: 'interface-debugging-execution',
        component: () => import('@/views/apps/interface-automation/InterfaceDebugging.vue'),
    },
    {
        path: '/apps/interface-automation',
        name: 'interface-page-execution',
        component: () => import('@/views/apps/interface-automation/InterfaceExecution.vue'),
    },
    {
        path: '/apps/interface-automation',
        name: 'interface-test-report',
        component: () => import('@/views/apps/interface-automation/InterfaceTestReport.vue'),
    },
]
