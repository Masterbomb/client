<template>
  <div>
    <v-app-bar dense>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-spacer />
      <img :src="require('@/assets/logo.png')" height="30px" width="30px" />
      <v-toolbar-title style="padding-left: 1%">Masterbom</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script lang="ts">
import { mapGetters } from "vuex";

export default {
  name: "Navbar",
  data: (): unknown => ({
    drawer: false,
    group: null,
    options: [
      {
        name: "Home",
        icon: "mdi-home",
      },
      {
        name: "Projects",
        icon: "mdi-view-list",
      },
      {
        name: "Manufacturers",
        icon: "mdi-factory",
      },
      {
        name: "Parts",
        icon: "mdi-nut",
      },
      {
        name: "Profile",
        icon: "mdi-account",
      },
    ],
  }),
  computed: {
    ...mapGetters(["authUser"]),
  },
};
</script>
<style lang="ts"></style>
