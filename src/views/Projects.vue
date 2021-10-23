<template>
  <v-container class="my-5">
    <v-layout row wrap>
      <v-flex v-for="project in projects" :key="project.id" class="pa-5">
        <project-card
          :id="project.id"
          :name="project.name"
          :ordered-parts="project.orderedParts"
          :total-parts="project.totalParts"
          :completed-units="project.completedUnits"
          :total-units="project.totalUnits"
          :timeline="project.timeline"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProjectCard from "@/components/ProjectCard.vue";

interface Project {
  id: number;
  name: string;
  orderedParts: number;
  totalParts: number;
  totalUnits: number;
  completedUnits: number;
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
        orderedParts: 56,
        totalParts: 87,
        completedUnits: 65,
        totalUnits: 67,
        timeline: [new Date("2019-01-16"), new Date("2022-01-16")],
      },
      {
        id: 1,
        name: "Ambilight",
        orderedParts: 6,
        totalParts: 8,
        completedUnits: 1,
        totalUnits: 2,
        timeline: [new Date("2021-09-04"), new Date("2021-12-16")],
      },
      {
        id: 2,
        name: "Hydroponic",
        orderedParts: 1,
        totalParts: 100,
        completedUnits: 1,
        totalUnits: 4,
        timeline: [new Date("2021-06-14"), new Date("2021-10-10")],
      },
      {
        id: 3,
        name: "OpenHerb",
        orderedParts: 1,
        totalParts: 23,
        completedUnits: 12,
        totalUnits: 21,
        timeline: [new Date("2021-09-04"), new Date("2021-12-16")],
      },
      {
        id: 4,
        name: "TP Cluster",
        orderedParts: 56,
        totalParts: 100,
        completedUnits: 10,
        totalUnits: 45,
        timeline: [new Date("2020-07-30"), new Date("2020-11-27")],
      },
    ];
  }
}
</script>
<style lang="scss"></style>
