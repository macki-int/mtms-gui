<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Zestawienie odczytów"
        :rows="readouts"
        dense
        flat
        :columns="columns"
        row-key="name"
        :pagination="pagination"
        @row-click="showMessage"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  async mounted() {
    await this.getReadouts();
  },
  data() {
    return {
      readouts: [],

      pagination: {
        sortBy: "type",
        descending: false,
        rowsPerPage: 24,
      },

      columns: [
        {
          name: "readoutDataTime",
          label: "Data odczytu",
          field: "readoutDataTime",
          align: "left",
          sortable: true,
        },
        {
          name: "pD",
          label: "Poziom wody (Pd)",
          field: (row) => (row.pD * 10 - 2.4).toFixed(2) + " m",
          align: "right",
        },
        {
          name: "p1",
          label: "Ciśnienie atmosferyczne (P1)",
          field: (row) => row.p1.toFixed(7),
          align: "right",
        },
        {
          name: "tOb1",
          label: "Temperatura powietrza (TOB1)",
          field: (row) => row.tOb1.toFixed(2),
          align: "right",
        },
        {
          name: "pBaro",
          label: "Ciśnienie wody (P Baro)",
          field: (row) => row.pBaro.toFixed(7),
          align: "right",
        },
        {
          name: "tBaro",
          label: "Temperatura wody (T Baro)",
          field: (row) => row.tBaro.toFixed(2),
          align: "right",
        },
        {
          name: "description",
          label: "Komentarz",
          field: "description",
          align: "left",
        },
        {
          name: "serialNumber",
          label: "SN modułu",
          field: (row) => row.transmitterParameterReading.serialNumber,
          align: "right",
        },
      ],
    };
  },

  methods: {
    getReadouts: async function () {
      await this.$api
        .get("/readouts", {
          contentType: "application/json",
          dataType: "json",
          headers: {
            "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Methods":
            //   "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            // "Access-Control-Allow-Headers":
            //   "Origin, Content-Type, X-Auth-Token",
          },
        })
        .then((response) => {
          this.readouts = response.data;
          // console.log(this.readouts);
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response === 403) {
            this.$q.notify({
              color: "negative",
              position: "top",
              message: "Nie masz uprawnień lub zostałeś wylogowany",
              icon: "report_problem",
            });
          }
        });
    },

    showMessage: function (evt, row) {
      alert("Poziom wody: " + (row.pD * 10 - 2.4) + " m ppt");
    },
  },
};
</script>
