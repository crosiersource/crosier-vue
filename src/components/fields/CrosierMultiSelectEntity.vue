<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label
        v-if="this.showLabel"
        :class="this.labelTransparente ? 'transparente' : ''"
        :for="this.id"
        >{{ this.labelTransparente ? "..." : label }}</label
      >
      <MultiSelect
        :class="'form-control ' + (this.error ? 'is-invalid' : '')"
        :id="this.id"
        :modelValue="modelValue"
        @change="this.onChange"
        :options="this.options"
        :optionLabel="this.optionLabel"
        :optionValue="this.optionValue"
        :placeholder="this.showClear ? 'Selecione' : null"
        :showClear="this.showClear"
        :disabled="this.disabled"
        :dataKey="this.dataKey"
        :filter="true"
        @focus="this.$emit('focus')"
        @blur="this.$emit('blur')"
        display="chip"
      />
      <small v-if="this.helpText" :id="this.id + '_help'" class="form-text text-muted">{{
        this.helpText
      }}</small>
      <div class="invalid-feedbackk blink" v-show="this.error">
        {{ this.error }}
      </div>
    </div>
  </div>
</template>

<script>
import MultiSelect from "primevue/multiselect";
import { mapMutations } from "vuex";
import api from "../../services/api";

export default {
  name: "CrosierMultiSelectEntity",

  components: {
    MultiSelect,
  },

  emits: ["update:modelValue", "change", "focus", "blur"],

  props: {
    modelValue: {
      default: null,
      type: [String, Object],
    },
    id: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      default: null,
    },
    col: {
      type: String,
      default: "12",
    },
    label: {
      type: String,
      required: false,
    },
    optionLabel: {
      type: String,
      required: true,
    },
    optionValue: {
      type: String,
      default: "@id",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    showClear: {
      type: Boolean,
      default: true,
    },
    helpText: {
      type: String,
    },
    entityUri: {
      type: String,
      required: true,
    },
    filters: {
      type: Object,
    },
    properties: {
      type: Array,
    },
    orderBy: {
      type: Object,
    },
    dataKey: {
      type: String,
      default: "@id",
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    labelTransparente: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      options: null,
    };
  },

  async mounted() {
    this.setLoading(true);
    await this.load();
    this.setLoading(false);
  },

  methods: {
    ...mapMutations(["setLoading"]),

    async load() {
      try {
        const response = await api.get({
          apiResource: this.entityUri,
          allRows: true,
          filters: this.filters,
          order: this.orderBy,
          properties: this.properties,
        });

        if (response.data["hydra:totalItems"] > 0) {
          this.options = response.data["hydra:member"];
        }
      } catch (err) {
        console.error(err);
      }
    },

    onChange($event) {
      this.$emit("change", $event);
      this.$emit("update:modelValue", $event.value);
    },
  },
};
</script>
<style scoped>
.invalid-feedbackk {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #e55353;
}
</style>
