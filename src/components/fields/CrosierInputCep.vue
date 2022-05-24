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
        <InputMask
          mask="99999-999"
          :class="'form-control ' + (this.error ? 'is-invalid' : '') + this.inputClass"
          :id="this.id"
          type="text"
          :modelValue="modelValue"
          @update:modelValue="this.onInput($event)"
          :disabled="this.disabled"
          @focus="this.$emit('focus')"
          @blur="this.$emit('blur')"
        />
        <div class="input-group-append" v-if="this.comConsulta">
          <button
            type="button"
            class="btn btn-outline-primary btn-sm btn-block"
            @click="this.consultarCep"
          >
            <i class="fas fa-search"></i>
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
import InputMask from "primevue/inputmask";
import { mapMutations } from "vuex";
import axios from "axios";

export default {
  name: "CrosierInputCep",

  components: {
    InputMask,
  },

  emits: ["update:modelValue", "input", "focus", "blur", "consultaCep"],

  props: {
    modelValue: {
      type: String,
    },
    id: {
      type: String,
      required: false,
      default: "cep",
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
      default: "CEP",
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
    labelTransparente: {
      type: Boolean,
      default: false,
    },
    comConsulta: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    ...mapMutations(["setLoading"]),

    onInput($event) {
      this.$nextTick(async () => {
        this.$emit("update:modelValue", $event);
        this.$emit("input", $event);
      });
    },

    async consultarCep() {
      this.setLoading(true);
      try {
        const rs = await axios.get(`/base/municipio/findEnderecoByCEP?cep=${this.modelValue}`);
        if (rs?.status === 200) {
          this.$emit("consultaCep", rs.data);
        }
      } catch (e) {
        console.error("Erro ao consultar o CEP");
        console.error(e);
      }
      this.setLoading(false);
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
