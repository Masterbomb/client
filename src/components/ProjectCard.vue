<template>
  <v-container class="pa-8 ma-4">
    <v-hover v-slot="{ hover }">
      <v-card
        :id="'project-' + id"
        class="
          text-center
          fill-height
          rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl
          transition-swing
        "
        max-width="1000px"
        width="100%"
        style="cursor: pointer"
        color="background"
        :class="`elevation-${hover ? 20 : 5}`"
        :ripple="false"
      >
        <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col>
              <v-list-item one-line>
                <v-list-item-title>
                  <h1>{{ name }}</h1>
                </v-list-item-title>
              </v-list-item>
              <v-card-text>
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
                        <v-list-item-title> Parts </v-list-item-title>
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
                          :value="partProgress"
                          :color="calcColor(partProgress)"
                        >
                          {{ completedUnits }} / {{ totalUnits }}
                        </v-progress-circular>
                        <v-list-item-title> Units </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-slider
                v-model="time"
                :max="6"
                :tick-labels="labels"
                class="mx-4"
                ticks
              ></v-slider>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-hover>
  </v-container>
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
<style lang="scss"></style>
