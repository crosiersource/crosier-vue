<template>
  <div :class="'col-md-' + this.col">
    <div class="form-group">
      <label :for="this.id">{{ this.label }}</label>
      <Calendar
        :id="this.id"
        :inputClass="this.inputClass"
        :class="'form-control ' + (this.error ? 'is-invalid' : '')"
        :modelValue="modelValue"
        ref="refCalendar"
        @input="this.onInput"
        @date-select="$emit('update:modelValue', $event)"
        dateFormat="dd/mm/yy"
        :showTime="['crsr-datetime', 'crsr-datetime-nseg'].includes(this.inputClass)"
        :showSeconds="['crsr-datetime'].includes(this.inputClass)"
        :showButtonBar="true"
        :showIcon="true"
        :showOnFocus="false"
        :disabled="this.disabled"
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
import Calendar from "primevue/calendar";

export default {
  components: {
    Calendar,
  },

  emits: ["update:modelValue"],

  props: {
    modelValue: {
      type: Date,
    },
    id: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      required: false,
      default: null,
    },
    inputClass: {
      type: String,
      required: false,
      default: "crsr-date",
    },
    col: {
      type: String,
      required: false,
      default: "12",
    },
    label: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    helpText: {
      type: String,
      required: false,
    },
  },

  methods: {
    onInput($event) {
      const dtStr = $event.target.value;
      let dateParser = null;
      let date = null;
      let match = null;
      if (dtStr.length === 10 && this.inputClass === "crsr-date") {
        dateParser = /(\d{2})\/(\d{2})\/(\d{4})/;
        match = dtStr.match(dateParser);
        date = new Date(
          match[3], // year
          match[2] - 1, // monthIndex
          match[1] // day
          // match[4],  // hours
          // match[5],  // minutes
          // match[6]  //seconds
        );
      } else if (dtStr.length === 16 && this.inputClass === "crsr-datetime-nseg") {
        dateParser = /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/;
        match = dtStr.match(dateParser);
        date = new Date(
          match[3], // year
          match[2] - 1, // monthIndex
          match[1], // day
          match[4], // hours
          match[5] // minutes
          // match[6]  //seconds
        );
      } else if (dtStr.length === 19 && this.inputClass === "crsr-datetime") {
        dateParser = /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/;
        match = dtStr.match(dateParser);
        date = new Date(
          match[3], // year
          match[2] - 1, // monthIndex
          match[1], // day
          match[4], // hours
          match[5], // minutes
          match[6] // seconds
        );
      }
      if (date) {
        this.$emit("update:modelValue", date);
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
