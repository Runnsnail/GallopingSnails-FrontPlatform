export default [
// *===============================================---*
// *--------- Apps & app-automation -------------------------------*
// *===============================================---*
    {
        path: '/apps/app-automation/app-element-management',
        name: 'app-element-management',
        component: () => import('@/views/apps/app-automation/AppAutoPageElementManagement.vue'),
    },
    {
        path: '/apps/app-automation/app-case-management',
        name: 'app-case-management',
        component: () => import('@/views/apps/app-automation/AppAutoTestCaseManagement.vue'),
    },
    {
        path: '/apps/app-automation/app-page-execution',
        name: 'app-page-execution',
        component: () => import('@/views/apps/app-automation/AppAutoExecution.vue'),
    },
    {
        path: '/apps/app-automation/app-test-report',
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
        path: '/apps/web-automation/test-case-management/:projectID',
        name: 'test-case-management',
        component: () => import('@/views/apps/web-automation/web-test-case/WebTestCaseManagement.vue'),
        meta: {
            contentRenderer: 'sidebar-left',
            contentClass: 'email-application',
        },
    },
    {
        path: '/apps/web-automation/web-test-suits',
        name: 'web-test-suits',
        component: () => import('@/views/apps/web-automation/web-test-suit/WebTestSuits'),
        meta: {
            contentRenderer: 'sidebar-left',
            contentClass: 'email-application',
        },
    },

    {
        path: '/apps/web-automation/web-case-debug',
        name: 'web-case-debug',
        component: () => import('@/views/apps/web-automation/web-test-suit/WebCaseDebug'),
    },

    {
        path: '/apps/web-automation/web-case-edit/:id',
        name: 'web-case-edit',
        component: () => import('@/views/apps/web-automation/web-test-suit/WebCaseEdit.vue'),
        meta: {
            contentRenderer: 'sidebar-left',
            contentClass: 'email-application',
        },
    },
    {
        path: '/apps/web-automation/web-page-execution',
        name: 'web-page-execution',
        component: () => import('@/views/apps/web-automation/WebUIExecution.vue'),
    },
    {
        path: '/apps/web-automation/web-test-report',
        name: 'web-test-report',
        component: () => import('@/views/apps/web-automation/WebUITestReport.vue'),
    },

    // *===============================================---*
// *--------- Interface & inter-automation -------------------------------*
// *===============================================---*
    {
        path: '/apps/interface-automation/interface-management',
        name: 'interface-management',
        component: () => import('@/views/apps/interface-automation/InterfaceManagement.vue'),
    },
    {
        path: '/apps/interface-automation/interface-scene-management',
        name: 'interface-scene-management',
        component: () => import('@/views/apps/interface-automation/InterfaceSceneManagement.vue'),
    },
    {
        path: '/apps/interface-automation/interface-debugging-execution',
        name: 'interface-debugging-execution',
        component: () => import('@/views/apps/interface-automation/InterfaceDebugging.vue'),
    },
    {
        path: '/apps/interface-automation/interface-page-execution',
        name: 'interface-page-execution',
        component: () => import('@/views/apps/interface-automation/InterfaceExecution.vue'),
    },
    {
        path: '/apps/interface-automation/interface-test-report',
        name: 'interface-test-report',
        component: () => import('@/views/apps/interface-automation/InterfaceTestReport.vue'),
    },
]
