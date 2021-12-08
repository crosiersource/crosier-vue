<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label v-if="this.showLabel" :for="this.id">{{ label }}</label>

      <AutoComplete
        class="form-control"
        inputClass="form-control"
        :id="this.id"
        :modelValue="modelValue"
        @update:modelValue="this.$emit('update:modelValue', $event)"
        :suggestions="this.values"
        @complete="this.$emit('complete', $event)"
        @item-select="this.$emit('item-select', $event)"
        @clear="this.$emit('clear')"
        :field="this.field"
        :disabled="this.disabled"
        :append-to="this.appendTo"
        :force-selection="this.forceSelection"
        @focus="this.$emit('focus')"
        @blur="this.$emit('blur')"
      >
        <template #item="item">
          <slot name="item" :item="item.item"></slot>
        </template>
      </AutoComplete>
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
import AutoComplete from "primevue/autocomplete";

export default {
  name: "CrosierAutoComplete",

  components: {
    AutoComplete,
  },

  emits: ["update:modelValue", "complete", "item-select", "clear", "focus", "blur"],

  props: {
    modelValue: {
      default: null,
      type: [String, Object],
    },
    values: {
      default: null,
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
    field: {
      type: String,
      required: true,
    },
    forceSelection: {
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
