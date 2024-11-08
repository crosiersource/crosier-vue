<template>
  <Dialog
    :key="this.$store.state.modalEntityChanges_key"
    header="Alterações"
    v-model:visible="this.$store.state.exibirModalEntityChanges"
    :style="{ width: '55vw' }"
    modal
    ref="dialog"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :autoZIndex="false"
  >
    <div class="row">
      <CrosierInputText
        id="dadosCriacao"
        label="Criação"
        col="6"
        v-if="this.dadosCriacao"
        v-model="this.dadosCriacao"
        disabled
        inputClass="notuppercase"
      />
      <CrosierInputText
        id="dadosAlteracao"
        label="Última Alteração"
        col="6"
        v-if="this.dadosAlteracao"
        v-model="this.dadosAlteracao"
        disabled
        inputClass="notuppercase"
      />
    </div>
    <CrosierListS
      ref="crosierListS_entityChanges"
      v-if="entityId"
      withoutCard
      :comFiltragem="false"
      :comPaginador="false"
      apiResource="/api/core/config/entityChanges/"
      :staticFilters="{
        entityClass: this.entityClass,
        entityId: this.entityId,
      }"
      @afterFilter="this.loadInsertedUpdated"
    >
      <template #columns>
        <Column field="obs" header="Alterações">
          <template #body="r">
            <div v-html="r.data.changes"></div>
          </template>
        </Column>

        <Column field="changedAt" header="Em" :sortable="true">
          <template class="text-center" #body="r">
            {{
              r.data.changedAt ? this.moment(r.data.changedAt).format("DD/MM/YYYY HH:mm:ss") : ""
            }}
          </template>
        </Column>

        <Column field="changingUserUsername" header="Por" :sortable="true" />
      </template>
    </CrosierListS>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import Column from "primevue/column";
import moment from "moment-timezone";
import { mapMutations } from "vuex";
import CrosierListS from "./crosierListS";
import CrosierInputText from "./fields/CrosierInputText";
// import { CrosierInputText, CrosierListS } from "crosier-vue";

export default {
  name: "ModalEntityChanges",

  components: {
    Dialog,
    CrosierListS,
    Column,
    CrosierInputText,
  },

  props: {
    entityClass: {
      type: String,
      required: true,
    },
    storeFieldsName: {
      type: String,
      required: false,
      default: "fields",
    },
  },

  data() {
    return {
      dadosCriacao: null,
      dadosAlteracao: null,
    };
  },

  methods: {
    ...mapMutations(["setLoading"]),

    moment(date) {
      return moment(date);
    },

    async loadInsertedUpdated() {
      console.log("loadInsertedUpdated");
      console.log(this.$refs.crosierListS_entityChanges?.tableData);
      if (this.$refs.crosierListS_entityChanges?.tableData) {
        const tableData = this.$refs.crosierListS_entityChanges.tableData;

        const inserido = tableData.find((e) => e.changes === "INSERIDO");
        this.dadosCriacao = `${this.moment(inserido.changedAt).format("DD/MM/YYYY HH:mm:ss")} por ${
          inserido.changingUserUsername
        }`;

        this.dadosAlteracao = `${this.moment(tableData[0].changedAt).format(
          "DD/MM/YYYY HH:mm:ss"
        )} por ${tableData[0].changingUserUsername}`;
      }
    },
  },

  computed: {
    entityId() {
      return this.$store.state?.[this.storeFieldsName]?.id;
    },
  },
};
</script>
