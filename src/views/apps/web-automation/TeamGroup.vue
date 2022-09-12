<template>
  <section class="grid-view wishlist-items" v-if="isReloadData">
    <div >
      <team-list-add
          :is-add-member-sidebar-active.sync="isAddMemberSidebarActive"
          @refresh-data="refreshData"
      />
    </div>
    <b-row class="match-height">
      <b-col
          lg="7"
          md="6"
      >
        <card-advance-congratulation />
      </b-col>
      <b-col
          lg="5"
          md="6"
      >
        <b-card class="card-congratulation-medal">
          <h5>Web automation operation platform 🎉 G-Snail!</h5>
          <b-card-text class="font-small-3">
            Support Google, Firefox, IE and other Browsers
          </b-card-text>
          <h3 class="mb-75 mt-4">
            <b-link>Join our Team</b-link>
          </h3>
          <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              @click="isAddMemberSidebarActive = true"
          >
            New Team
          </b-button>
          <b-img
              :src="require('@/assets/images/illustration/badge.svg')"
              class="congratulation-medal"
              alt="Medal Pic"
          />
        </b-card>
      </b-col>
      <b-col
          v-for="item in teamData"
          :key="item.id"
          lg="4"
          md="3"
      >
    <b-card
        class="card-app-design"
    >
      <b-badge variant="light-primary">
        {{ currentTime }}
      </b-badge>
      <b-card-title class="mt-1 mb-75">
        {{ item.cardTitle }}
      </b-card-title>
      <b-card-text class="font-medium-1 mb-2">
        {{ item.teamDescription }}
      </b-card-text>

      <!-- design group -->
      <div class="design-group">
        <h6 class="section-label">
          Team
        </h6>
        <b-badge
            variant="light-warning"
            class="mr-1"
        >
          {{ item.teamResponsibility }}
        </b-badge>
      </div>
      <div class="design-group">
        <h6 class="section-label">
          Members
        </h6>
        <b-avatar
            :src="require('@/assets/images/portrait/small/avatar-s-9.jpg')"
            size="34"
            class="mr-1"
        />
        <b-avatar
            text="PI"
            size="32"
            variant="light-danger"
            class="mr-1"
        />
        <b-avatar
            :src="require('@/assets/images/portrait/small/avatar-s-14.jpg')"
            size="34"
            class="mr-1"
        />
        <b-avatar
            :src="require('@/assets/images/portrait/small/avatar-s-20.jpg')"
            size="34"
            class="mr-1"
        />
        <b-avatar
            text="AL"
            size="32"
            variant="light-secondary"
            class="mr-1"
        />
      </div>
      <!--/ design group -->

      <div class="design-planning-wrapper">
        <div class="design-planning">
          <p class="card-text mb-25">
            Create Time
          </p>
          <h6 class="mb-0">
            {{ item.createTime | timeFormat('YYYY-MM-DD') }}
          </h6>
        </div>
        <div class="design-planning">
          <p class="card-text mb-25">
            Total case
          </p>
          <h6 class="mb-0">
            1000
          </h6>
        </div>
        <div class="design-planning">
          <p class="card-text mb-25">
            Team Name
          </p>
          <h6 class="mb-0">
            {{  item.teamName }}
          </h6>
        </div>
      </div>
      <!-- button -->
      <b-button
          variant="light"
          class="btn-wishlist remove-wishlist"
          block
          @click="joinTeam(item.teamMember)"
      >
        <feather-icon icon="AwardIcon"/>
        <span>Join Team</span>
      </b-button>
      <b-button
          variant="primary"
          class="btn-cart move-cart"
          block
          @click="$emit('next-step')"
      >
        <feather-icon
            icon="BookmarkIcon"
            class="mr-50"
        />
        <span> Enter Team</span>
      </b-button>
    </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import {BRow, BCol} from 'bootstrap-vue'
import {
  BCard, BBadge, BCardTitle, BCardText, BAvatar, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive';
import axiosIns, {putRequest} from "@/libs/axios";
import CardAdvanceCongratulation from '../../card/card-advance/CardAdvanceCongratulation.vue'
import CardAdvanceMedal from '../../card/card-advance/CardAdvanceMedal.vue'
import CardAdvanceAppDesign from '../../card/card-advance/CardAdvanceAppDesign'
import TeamListAdd from "@/views/apps/web-automation/TeamListAdd";
import {ref} from "@vue/composition-api";
import {getNoParamRequest} from "@/libs/axios";
import store from "@/store";
import moment from "moment";


export default {
  components: {
    BRow,
    BCol,
    BCard,
    BBadge,
    BButton,
    BAvatar,
    BCardTitle,
    BCardText,
    CardAdvanceAppDesign,
    CardAdvanceCongratulation,
    CardAdvanceMedal,
    TeamListAdd,
  },
  directives: {
    Ripple,
  },

  inject: ['reload'],

  //局部过滤器
  filters: {
    timeFormat(value, format = 'YYYY-MM-DD HH:mm:ss') {
      return moment(value).format(format)
    }
  },
  data() {
    return {
      isReloadData: true,
    }
  },

  setup: function () {
    const isAddMemberSidebarActive = ref(false)
    const teamData = ref([])
    const currentTime = new Date()
    const fetchGroupTeams = () => {
      store.dispatch('webAuto/fetchGroupTeams')
          .then(response => {
            // console.log(response)
            teamData.value = response.data.data.teamData
            console.log(teamData)
          })
    }
    fetchGroupTeams()
    return {
      isAddMemberSidebarActive,
      teamData,
      currentTime
    }
  },

  methods: {
    refreshData() {
      this.reloadPart()
    },
    reloadPart() {
      this.isReloadData = false
      this.$nextTick(() => {
        this.isReloadData = true
      })
    },
    joinTeam(teamMember) {
      const teamData ={memberCode:teamMember}
      axiosIns.post("/sysUser/insertTeam", teamData).then(() => {
        this.$bvToast.toast('Congratulations: Join successfully', {
          title: `Variant  success`,
          variant: 'success',
          solid: false,
          toaster: 'b-toaster-bottom-right',
        })
      }, e => {
        this.$bvToast.toast('Note: Join failed', {
          title: `Variant  fail`,
          variant: 'danger',
          solid: false,
          toaster: 'b-toaster-bottom-right',
        })
      })
    },

  },
}
</script>
