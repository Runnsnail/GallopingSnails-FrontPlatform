export default [
// *===============================================---*
// *--------- Roles & IT'S FILTERS N LABELS -------------------------------*
// *===============================================---*
    {
        path: '/apps/roles-permission',
        name: 'apps-roles',
        component: () => import('@/views/apps/roles-permission/Roles.vue'),
        meta: {
            resource: 'ACL',
            action: 'read',
        },
    },
    {
        path: '/apps/roles-permission',
        name: 'apps-permission',
        component: () => import('@/views/apps/roles-permission/Permission.vue'),
        meta: {
            resource: 'ACL',
            action: 'read',
        },
    },
]
