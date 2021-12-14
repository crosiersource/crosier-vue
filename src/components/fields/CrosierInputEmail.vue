<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label v-if="this.showLabel" :for="this.id">{{ label }}</label>
      <div class="input-group">
        <div v-if="this.prepend" class="input-group-prepend">
          <span class="input-group-text">{{ this.prepend }}</span>
        </div>
        <InputText
          :class="'form-control email ' + (this.error ? 'is-invalid' : '') + this.inputClass"
          :id="this.id"
          type="text"
          :modelValue="modelValue"
          @input="this.onInput"
          :disabled="this.disabled"
          @focus="this.$emit('focus')"
          @blur="this.onBlur($event)"
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
      <div class="invalid-feedbackk blink" v-show="this.exibeValidacao && this.emailInvalido">
        E-mail inválido!
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
      default: "E-mail",
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
    showLabel: {
      type: Boolean,
      default: true,
    },
    exibeValidacao: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      emailInvalido: false,
    };
  },

  mounted() {
    if (this.exibeValidacao && this.modelValue) {
      this.emailInvalido = !this.validaEmail(this.modelValue);
    }
  },

  methods: {
    onInput($event) {
      this.$emit("update:modelValue", $event.target.value);
      this.$emit("input", $event);
    },

    onBlur() {
      this.$nextTick(async () => {
        if (this.exibeValidacao) {
          this.emailInvalido = !this.validaEmail(this.modelValue);
        }
        this.$emit("blur");
      });
    },

    validaEmail(email) {
      return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
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
