<template>
  <div>
    <team-list-add
        :is-add-member-sidebar-active.sync="isAddMemberSidebarActive"
        @refetch-data="refetchData"
      />
  <b-button
      variant="gradient-danger"
      class="btn-icon rounded-circle"
      @click="isAddMemberSidebarActive = true"
  >
    <feather-icon icon="UserPlusIcon"/>
  </b-button>
  <b-row className="match-height">
    <b-col
        lg="4"
        md="6"
    >
      <card-advance-app-design v-for="item in teamData.items" :data='item'/>
    </b-col>
  </b-row>
  </div>
</template>

<script>
import {BRow, BCol} from 'bootstrap-vue'
import CardAdvanceAppDesign from '../../card/card-advance/CardAdvanceAppDesign.vue'
import {getNoParamRequest} from "@/libs/axios";
import {ref} from "@vue/composition-api";
import TeamListAdd from "@/views/apps/web-automation/TeamListAdd";


export default {
  components: {
    TeamListAdd,
    BRow,
    BCol,
    CardAdvanceAppDesign,
  },

  data() {
    return {
      teamData: {},
    }
  },

  setup() {
    const isAddMemberSidebarActive = ref(false)
    return{
      isAddMemberSidebarActive,
      refetchData,
    }
  },
  created() {
    // data
    getNoParamRequest('/teamGroup/getTeam')
        .then(response => {
          this.teamData = response.data
        })
  },
}
</script>
