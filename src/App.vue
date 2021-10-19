<template>
  <v-app
    id="main"
    :style="{ background: $vuetify.theme.themes['dark'].background }"
  >
    <v-main><router-view /> </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    //
  }),
});
</script>

<style lang="scss">
.v-application {
  font-family: $font-family !important;
}
</style>
