import Vue from 'vue'
 export const EventBus = new Vue({
   data () {
     return {
       // 定义数据
       data: {}
     }
   },
   created () {
     // 绑定监听
     this.$on('getInfo', value => {
       this.data = value
     })
   }
 })

