<template>

    <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> MT Measuring System </q-toolbar-title>

        <div>mtms v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
        <q-scroll-area class="fit">
      <div class="text-primary">
        <q-list>
          <q-item-label header>  </q-item-label>

          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </div>
        </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Tabela danych",
    caption: "zestawienie odczytów",
    icon: "article",
    to: "ReadoutsAll",
  },
  {
    title: "Wykres",
    caption: "wizualizacja danych",
    icon: "insights",
    link: "",
  },
  {
    title: "Statystyki",
    caption: "dodatkowe informacje",
    icon: "settings_suggest",
    link: "",
  },
  {
    title: "Logout",
    caption: "wyloguj",
    icon: "lock_person",
    link: "",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
