export default [
// *===============================================---*
// *--------- System & Setting -------------------------------*
// *===============================================---*
    {
        path: '/apps/system-seting',
        name: 'drive-resource',
        component: () => import('@/views/apps/system-seting/DriveResources.vue'),
    },
    {
        path: '/apps/system-seting',
        name: 'log-common',
        component: () => import('@/views/apps/system-seting/LogCommon.vue'),
    },
    {
        path: '/apps/system-seting',
        name: 'message-robot',
        component: () => import('@/views/apps/system-seting/MessageRobot.vue'),
    },
    {
        path: '/apps/system-seting',
        name: 'mobile-resources',
        component: () => import('@/views/apps/system-seting/MobileResources.vue'),
    },
    {
        path: '/apps/system-seting',
        name: 'time-task',
        component: () => import('@/views/apps/system-seting/TimeTask.vue'),
    },


]
