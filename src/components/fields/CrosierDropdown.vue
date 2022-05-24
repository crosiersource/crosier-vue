<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label
        v-if="this.showLabel"
        :class="this.labelTransparente ? 'transparente' : ''"
        :for="this.id"
        >{{ this.labelTransparente ? "..." : label }}</label
      >
      <Dropdown
        :class="'form-control ' + (this.error ? 'is-invalid' : '')"
        :id="this.id"
        :appendTo="this.appendTo"
        :modelValue="modelValue"
        @change="this.onChange"
        emptyMessage="Nenhum resultado encontrado"
        :options="this.options"
        :optionLabel="this.optionLabel"
        :optionValue="this.optionValue"
        :placeholder="this.showClear ? 'Selecione' : null"
        :showClear="this.showClear"
        :disabled="this.disabled"
        :dataKey="this.dataKey"
        :filter="true"
        :editable="this.editable"
        @focus="this.$emit('focus')"
        @blur="this.$emit('blur')"
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
import Dropdown from "primevue/dropdown";

export default {
  name: "CrosierDropdown",

  components: {
    Dropdown,
  },

  emits: ["update:modelValue", "change", "focus", "blur"],

  props: {
    modelValue: {
      default: null,
    },
    id: {
      type: String,
      required: true,
    },
    col: {
      type: String,
      default: "12",
    },
    error: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      required: false,
    },
    optionLabel: {
      type: String,
      default: "label",
    },
    optionValue: {
      type: String,
      default: "value",
    },
    options: {
      type: Array,
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
    appendTo: {
      type: String,
      default: "body",
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
    editable: {
      type: Boolean,
      default: false,
    },
  },

  created() {
    if (!this.options || this.options.length < 1) {
      console.error(`options n/d para ${this.id}`);
    }
  },

  methods: {
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
