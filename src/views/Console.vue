<template>
  <div>
    <navbar />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Navbar from "@/components/Navbar.vue";
@Component({
  components: {
    Navbar,
  },
})
export default class Console extends Vue {}
</script>
