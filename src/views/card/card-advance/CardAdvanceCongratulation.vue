<template>
  <b-card
    text-variant="center"
    class="card card-congratulations"
  >
    <!-- images -->
    <b-img
      :src="require('@/assets/images/elements/decore-left.png')"
      class="congratulations-img-left"
    />
    <b-img
      :src="require('@/assets/images/elements/decore-right.png')"
      class="congratulations-img-right"
    />
    <!--/ images -->

    <b-avatar
      variant="primary"
      size="70"
      class="shadow mb-2"
    >
      <feather-icon
        size="28"
        icon="AwardIcon"
      />
    </b-avatar>
    <h1 class="mb-1 mt-50 text-white">
      Congratulations AdminPotal,
    </h1>
    <b-card-text class="m-auto w-75">
      You have <strong>100%</strong>the highest pass rate of test cases today . Congratulations! Keep up your efforts!👍
    </b-card-text>
  </b-card>
</template>

<script>
import {
  BCard, BImg, BAvatar, BCardText,
} from 'bootstrap-vue'
import Image from "@/views/components/image/Image";

export default {
  components: {
    Image,
    BCard,
    BAvatar,
    BImg,
    BCardText,
  },
}
</script>
