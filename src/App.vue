<template>
  <v-app
    id="main"
    :style="{ background: $vuetify.theme.themes['dark'].background }"
  >
    <v-main><router-view /> </v-main>
  </v-app>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss">
.v-application {
  font-family: $font-family !important;
}
</style>
