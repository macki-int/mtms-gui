<template>
  <apexchart height="300" type="area" :options="options" :series="series">
  </apexchart>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
export default {
  name: "ApexAreaChart",

  async mounted() {
    await this.getReadouts();
  },

  data() {
    return {
      readouts: {},

      options: {
        chart: {
          id: "area-datetime",
          type: "area",
          stacked: true,
          zoom: {
            autoScaleYaxis: true,
          },
          animations: {
            enabled: true,
          },
        },
      },
      series: {},
    };
  },
  methods: {
    async makegetReadouts() {
      await this.$api
        .get("/readouts", {
          contentType: "application/json",
          dataType: "json",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          this.readouts = response.data["readouts"];
          this.series = [
              parseInt(this.readouts.pD),
              parseInt(this.readouts.readoutDataTime)
            ];
        })
        .catch((error) => {
          if (error.response === 403) {
            this.$q.notify({
              color: "negative",
              position: "top",
              message: "Nie masz uprawnień lub zostałeś wylogowany",
              icon: "report_problem",
            });
          }
        });
      // this.series = this.readouts;
    },
  },
};
</script>
