import {ref} from "@vue/composition-api";


export const getStepInformation = () => {

    const watingTimes = [1,2, 5, 10];

    const watie = ref(1)

    const actionPotions =ref(['单击', '点击', '清除','输入'],)


    return{
        watingTimes,
        watie,
        actionPotions,
    }

}
