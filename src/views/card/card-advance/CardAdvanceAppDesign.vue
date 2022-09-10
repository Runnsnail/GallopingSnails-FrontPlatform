<template>
  <b-card  v-for="item in teamData" v-if="item" class="card-app-design">
    <b-badge variant="light-primary">
      {{ item.updateTime }}
    </b-badge>
    <b-card-title class="mt-1 mb-75">
      {{ item.cardTitle }}
    </b-card-title>
    <b-card-text class="font-small-2 mb-2">
      {{ item.description }}
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
        {{ item.responsibility }}
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
          Due Date
        </p>
        <h6 class="mb-0">
          12 Apr, 21
        </h6>
      </div>
      <div class="design-planning">
        <p class="card-text mb-25">
          Total number of use cases
        </p>
        <h6 class="mb-0">
          1000 (需要在vuex获取数据)
        </h6>
      </div>
    </div>

    <!-- button -->
    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      block
      @click="joinTeam"
    >
      Join Team
    </b-button>
    <b-button
        variant="primary"
        block
        @click="$emit('next-step')"
    >
      Enter Team
    </b-button>
  </b-card>
</template>

<script>
import {
  BCard, BBadge, BCardTitle, BCardText, BAvatar, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive';
import {putRequest} from "@/libs/axios";
export default {
  components: {
    BCard,
    BBadge,
    BButton,
    BAvatar,
    BCardTitle,
    BCardText,
  },
  directives: {
    Ripple,
  },
  props: {
    teamData: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    joinTeam(){
      putRequest("/teamGroup/insertTeam",item.groupNum).then(() => {
        this.$bvToast.toast('Congratulations: Join successfully', {
          title: `Variant  success`,
          variant: 'success',
          solid: false,
          toaster:'b-toaster-bottom-right',
        })
      }, e => {
        this.$bvToast.toast('Note: Join failed', {
          title: `Variant  fail`,
          variant: 'danger',
          solid: false,
          toaster:'b-toaster-bottom-right',
        })
      })
    },
  },
}
</script>
