import {ref} from "@vue/composition-api";
import bus from "@/views/apps/web-automation/bus";


export const getStepInformation = () => {

    const watingTimes = ref(['1','2', '5', '10']);

    const watie = ref(1)

    const actionPotions =ref(['单击', '点击', '清除','输入'],)

    const actionJsPotions =ref(['JS点击', 'js给指定元素value赋值', 'js使元素隐藏元素显示','滚动到窗口最上方', '滚动到窗口最下方','滚动到某个元素'],)

    const filePotions = ref(['input元素上传','非input元素上传'])

    const actionKeysPotions = ref(['复制', '粘贴', '全选','剪切', '方向键上', '方向键下', '回车键','删除键'],)

    const cookerPotions = ref(['添加cookie信息','根据cookie名称删除cookie','删除当前域的所有Cookie'])

    const actionMousePotions = ref(['鼠標悬浮', '鼠標右键点击', '鼠標左键点击','鼠標双击'])

    const cookerVariable = [
        { text: 'setCooker', value: '{"cookerName":"Name","cookerValue":"Value"}' },
        { text: 'setCookers', value: '{"Cookers":[{"cookerName":"Name","cookerValue":"Value"},{"cookerName":"Name","cookerValue":"Value"}]}' },
        { text: 'setCookerByUrl', value: '{"cookerName":"Name","cookerValue":"Value","cookerURL":"URL"}' },
    ]

    const browserOptions =ref(
        [
            '打开URL', '关闭浏览器', '最大化浏览器','上一个页面', '下一个页面', '强制刷新页面','刷新页面'
            ,'切换iframe', '跳出iframe', '窗口切换(限制2窗口)','根据title进行窗口切换'
        ],)

    const alterOptions = ref(['确认弹窗','取消弹窗'])

    const pageOption = ref([])

    const elementOption = ref([])

    const pageType = ref(null)

    const elementName = ref(null)

    return{
        watingTimes,
        watie,
        pageType,
        elementName,
        cookerVariable,
        actionPotions,
        actionJsPotions,
        filePotions,
        actionKeysPotions,
        actionMousePotions,
        cookerPotions,
        browserOptions,
        alterOptions,
        pageOption,
        elementOption,
    }

}
