<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label v-if="this.showLabel" :for="this.id">{{ label }}</label>
      <div class="input-group">
        <div v-if="this.prepend" class="input-group-prepend">
          <span class="input-group-text">{{ this.prepend }}</span>
        </div>
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
          @focus="this.$emit('focus')"
          @blur="this.$emit('blur')"
        />
        <div v-if="this.append" class="input-group-append">
          <span class="input-group-text">{{ this.append }}</span>
        </div>
      </div>
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
    prepend: {
      type: String,
    },
    append: {
      type: String,
    },
    showLabel: {
      type: Boolean,
      default: true,
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
