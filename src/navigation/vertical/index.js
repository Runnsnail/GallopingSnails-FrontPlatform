/*

Array of object

Top level object can be:
1. Header
2. Group (Group can have navItems as children)
3. navItem

* Supported Options

/--- Header ---/

header

/--- nav Grp ---/

title
icon (if it's on top level)
tag
tagVariant
children

/--- nav Item ---/

icon (if it's on top level)
title
route: [route_obj/route_name] (I have to resolve name somehow from the route obj)
tag
tagVariant

*/
import dashboard from './dashboard'
import appsAndPages from './apps-and-pages'
import others from './others'
import chartsAndMaps from './charts-and-maps'
import uiElements from './ui-elements'
import formAndTable from './forms-and-table'
import appAppAuto from './app-Appauto'
import setting from './system-seting'
import appWebUI from './app-webUI'

// Array of sections
export default [...dashboard,...appAppAuto,...appsAndPages, ...uiElements,...setting, ...formAndTable, ...chartsAndMaps, ...others]
