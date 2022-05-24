<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label
        v-if="this.showLabel"
        :class="this.labelTransparente ? 'transparente' : ''"
        :for="this.id"
        >{{ this.labelTransparente ? "..." : label }}</label
      >
      <div>
        <InputSwitch
          :class="'form-control ' + (this.error ? 'is-invalid' : '')"
          :id="this.id"
          :modelValue="modelValue"
          @change="this.onChange"
          @click="this.onChange"
          :placeholder="this.showClear ? 'Selecione' : null"
          :showClear="this.showClear"
          :disabled="this.disabled"
          :dataKey="this.dataKey"
          :filter="true"
          :trueValue="this.trueValue"
          :falseValue="this.falseValue"
        />
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
import InputSwitch from "primevue/inputswitch";

export default {
  name: "CrosierSwitch",

  components: {
    InputSwitch,
  },

  emits: ["update:modelValue", "change"],

  props: {
    modelValue: {
      type: [String, Object, Boolean],
      default: null,
    },
    id: {
      type: String,
      required: true,
    },
    col: {
      type: String,
      default: "1",
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
    showLabel: {
      type: Boolean,
      default: true,
    },
    labelTransparente: {
      type: Boolean,
      default: false,
    },
    trueValue: {
      default: true,
      required: false,
    },
    falseValue: {
      default: false,
      required: false,
    },
  },

  methods: {
    onChange() {
      this.$emit("update:modelValue", this.modelValue !== true);
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
