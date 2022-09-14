<template>
  <Dialog
    :key="this.$store.state.entityChangesClass + '_' + this.$store.state.entityChangesData?.id"
    header="Alterações"
    v-model:visible="this.$store.state.entityChangesExibir"
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
        label="Alteração"
        col="6"
        v-if="this.dadosAlteracao"
        v-model="this.dadosAlteracao"
        disabled
        inputClass="notuppercase"
      />
    </div>
    <CrosierListS
      v-if="this.$store.state.entityChangesClass && this.$store.state.entityChangesData?.id"
      withoutCard
      :comFiltragem="false"
      apiResource="/api/core/config/entityChange/"
      :staticFilters="{
        entityClass: this.$store.state.entityChangesClass,
        entityId: this.$store.state.entityChangesData.id,
      }"
      @afterFilter="this.loadUserById"
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
import moment from "moment-timezone";
import axios from "axios";
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

    async loadUserById() {
      const userInsertedId = this.$store.state?.entityChangesData?.userInsertedId;
      this.dadosCriacao = `Em ${this.fInserted}`;
      if (userInsertedId) {
        const criadoPor = await this.getUserById(userInsertedId);
        console.log("criadoPor");
        console.log(criadoPor);
        this.dadosCriacao += ` por ${criadoPor || "n/d"}`;
      }

      const userUpdatedId = this.$store.state?.entityChangesData?.userUpdatedId;
      this.dadosAlteracao = `Em ${this.fUpdated}`;
      if (userUpdatedId) {
        const alteradoPor = await this.getUserById(userUpdatedId);
        this.dadosAlteracao += ` por ${alteradoPor || "n/d"}`;
      }
    },

    async getUserById(id) {
      try {
        this.setLoading(true);
        const rs = await axios.get(`/api/getUserById/${id}`, {
          validateStatus(status) {
            return status < 500;
          },
          responseType: "json",
        });

        if ([200, 201].includes(rs?.status)) {
          return rs?.data?.nome;
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.setLoading(false);
      }
      return null;
    },
  },

  computed: {
    fInserted() {
      return this.$store.state.entityChangesData?.inserted
        ? this.moment(this.$store.state?.entityChangesData?.inserted).format("DD/MM/YYYY HH:mm:ss")
        : null;
    },

    fUpdated() {
      return this.$store.state.entityChangesData?.updated
        ? this.moment(this.$store.state?.entityChangesData?.updated).format("DD/MM/YYYY HH:mm:ss")
        : null;
    },
  },
};
</script>
