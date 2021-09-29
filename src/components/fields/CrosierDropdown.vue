<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label :for="this.id">{{ label }}</label>
      <Dropdown
        :class="'form-control ' + (this.error ? 'is-invalid' : '')"
        :id="this.id"
        :inputId="this.id"
        :modelValue="modelValue"
        @change="$emit('update:modelValue', $event.value)"
        :options="this.options"
        :optionLabel="this.optionLabel"
        :optionValue="this.optionValue"
        placeholder="Selecione"
        :disabled="this.disabled"
        :filter="true"
        :showClear="true"
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
import Dropdown from "primevue/dropdown";

export default {
  components: {
    Dropdown,
  },

  props: {
    modelValue: {
      default: null,
    },
    id: {
      type: String,
      required: true,
    },
    col: {
      type: String,
      required: false,
      default: "12",
    },
    error: {
      type: String,
      required: false,
      default: null,
    },
    label: {
      type: String,
      required: true,
    },
    optionLabel: {
      type: String,
      required: false,
      default: "name",
    },
    optionValue: {
      type: String,
      required: false,
      default: "value",
    },
    options: {
      type: Array,
      required: false,
      default: () => [
        { name: "Sim", value: true },
        { name: "Não", value: false },
      ],
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
