<template>
  <b-row class="match-height">
    <b-col
        lg="4"
        md="6"
    >
      <card-advance-app-design />
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import CardAdvanceAppDesign from '../../card/card-advance/CardAdvanceAppDesign.vue'


export default {
  components: {
    BRow,
    BCol,
    CardAdvanceAppDesign,
  },
}
</script>
