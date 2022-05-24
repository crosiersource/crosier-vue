<template>
  <div :class="'col-md-' + (this.col - 1)">
    <div class="form-group">
      <label
        v-if="this.showLabel"
        :class="this.labelTransparente ? 'transparente' : ''"
        :for="this.id"
        >{{ this.labelTransparente ? "..." : label }}</label
      >
      <br />
      <ColorPicker
        id="cor"
        :modelValue="modelValue"
        @update:modelValue="this.onChange($event)"
        :disabled="this.disabled"
      />
    </div>
  </div>
  <div class="col-md-1">
    <div class="form-group">
      <label v-if="this.showLabel" for="corInput">&nbsp;</label>
      <br />
      <InputMask
        mask="#******"
        class="form-control"
        :id="this.id + 'Input'"
        type="text"
        :modelValue="modelValue"
        @change="this.onInput"
        @focus="this.$emit('focus')"
        @blur="this.$emit('blur')"
        :disabled="this.disabled"
      />
    </div>
    <small v-if="this.helpText" :id="this.id + '_help'" class="form-text text-muted">
      {{ this.helpText }}
    </small>
    <div class="invalid-feedbackk blink" v-show="this.error">
      {{ this.error }}
    </div>
  </div>
</template>

<script>
import ColorPicker from "primevue/colorpicker";
import InputMask from "primevue/inputmask";

export default {
  name: "CrosierColorPicker",

  components: {
    InputMask,
    ColorPicker,
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
      this.$emit("update:modelValue", $event.target.value);
      this.$emit("input", $event);
    },
    onChange($event) {
      this.$emit("update:modelValue", $event);
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
