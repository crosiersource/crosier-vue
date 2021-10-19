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
          <Accordion :activeIndex="this.accordionActiveIndex">
            <AccordionTab>
              <template #header>
                <span>Filtros</span>
                <i class="pi pi-filter"></i>
              </template>
              <form @submit.prevent="this.doFilter()" class="notSubmit">
                <slot name="filter-fields"></slot>
                <div class="row mt-3">
                  <div class="col-8">
                    <InlineMessage severity="info"
                      ><small>
                        {{ totalRecords }} registro(s) encontrado(s)
                        <span v-show="this.isFiltering">(com filtros aplicados)</span>.
                      </small>
                    </InlineMessage>
                  </div>
                  <div class="col-4 text-right">
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
          @page="doFilter($event)"
          @sort="doFilter($event)"
          sortMode="multiple"
          :multiSortMeta="multiSortMeta"
          :removable-sort="true"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink
           LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25, 50, 200]"
          currentPageReportTemplate="{first}-{last} de {totalRecords}"
          v-model:selection="this.selection"
          :selectionMode="selectionMode"
          :metaKeySelection="false"
          dataKey="id"
          @rowSelect="this.onRowSelect"
          @rowUnselect="this.onRowUnselect"
          :resizableColumns="true"
          columnResizeMode="fit"
          responsiveLayout="scroll"
          :first="firstRecordIndex"
          ref="dt"
        >
          <template #footer>
            <div style="text-align: right">
              <Button
                class="p-button-rounded p-button-success p-button-text"
                icon="pi pi-file-excel"
                label="Exportar para CSV"
                @click="exportCSV($event)"
              />
            </div>
          </template>
          <slot name="columns"></slot>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Button from "primevue/button";
import ConfirmDialog from "primevue/confirmdialog";
import InlineMessage from "primevue/inlinemessage";
import { mapMutations } from "vuex";
import api from "../services/api";
import CrosierBlock from "../components/crosierBlock";

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
  },
  emits: ["beforeFilter", "afterFilter", "onRowSelect", "onRowUnselect"],
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
    defaultOrder: {
      type: Array,
      required: false,
      default: null,
    },
    selectionMode: {
      type: String,
      required: false,
      default: "multiple",
    },
    dtStateName: {
      type: String,
      required: false,
      default: null,
    },
  },

  data() {
    return {
      savedFilter: {},
      totalRecords: 0,
      tableData: null,
      selection: [],
      firstRecordIndex: 0,
      multiSortMeta: [],
      accordionActiveIndex: null,
    };
  },

  async mounted() {
    this.setLoading(true);
    const uri = window.location.search.substring(1);
    const params = new URLSearchParams(uri);

    this.savedFilter = params.get("filters") || localStorage.getItem(this.filtersOnLocalStorage);
    if (this.savedFilter) {
      try {
        const filtersParsed = JSON.parse(this.savedFilter);
        this.setFilters(filtersParsed);
      } catch (e) {
        console.error(`Não foi possível recuperar os filtros (${this.savedFilter})`);
      }
    }

    await this.doFilter();
    this.accordionActiveIndex = this.isFiltering ? 0 : null;
    this.setLoading(false);
  },

  methods: {
    ...mapMutations(["setLoading"]),

    setFilters(filters) {
      this.$store.commit(
        `set${this.filtersStoreName.charAt(0).toUpperCase()}${this.filtersStoreName.slice(1)}`,
        filters
      );
    },

    async doFilter(event) {
      this.setLoading(true);

      this.$emit("beforeFilter");

      const lsItem = localStorage.getItem(this.dataTableStateKey);
      const dtStateLS = lsItem ? JSON.parse(lsItem) : null;

      const rows = event?.rows ?? dtStateLS?.rows ?? 10;

      let page = 1;
      if (event?.first) {
        page = Math.ceil((event.first + 1) / event.rows);
      } else if (lsItem?.first) {
        page = Math.ceil((dtStateLS.first + 1) / dtStateLS.rows);
      } else {
        page = 1;
      }

      let apiOrder = null;

      // Prioridades:
      if (event?.multiSortMeta?.length > 0) {
        // 1- evento
        apiOrder = event.multiSortMeta;
      } else if (dtStateLS?.multiSortMeta?.length > 0) {
        // 2- state do datatable
        apiOrder = dtStateLS.multiSortMeta;
      } else if (this.defaultOrder) {
        // 3- defaultOrder
        this.multiSortMeta = [];
        Object.keys(this.defaultOrder).forEach((campo) => {
          this.multiSortMeta.push({
            field: campo,
            order: this.defaultOrder[campo] === "ASC" ? 1 : -1,
          });
        }, this);
      }

      const response = await api.get({
        apiResource: this.apiResource,
        page,
        rows,
        order: apiOrder,
        filters: this.filters,
      });

      this.totalRecords = response.data["hydra:totalItems"];
      this.tableData = response.data["hydra:member"];

      // salva os filtros no localStorage
      localStorage.setItem(this.filtersOnLocalStorage, JSON.stringify(this.filters));

      this.totalRecords = response.data["hydra:totalItems"];
      this.tableData = response.data["hydra:member"];
      this.setFilters(this.filters);

      this.$emit("afterFilter", this.tableData);

      this.setLoading(false);
    },

    doClearFilters() {
      this.setFilters({});
      localStorage.setItem(this.filtersOnLocalStorage, null);
      this.$refs.dt.resetPage();
      this.doFilter({ event: { first: 0 } });
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

    async onRowSelect(event) {
      await this.$emit("onRowSelect", event);
    },

    async onRowUnselect(event) {
      await this.$emit("onRowUnselect", event);
    },

    exportCSV() {
      this.$refs.dt.exportCSV();
    },
  },
  computed: {
    filters() {
      return this.$store.getters[
        `get${this.filtersStoreName.charAt(0).toUpperCase()}${this.filtersStoreName.slice(1)}`
      ];
    },

    filtersOnLocalStorage() {
      return `filters${this.apiResource}_${this.filtersStoreName}`;
    },

    dataTableStateKey() {
      return `dt-state${this.dtStateName ?? this.apiResource}`;
    },

    loading() {
      return this.$store.getters.isLoading;
    },

    isFiltering() {
      if (this.sempreMostrarFiltros) {
        return true;
      }
      if (this.filters && Object.keys(this.filters).length > 0) {
        // eslint-disable-next-line no-restricted-syntax
        for (const [, value] of Object.entries(this.filters)) {
          if (value ?? false) {
            return true;
          }
        }
      }
      return false;
    },
  },
};
</script>
