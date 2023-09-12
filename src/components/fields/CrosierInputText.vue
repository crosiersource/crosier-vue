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
          :class="'form-control ' + (this.error ? 'is-invalid ' : ' ') + this.inputClass"
          :id="this.id"
          type="text"
          :modelValue="modelValue"
          @input="this.onInput"
          :disabled="this.disabled"
          @focus="this.$emit('focus')"
          @blur="this.$emit('blur')"
        />
        <div v-if="this.append" class="input-group-append">
          <span class="input-group-text">{{ this.append }}</span>
        </div>
        <div v-if="this.appendButtonLinkHref" class="input-group-append">
          <a
            role="button"
            class="btn btn-sm btn-block btn-outline-secondary"
            :target="this.appendButtonLinkTarget || '_blank'"
            :title="this.appendButtonTitle || 'Abrir registro'"
            :href="this.appendButtonLinkHref"
          >
            <i :class="this.appendButtonIcon"></i>
          </a>
        </div>
        <div v-if="this.appendButton" class="input-group-append">
          <button
            type="button"
            class="btn btn-sm btn-block btn-outline-secondary"
            :title="this.appendButtonTitle"
            @click="this.$emit('appendButtonClicked')"
          >
            <i :class="this.appendButtonIcon"></i>
          </button>
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

  emits: ["update:modelValue", "input", "focus", "blur", "appendButtonClicked"],

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
    prepend: {
      type: String,
    },
    append: {
      type: String,
    },
    appendButton: {
      type: Boolean,
      default: false,
    },
    appendButtonLinkHref: {
      type: String,
    },
    appendButtonTitle: {
      type: String,
    },
    appendButtonLinkTarget: {
      type: String,
    },
    appendButtonIcon: {
      type: String,
      default: "fas fa-search",
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
