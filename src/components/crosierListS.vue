<template>
  <ConfirmDialog group="crosierListS_delete"></ConfirmDialog>
  <div :class="this.containerClass">
    <div class="card" style="margin-bottom: 50px">
      <div class="card-header">
        <div class="d-flex flex-wrap align-items-center">
          <div class="mr-1">
            <h3>{{ titulo }}</h3>
            <h6 v-if="subtitulo">{{ subtitulo }}</h6>
          </div>
          <div class="d-sm-flex flex-nowrap ml-auto">
            <a
              v-show="this.formUrl"
              type="button"
              class="btn btn-info"
              :href="this.formUrl"
              title="Novo"
            >
              <i class="fas fa-file" aria-hidden="true"></i>
            </a>
            <slot name="headerButtons"></slot>
          </div>
        </div>
      </div>
      <div class="card-body">
        <CrosierBlock :loading="this.loading" />
        <div>
          <Accordion
            :multiple="true"
            :activeIndex="this.sempreMostrarFiltros || this.isFiltered ? '[0]' : null"
          >
            <AccordionTab>
              <template #header>
                <span>Filtrar</span>
                <i class="pi pi-filter"></i>
              </template>
              <form @submit.prevent="this.doFilter()" class="notSubmit">
                <slot name="filter-fields"></slot>
                <div class="row mt-3">
                  <div class="col-3">
                    <InlineMessage severity="info">
                      {{ totalRecords }} registro(s) encontrado(s).</InlineMessage
                    >
                  </div>
                  <div class="col text-right">
                    <Button
                      label="Filtrar"
                      type="submit"
                      icon="fas fa-search"
                      class="p-button-primary p-button-sm mr-2"
                    />
                    <Button
                      label="Limpar"
                      icon="fas fa-backspace"
                      class="p-button-secondary p-button-sm mr-2"
                      @click="this.doClearFilters()"
                    />
                  </div>
                </div>
              </form>
            </AccordionTab>
          </Accordion>
        </div>
        <DataTable
          stateStorage="local"
          class="p-datatable-sm p-datatable-striped"
          :stateKey="this.dataTableStateKey"
          :value="tableData"
          :totalRecords="totalRecords"
          :lazy="true"
          :paginator="true"
          :rows="10"
          @page="onPage($event)"
          @sort="onSort($event)"
          removableSort
          sortField="id"
          sortOrder="1"
          ref="dt"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink
           LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25, 50, 1000]"
          currentPageReportTemplate="{first}-{last} de {totalRecords}"
          v-model:selection="this.selectedItems"
          dataKey="id"
          @row-select="onSelectChange"
          @row-unselect="onSelectChange"
          :resizableColumns="true"
          columnResizeMode="fit"
          responsiveLayout="scroll"
        >
          <template #footer>
            <div style="text-align: right">
              <Button
                class="p-button-rounded p-button-success p-button-text"
                icon="pi pi-file-excel"
                label="Exportar"
                @click="exportCSV($event)"
              />
            </div>
          </template>
          <slot name="columns"></slot>
        </DataTable>
      </div>
    </div>
  </div>

  <Toast class="mt-5" />
</template>

<script>
import DataTable from "primevue/datatable";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Button from "primevue/button";
import ConfirmDialog from "primevue/confirmdialog";
import InlineMessage from "primevue/inlinemessage";
import Toast from "primevue/toast";
import { mapMutations } from "vuex";
import { fetchTableData } from "../services/ApiDataFetchService";
import { deleteEntityData } from "../services/ApiDeleteService";
import CrosierBlock from "./crosierBlock";

export default {
  name: "CrosierListS",
  components: {
    Accordion,
    AccordionTab,
    Button,
    ConfirmDialog,
    CrosierBlock,
    DataTable,
    InlineMessage,
    Toast,
  },
  props: {
    titulo: {
      type: String,
      required: true,
    },
    subtitulo: {
      type: String,
      required: false,
    },
    formUrl: {
      type: String,
      required: false,
    },
    pesquisar: {
      type: String,
      required: false,
    },
    apiResource: {
      type: String,
      required: true,
    },
    filtersStoreName: {
      type: String,
      required: false,
      default: "filters",
    },
    containerClass: {
      type: String,
      required: false,
      default: "container-fluid",
    },
    sempreMostrarFiltros: {
      type: Boolean,
      required: false,
      default: false,
    },
    parentLoad: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      savedFilter: {},
      isFiltered: false,
      totalRecords: 0,
      tableData: null,
      selectedItems: [],
    };
  },

  async mounted() {
    this.setLoading(true);
    const uri = window.location.search.substring(1);
    const params = new URLSearchParams(uri);

    this.savedFilter = params.get("filters") || localStorage.getItem(this.localStorageName);
    if (this.savedFilter) {
      try {
        const filtersParsed = JSON.parse(this.savedFilter);
        this.setFilters(filtersParsed);
      } catch (e) {
        console.error(`Não foi possível recuperar os filtros (${this.savedFilter})`);
      }
    }
    let page = 1;
    let rows = 10;
    const order = new Map();
    const lsItem = localStorage.getItem(this.dataTableStateKey);
    if (lsItem) {
      const dtStateLS = JSON.parse(lsItem);
      page = Math.ceil((dtStateLS.first + 1) / dtStateLS.rows);
      rows = dtStateLS.rows;
      const sorterOrder = {
        1: "ASC",
        "-1": "DESC",
      };

      if (dtStateLS?.sortOrder && sorterOrder[dtStateLS.sortOrder]) {
        order.set(dtStateLS.sortField, sorterOrder[dtStateLS.sortOrder]);
      }
    }

    this.$emit("beforeFilter");

    // make request passing
    const response = await this.fetchTableData({
      apiResource: this.apiResource,
      page,
      rows,
      order,
      filters: this.filters,
    });

    this.totalRecords = response.data["hydra:totalItems"];
    this.tableData = response.data["hydra:member"];
    this.setFilters(this.filters);
    this.$emit("afterFilter", this.tableData);
    this.setLoading(false);
  },

  methods: {
    ...mapMutations(["setLoading"]),
    fetchTableData,
    deleteEntityData,

    setFilters(filters) {
      this.$store.commit(
        `set${this.filtersStoreName.charAt(0).toUpperCase()}${this.filtersStoreName.slice(1)}`,
        filters
      );
    },

    async lazyFetch(event) {
      this.setLoading(true);
      const page = event ? Math.ceil((event.first + 1) / event.rows) : 1;
      const rows = event ? event.rows : 10;

      const sorterOrder = {
        1: "ASC",
        "-1": "DESC",
      };

      const order = new Map();
      if (sorterOrder[event.sortOrder]) {
        order.set(event.sortField, sorterOrder[event.sortOrder]);
      }

      this.$emit("beforeFilter");

      const response = await this.fetchTableData({
        apiResource: this.apiResource,
        page,
        rows,
        order,
        filters: this.filters,
      });

      this.totalRecords = response.data["hydra:totalItems"];
      this.tableData = response.data["hydra:member"];
      this.setFilters(this.filters);
      this.$emit("afterFilter", this.tableData);
      this.setLoading(false);
    },

    redirectForm(id = "") {
      window.location.href = `form${id ? `?id=${id}` : ""}`;
    },

    async onPage(event) {
      await this.lazyFetch(event);
    },

    async onSort(event) {
      await this.lazyFetch(event);
    },

    async doFilter() {
      this.setLoading(true);

      this.$emit("beforeFilter");

      // get from api
      const response = await this.fetchTableData({
        apiResource: this.apiResource,
        filters: this.filters,
      });

      this.totalRecords = response.data["hydra:totalItems"];
      this.tableData = response.data["hydra:member"];

      // save filters on localstorage
      localStorage.setItem(this.localStorageName, JSON.stringify(this.filters));
      this.setFilters(this.filters);
      this.$emit("afterFilter", this.tableData);
      this.setLoading(false);
    },

    doClearFilters() {
      this.setFilters({});
      this.doFilter();
    },

    async delete(event, id) {
      this.$confirm.require({
        group: "crosierListS_delete",
        message: "Tem certeza que deseja deletar?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Sim",
        rejectLabel: "Não",
        accept: async () => {
          try {
            this.setLoading(true);

            const response = await this.deleteEntityData({
              apiResource: `${this.apiResource}${id}`,
            });
            if (response.status === 204) {
              this.showSuccess("Deletado com sucesso.");
              document.location.reload(true);
            } else {
              this.showError("Erro ao deletar");
            }
          } catch (err) {
            this.showError("Erro ao deletar");
            console.error(err);
          }
          this.setLoading(false);
        },
      });
    },

    showSuccess(message) {
      this.$toast.add({
        severity: "success",
        summary: "Mensagem de sucesso",
        detail: message,
        life: 3000,
      });
    },

    showError(message) {
      this.$toast.add({
        severity: "error",
        summary: "Mensagem de erro",
        detail: message,
        life: 3000,
      });
    },

    exportCSV() {
      this.$refs.dt.exportCSV();
    },
  },
  computed: {
    computed: {
      loading() {
        return this.$store.state.loading || this.parentLoad;
      },
    },
    filters() {
      return this.$store.getters[
        `get${this.filtersStoreName.charAt(0).toUpperCase()}${this.filtersStoreName.slice(1)}`
      ];
    },
    localStorageName() {
      return `filter-state_${this.apiResource}_${this.filtersStoreName}`;
    },
    dataTableStateKey() {
      return `dataTable-state${this.apiResource}`;
    },
    loading() {
      return this.$store.getters.isLoading;
    },
  },
};
</script>
