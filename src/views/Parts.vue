<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="parts"
      :search="search"
      sort-by="id"
      class="elevation-1"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Parts</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-dialog v-model="dialog" max-width="500px">
            <template #activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                <v-icon left>mdi-plus</v-icon>
                Register
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span>{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.manufacturer_id"
                        label="Manufacturer"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.unit_price"
                        label="Unit Price"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.description"
                        label="Description"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="close"> Cancel </v-btn>
                <v-btn color="primary" text @click="post"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="error" text @click="deleteItemConfirm"
                  >Delete</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template #[`item.email`]="{ value }">
        {{ value }}
        <a :href="`mailto:${value}`"
          ><v-icon left small>mdi-email-outline</v-icon>
        </a>
      </template>
      <template #[`item.website`]="{ value }">
        {{ value }}
        <v-icon left small @click="goToURL(value)">mdi-web</v-icon>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template #no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

interface Part {
  id?: number;
  name: string;
  unit_price: number;
  manufacturer_id: number;
  description: string;
}

@Component
export default class Parts extends Vue {
  private search = "";
  private dialog = false;
  private dialogDelete = false;
  private headers = [
    {
      text: "Part ID",
      align: "start",
      sortable: false,
      value: "id",
    },
    { text: "Name", value: "name" },
    { text: "Unit Price", value: "unit_price" },
    { text: "Manufacturer", value: "manufacturer_id" },
    { text: "Description", value: "description" },
    { text: "Action", value: "actions", sortable: false },
  ];
  private parts: Array<Part> = [];
  private editedIndex = -1;
  private editedItem: Part = {
    id: 1,
    name: "SNHC595",
    unit_price: 4.2,
    manufacturer_id: 1,
    description: "shift register",
  };
  defaultItem: Part = {
    id: 1,
    name: "SNHC595",
    unit_price: 4.2,
    manufacturer_id: 1,
    description: "shift register",
  };
  get formTitle(): string {
    return this.editedIndex === -1 ? "New Manufacturer" : "Edit Manufacturer";
  }

  @Watch("dialog")
  dialogChanged(val: boolean): void {
    val || this.close();
  }

  @Watch("dialogDelete")
  dialogDeleteChanged(val: boolean): void {
    val || this.closeDelete();
  }

  created(): void {
    this.initialize();
  }

  public initialize(): void {
    this.parts = [
      {
        id: 0,
        name: "SNHC595",
        unit_price: 4.2,
        manufacturer_id: 1,
        description: "16 DIP shift register",
      },
      {
        id: 1,
        name: "CD4518BE",
        unit_price: 0.95,
        manufacturer_id: 2,
        description: "IC BCD UP COUNTER DUAL 16-DIP",
      },
      {
        id: 2,
        name: "74HC366D",
        unit_price: 0.39824,
        manufacturer_id: 2,
        description: "IC BUFFER INVERT 6V 16SO",
      },
    ];
  }

  public editItem(item: Part): void {
    this.editedIndex = this.parts.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialog = true;
  }

  public deleteItem(item: Part): void {
    this.editedIndex = this.parts.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialogDelete = true;
  }

  public deleteItemConfirm(): void {
    this.parts.splice(this.editedIndex, 1);
    this.closeDelete();
  }

  public close(): void {
    this.dialog = false;
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    });
  }

  public closeDelete(): void {
    this.dialogDelete = false;
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    });
  }

  public post(): void {
    if (this.editedIndex > -1) {
      Object.assign(this.parts[this.editedIndex], this.editedItem);
    } else {
      // append mock id to edited item for post
      this.editedItem.id = this.parts.length + 1;
      this.parts.push(this.editedItem);
    }
    this.close();
  }

  public goToURL(url: string): void {
    // ensure link starts with hypertext prefix
    let res = url;
    if (!url.startsWith("http://") || !url.startsWith("https://")) {
      res = "http://".concat(url);
    }
    window.open(res);
  }
}
</script>
<style lang="scss"></style>
