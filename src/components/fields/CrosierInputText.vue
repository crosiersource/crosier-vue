<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label :for="this.id">{{ label }}</label>
      <div class="input-group">
        <div v-if="this.prepend" class="input-group-prepend">
          <span class="input-group-text">{{ this.prepend }}</span>
        </div>
        <InputText
          :class="'form-control ' + (this.error ? 'is-invalid' : '') + this.inputClass"
          :id="this.id"
          type="text"
          :modelValue="modelValue"
          @input="this.onInput"
          :disabled="this.disabled"
        />
        <div v-if="this.append" class="input-group-append">
          <span class="input-group-text">{{ this.append }}</span>
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
import InputText from "primevue/inputtext";

export default {
  name: "CrosierInputText",

  components: {
    InputText,
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
    prepend: {
      type: String,
    },
    append: {
      type: String,
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
