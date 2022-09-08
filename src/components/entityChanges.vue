<template>
  <Dialog
    header="Alterações"
    v-model:visible="this.$store.state.exibirModalEntityChanges"
    :style="{ width: '55vw' }"
    modal
    ref="dialog"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :autoZIndex="false"
  >
    <CrosierListS
      v-if="this.$store.state.exibirModalEntityChanges"
      withoutCard
      :comFiltragem="false"
      apiResource="/api/core/config/entityChange/"
      :staticFilters="{
        entityClass: this.entityChangesClass,
        entityId: this.entityChangesId,
      }"
    >
      <template #columns>
        <Column field="obs" header="Alterações">
          <template #body="r">
            <pre>{{ r.data.obs }}</pre>
          </template>
        </Column>

        <Column field="changedAt" header="Em" :sortable="true">
          <template class="text-center" #body="r">
            {{
              r.data.changedAt ? this.moment(r.data.changedAt).format("DD/MM/YYYY HH:mm:ss") : ""
            }}
          </template>
        </Column>

        <Column field="changingUserNome" header="Por" :sortable="true" />
      </template>
    </CrosierListS>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import Column from "primevue/column";
// import { CrosierListS } from "crosier-vue";
import moment from "moment-timezone";
import CrosierListS from "./crosierListS";

export default {
  components: {
    Dialog,
    CrosierListS,
    Column,
  },

  props: {
    entityChangesClass: {
      type: String,
      required: true,
    },

    entityChangesId: {
      type: Number,
      required: true,
    },
  },

  methods: {
    moment(date) {
      return moment(date);
    },
  },
};
</script>
