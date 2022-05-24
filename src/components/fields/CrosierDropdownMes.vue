<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label v-if="this.showLabel" :for="this.id + '_mes'">{{ label }}</label>
      <div class="input-group">
        <Dropdown
          :class="'form-control ' + (this.error ? 'is-invalid' : '')"
          :id="this.id"
          :appendTo="this.appendTo"
          :modelValue="modelValue"
          @change="this.onChange"
          :options="this.meses"
          optionLabel="label"
          optionValue="value"
          :placeholder="this.showClear ? 'Selecione' : null"
          :showClear="this.showClear"
          :disabled="this.disabled"
          :dataKey="this.dataKey"
          :filter="true"
          @focus="this.$emit('focus')"
          @blur="this.$emit('blur')"
        />
      </div>
    </div>

    <small v-if="this.helpText" :id="this.id + '_help'" class="form-text text-muted">{{
      this.helpText
    }}</small>
    <div class="invalid-feedbackk blink" v-show="this.error">
      {{ this.error }}
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";

export default {
  name: "CrosierDropdownMes",

  components: {
    Dropdown,
  },

  emits: ["update:modelValue", "change", "focus", "blur"],

  props: {
    modelValue: {
      type: [String, Object],
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
      default: "Período",
    },
    meses: {
      type: Array,
      default: () => [
        { label: "Janeiro", value: "01" },
        { label: "Fevereiro", value: "02" },
        { label: "Março", value: "03" },
        { label: "Abril", value: "04" },
        { label: "Maio", value: "05" },
        { label: "Junho", value: "06" },
        { label: "Julho", value: "07" },
        { label: "Agosto", value: "08" },
        { label: "Setembro", value: "09" },
        { label: "Outubro", value: "10" },
        { label: "Novembro", value: "11" },
        { label: "Dezembro", value: "12" },
      ],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    helpText: {
      type: String,
    },
    appendTo: {
      type: String,
      default: "body",
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    labelTransparente: {
      type: Boolean,
      default: false,
    },
    mesCorrenteInicial: {
      type: Boolean,
      default: false,
    },
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
