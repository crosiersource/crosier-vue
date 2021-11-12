<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label :for="this.id">{{ label }}</label>

      <InputMask
        :class="'form-control ' + (this.error ? 'is-invalid' : '') + this.inputClass"
        :modelValue="this.modelValue"
        @update:modelValue="this.onInput($event)"
        v-if="this.modelValue && this.modelValue.length >= 11"
        mask="(99) 99999-999?9"
        :unmask="true"
      />
      <InputMask
        :class="'form-control ' + (this.error ? 'is-invalid' : '') + this.inputClass"
        :modelValue="this.modelValue"
        @update:modelValue="this.onInput($event)"
        v-if="!this.modelValue || this.modelValue.length < 11"
        mask="(99) 9999-9999?9"
        :unmask="true"
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

  emits: ["update:modelValue", "input"],

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
      required: true,
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
