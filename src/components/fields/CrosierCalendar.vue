<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label :for="this.fieldName">{{ this.label }}</label>
      <Calendar
        :id="this.fieldName"
        :inputClass="this.inputClass"
        :class="'form-control ' + (this.error ? 'is-invalid' : '')"
        v-model="this.field"
        dateFormat="dd/mm/yy"
        :showTime="['crsr-datetime', 'crsr-datetime-nseg'].includes(this.inputClass)"
        :showSeconds="['crsr-datetime'].includes(this.inputClass)"
        :showButtonBar="true"
        :showIcon="true"
        :showOnFocus="false"
        :disabled="this.disabled"
      />
      <small v-if="this.helpText" :id="this.fieldName + '_help'" class="form-text text-muted">{{
        this.helpText
      }}</small>
      <div class="invalid-feedback blink">
        {{ this.error }}
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from "primevue/calendar";

export default {
  components: {
    Calendar,
  },

  props: {
    fieldName: {
      type: String,
      required: true,
    },
    inputClass: {
      type: String,
      required: false,
      default: "crsr-date",
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
        : this.errors[this.fieldName];
    },
  },
};
</script>
