<template>
  <div>
    <b-row class="match-height">

      <b-col lg="8">
        <card-analytic-avg-sessions-ui />
      </b-col>
      <b-col lg="4">
        <card-analytic-earnings-ui />
        <ecommerce-statistics :data="data.statisticsItems" />
      </b-col>

      <b-col lg="8">
        <card-analytic-revenue-report-ui />
      </b-col>
      <b-col lg="4">
        <card-advance-browser-states-ui />
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="8">
        <b-row class="match-height">

        </b-row>
      </b-col>
      <b-col lg="4">
<!--        <card-analytic-cases-ui />-->

      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import { getUserData } from '@/auth/utils'
import EcommerceStatistics from '@/views/dashboard/ecommerce/EcommerceStatistics.vue'
import CardAnalyticEarningsUi from '@/views/apps/web-automation/web-report/CardAnalyticEarningsUi.vue'
import CardAnalyticRevenueReportUi from '@/views/apps/web-automation/web-report/CardAnalyticRevenueReportUi.vue'
import CardAnalyticAvgSessionsUi from '@/views/apps/web-automation/web-report/CardAnalyticAvgSessionsUi.vue'
import CardAnalyticCasesUi from '@/views/apps/web-automation/web-report/CardAnalyticCasesUi.vue'
import CardAdvanceBrowserStatesUi from '@/views/apps/web-automation/web-report/CardAdvanceBrowserStatesUi.vue'
export default {
  components: {
    BRow,
    BCol,

    EcommerceStatistics,
    CardAnalyticCasesUi,
    CardAnalyticAvgSessionsUi,
    CardAnalyticRevenueReportUi,
    CardAnalyticEarningsUi,
    CardAdvanceBrowserStatesUi,
  },

  data() {
    return {
      data: {},
    }
  },
  created() {
    // data
    this.$http.get('/ecommerce/data')
        .then(response => {
          this.data = response.data

          // ? Your API will return name of logged in user or you might just directly get name of logged in user
          // ? This is just for demo purpose
          const userData = getUserData()
          this.data.congratulations.name = userData.fullName.split(' ')[0] || userData.username
        })
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/chart-apex.scss';
</style>
