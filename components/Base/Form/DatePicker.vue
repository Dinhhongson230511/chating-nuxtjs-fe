<!-- eslint-disable vue/require-explicit-emits -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    :class="[{ 'mb-2': !customClass }, { 'mt-4': !label }]"
    class="datepicker"
  >
    <label v-if="label" :for="inputId" :class="{ 'd-none': customClass }">
      {{ label ?? "" }}
      <span v-if="required">*</span>
    </label>
    <vue-date-picker
      :id="inputId"
      v-model="defaultDate"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :format="formatDate"
      class="datePicker_custom"
      :enable-time-picker="false"
      :class="{ 'is-invalid': errors }"
      :input-class-name="customClass"
      auto-apply
      :min-date="minDate"
      :max-date="maxDate"
      :year-picker="yearPicker"
      :month-picker="monthPicker"
      :inline="isInline"
      :disabled-dates="disabledDates"
      :locale="locale"
      :highlight-week-days="[DAY_START_OF_WEEK, DAY_END_OF_WEEK]"
      :week-start="DAY_START_OF_WEEK"
      @update:model-value="
        (modelData: any) => $emit('update:modelValue', modelData)
      "
    >
      <template #year="{ year }">
        {{ year }} {{ $t("common.year_text") }}
      </template>
    </vue-date-picker>
    <div v-if="errors" class="invalid-feedback">
      {{ errors }}
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  DAY_END_OF_WEEK,
  DAY_START_OF_WEEK,
  SLUG_WEEK_DAY,
} from "~/constants/const";
const props = defineProps({
  required: {
    type: Boolean,
    default: true,
  },
  inputId: {
    type: String,
    default: "",
    required: true,
  },
  modelValue: {
    type: [Date, String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
    required: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
  errors: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  minDate: {
    type: [Date, String],
    default: null,
  },
  maxDate: {
    type: [Date, String],
    default: null,
  },
  customClass: {
    type: String,
    default: "",
  },
  formatDate: {
    type: String,
    default: "yyyy/MM/dd",
  },
  yearPicker: {
    type: Boolean,
    default: false,
  },
  monthPicker: {
    type: Boolean,
    default: false,
  },
  isInline: {
    type: Boolean,
    default: false,
  },
  disabledDays: {
    type: Array,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: [],
    required: false,
  },
  locale: {
    type: String,
    default: "ja",
  },
});

const defaultDate = computed(() => {
  return props.modelValue;
});

const disabledDateStrings = computed(() => {
  return props.disabledDays.map((day: any) => day?.slug);
});

const disabledDates = (date: any) => {
  const dayOfWeek = date.getDay();
  const dateSlug = [...SLUG_WEEK_DAY][dayOfWeek];
  return disabledDateStrings.value.includes(dateSlug);
};
</script>
