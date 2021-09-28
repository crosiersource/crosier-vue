<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label :for="this.fieldName">{{ this.label }}</label>
      <Calendar
        :id="this.fieldName"
        :inputClass="this.inputClass"
        :class="'form-control ' + (this.formErrors[this.fieldName] ? 'is-invalid' : '')"
        v-model="this.fields[this.fieldName]"
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
        {{ this.formErrors[this.fieldName] }}
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
