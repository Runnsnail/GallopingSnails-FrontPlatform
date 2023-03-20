<template>
  <div class="sidebar-left">
    <div class="sidebar">
      <div class="sidebar-content email-app-sidebar">
        <div class="email-app-menu">
          <!-- Searchbar -->
          <div class="form-group-compose text-center compose-btn">
            <b-form-group>
              <b-input-group size="sm">
                <b-form-input
                    id="filterInput"
                    v-model="filter.q"
                    type="search"
                    placeholder="Type to Search"
                />
                <b-input-group-append>
                  <b-button
                      :disabled="!filter.q"
                      @click="filter.q = ''"
                  >
                    Clear
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </div>


          <vue-perfect-scrollbar
              :settings="perfectScrollbarSettings"
              class="sidebar-menu-list scroll-area"
          >
            <!-- Labels -->
            <h6 class="section-label mt-1 mb-1 px-2">
              Test Suits
            </h6>
            <div class="myTree">
              <template>
                <div>
                  <!-- 导航菜单 -->
                  <div class="custom-tree-container">
                    <div class="block">
                      <!-- <p>使用 scoped slot</p> -->
                      <div class="allC" @click="handleAllCase">
                        <i class="el-icon-link"></i><span class="allCase">所有用例</span>
                      </div>
                      <el-tree
                          :data="treeData"
                          node-key="id"
                          :expand-on-click-node="false"
                          @node-drag-start="handleDragStart"
                          @node-drag-enter="handleDragEnter"
                          @node-drag-leave="handleDragLeave"
                          @node-drag-over="handleDragOver"
                          @node-drag-end="handleDragEnd"
                          @node-drop="handleDrop"
                          @node-click="myEvent"
                          draggable
                          :allow-drop="allowDrop"
                          :allow-drag="allowDrag"
                      >
                    <span
                        class="custom-tree-node"
                        slot-scope="{ node, data }"
                        @mouseenter="onMouseOver($event)"
                        @mouseleave="onMouseOut($event)"
                        @click="showCases(data.id)"
                    >
                      <span v-if="!data.isEdit">
                        <b-avatar :variant="`light-success`" size="20"><feather-icon :icon="treeIcon.icon"/></b-avatar>
                        {{ node.label }}</span>
                      <span class="isEdit">
                        <!-- 编辑状态 -->
                        <div v-if="data.isEdit">
                          <el-input
                              v-model="data.label"
                              autofocus
                              size="mini"
                              :ref="'slotTreeInput' + data[id]"
                              @blur.stop="handleInput(node, data)"
                              @keyup.enter.native="handleInput(node, data)"
                          >
                          </el-input>

                        </div>
                        <!-- 非编辑状态 -->
                        <div v-else>
                          <!-- 名称： 新增节点增加class（is-new） -->
                          <span
                              :class="[
                              data[id] < NODE_ID_START ? 'is-new' : '',
                              'comp-tr-node--name',
                            ]"
                          >
                          </span>
                        </div>
              <span class="comp-tr-node--btns" v-show="false">
                <el-dropdown trigger="click" @visible-change="handleDropdown">
                  <i class="el-icon-more"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="() => append(node, data)">
                      <i class="el-icon-circle-plus-outline"></i>新增</el-dropdown-item>
                    <el-dropdown-item @click.native="handleEdit(node, data)">
                      <i class="el-icon-edit"></i>编辑</el-dropdown-item>
                    <el-dropdown-item @click.native="() => remove(node, data)">
                      <li class="el-icon-delete"></li>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
            </span>
          </span>
        </el-tree>


          <b-button
              variant="relief-primary " @click="handleNewMoudle"
              v-ripple.400="'rgba(113, 102, 240, 0.15)'" pill
              size="sm"
              style="margin-left: 160px;margin-top: 20px;"
          >
          新建模块
        </b-button>
      </div>
    </div>
  </div>
</template>
</div>
</vue-perfect-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {
  BModal,
  VBModal,
  BForm,
  BButton,
  BListGroup,
  BListGroupItem,
  BBadge,
  BTable,
  BAvatar,
  BFormGroup,
  BFormSelect,
  BPagination,
  BInputGroup,
  BFormInput, BInputGroupAppend, BCardBody, BCard, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive';
import {ref, watch} from "@vue/composition-api";
import store from '@/store'
import {ValidationObserver, ValidationProvider} from "vee-validate";
import {required} from '@core/utils/validations/validations'
import {useWebFiltersSuits} from "@/views/apps/web-automation/web-test-suit/webFillterSuits";
import ElementTreeLine from 'element-tree-line';
import 'element-tree-line/dist/style.css';
import bus from "@/views/apps/web-automation/bus";

let id = 1000;
export default {
  directives: {
    'b-modal': VBModal,
    Ripple,
  },

  components: {

    // BSV
    BButton,
    BListGroup,
    BListGroupItem,
    BDropdown,
    BDropdownItem,
    BBadge,
    BCard,
    BTable,
    BAvatar,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BCardBody,
    BModal,
    BForm,

    // 3rd Party
    VuePerfectScrollbar,
    // vaildtion
    ValidationProvider,
    ValidationObserver,
    // tree
    ElementTreeLine,


  },

  setup() {
    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
    }

    const {filter, pageOptions, treeData, totalRows, treeIcon} = useWebFiltersSuits()

    const showCases = (suiteId) => {
      bus.$emit("eventSuitId", suiteId)
    }

    const deleteSuits = param => {
      store.dispatch('web-test-suits/deleteSuits', param).then(response => {
            fetchTestSuits()
          }
      )
    }

    const addPartentSuit = data => {
      store.dispatch('web-test-suits/addSuits', {
        id: data.id,
        name: data.label,
        projectId: data.projectId,
        parentId: data.parentId,
        sort: null,
        isLeaf: false,
      }).then(response => {
            fetchTestSuits()
          }
      )
    }


    const addSuits = data => {
      store.dispatch('web-test-suits/addSuits', {
        id: data.id,
        name: data.label,
        projectId: data.projectId,
        parentId: data.parentId,
        sort: 1,
        isLeaf: false,
      }).then(response => {
            // fetchTestSuits()
          }
      )
    }

    const editSuits = data => {
      store.dispatch('web-test-suits/editSuits', {
        id: data.id,
        name: data.label,
        projectId: data.projectId,
        parentId: data.parentId,
        sort: 1,
        isLeaf: false,
      }).then(response => {
          }
      )
    }

    const updateSuiteTree = data => {
      store.dispatch('web-test-suits/updateSuiteTree', data).then(response => {

          }
      )
    }

    const fetchTestSuits = () => {
      store.dispatch('web-test-suits/fetchTestSuits', {
        q: filter.value.q,
        type: 0,
      }).then(response => {
            treeData.value = response.data.data
          }
      )
    }

    fetchTestSuits()


    watch(filter, () => {
      fetchTestSuits()
    }, {
      deep: true,
    })

    return {
      // UI
      perfectScrollbarSettings,
      fetchTestSuits,
      filter,
      pageOptions,
      totalRows,
      selected: 'default',

      // Tree
      treeData,
      deleteSuits,
      editSuits,
      addSuits,
      updateSuiteTree,
      addPartentSuit,
      showCases,
      treeIcon,
    }
  },

  data() {
    return {
      required,
      currentEle: null, //操作下拉列表 当前图表元素 省略号
      dropdownShow: false, //下拉列表当前显示状态
      setTree: [], // tree数据
      id: "id", // id对应字段
      MAX_LEVEL: 6, // 设定最大层级
      NODE_ID_START: 0, // 新增节点id，逐次递减
      startId: null,
      //页面可拖拽
      defaultProps: {
        children: "children",
        label: "label",
      },
    }
  },

  created() {
    // 初始值
    this.startId = this.NODE_ID_START;
  },


  methods: {

    //所有用例列表接口
    handleAllCase() {
    },
    //el-tree点击事件
    myEvent(d1, d2, d3) {
      // console.log(d1.id)
      this.$emit("myEvent", d1.id);

    }, //d1.label
    //下拉列表
    handleDropdown(v) {
      this.dropdownShow = v;
      if (v) return;
      this.currentEle.style.cssText += "display:none";
    },
    //增删改鼠标移入移出隐藏显示
    //鼠标移入
    onMouseOver: function (event) {
      event.target.parentElement.querySelector(
          ".comp-tr-node--btns"
      ).style.cssText += "display:block";
      this.currentEle = event.target.parentElement.querySelector(
          ".comp-tr-node--btns"
      );
    },
    //鼠标移出
    onMouseOut: function (event) {
      if (this.dropdownShow) return;
      event.target.parentElement.querySelector(
          ".comp-tr-node--btns"
      ).style.cssText += "display:none";
    },

    //新增一级目录模块点击事件
    handleNewMoudle() {

      const moudle = {
        id: null,
        label: "未命名模块" ,
        parentId: null,
        children: [],
        projectId:1,
        isEdit: true,
      }

      this.addPartentSuit(moudle);
    },
    //新增按钮
    append(node, data) {
      if (node.level >= this.MAX_LEVEL) {
        this.$message.warning(
            "当前目录已达到" + this.MAX_LEVEL + "级，无法新增！"
        );
        return false;
      }
      //新定义一个对象
      const newChild = {
        id: null,
        label: "未命名模块"+data.id,
        parentId: data.id,
        children: [],
        projectId: data.projectId,
        isEdit: true,
      };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
      //新增子节点到3级   show-checkbox
      this.addSuits(newChild);
      this.$nextTick(() => {
        if (this.$refs["slotTreeInput" + data[this.id]]) {
          this.$refs["slotTreeInput" + data[this.id]].$refs.input.focus();
        }
      });
    },
    //删除按钮
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
      this.deleteSuits(data.id)
    },

    //编辑按钮
    handleInput(node, data) {
      // 修改节点
      console.log(node, data);
      // 退出编辑状态
      if (data.isEdit) {
        this.$set(data, "isEdit", false);
      }
      this.editSuits(data);
    },
    handleEdit(node, data) {
      // 编辑节点
      console.log(node, data);
      // 设置编辑状态
      if (!data.isEdit) {
        this.$set(data, "isEdit", true);
      }

      // 输入框聚焦
      this.$nextTick(() => {
        if (this.$refs["slotTreeInput" + data[this.id]]) {
          this.$refs["slotTreeInput" + data[this.id]].$refs.input.focus();
        }
      });
    },

    //拖拽点击事件
    handleDragStart(node, ev) {
      // console.log("drag start", node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      //console.log("tree drag enter: ", dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      // console.log("tree drag leave: ", dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      // console.log("tree drag over: ", dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      // console.log("tree drag end: ", dropNode && dropNode.label, dropType);
    },
    // 拖拽事件 参数依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event
    handleDrop: async function (draggingNode, dropNode, dropType, ev) {
      var paramData = [];
      // 当拖拽类型不为inner,说明只是同级或者跨级排序，只需要寻找目标节点的父ID，获取其对象以及所有的子节点，并为子节点设置当前对象的ID为父ID即可
      // 当拖拽类型为inner，说明拖拽节点成为了目标节点的子节点，只需要获取目标节点对象即可
      var data = dropType !== "inner" ? dropNode.parent.data : dropNode.data;
      var nodeData = dropNode.level === 1 && dropType !== "inner" ? data : data.children;
      // 设置父ID,当level为1说明在第一级，pid为空
      nodeData.forEach(element => {
        element.pid = dropNode.level === 1 ? "" : data.id;
      });
      nodeData.forEach((element, i) => {
        var suite = {
          id: element.id,
          parentId: element.pid,
          sort: i,
          isLeaf: false,
        };
        paramData.push(suite);
      });

      this.loading = true;
      // 得到这次操作需要变更的数据范围，请求后台批量处理即可...
      console.log(paramData)
      this.updateSuiteTree(paramData)
    },
    //拖拽点击事件
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === "二级 3-1") {
        return type !== "inner";
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
    },
  }
}
</script>
<style scoped lang="scss">
.myTree {
  ::v-deep .el-tree {
    background-color: #283046;
  }

  ::v-deep .el-tree-node {
    font-size: small;
    color: beige;
  }

  ::v-deep .el-tree-node__content:hover {
    background-color: #7367f0;
  }
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.el-tree {
  height: 100%;

  .isEdit {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-input {
      width: 100px;
      height: 5px;
    }

  }
}

.el-icon-plus {
  margin: 10px 0 0 22px;
  color: #606266;
  font-size: 14px;

  span {
    margin-left: 10px;
    font-size: 14px;
  }
}

</style>
