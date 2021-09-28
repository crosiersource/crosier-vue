<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label :for="this.fieldName">{{ label }}</label>
      <Dropdown
        :class="'form-control ' + (this.formErrors[this.fieldName] ? 'is-invalid' : '')"
        :id="this.fieldName"
        :inputId="this.fieldName"
        v-model="this.fields[this.fieldName]"
        :options="this.options"
        :optionLabel="this.optionLabel"
        :optionValue="this.optionValue"
        placeholder="Selecione"
        :disabled="this.disabled"
        :filter="true"
      />
      <small v-if="this.helpText" :id="this.fieldName + '_help'" class="form-text text-muted">{{
        this.helpText
      }}</small>
      <div class="invalid-feedback blink">
        {{ this.formErrors[this.fieldName] }}
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";

export default {
  components: {
    Dropdown,
  },

  props: {
    fieldName: {
      type: String,
      required: true,
    },
    storeFieldsName: {
      type: String,
      required: false,
      default: "getFields",
    },
    storeFieldsErrorsName: {
      type: String,
      required: false,
      default: "getFieldsErrors",
    },
    col: {
      type: String,
      required: false,
      default: "12",
    },
    label: {
      type: String,
      required: true,
    },
    optionLabel: {
      type: String,
      required: false,
      default: "name",
    },
    optionValue: {
      type: String,
      required: false,
      default: "value",
    },
    options: {
      type: Array,
      required: false,
      default: () => [
        { name: "Sim", value: true },
        { name: "Não", value: false },
      ],
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    helpText: {
      type: String,
      required: false,
    },
  },

  computed: {
    fields() {
      return this.$store.getters[this.storeFieldsName];
    },
    formErrors() {
      return this.$store.getters[this.storeFieldsErrorsName];
    },
  },
};
</script>
