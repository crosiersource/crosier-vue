<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label v-if="this.showLabel" :for="this.id">{{ label }}</label>

      <input
        :class="
          'form-control p-inputtext p-component ' +
          (this.error ? 'is-invalid' : '') +
          this.inputClass
        "
        :value="modelValue"
        :id="this.id"
        @input="this.onInput($event)"
        @focus="this.onFocus($event)"
        @blur="this.onBlur($event)"
        @keypress="validate($event)"
      />

      <small v-if="this.helpText" :id="this.id + '_help'" class="form-text text-muted">{{
        this.helpText
      }}</small>
      <div class="invalid-feedbackk blink" v-show="this.error">
        {{ this.error }}
      </div>
      <div class="invalid-feedbackk blink" v-show="this.exibeValidacao && this.cpfCnpjInvalido">
        {{ this.modelValue?.length === 14 ? "CPF" : "CNPJ" }} inválido!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CrosierInputCpfCnpj",

  components: {},

  emits: ["update:modelValue", "input", "focus", "blur"],

  props: {
    modelValue: {
      type: String,
    },
    id: {
      type: String,
      required: false,
      default: "documento",
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
      default: "CPF/CNPJ",
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
    exibeValidacao: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      value: null,
    };
  },

  mounted() {
    if (this.exibeValidacao && this.modelValue && this.modelValue.length > 0) {
      if (this.modelValue.length === 11) {
        this.cpfCnpjInvalido = !this.validaCpf(this.modelValue);
      } else if (this.modelValue.length === 14) {
        this.cpfCnpjInvalido = !this.validaCnpj(this.modelValue);
      } else {
        this.cpfCnpjInvalido = true;
      }
      this.format();
    }
  },

  methods: {
    onFocus($event) {
      this.$nextTick(async () => {
        const val = $event.target.value.replace(/\D/g, "");
        this.$emit("update:modelValue", val);
        this.$emit("input", val);
      });
    },

    onInput($event) {
      this.$nextTick(async () => {
        this.$emit("update:modelValue", $event.target.value);
        this.$emit("input", $event.target.value);
      });
    },

    validate(theEvent) {
      // Handle paste
      let key = null;
      if (theEvent.type === "paste") {
        key = theEvent.clipboardData.getData("text/plain");
      } else {
        // Handle key press
        key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
      }
      const regex = /[0-9]/;
      if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
      }
    },

    onBlur() {
      this.$nextTick(async () => {
        this.format();
        this.$emit("blur");
      });
    },

    format() {
      if (this.modelValue.length === 11) {
        this.$emit(
          "update:modelValue",
          this.modelValue.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
        );
      } else if (this.modelValue.length === 14) {
        const formatado = this.modelValue.replace(
          /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "$1.$2.$3/$4-$5"
        );
        this.$emit("update:modelValue", formatado);
      }
      if (this.exibeValidacao) {
        if (this.modelValue.length === 11) {
          this.cpfCnpjInvalido = !this.validaCpf(this.modelValue);
        } else if (this.modelValue.length === 14) {
          this.cpfCnpjInvalido = !this.validaCnpj(this.modelValue);
        } else {
          this.cpfCnpjInvalido = true;
        }
      }
    },

    calcDigitosPosicoesCpf(digitos, posicoes = 10, somaDigitos = 0) {
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

    validaCpf(valor) {
      if (!valor) return true;
      valor = valor.toString();
      valor = valor.replace(/[^0-9]/g, "");
      const digitos = valor.substr(0, 9);
      let novoCpf = this.calcDigitosPosicoesCpf(digitos);
      novoCpf = this.calcDigitosPosicoesCpf(novoCpf, 11);
      return novoCpf === valor;
    },

    calcDigitosPosicoesCnpj(digitos, posicoes = 10, somaDigitos = 0) {
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
      const primeiroCalculo = this.calcDigitosPosicoesCnpj(primeirosNumerosCnpj, 5);
      const cnpj = this.calcDigitosPosicoesCnpj(primeiroCalculo, 6);
      return cnpj === cnpjOriginal;
    },
  },

  watch: {
    modelValue() {
      if (this.modelValue) {
        const mvf = this.modelValue.replace(/\D/g, "");

        if (mvf.length === 11 || mvf.length === 14) {
          this.format();
        } else {
          this.$emit("update:modelValue", mvf);
        }
      }
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
