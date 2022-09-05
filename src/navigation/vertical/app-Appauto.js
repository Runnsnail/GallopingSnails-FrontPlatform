export default [
  {
    header: 'Auto & Automation',
  },
  {
    title: 'App',
    icon: 'SmartphoneIcon',
    children: [
  {
    title: 'PageElement Management',
    icon: 'KeyIcon',
    route: 'app-element-management',
  },
  {
    title: 'TestCase Management',
    icon: 'InboxIcon',
    route: 'app-case-management',
  },
  {
    title: 'Execution',
    icon: 'FlagIcon',
    route: 'app-page-execution',
  },
  {
    title: 'TestReport',
    icon: 'SunriseIcon',
    route: 'app-test-report',
  },
    ]},

// WebAutomation
  {
    title: 'Web ',
    icon: 'SlackIcon',
    children: [
      {
        title: 'Web PageElement',
        icon: 'PackageIcon',
        route: 'page-element-management',
      },
      {
        title: 'Web TestCase',
        icon: 'OctagonIcon',
        route: 'test-case-management',
      },
      {
        title: 'WebUI Execution',
        icon: 'PenToolIcon',
        route: 'web-page-execution',
      },
      {
        title: 'WebUI TestReport',
        icon: 'PaperclipIcon',
        route: 'web-test-report',
      },
    ]},

  //Interface Automation

  {
    title: 'Interface',
    icon: 'ShieldIcon',
    children: [
      {
        title: 'Interface Api',
        icon: 'ActivityIcon',
        route: 'interface-management',
      },
      {
        title: 'InterfaceScene',
        icon: 'GithubIcon',
        route: 'interface-scene-management',
      },
      {
        title: 'Api Debugging',
        icon: 'CastIcon',
        route: 'interface-debugging-execution',
      },
      {
        title: 'Api Execution',
        icon: 'BellIcon',
        route: 'interface-page-execution',
      },
      {
        title: 'Api TestReport',
        icon: 'AwardIcon',
        route: 'interface-test-report',
      },
    ]},
]
