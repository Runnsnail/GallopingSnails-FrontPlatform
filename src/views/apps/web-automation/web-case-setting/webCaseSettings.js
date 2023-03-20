export const getSettingInformation = () => {


    // const beforeAction = [
    //     { text: '元素断言', value: '元素断言' },
    //     { text: '发送接口请求', value: '发送接口请求' },
    //     { text: '文本断言', value: '文本断言' },
    //     { text: 'JavaScript', value: 'JavaScript' },
    // ]

    const beforeAction = [{ title: '元素断言' }, { title: '发送接口请求' }, { title: '文本断言' }, { title: 'JavaScript' }]

    // const afterAction = [
    //     { text: '元素断言', value: '元素断言' },
    //     { text: '发送接口请求', value: '发送接口请求' },
    //     { text: '文本断言', value: '文本断言' },
    //     { text: '数据提取', value: '数据提取' },
    //     { text: 'JavaScript', value: 'JavaScript' },
    // ]

    const afterAction = [{ title: '元素断言' }, { title: '发送接口请求' }, { title: '数据提取' }, { title: '文本断言' }, { title: 'JavaScript' }]

    // const errorAction = [
    //     { text: '忽略错误，继续执行', value: '忽略错误，继续执行' },
    //     { text: '中断执行', value: '中断执行' },
    //     { text: '忽略错误，重新执行', value: '忽略错误，重新执行' },
    // ]

    const errorAction = [{ title: '忽略错误，继续执行' }, { title: '中断执行' }, { title: '忽略错误，重新执行' }]

    const condition = ref({});

    return{
        beforeAction,
        afterAction,
        errorAction,
        condition,
    }
}

export const useInputImageRenderer = (inputEl, callback) => {
    const inputImageRenderer = () => {
        const file = inputEl.value.files[0]
        const reader = new FileReader()

        reader.addEventListener(
            'load',
            () => {
                callback(reader.result)
            },
            false,
        )

        if (file) {
            reader.readAsDataURL(file)
        }
    }
    return {
        inputImageRenderer,
    }
}

export const _ = null

