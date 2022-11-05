<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <div>
        <label class="transparente">.</label>
      </div>
      <div v-if="this.placeholder"></div>
      <div v-else>
        <a
          v-if="this.tipo === 'link'"
          role="button"
          :class="'btn btn-' + this.cor + ' btn-sm'"
          :title="this.title"
          :href="this.href"
          :target="this.target"
        >
          <i :class="this.icon" aria-hidden="true"></i> {{ this.label }}
        </a>

        <button
          v-else
          type="button"
          :class="'btn btn-' + this.cor + ' btn-sm'"
          @click="this.$emit('click')"
          role="button"
        >
          <i :class="this.icon" aria-hidden="true"></i> {{ this.label }}
        </button>
      </div>
      <small v-if="this.helpText" class="form-text text-muted">{{ this.helpText }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: "CrosierButton",

  emits: ["click"],

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    placeholder: {
      type: Boolean,
      default: false,
    },
    tipo: {
      type: String,
      default: "button",
    },
    icon: {
      type: String,
      default: "fas fa-link",
    },
    col: {
      type: String,
      default: "1",
    },
    cor: {
      type: String,
      default: "primary",
    },
    label: {
      type: String,
    },
    title: {
      type: String,
    },
    helpText: {
      type: String,
    },
    href: {
      type: String,
    },
    target: {
      type: String,
      default: "_self",
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
