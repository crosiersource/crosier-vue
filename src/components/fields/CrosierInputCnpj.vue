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
        :id="this.id"
        :class="'form-control ' + (this.error ? 'is-invalid' : '') + this.inputClass"
        :modelValue="modelValue"
        @update:modelValue="this.onInput($event)"
        @blur="this.onBlur($event)"
        mask="99.999.999/9999-99"
        :unmask="true"
        @focus="this.$emit('focus')"
        :disabled="this.disabled"
      />

      <small v-if="this.helpText" :id="this.id + '_help'" class="form-text text-muted">{{
        this.helpText
      }}</small>
      <div class="invalid-feedbackk blink" v-show="this.error">
        {{ this.error }}
      </div>
      <div class="invalid-feedbackk blink" v-show="this.exibeValidacao && this.cnpjInvalido">
        CNPJ inválido!
      </div>
    </div>
  </div>
</template>

<script>
import InputMask from "primevue/inputmask";

export default {
  name: "CrosierInputCnpj",

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
      required: false,
      default: "cnpj",
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
      default: "CNPJ",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    exibeValidacao: {
      type: Boolean,
      default: true,
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

  data() {
    return {
      cnpjInvalido: false,
    };
  },

  mounted() {
    if (this.exibeValidacao && this.modelValue && this.modelValue.length > 0) {
      this.cnpjInvalido = this.validaCnpj(this.modelValue);
    }
  },

  methods: {
    onInput($event) {
      this.$nextTick(async () => {
        this.$emit("update:modelValue", $event);
        this.$emit("input", $event);
      });
    },

    onBlur() {
      this.$nextTick(async () => {
        if (this.exibeValidacao) {
          this.cnpjInvalido = !this.validaCnpj(this.modelValue);
        }
        this.$emit("blur");
      });
    },

    calcDigitosPosicoes(digitos, posicoes = 10, somaDigitos = 0) {
      digitos = digitos.toString();

      for (let i = 0; i < digitos.length; i++) {
        somaDigitos += digitos[i] * posicoes;
        posicoes--;
        if (posicoes < 2) {
          posicoes = 9;
        }
      }

      somaDigitos %= 11;
      if (somaDigitos < 2) {
        somaDigitos = 0;
      } else {
        somaDigitos = 11 - somaDigitos;
      }
      return digitos + somaDigitos;
    },

    validaCnpj(valor) {
      valor = valor.toString();
      valor = valor.replace(/[^0-9]/g, "");
      const cnpjOriginal = valor;
      const primeirosNumerosCnpj = valor.substr(0, 12);
      const primeiroCalculo = this.calcDigitosPosicoes(primeirosNumerosCnpj, 5);
      const cnpj = this.calcDigitosPosicoes(primeiroCalculo, 6);
      return cnpj === cnpjOriginal;
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
