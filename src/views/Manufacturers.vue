<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="manufacturers"
      :search="search"
      sort-by="id"
      class="elevation-1"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Manufacturers</v-toolbar-title>
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
                        v-model="editedItem.website"
                        label="Website"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email"
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
import Manufacturer from "@/types/manufacturer";

@Component
export default class Manufacturers extends Vue {
  private search = "";
  private dialog = false;
  private dialogDelete = false;
  private headers = [
    {
      text: "Manufacturer ID",
      align: "start",
      sortable: false,
      value: "id",
    },
    { text: "Name", value: "name" },
    { text: "Website", value: "website" },
    { text: "Email", value: "email" },
    { text: "Action", value: "actions", sortable: false },
  ];
  private manufacturers: Array<Manufacturer> = [];
  private editedIndex = -1;
  private editedItem: Manufacturer = {
    id: 1,
    name: "test",
    website: "test.com",
    email: "test@test.com",
  };
  defaultItem = {
    name: "test",
    website: "test.com",
    email: "test@test.com",
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
    this.manufacturers = [
      {
        id: 0,
        name: "Bobs Garage",
        email: "bob@garage.com",
        website: "bobsgarage.com",
      },
      {
        id: 1,
        name: "Pauls Garage",
        email: "paul@garage.com",
        website: "paulsgarage.com",
      },
      {
        id: 2,
        name: "Ryans Garage",
        email: "ryan@garage.com",
        website: "ryansgarage.com",
      },
    ];
  }

  public editItem(item: Manufacturer): void {
    this.editedIndex = this.manufacturers.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialog = true;
  }

  public deleteItem(item: Manufacturer): void {
    this.editedIndex = this.manufacturers.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialogDelete = true;
  }

  public deleteItemConfirm(): void {
    this.manufacturers.splice(this.editedIndex, 1);
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
      Object.assign(this.manufacturers[this.editedIndex], this.editedItem);
    } else {
      // append mock id to edited item for post
      this.editedItem.id = this.manufacturers.length + 1;
      this.manufacturers.push(this.editedItem);
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
<style scoped lang="scss">
a {
  text-decoration: none;
}
</style>
