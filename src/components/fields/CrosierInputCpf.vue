<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label :for="this.id">{{ label }}</label>

      <InputMask
        :class="'form-control ' + (this.error ? 'is-invalid' : '') + this.inputClass"
        :modelValue="modelValue"
        @update:modelValue="this.onInput($event)"
        @blur="this.onBlur($event)"
        mask="999.999.999-99"
        :unmask="true"
      />

      <small v-if="this.helpText" :id="this.id + '_help'" class="form-text text-muted">{{
        this.helpText
      }}</small>
      <div class="invalid-feedbackk blink" v-show="this.error">
        {{ this.error }}
      </div>
      <div class="invalid-feedbackk blink" v-show="this.exibeValidacao && !this.cpfCnpjInvalido">
        CPF inválido!
      </div>
    </div>
  </div>
</template>

<script>
import InputMask from "primevue/inputmask";

export default {
  name: "CrosierInputCpf",

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
  },

  data() {
    return {
      cpfCnpjInvalido: false,
    };
  },

  mounted() {
    if (this.exibeValidacao) {
      this.cpfCnpjInvalido = this.validaCpf(this.modelValue);
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
          this.cpfCnpjInvalido = this.validaCpf(this.modelValue);
        }
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

    validaCpf(valor) {
      if (!valor) return true;
      valor = valor.toString();
      valor = valor.replace(/[^0-9]/g, "");
      const digitos = valor.substr(0, 9);
      let novoCpf = this.calcDigitosPosicoes(digitos);
      novoCpf = this.calcDigitosPosicoes(novoCpf, 11);
      return novoCpf === valor;
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