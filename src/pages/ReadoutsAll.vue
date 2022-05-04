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

  data() {
    return {
        readouts:''
    };
  },
};
</script>
