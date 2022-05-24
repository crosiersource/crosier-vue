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
        <div class="input-group-prepend">
          <span class="input-group-text">R$ </span>
        </div>
        <InputNumber
          :class="'form-control ' + (this.error ? 'is-invalid' : '')"
          inputClass="text-right"
          :id="this.id"
          mode="decimal"
          :minFractionDigits="2"
          :maxFractionDigits="2"
          :modelValue="modelValue"
          @update:modelValue="this.onInput"
          placeholder="0,00"
          :disabled="this.disabled"
          @focus="this.onFocus()"
          @blur="this.$emit('blur')"
          ref="inputNumber"
        />
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
  name: "CrosierCurrency",

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
    showLabel: {
      type: Boolean,
      default: true,
    },
    labelTransparente: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onInput($event) {
      this.$emit("update:modelValue", $event);
      this.$emit("input", $event);
    },

    onFocus() {
      this.$nextTick(() => {
        const el = document.getElementById(this.id);
        el.selectionStart = 10000;
        el.selectionEnd = 10000;
      });
      this.$emit("focus");
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
