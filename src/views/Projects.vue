<template>
  <v-container>
    <v-row wrap>
      <v-col
        v-for="project in projects"
        :key="project.id"
        xl="4"
        justify-center
        align-center
      >
        <v-container class="fill-height">
          <project-card
            :id="project.id"
            :name="project.name"
            :part-progress="project.progress"
            :timeline="project.timeline"
          />
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProjectCard from "@/components/ProjectCard.vue";

interface Project {
  id: number;
  name: string;
  progress: number;
  timeline: Array<Date>;
}

@Component({
  components: {
    ProjectCard,
  },
})
export default class Projects extends Vue {
  private projects: Array<Project> = [];
  created(): void {
    this.initialize();
  }
  public initialize(): void {
    this.projects = [
      {
        id: 0,
        name: "LEAP Transmitter",
        progress: 56,
        timeline: [new Date("2019-01-16"), new Date("2022-01-16")],
      },
      {
        id: 1,
        name: "Ambilight",
        progress: 21,
        timeline: [new Date("2021-09-04"), new Date("2021-12-16")],
      },
      {
        id: 2,
        name: "Hydroponic",
        progress: 0,
        timeline: [new Date("2021-06-14"), new Date("2021-10-10")],
      },
      {
        id: 3,
        name: "OpenHerb",
        progress: 76,
        timeline: [new Date("2021-09-04"), new Date("2021-12-16")],
      },
      {
        id: 4,
        name: "TP Cluster",
        progress: 98,
        timeline: [new Date("2020-07-30"), new Date("2020-11-27")],
      },
    ];
  }
}
</script>
<style lang="scss"></style>
