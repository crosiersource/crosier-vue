<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label
        v-if="this.showLabel"
        :class="this.labelTransparente ? 'transparente' : ''"
        :for="this.id"
        >{{ this.labelTransparente ? "..." : label }}</label
      >
      <div class="input-group">
        <InputNumber
          :class="'form-control ' + (this.error ? 'is-invalid' : '')"
          inputClass="text-right"
          :id="this.id"
          mode="decimal"
          :minFractionDigits="this.decimais"
          :maxFractionDigits="this.decimais"
          :modelValue="modelValue"
          @input="this.onInput"
          placeholder="0,00"
          :disabled="this.disabled"
          @focus="this.$emit('focus')"
          @blur="this.$emit('blur')"
        />
        <div class="input-group-append">
          <span class="input-group-text">%</span>
        </div>
      </div>
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
import InputNumber from "primevue/inputnumber";

export default {
  name: "CrosierPercent",

  components: {
    InputNumber,
  },

  emits: ["update:modelValue", "input", "focus", "blur"],

  props: {
    modelValue: {
      type: Number,
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
    disabled: {
      type: Boolean,
      default: false,
    },
    helpText: {
      type: String,
    },
    decimais: {
      type: Number,
      default: 2,
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    labelTransparente: {
      type: Boolean,
      default: false,
    },
    forceZeroIfNull: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    onInput($event) {
      if (this.forceZeroIfNull && $event === null) {
        $event = 0;
      }
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
