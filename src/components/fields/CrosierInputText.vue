<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label :for="this.id">{{ label }}</label>
      <InputText
        :class="'form-control ' + (this.error ? 'is-invalid' : '')"
        :id="this.id"
        type="text"
        :modelValue="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
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
import InputText from "primevue/inputtext";

export default {
  components: {
    InputText,
  },

  emits: ["update:modelValue"],

  props: {
    modelValue: {
      type: String,
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
