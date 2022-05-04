<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Zestawienie odczytów"
        dense
        :rows="rows"
        :columns="columns"
        row-key="name"
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
      readouts: "",

      columns: [
        {
          name: "readoutDataTime",
          label: "Data odczytu",
          field: "readoutDataTime",
        },
        {
          name: "pD",
          label: "Poziom wody",
          field: "pD",
        },
        {
          name: "tOb1",
          label: "Temperatura",
          field: "tOb1",
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
            "Access-Control-Allow-Methods":
              "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, Content-Type, X-Auth-Token",
          },
        })
        .then((response) => {
          this.readouts = response.data;
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
      // console.log(this.$api);
    },
  },
};
</script>
