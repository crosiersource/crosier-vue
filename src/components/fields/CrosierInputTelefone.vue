<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label
        v-if="this.showLabel"
        :class="this.labelTransparente ? 'transparente' : ''"
        :for="this.id"
        >{{ this.labelTransparente ? "..." : label }}</label
      >

      <InputMask
        :class="'form-control ' + (this.error ? 'is-invalid' : '') + this.inputClass"
        :modelValue="this.modelValue"
        @update:modelValue="this.onInput($event)"
        v-if="this.modelValue && this.modelValue.length >= 11"
        mask="(99) 99999-999?9"
        :unmask="true"
        @focus="this.$emit('focus')"
        @blur="this.$emit('blur')"
        :disabled="this.disabled"
      />
      <InputMask
        :class="'form-control ' + (this.error ? 'is-invalid' : '') + this.inputClass"
        :modelValue="this.modelValue"
        @update:modelValue="this.onInput($event)"
        v-if="!this.modelValue || this.modelValue.length < 11"
        mask="(99) 9999-9999?9"
        :unmask="true"
        @focus="this.$emit('focus')"
        @blur="this.$emit('blur')"
        :disabled="this.disabled"
      />

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
import InputMask from "primevue/inputmask";

export default {
  name: "CrosierInputTelefone",

  components: {
    InputMask,
  },

  emits: ["update:modelValue", "input", "focus", "blur"],

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
    inputClass: {
      type: String,
      default: "",
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
      this.$nextTick(async () => {
        this.$emit("update:modelValue", $event);
        this.$emit("input", $event);
      });
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
