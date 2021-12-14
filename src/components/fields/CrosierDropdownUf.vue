<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label v-if="this.showLabel" :for="this.id">{{ label }}</label>
      <Dropdown
        :class="'form-control ' + (this.error ? 'is-invalid' : '')"
        :id="this.id"
        :appendTo="this.appendTo"
        :modelValue="modelValue"
        @change="this.onChange"
        :options="this.ufs"
        optionLabel="nome"
        optionValue="sigla"
        :placeholder="this.showClear ? 'Selecione' : null"
        :showClear="this.showClear"
        :disabled="this.disabled"
        :dataKey="this.dataKey"
        :filter="true"
        @focus="this.$emit('focus')"
        @blur="this.$emit('blur')"
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
import Dropdown from "primevue/dropdown";
import ufs from "../../ufs";
// import ufs from "crosier-vue/src/ufs";

export default {
  name: "CrosierDropdownUf",

  components: {
    Dropdown,
  },

  emits: ["update:modelValue", "change", "focus", "blur"],

  props: {
    modelValue: {
      type: [String, Object],
      default: null,
    },
    id: {
      type: String,
      required: false,
      default: "uf",
    },
    col: {
      type: String,
      default: "12",
    },
    error: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      required: false,
      default: "UF",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    showClear: {
      type: Boolean,
      default: true,
    },
    helpText: {
      type: String,
    },
    appendTo: {
      type: String,
      default: "body",
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      ufs,
    };
  },

  methods: {
    onChange($event) {
      this.$emit("change", $event);
      this.$emit("update:modelValue", $event.value);
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
