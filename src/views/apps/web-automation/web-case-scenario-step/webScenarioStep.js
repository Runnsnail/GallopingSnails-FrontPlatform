import {ref} from "@vue/composition-api";
import bus from "@/views/apps/web-automation/bus";


export const getStepInformation = () => {

    const watingTimes = [1,2, 5, 10];

    const watie = ref(1)

    const actionPotions =ref(['单击', '点击', '清除','输入'],)

    const cookerPotions = ref(['添加cookie信息','设置默认路劲cooker','设置自定义路径cooker','根据cookie名称删除cookie','删除当前域的所有Cookie'])

    const browserOptions =ref(
        [
            '打开URL', '关闭浏览器', '最大化浏览器','上一个页面', '下一个页面', '强制刷新页面','刷新页面'
            ,'切换iframe', '跳出iframe', '窗口切换(限制2窗口)','根据title进行窗口切换'
        ],)

    const pageOption = ref([])

    const elementOption = ref([])

    const pageType = ref(null)

    const elementName = ref(null)

    return{
        watingTimes,
        watie,
        pageType,
        elementName,
        actionPotions,
        cookerPotions,
        browserOptions,
        pageOption,
        elementOption,
    }

}
