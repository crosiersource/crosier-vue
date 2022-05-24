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
        <div v-if="this.prepend" class="input-group-prepend">
          <span class="input-group-text">{{ this.prepend }}</span>
        </div>
        <InputText
          :class="'text-center form-control ' + (this.error ? 'is-invalid' : '')"
          inputClass="text-center"
          :id="this.id"
          :modelValue="idParsed"
          @input="this.onInput"
          :disabled="this.disabled"
          @focus="this.$emit('focus')"
          @blur="this.$emit('blur')"
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
  name: "CrosierInputId",

  components: {
    InputText,
  },

  emits: ["update:modelValue", "input", "focus", "blur"],

  props: {
    modelValue: {
      type: Number,
    },
    id: {
      type: String,
      default: "id",
    },
    error: {
      type: String,
      default: null,
    },
    col: {
      type: String,
      default: "2",
    },
    label: {
      type: String,
      default: "Id",
    },
    disabled: {
      type: Boolean,
      default: true,
    },
    helpText: {
      type: String,
    },
    min: {
      type: Number,
    },
    max: {
      type: Number,
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
    labelTransparente: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onInput($event) {
      this.$emit("update:modelValue", $event.value);
      this.$emit("input", $event);
    },
  },

  computed: {
    idParsed() {
      return String(`000000000${this.modelValue ?? 0}`).slice(-9);
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
