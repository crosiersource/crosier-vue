<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label :for="this.fieldName">{{ label }}</label>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">R$ </span>
        </div>
        <InputNumber
          :class="'form-control ' + (this.error ? 'is-invalid' : '')"
          inputClass="text-right"
          mode="decimal"
          :minFractionDigits="2"
          :maxFractionDigits="2"
          v-model="this.field"
          placeholder="0,00"
          :disabled="this.disabled"
        />
      </div>
      <small v-if="this.helpText" :id="this.fieldName + '_help'" class="form-text text-muted">{{
        this.helpText
      }}</small>
      <div class="invalid-feedback blink" v-show="this.error">
        {{ this.error }}
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

  methods: {
    getRef(ref) {
      const ns = this.fieldName.split(".");
      for (let i = 0; i < ns.length; i++) {
        if (!ref[ns[i]]) {
          ref[ns[i]] = i + 1 === ns.length ? null : {};
        }
        ref = ref[ns[i]];
      }
      return ref;
    },
  },

  computed: {
    fields() {
      return this.$store.getters[this.storeFieldsName];
    },
    formErrors() {
      return this.$store.getters[this.storeFieldsErrorsName];
    },
    field() {
      return this.fieldName.includes(".") ? this.getRef(this.fields) : this.fields[this.fieldName];
    },
    error() {
      return this.fieldName.includes(".")
        ? this.getRef(this.formErrors)
        : this.formErrors[this.fieldName];
    },
  },
};
</script>
