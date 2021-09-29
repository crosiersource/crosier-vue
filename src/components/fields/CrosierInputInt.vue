<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label :for="this.id">{{ label }}</label>
      <InputNumber
        :class="'form-control ' + (this.error ? 'is-invalid' : '')"
        inputClass="text-right"
        :id="this.id"
        :modelValue="modelValue"
        @input="$emit('update:modelValue', $event.value)"
        :disabled="this.disabled"
      />
      <small v-if="this.helpText" :id="this.id + '_help'" class="form-text text-muted">{{
        this.helpText
      }}</small>
      <div class="invalid-feedback blink">
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

  emits: ["update:modelValue"],

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
      required: false,
      default: null,
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
};
</script>
