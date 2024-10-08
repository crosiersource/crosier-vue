<template>
  <ConfirmDialog group="confirmDialog_crosierListS" />
  <Toast group="toast_crosierListS" class="mb-5" />
  <CrosierBlock :loading="this.loading" />

  <Sidebar
    v-if="this.comFiltragem && this.filtrosNaSidebar"
    class="p-sidebar-lg"
    v-model:visible="this.visibleRight"
    position="right"
  >
    <div class="card">
      <div class="card-body">
        <h5 class="card-title"><i class="fas fa-search"></i> Filtros</h5>
        <form @submit.prevent="doFilter()">
          <slot name="filter-fields"></slot>
          <div class="row mt-3">
            <div class="col-12">
              <InlineMessage severity="info"
                ><small>
                  {{ totalRecords }} registro(s) encontrado(s)
                  <span v-show="this.isFiltering">(com filtros aplicados)</span>.
                </small>
              </InlineMessage>
            </div>
          </div>

          <div class="form-row mt-2">
            <div class="col-6">
              <button type="submit" class="btn btn-primary btn-sm btn-block">
                <i class="fas fa-search"></i> Filtrar
              </button>
            </div>
            <div class="col-6">
              <button
                type="button"
                class="btn btn-sm btn-secondary btn-block"
                @click="this.doClearFilters()"
              >
                <i class="fas fa-backspace"></i> Limpar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </Sidebar>

  <div v-if="!this.withoutCard" :class="this.containerClass">
    <div class="card" style="margin-bottom: 50px">
      <div class="card-header">
        <div class="d-flex flex-wrap align-items-center">
          <div class="mr-1">
            <h3>{{ titulo }}</h3>
            <h6 v-if="subtitulo">{{ subtitulo }}</h6>
          </div>
          <div class="d-sm-flex flex-nowrap ml-auto">
            <a
              v-if="this.formUrl"
              type="button"
              class="btn btn-outline-info"
              :href="this.formUrl"
              title="Novo"
            >
              <i class="fas fa-file" aria-hidden="true"></i>
            </a>

            <button
              type="button"
              :class="'btn btn-' + (!this.isFiltering ? 'outline-' : '') + 'warning ml-1'"
              @click="this.toggleFiltros"
              v-if="this.comFiltragem"
            >
              <i class="fas fa-search"></i>
            </button>

            <button
              type="button"
              class="btn btn-outline-secondary ml-1"
              @click="this.doClearFilters()"
              title="Limpar filtros"
              v-if="this.comFiltragem"
            >
              <i class="fas fa-backspace"></i>
            </button>

            <slot name="headerButtons"></slot>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div v-if="this.comFiltragem && !this.filtrosNaSidebar">
          <Accordion :activeIndex="this.accordionActiveIndex">
            <AccordionTab>
              <template #header>
                <span>Filtros</span>
                <i class="pi pi-filter"></i>
              </template>
              <form @submit.prevent="doFilter()" class="notSubmit">
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
                    <button type="submit" class="btn btn-primary btn-sm">
                      <i class="fas fa-search"></i> Filtrar
                    </button>

                    <button
                      type="button"
                      class="btn btn-sm btn-secondary ml-1"
                      @click="this.doClearFilters()"
                    >
                      <i class="fas fa-backspace"></i> Limpar
                    </button>
                  </div>
                </div>
              </form>
            </AccordionTab>
          </Accordion>
        </div>

        <DataTable
          :stateStorage="this.stateStorage"
          class="p-datatable-sm p-datatable-striped"
          :stateKey="this.dataTableStateKey"
          :value="tableData"
          :totalRecords="totalRecords"
          :lazy="true"
          :paginator="this.comPaginador"
          :rows="this.rows"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink
           LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25, 50, 100, 200, 500]"
          currentPageReportTemplate="{first}-{last} de {totalRecords}"
          @page="doFilter($event)"
          @sort="doFilter($event)"
          :selection="this.selection"
          @update:selection="this.onUpdateSelection($event)"
          :selectionMode="selectionMode"
          :metaKeySelection="this.metaKeySelection"
          dataKey="id"
          @rowSelect="this.onRowSelect"
          @rowUnselect="this.onRowUnselect"
          :resizableColumns="true"
          columnResizeMode="fit"
          :first="firstRecordIndex"
          ref="dt"
          :rowHover="true"
          :multiSortMeta="multiSortMeta"
          :removableSort="this.removableSort"
          :sortMode="this.sortMode"
          :rowGroupMode="this.rowGroupMode"
          :groupRowsBy="this.groupRowsBy"
          :sortField="this.sortField"
          :sortOrder="this.sortOrder"
          :responsiveLayout="this.responsiveLayout"
          :showGridlines="this.showGridlines"
        >
          <template #groupheader="groupheader">
            <slot name="groupheader" :groupheader="groupheader"></slot>
          </template>

          <template #footer>
            <div style="text-align: right" v-if="this.comExportCSV">
              <button
                type="button"
                class="btn btn-sm btn-outline-info"
                title="Exportar para CSV"
                @click="exportCSV($event)"
              >
                <i class="fas fa-file-csv"></i>
              </button>
            </div>
            <slot name="footer"></slot>
          </template>

          <Column field="id" :sortable="true" v-if="this.selecao">
            <template #header>
              <Checkbox
                :binary="true"
                @change="this.tudoSelecionadoClick()"
                v-model="this.tudoSelecionado"
                onIcon="pi pi-check"
                offIcon="pi pi-times"
              />&nbsp; Id
            </template>
            <template #body="r">
              {{ ("0".repeat(this.zerofillId) + r.data.id).slice(-this.zerofillId) }}
            </template>
          </Column>
          <slot name="columns"></slot>
        </DataTable>

        <div class="d-flex justify-content-end" v-if="this.exibirBtnLimparConfiguracoesDaTabela">
          <button
            type="button"
            id="btnLimparConfiguracoesDaTabela01"
            class="btn btn-outline-info btn-sm ml-1 mt-3"
            title="Limpar configurações da tabela"
            @click="this.limparConfiguracoesDaTabela"
          >
            <i class="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <div v-if="this.comFiltragem && !this.filtrosNaSidebar">
      <Accordion :activeIndex="this.accordionActiveIndex">
        <AccordionTab>
          <template #header>
            <span>Filtros</span>
            <i class="pi pi-filter"></i>
          </template>
          <form @submit.prevent="doFilter()" class="notSubmit">
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
                <button type="submit" class="btn btn-primary btn-sm">
                  <i class="fas fa-search"></i> Filtrar
                </button>

                <button
                  type="button"
                  class="btn btn-sm btn-secondary ml-1"
                  @click="this.doClearFilters()"
                >
                  <i class="fas fa-backspace"></i> Limpar
                </button>
              </div>
            </div>
          </form>
        </AccordionTab>
      </Accordion>
    </div>

    <DataTable
      :stateStorage="this.stateStorage"
      class="p-datatable-sm p-datatable-striped"
      :stateKey="this.dataTableStateKey"
      :value="tableData"
      :totalRecords="totalRecords"
      :lazy="true"
      :paginator="this.comPaginador"
      :rows="this.rows"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink
           LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25, 50, 100, 200, 500]"
      currentPageReportTemplate="{first}-{last} de {totalRecords}"
      @page="doFilter($event)"
      @sort="doFilter($event)"
      :selection="this.selection"
      @update:selection="this.onUpdateSelection($event)"
      :selectionMode="selectionMode"
      :metaKeySelection="this.metaKeySelection"
      dataKey="id"
      @rowSelect="this.onRowSelect"
      @rowUnselect="this.onRowUnselect"
      :resizableColumns="true"
      columnResizeMode="fit"
      :first="firstRecordIndex"
      ref="dt"
      :rowHover="true"
      :multiSortMeta="multiSortMeta"
      :removableSort="this.removableSort"
      :sortMode="this.sortMode"
      :rowGroupMode="this.rowGroupMode"
      :groupRowsBy="this.groupRowsBy"
      :sortField="this.sortField"
      :sortOrder="this.sortOrder"
      :responsiveLayout="this.responsiveLayout"
      :showGridlines="this.showGridlines"
    >
      <template #groupheader="groupheader">
        <slot name="groupheader" :groupheader="groupheader"></slot>
      </template>

      <template #footer>
        <div style="text-align: right" v-if="this.comExportCSV">
          <button
            type="button"
            class="btn btn-sm btn-outline-info"
            title="Exportar para CSV"
            @click="exportCSV($event)"
          >
            <i class="fas fa-file-csv"></i>
          </button>
        </div>
        <slot name="footer"></slot>
      </template>

      <Column field="id" :sortable="true" v-if="this.ativarSelecao">
        <template #header>
          <Checkbox
            :binary="true"
            @change="this.tudoSelecionadoClick()"
            v-model="this.tudoSelecionado"
            onIcon="pi pi-check"
            offIcon="pi pi-times"
          />&nbsp; Id
        </template>
        <template #body="r">
          {{ ("0".repeat(this.zerofillId) + r.data.id).slice(-this.zerofillId) }}
        </template>
      </Column>

      <slot name="columns"></slot>
    </DataTable>

    <div class="d-flex justify-content-end" v-if="this.exibirBtnLimparConfiguracoesDaTabela">
      <button
        type="button"
        id="btnLimparConfiguracoesDaTabela02"
        class="btn btn-outline-info btn-sm ml-1 mt-3"
        title="Limpar configurações da tabela"
        @click="this.limparConfiguracoesDaTabela"
      >
        <i class="fas fa-sync-alt"></i>
      </button>
    </div>
  </div>
</template>

<script>
import Checkbox from "primevue/checkbox";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Toast from "primevue/toast";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import ConfirmDialog from "primevue/confirmdialog";
import InlineMessage from "primevue/inlinemessage";
import Sidebar from "primevue/sidebar";
import { mapGetters, mapMutations } from "vuex";
// import { api, CrosierBlock } from "crosier-vue";
import api from "../services/api";
import CrosierBlock from "../components/crosierBlock";

export default {
  name: "CrosierListS",

  components: {
    Accordion,
    AccordionTab,
    Checkbox,
    ConfirmDialog,
    CrosierBlock,
    DataTable,
    Column,
    InlineMessage,
    Toast,
    Sidebar,
  },

  emits: [
    "beforeFilter",
    "afterFilter",
    "row-select",
    "row-unselect",
    "update:selection",
    "tudoSelecionadoClick",
  ],

  props: {
    withoutCard: {
      type: Boolean,
      default: false,
    },
    titulo: {
      type: String,
    },
    subtitulo: {
      type: String,
    },
    formUrl: {
      type: String,
      required: false,
      default: "form",
    },
    pesquisar: {
      type: String,
    },
    apiResource: {
      type: String,
      required: true,
    },
    filtersStoreName: {
      type: String,
      default: "filters",
    },
    containerClass: {
      type: String,
      default: "container-fluid",
    },
    comFiltragem: {
      type: Boolean,
      default: true,
    },
    comPaginador: {
      type: Boolean,
      default: true,
    },
    comExportCSV: {
      type: Boolean,
      default: false,
    },
    sempreMostrarFiltros: {
      type: Boolean,
      default: false,
    },
    defaultOrder: {
      type: Array,
      default: null,
    },
    selection: {
      type: [Array, Object],
      default: null,
    },
    ativarSelecao: {
      type: Boolean,
      default: false,
    },
    preselecao: {
      // se for preselecao, então a seleção será fornecida
      type: Boolean,
      default: false,
    },
    selectionMode: {
      type: String,
      default: "multiple",
    },
    metaKeySelection: {
      type: Boolean,
      default: false,
    },
    filtrosNaSidebar: {
      type: Boolean,
      default: false,
    },
    dtStateName: {
      type: String,
      default: null,
    },
    stateStorage: {
      type: String,
      default: "local",
    },
    properties: {
      type: Array,
      default: null,
    },
    zerofillId: {
      default: 0,
    },
    rows: {
      default: 10,
    },
    filterOnLoad: {
      type: Boolean,
      default: true,
    },
    removableSort: {
      type: Boolean,
      default: true,
    },
    sortMode: {
      type: String,
      default: "multiple", // single ou multiple
    },
    rowGroupMode: {
      type: String,
    },
    groupRowsBy: {
      type: String,
    },
    sortField: {
      type: String,
      default: "updated",
    },
    sortOrder: {
      type: Number,
      default: -1,
    },
    responsiveLayout: {
      type: String,
      default: "scroll",
    },
    showGridlines: {
      type: Boolean,
      default: false,
    },
    staticFilters: {
      type: Object,
    },
    exibirBtnLimparConfiguracoesDaTabela: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      savedFilter: {},
      totalRecords: 0,
      tableData: null,
      firstRecordIndex: 0,
      multiSortMeta: [],
      accordionActiveIndex: null,
      tudoSelecionado: false,
      visibleRight: false,
    };
  },

  created() {
    if (this.preselecao) {
      console.debug("Atenção: preselecao >> localStorage.removeItem(this.dataTableStateKey)");
      localStorage.removeItem(this.dataTableStateKey);
    }
  },

  async mounted() {
    this.setLoading(true);

    this.setColumnWidthsByLocalStorage();

    const uri = window.location.search.substring(1);
    const params = new URLSearchParams(uri);

    if (this.filtersStoreName) {
      this.savedFilter =
        params.get("filters") || localStorage.getItem(this.filtersOnLocalStorage) || "{}";
      if (this.savedFilter && this.savedFilter !== "undefined") {
        try {
          const filtersParsed = JSON.parse(this.savedFilter);
          this.setFilters(filtersParsed);
        } catch (e) {
          console.error(`Não foi possível recuperar os filtros (${this.savedFilter})`);
          console.error(e);
        }
      }
    }

    if (this.filterOnLoad) {
      await this.doFilter();
    }

    try {
      const dtState = localStorage.getItem(this.dataTableStateKey);
      const dtStateParsed = dtState ? JSON.parse(dtState) : {};

      if (!dtStateParsed?.multiSortMeta || dtStateParsed?.multiSortMeta?.length === 0) {
        dtStateParsed.multiSortMeta = [
          {
            field: this.sortField,
            order: this.sortOrder,
          },
        ];
        const dtStateJson = JSON.stringify(dtStateParsed);
        localStorage.setItem(this.dataTableStateKey, dtStateJson);
      }
    } catch (e) {
      console.error('Erro ao setar o "multiSortMeta"');
      console.error(e);
    }

    this.accordionActiveIndex = this.isFiltering ? 0 : null;
    this.setLoading(false);

    this.setColumnWidthsByLocalStorage();
  },

  methods: {
    ...mapMutations(["setLoading"]),

    setFilters(filters) {
      if (this.filtersStoreName) {
        const mutationName = `set${this.filtersStoreName
          .charAt(0)
          .toUpperCase()}${this.filtersStoreName.slice(1)}`;
        // eslint-disable-next-line no-underscore-dangle
        if (mutationName in this.$store._mutations) {
          try {
            this.$store.commit(mutationName, filters);
          } catch (e) {
            console.error(`crosierListS: |${mutationName}| n/d`);
            console.error(e);
          }
        } else {
          console.debug(`${mutationName} não existe`);
        }
      }
    },

    toggleFiltros() {
      this.accordionActiveIndex = this.accordionActiveIndex === 0 ? null : 0;
      this.visibleRight = !this.visibleRight;
    },

    async doFilter(event) {
      this.setLoading(true);

      await this.$emit("beforeFilter");

      const lsItem = localStorage.getItem(this.dataTableStateKey);

      const dtStateLS = lsItem ? JSON.parse(lsItem) : null;

      let rows = Number.MAX_SAFE_INTEGER;
      let page = 1;

      if (this.comPaginador) {
        rows = event?.rows ?? dtStateLS?.rows ?? 10;

        if (event?.first) {
          page = Math.ceil((event.first + 1) / event.rows);
        } else if (lsItem?.first) {
          page = Math.ceil((dtStateLS.first + 1) / dtStateLS.rows);
        }
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
        apiOrder = this.multiSortMeta;
      }

      const response = await api.get({
        apiResource: this.apiResource,
        page,
        rows,
        order: apiOrder,
        filters: this.filters,
        defaultFilters: this.defaultFilters,
        properties: this.properties,
      });

      this.totalRecords = response.data["hydra:totalItems"];
      this.tableData = response.data["hydra:member"];

      // salva os filtros no localStorage
      localStorage.setItem(this.filtersOnLocalStorage, JSON.stringify(this.filters));

      this.totalRecords = response.data["hydra:totalItems"];
      this.tableData = response.data["hydra:member"];
      this.setFilters(this.filters);

      this.$emit("afterFilter", this.tableData);
      this.handleTudoSelecionado();

      if (this.filtrosNaSidebar) {
        this.visibleRight = false;
      }

      this.setColumnWidthsByLocalStorage();

      this.setLoading(false);
    },

    async doClearFilters() {
      this.setFilters({});
      localStorage.setItem(this.filtersOnLocalStorage, null);
      this.$refs.dt.resetPage();
      await this.doFilter({ event: { first: 0 } });
    },

    tudoSelecionadoClick() {
      this.$emit("update:selection", this.tudoSelecionado ? [...this.tableData] : null);
    },

    onUpdateSelection($event) {
      this.handleTudoSelecionado();
      this.$emit("update:selection", $event);
    },

    handleTudoSelecionado() {
      this.$nextTick(() => {
        if (this.selection && this.tableData) {
          try {
            const selectionIds = this.selection.map((e) => e.id).sort();
            const values = this.tableData;
            const valuesIds = values.map((e) => e.id).sort();
            this.tudoSelecionado = JSON.stringify(selectionIds) === JSON.stringify(valuesIds);
          } catch (e) {
            console.error("Erro - handleTudoSelecionado");
            console.error(e);
          }
        }
      });
    },

    onRowSelect($event) {
      this.$emit("row-select", $event);
      this.handleTudoSelecionado();
    },

    onRowUnselect($event) {
      this.$emit("row-unselect", $event);
      this.handleTudoSelecionado();
    },

    setColumnWidthsByLocalStorage() {
      const dtStateKey = this.dataTableStateKey;
      if (dtStateKey) {
        const keyColumnWidths = `${dtStateKey}_columnWidths`;
        const columnWidthsNoLocalStorage = localStorage.getItem(keyColumnWidths);
        const dtStateKeyDecoded = JSON.parse(localStorage.getItem(dtStateKey));
        if (dtStateKeyDecoded?.columnWidths) {
          dtStateKeyDecoded.columnWidths = columnWidthsNoLocalStorage;
          const dtStateKeyEncoded = JSON.stringify(dtStateKeyDecoded);
          localStorage.setItem(dtStateKey, dtStateKeyEncoded);
        }
      }
    },

    exportCSV() {
      this.$refs.dt.exportCSV();
    },

    deletar(id) {
      this.$confirm.require({
        acceptLabel: "Sim",
        rejectLabel: "Não",
        message: "Confirmar a operação?",
        header: "Atenção!",
        icon: "pi pi-exclamation-triangle",
        group: "confirmDialog_crosierListS",
        accept: async () => {
          this.setLoading(true);
          try {
            const deleteUrl = `${this.apiResource}${id}`;
            const rsDelete = await api.delete(deleteUrl);
            if (!rsDelete) {
              throw new Error("rsDelete n/d");
            }
            if (rsDelete?.status === 204) {
              this.$toast.add({
                group: "mainToast",
                severity: "success",
                summary: "Sucesso",
                detail: "Registro deletado com sucesso",
                life: 5000,
              });
              await this.doFilter();
            } else if (rsDelete?.data && rsDelete.data["hydra:description"]) {
              throw new Error(`status !== 204: ${rsDelete?.data["hydra:description"]}`);
            } else if (rsDelete?.statusText) {
              throw new Error(`status !== 204: ${rsDelete?.statusText}`);
            } else {
              throw new Error("Erro ao deletar (erro n/d, status !== 204)");
            }
          } catch (e) {
            console.error(e);
            this.$toast.add({
              group: "mainToast",
              severity: "error",
              summary: "Erro",
              detail: "Ocorreu um erro ao deletar",
              life: 5000,
            });
          }
          this.setLoading(false);
        },
      });
    },

    limparConfiguracoesDaTabela() {
      this.$confirm.require({
        acceptLabel: "Sim",
        rejectLabel: "Não",
        message: "Confirmar a operação?",
        header: "Atenção!",
        icon: "pi pi-exclamation-triangle",
        group: "confirmDialog_crosierListS",
        accept: () => {
          try {
            this.setLoading(true);
          } catch (e) {
            console.error(e);
          }
          localStorage.removeItem(this.dataTableStateKey);
          localStorage.removeItem(`${this.dataTableStateKey}_columnWidths`);
          window.location.reload();
        },
      });
    },
  },

  computed: {
    ...mapGetters({
      loading: "isLoading",
    }),

    filters() {
      let filters = null;
      if (this.filtersStoreName) {
        filters =
          this.$store.getters[
            `get${this.filtersStoreName.charAt(0).toUpperCase()}${this.filtersStoreName.slice(1)}`
          ];
      }
      if (this.staticFilters) {
        filters = { ...filters, ...this.staticFilters };
      }
      return filters;
    },

    defaultFilters() {
      if (this.filtersStoreName) {
        return this.$store.getters[
          `getDefault${this.filtersStoreName.charAt(0).toUpperCase()}${this.filtersStoreName.slice(
            1
          )}`
        ];
      }
      return null;
    },

    filtersOnLocalStorage() {
      return `filters${this.apiResource}_${this.filtersStoreName}`;
    },

    dataTableStateKey() {
      return `dt-state_${this.dtStateName ?? this.apiResource}`;
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
