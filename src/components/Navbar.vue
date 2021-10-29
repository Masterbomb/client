<template>
  <div>
    <v-app-bar dense>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ $route.path }}</v-toolbar-title>
      <v-spacer />
      <img :src="require('@/assets/logo.png')" height="30px" width="30px" />
      <v-toolbar-title style="padding-left: 1%">Masterbom</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <!-- Avatar and name header -->
      <v-list-item>
        <v-list-item-avatar>
          <img :src="require('@/assets/avatar.png')" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Christian Sargusingh</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <!-- sidebar options -->
      <v-list nav dense>
        <v-list-item-group v-model="group">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            @click="goToPage(item.page)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-divider />
      <!-- Buttons -->
      <v-row v-for="btn in buttons" :key="'btn-' + btn.name" style="margin: 4%">
        <v-btn block color="primary" @click="btn.func">
          <v-icon left>{{ btn.icon }}</v-icon>
          {{ btn.name }}
        </v-btn>
      </v-row>
      <!-- footer -->
      <template #append>
        <div class="pa-4">
          <v-row align="center" justify="center">
            <img
              :src="require('@/assets/logo.png')"
              height="30px"
              width="30px"
            />
          </v-row>
          <v-row align="center" justify="center" style="padding-bottom: 5%">
            Masterbom</v-row
          >
          <v-row justify="space-between" class="pa-2">
            <div>Version: 0.0.1</div>
            <v-icon
              @click="
                resolveExternalURL('https://github.com/Masterbomb/client')
              "
              >mdi-github</v-icon
            >
          </v-row>
        </div>
      </template>
    </v-navigation-drawer>
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface PageNav {
  name: string;
  icon: string;
  page: string;
}

interface Actions {
  name: string;
  icon: string;
  func: () => unknown;
}

@Component
export default class Navbar extends Vue {
  private msg!: string;
  private drawer = false;
  private group = null;
  private items: Array<PageNav> = [
    {
      name: "Home",
      icon: "mdi-home",
      page: "/",
    },
    {
      name: "Projects",
      icon: "mdi-cube-outline",
      page: "projects",
    },
    {
      name: "Parts",
      icon: "mdi-nut",
      page: "parts",
    },
    {
      name: "Suppliers",
      icon: "mdi-store",
      page: "suppliers",
    },
    {
      name: "Manufacturers",
      icon: "mdi-factory",
      page: "manufacturers",
    },
    {
      name: "Profile",
      icon: "mdi-account",
      page: "profile",
    },
  ];
  private buttons: Array<Actions> = [
    {
      name: "New Project",
      icon: "mdi-cube-outline",
      func: () => {
        return;
      },
    },
    {
      name: "Register Part",
      icon: "mdi-plus",
      func: () => {
        return;
      },
    },
    {
      name: "Logout",
      icon: "mdi-logout",
      func: () => {
        return;
      },
    },
  ];
  public resolveExternalURL(url: string): void {
    window.open(url);
  }
  public goToPage(pageName: string): void {
    this.$log.debug("Page change to", pageName, "requested");
    if (this.$route.name !== pageName) {
      this.$router.push({
        name: pageName,
      });
    }
    this.drawer = false;
  }
}
</script>
<style lang="scss"></style>
