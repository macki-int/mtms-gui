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
      />
    </div>
  </q-page>
</template>

<script>
export default {
  mounted() {
    this.getReadouts();
  },
  data() {
    return {
      readouts: [],

      pagination: {
        sortBy: "type",
        descending: false,
        rowsPerPage: 25,
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
          label: "Poziom wody",
          field: "pD",
          align: "right",
        },
        {
          name: "tOb1",
          label: "Temperatura",
          field: "tOb1",
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
          console.log(this.readouts);
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
  },
};
</script>
