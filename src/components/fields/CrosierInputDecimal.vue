<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label :for="this.id">{{ label }}</label>
      <InputNumber
        :class="'form-control ' + (this.error ? 'is-invalid' : '')"
        :id="this.id"
        inputClass="text-right"
        mode="decimal"
        :minFractionDigits="this.decimais"
        :maxFractionDigits="this.decimais"
        :modelValue="modelValue"
        @input="this.onInput"
        :disabled="this.disabled"
      />
      <div class="invalid-feedbackk blink" v-show="this.error">
        {{ this.error }}
      </div>
      <small v-if="this.helpText" :id="this.id + '_help'" class="form-text text-muted">{{
        this.helpText
      }}</small>
    </div>
  </div>
</template>

<script>
import InputNumber from "primevue/inputnumber";

export default {
  name: "CrosierInputDecimal",

  components: {
    InputNumber,
  },

  emits: ["update:modelValue", "input"],

  props: {
    modelValue: {
      type: Number,
    },
    id: {
      type: String,
      required: true,
    },
    decimais: {
      type: Number,
      default: 2,
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
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    helpText: {
      type: String,
    },
  },

  methods: {
    onInput($event) {
      this.$emit("update:modelValue", $event.value);
      this.$emit("input", $event);
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
