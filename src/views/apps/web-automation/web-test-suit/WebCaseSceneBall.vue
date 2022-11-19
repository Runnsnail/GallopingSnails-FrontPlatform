<template>
  <div>
    <div class="ball">
      <div
          class="callback float sball"
          @mousedown="down"
          @touchstart="down"
          @mousemove="move"
          @touchmove="move"
          @mouseover="over"
          @mouseout="out"
          @mouseup="end"
          @touchend="end"
          @click="onClick"
          ref="fu"
      >
        <feather-icon size="20" icon="TwitterIcon" />
      </div>
      <div
          :style="{ left: left + 'px', top: top + 'px' }"
          v-if="menu"
          @mouseleave="out2"
          @mouseover.capture="over2"
          class="menuclass float"
      >
        <b-button
            v-ripple.400="'rgba(40, 199, 111, 0.15)'"
            variant="flat-success"
            @click="addCaseStep('success',operationName.ElementOperation,'ApertureIcon')"
        >
          <feather-icon icon="ApertureIcon" class="mr-50"/>
          <span class="align-middle">{{operationName.ElementOperation}}</span>
        </b-button>
        <b-button
            v-ripple.400="'rgba(40, 199, 111, 0.15)'"
            variant="flat-success"
            @click="addCaseStep('success',operationName.KeyboardOperation,'AnchorIcon')"
        >
          <feather-icon icon="AnchorIcon" class="mr-50"/>
          <span class="align-middle">{{operationName.KeyboardOperation}}</span>
        </b-button>
        <b-button
            v-ripple.400="'rgba(40, 199, 111, 0.15)'"
            variant="flat-primary"
            @click="addCaseStep('primary',operationName.WatingOperation,'LoaderIcon')"
        >
          <feather-icon icon="LoaderIcon" class="mr-50"/>
          <span class="align-middle">{{ operationName.WatingOperation }}</span>
        </b-button>
        <b-button
            v-ripple.400="'rgba(40, 199, 111, 0.15)'"
            variant="flat-primary"
            @click="addCaseStep('primary',operationName.JSOperation,'BellIcon')"
        >
          <feather-icon icon="BellIcon" class="mr-50"/>
          <span class="align-middle">{{ operationName.JSOperation }}</span>
        </b-button>
        <b-button
            v-ripple.400="'rgba(40, 199, 111, 0.15)'"
            variant="flat-warning"
            @click="addCaseStep('warning',operationName.BrowserOperation,'AwardIcon')"
        >
          <feather-icon icon="AwardIcon" class="mr-50"/>
          <span class="align-middle">{{ operationName.BrowserOperation }}</span>
        </b-button>
        <b-button
            v-ripple.400="'rgba(40, 199, 111, 0.15)'"
            variant="flat-warning"
            @click="addCaseStep('warning',operationName.CookerOperation,'CastIcon')"
        >
          <feather-icon icon="CastIcon" class="mr-50"/>
          <span class="align-middle">{{ operationName.CookerOperation }}</span>
        </b-button>
        <b-button
            v-ripple.400="'rgba(40, 199, 111, 0.15)'"
            variant="flat-danger"
            @click="addCaseStep('danger',operationName.FileOperation,'ClipboardIcon')"
        >
          <feather-icon icon="ClipboardIcon" class="mr-50"/>
          <span class="align-middle">{{ operationName.FileOperation }}</span>
        </b-button>
        <b-button
            v-ripple.400="'rgba(40, 199, 111, 0.15)'"
            variant="flat-danger"
            @click="addCaseStep('danger',operationName.MouseOperation,'NavigationIcon')"
        >
          <feather-icon icon="NavigationIcon" class="mr-50"/>
          <span class="align-middle">{{ operationName.MouseOperation }}</span>
        </b-button>
        <b-button
            v-ripple.400="'rgba(40, 199, 111, 0.15)'"
            variant="flat-info"
            @click="addCaseStep('info',operationName.AlterOperation,'SunriseIcon')"
        >
          <feather-icon icon="SunriseIcon" class="mr-50"/>
          <span class="align-middle">{{ operationName.AlterOperation }}</span>
        </b-button>
        <b-button
            v-ripple.400="'rgba(40, 199, 111, 0.15)'"
            variant="flat-info"
            @click="addCaseStep('info',operationName.ScenarioOperation,'LayersIcon')"
        >
          <feather-icon icon="LayersIcon" class="mr-50"/>
          <span class="align-middle">{{ operationName.ScenarioOperation }}</span>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Ripple from "vue-ripple-directive";
import BCardCode from "@core/components/b-card-code";
import {BAlert, BButton, BCardText} from "bootstrap-vue";
import bus from "@/views/apps/web-automation/bus";
import store from "@/store";
import {getDebugerCase} from "@/views/apps/web-automation/web-test-suit/webDebugCaseList";
import {getCurrentInstance} from "@vue/composition-api";

export default {
  components: {
    BCardCode,
    BButton,
    BAlert,
    BCardText,
  },
  directives: {
    Ripple,
  },
  props: {
    caseId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      left: 820,
      top: 55,
      menu: false,
      isLoading: false,
      flags: false, //控制使用
      position: {
        x: 0,
        y: 0,
      },
      nx: "",
      ny: "",
      dx: "",
      dy: "",
      xPum: "",
      yPum: "",
      movb: 1,
      num: 1,
    };
  },
  created() {},
  mounted() {
    this.left = this.$refs.fu.offsetLeft/2 + 100;
  },

  setup(props){

    const {showFlag,newCardID,operationName} = getDebugerCase();

    const addCaseStep = (paramVariant,name,paramIcon) => {
      store.dispatch('web-test-suits/addCaseStep', {
        variant:paramVariant,
        name:name,
        icon:paramIcon,
        isEnable:true,
        actionType:name,
        remark:"Please enter the remarks:......",
        testcaseId:props.caseId,
      }).then(response => {
        newCardID.value = response.data.data
        bus.$emit('getNewCardId',newCardID)
          }
      ).finally(()=>{
          bus.$emit('showStepIn')
      })
    }

    return{
      addCaseStep,
      showFlag,
      operationName,
    }

  },

  methods: {
    out2() {
      this.menu = false;
    },
    over2() {},
    out() {
      this.bg = 2;
    },
    over() {
      this.menu = true;
      this.num = 2;
    },
    callback() {
      this.$router.go(-1);
    },
    onRefresh() {
      // window.location.reload();
      setTimeout((res) => {
        this.isLoading = false;
      }, 1000);
    },
    down() {
      this.flags = true;
      var touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      this.position.x = touch.clientX;
      this.position.y = touch.clientY;
      this.dx = this.$refs.fu.offsetLeft;
      this.dy = this.$refs.fu.offsetTop;
    },
    move() {
      if (this.flags) {
        this.movb = 2;
        this.menu = false;
        let touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;
        this.xPum = this.dx + this.nx;
        this.yPum = this.dy + this.ny;
        let width = window.innerWidth - this.$refs.fu.offsetWidth; //屏幕宽度减去自身控件宽度
        let height = window.innerHeight - this.$refs.fu.offsetHeight; //屏幕高度减去自身控件高度
        this.xPum < 0 && (this.xPum = 0);
        this.yPum < 0 && (this.yPum = 0);
        this.xPum > width && (this.xPum = width);
        this.yPum > height && (this.yPum = height);
        // if (this.xPum >= 0 && this.yPum >= 0 && this.xPum<= width &&this.yPum<= height) {
        this.$refs.fu.style.left = this.xPum + "px";
        this.$refs.fu.style.top = this.yPum + "px";
        this.left = this.xPum/2 + 100;
        this.top = this.yPum - 1160;
        // }
        //阻止页面的滑动默认事件
        document.addEventListener(
            "touchmove",
            function () {
              event.preventDefault();
            },
            false
        );
      }
    },
    //鼠标释放时候的函数
    end() {
      this.flags = false;
    },
    onClick() {
      if (this.movb === 2) {
        this.movb = 1;
      } else {
        this.menu = !this.menu;
      }
      // this.$emit("click");
    },
  },
};
</script>
<style scoped>
.callback p {
  font-size: 16px;
  color: #fff;
  background: rgba(56, 57, 58, 0.5);
  border-radius: 50%;
  text-align: center;
  width: 50px;
  height: 50px;
  line-height: 50px;
  font-family: PingFang SC;
  font-weight: 600;
  box-shadow: 0 0 10px #fff;
}
.callback img {
  display: block;
  width: 50px;
  height: 50px;
  box-shadow: 0 0 10px rgb(133, 129, 129);
  border-radius: 50%;
  background: #fff;
}
.callback {
  position: fixed;
  width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  top: 592px;
  left: 1428px;
  z-index: 99999;
}
.float {
  position: fixed;
  touch-action: none;
  text-align: center;
  border-radius: 24px;
  line-height: 48px;
  color: white;
}

/* From uiverse.io by @krlozCJ */
.sball {
  border: none;
  outline: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #6c5ce7;
  padding: 10px 20px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  transition: all ease 0.1s;
  box-shadow: 0px 5px 0px 0px #a29bfe;
}

.sball:active {
  transform: translateY(5px);
  box-shadow: 0px 0px 0px 0px #a29bfe;
}

.menuclass {
  width: 150px;
  position: absolute;
}
.ball {
  position: relative;
  background-color: #000;
  right: 0;
  z-index: 99999;
}
.titlea {
  font-size: 18px;
  font-family: Microsoft YaHei-Bold, Microsoft YaHei;
  font-weight: bold;
  color: #333333;
}
.boxa {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  z-index: 999999;
}
.item {
  width: 168px;
  height: 75px;
  border-radius: 4px 4px 4px 4px;
  font-size: 16px;
  font-family: Microsoft YaHei-Bold, Microsoft YaHei;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  margin-left: 7px;
  line-height: 75px;
}
</style>

