<template>
  <v-hover v-slot="{ hover }">
    <v-card
      :id="'project-' + id"
      class="
        text-center
        fill-height
        rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl
        transition-swing
      "
      max-height="400px"
      max-width="400px"
      min-width="200px"
      min-height="200px"
      width="100%"
      style="cursor: pointer"
      color="background"
      :class="`elevation-${hover ? 20 : 5}`"
      :ripple="false"
    >
      <v-container fill-height fluid>
        <v-row>
          <v-col>
            <v-list-item-title class="pa-4">
              <h1>{{ name }}</h1>
            </v-list-item-title>

            <v-row align="center">
              <v-col cols="6">
                <v-list-item class="pa-0">
                  <v-list-item-content>
                    <v-progress-circular
                      :rotate="-90"
                      :size="100"
                      :width="15"
                      :value="(orderedParts / totalParts) * 100"
                      :color="calcColor((orderedParts / totalParts) * 100)"
                    >
                      {{ orderedParts }} / {{ totalParts }}
                    </v-progress-circular>
                    <v-list-item-title class="subtitle">
                      Parts
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6">
                <v-list-item class="pa-0">
                  <v-list-item-content>
                    <v-progress-circular
                      :rotate="-90"
                      :size="100"
                      :width="15"
                      :value="(completedUnits / totalUnits) * 100"
                      :color="calcColor((completedUnits / totalUnits) * 100)"
                    >
                      {{ completedUnits }} / {{ totalUnits }}
                    </v-progress-circular>
                    <v-list-item-title class="subtitle">
                      Units
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
            <v-sparkline
              :fill="true"
              :gradient="selectedGradient"
              :padding="20"
              :smooth="10"
              :value="value"
              auto-draw
            ></v-sparkline>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-hover>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class ProjectCard extends Vue {
  @Prop({ required: true }) readonly id!: number;
  @Prop({ required: true }) readonly name!: string;
  @Prop({ required: true }) readonly orderedParts!: number;
  @Prop({ required: true }) readonly totalParts!: number;
  @Prop({ required: true }) readonly totalUnits!: number;
  @Prop({ required: true }) readonly completedUnits!: number;
  @Prop({ required: true }) readonly Progress!: number;
  @Prop({ required: true }) readonly timeline!: Array<Date>;

  private selectedGradient = ["#f72047", "#ffd200", "#1feaea"];
  private value = [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0];

  public calcColor(progress: number): string {
    if (progress < 25) {
      //statements;
      return "red";
    } else if (progress < 50) {
      return "orange";
    } else if (progress < 75) {
      return "orange";
    }
    return "green";
  }
}
</script>
<style lang="scss">
.subtitle {
  padding-top: 7%;
}
</style>
