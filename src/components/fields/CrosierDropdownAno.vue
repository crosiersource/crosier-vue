<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label v-if="this.showLabel" :for="this.id + '_mes'">{{ label }}</label>
      <div class="input-group">
        <Dropdown
          :class="'form-control ' + (this.error ? 'is-invalid' : '')"
          :id="this.id"
          :appendTo="this.appendTo"
          :modelValue="modelValue"
          @change="this.onChange"
          :options="this.anos"
          optionLabel="label"
          optionValue="value"
          :placeholder="this.showClear ? 'Selecione' : null"
          :showClear="this.showClear"
          :disabled="this.disabled"
          :dataKey="this.dataKey"
          :filter="true"
          @focus="this.$emit('focus')"
          @blur="this.$emit('blur')"
        />
      </div>
    </div>

    <small v-if="this.helpText" :id="this.id + '_help'" class="form-text text-muted">{{
      this.helpText
    }}</small>
    <div class="invalid-feedbackk blink" v-show="this.error">
      {{ this.error }}
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import moment from "moment";

export default {
  name: "CrosierDropdownMes",

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
      required: true,
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
      default: "Período",
    },
    disabled: {
      type: Boolean,
      default: false,
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
    labelTransparente: {
      type: Boolean,
      default: false,
    },
    anoInicio: {
      type: Number,
    },
    anoFim: {
      type: Number,
    },
    somenteFuturo: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      anos: [],
    };
  },

  mounted() {
    const ini = this.anoInicio ?? Number(moment().format("YYYY")) - (this.somenteFuturo ? 0 : 10);
    let fim = this.anoInicio ?? Number(moment().format("YYYY")) + 10;
    if (fim < ini) {
      fim = ini;
    }
    for (let i = ini; i <= fim; i++) {
      this.anos.push({ label: i, value: i });
    }
  },

  methods: {
    moment(date) {
      return moment(date);
    },

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
