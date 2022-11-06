export default [
// *===============================================---*
// *--------- Roles & IT'S FILTERS N LABELS -------------------------------*
// *===============================================---*
    {
        path: '/apps/roles-permission',
        name: 'apps-roles',
        component: () => import('@/views/apps/roles-permission/Roles.vue'),
        meta: {
            resource: 'Auth',
            action: 'read',
            redirectIfLoggedIn: true,
        },
    },
    {
        path: '/apps/roles-permission',
        name: 'apps-permission',
        component: () => import('@/views/apps/roles-permission/Permission.vue'),
        meta: {
            resource: 'ACL',
            action: 'read',
            redirectIfLoggedIn: true,
        },
    },
]
