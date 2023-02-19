<template>
  <div>
    <b-card title="StepLogs">
      <b-card-text class="mb-0">
        点击可查看详细测试步骤信息
      </b-card-text>
      <!-- types -->
      <app-collapse
          accordion
          :type="collapseType"
      >

        <app-collapse-item
            v-for="listItem in logList"
            :title= showTitleAndStatus(listItem)
            :key="listItem.id"
        >
          <b-card-text class="mb-1" style="white-space: pre-wrap;">
            {{ listItem.logDetail }}
          </b-card-text>
          <b-img
              thumbnail fluid
              :src="listItem.imgname"
              @click="showImgViewer(listItem.imgname)"
          />
          <el-image-viewer
              v-if="imgViewerVisible"
              :on-close="closeImgViewer"
              :url-list="[listItem.imgname]"/>
        </app-collapse-item>
      </app-collapse>
    </b-card>
  </div>
</template>

<script>
import {
  BImg, BListGroup, BListGroupItem, BCardText, BCard,
} from 'bootstrap-vue'
import AppCollapse from "@core/components/app-collapse/AppCollapse";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem";
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import store from "@/store";
import {ref,watch} from "@vue/composition-api";
import {getStepInformation} from "@/views/apps/web-automation/web-case-scenario-step/webScenarioStep";

export default {
  components: {
    BImg,
    BListGroup,
    BListGroupItem,
    BCardText,
    AppCollapse,
    AppCollapseItem,
    BCard,
    ElImageViewer,
  },

  model: {
    prop: 'isLogSidebarActive',
    event: 'update:is-log-sidebar-active',
  },

  props: {
    isLogSidebarActive: {
      type: Boolean,
      required: true,
    },
  },

  setup(props) {


    const showTitleAndStatus = (param) =>{
      if(param.status===0){
        return param.stepName + `           【成功 🎉】`
      }
      if(param.status===1){
        return param.stepName + `           【失败 🎂】`
      }
      if(param.status===2){
        return param.stepName + `           【跳过 🎊】`
      }
    }



    const logList = ref([])
    const {caseId} = getStepInformation();
    let param = ref(null)

    const showLog = () => {
      if(props.isLogSidebarActive){
        showCaseLogs(caseId)
      }
    }

    watch(caseId, () => {
      param = caseId
      showCaseLogs(param)
    }, {
      deep: true,
    })

    const showCaseLogs = (param) => {
      store.dispatch("web-debug-case/showCaseLogs", param.value).then(
          response => {
            logList.value = response.data.data;
            console.log(logList.value)
          }
      )
    }


    return {

      showCaseLogs,
      showLog,
      showTitleAndStatus,

      logList,
    }

  },

  data() {
    return {
      collapseType: 'margin',
      imgViewerVisible:false,
    }
  },

  methods: {
     showImgViewer (param) {
      this.imgViewerVisible = true;
      console.log(param )
      const m = (e) => {
        e.preventDefault()
      };
      document.body.style.overflow = 'hidden';
      document.addEventListener("touchmove", m, false); // 禁止页面滑动

    },

     closeImgViewer () {
      this.imgViewerVisible = false;
      const m = (e) => {
        e.preventDefault()
      };
      document.body.style.overflow = 'auto';
      document.removeEventListener("touchmove", m, true);
    }
  }
}
</script>
