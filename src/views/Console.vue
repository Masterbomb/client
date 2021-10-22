<template>
  <div>
    <navbar />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";

export default Vue.extend({
  name: "Console",
  components: {
    Navbar,
  },
});
</script>
