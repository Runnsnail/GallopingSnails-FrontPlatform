<template>
  <codemirror
      ref="myCode"
      v-model="jsonCode"
      :options="codeOptions"
      @input="inputChange"
  />
</template>

<script>
import {codemirror} from 'vue-codemirror';
import 'codemirror/theme/liquibyte.css';//导入选中的theme主题,与初始化theme配置一致
import 'codemirror/addon/hint/show-hint.css';//导入自动提示核心样式
import 'codemirror/theme/ayu-mirage.css'
import jsonlint from 'jsonlint-mod'; //lint验证需要的组件
import 'codemirror/mode/javascript/javascript';//导入使用的语言语法定义文件，初始化mode配置一致
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/hint/show-hint.js';//导入自动提示核心文件
import 'codemirror/addon/lint/json-lint';//导入指定语言的提示文件
export default {
  components: {
    codemirror
  },

  props: {
    jsonCode: {
      default: "'name':'value'"
    }
  },

  beforeCreate() {
    // 开启JSON校验
    window.jsonlint = jsonlint
  },

  mounted(){
    this.$refs.myCode.codemirror.setSize("auto", "160px")
  },

  data() {
    return {
      curCode: '',
      codeOptions: {
        value: '',//编辑器的起始值。可以是字符串，也可以是文档对象。
        mode: "application/json",//第一个将模式名称映射到它们的构造函数，第二个将MIME类型映射到模式规范。
        theme: "ayu-mirage",//编辑器样式的主题
        indentWithTabs: true,//在缩进时，是否tabSize 应该用N个制表符替换前N *个空格。默认值为false。
        smartIndent: true,//是否使用模式提供的上下文相关缩进（或者只是缩进与之前的行相同）。默认为true。
        lineNumbers: false,//是否在编辑器左侧显示行号。
        matchBrackets: true,//括号匹配
        autofocus: true,//可用于使CodeMirror将焦点集中在初始化上
        extraKeys: {"Ctrl-Space": "autocomplete"},//按键配置
        hintOptions: {
          completeSingle: false
        }
      },
    }
  },

  methods: {
    inputChange() {
      this.$nextTick(() => {
        this.jsonCode = ((JSON.stringify(JSON.parse(this.jsonCode), null, 2)))
      })

    }
  }
}
</script>

<style scoped>

</style>
