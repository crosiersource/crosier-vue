<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label :for="this.fieldName">{{ label }}</label>
      <InputNumber
        :class="'form-control ' + (this.formErrors[this.fieldName] ? 'is-invalid' : '')"
        inputClass="text-right"
        mode="decimal"
        :minFractionDigits="this.decimais"
        :maxFractionDigits="this.decimais"
        v-model="this.fields[this.fieldName]"
        :disabled="this.disabled"
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
import InputNumber from "primevue/inputnumber";

export default {
  components: {
    InputNumber,
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
    decimais: {
      type: Number,
      required: false,
      default: 2,
    },
    label: {
      type: String,
      required: true,
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
