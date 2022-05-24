<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label
        v-if="this.showLabel"
        :class="this.labelTransparente ? 'transparente' : ''"
        :for="this.id"
        >{{ this.labelTransparente ? "..." : label }}</label
      >
      <Textarea
        :rows="this.rows"
        :cols="this.cols"
        :auto-resize="this.autoResize"
        :class="'form-control ' + (this.error ? 'is-invalid ' : ' ') + this.inputClass"
        :id="this.id"
        type="text"
        :modelValue="modelValue"
        @input="this.onInput"
        :disabled="this.disabled"
        @focus="this.$emit('focus')"
        @blur="this.$emit('blur')"
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
import Textarea from "primevue/textarea";

export default {
  name: "CrosierInputTextarea",

  components: {
    Textarea,
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
    rows: {
      type: Number,
      default: 5,
    },
    cols: {
      type: Number,
      default: 40,
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    labelTransparente: {
      type: Boolean,
      default: false,
    },
    inputClass: {
      type: String,
      default: "",
    },
  },

  methods: {
    onInput($event) {
      this.$emit("update:modelValue", $event.target.value);
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
