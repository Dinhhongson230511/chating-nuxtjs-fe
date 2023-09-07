<!-- eslint-disable vue/require-explicit-emits -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    :class="[{ 'mb-2': !customClass }, { 'mt-4': !props.label }]"
    class="datepicker"
  >
    <label
      v-if="props.label"
      :for="props.inputId"
      :class="{ 'd-none': customClass }"
    >
      {{ props.label ?? "" }}
      <span v-if="required">*</span>
    </label>
    <vue-date-picker
      :id="props.inputId"
      v-model="defaultDate"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :format="formatDate"
      class="datePicker_custom date_time"
      :class="{ 'is-invalid': props.errors }"
      :input-class-name="customClass"
      :auto-apply="autoApply"
      time-picker
      hours-increment="1"
      :locale="locale"
      @update:model-value="
        (modelData: any) => $emit('update:modelValue', modelData)
      "
    >
      <template #input-icon>
        <img class="input-time" src="~/assets/images/icon/time.svg" />
      </template>
    </vue-date-picker>
    <div v-if="props.errors" class="invalid-feedback">
      {{ props.errors }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
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
    required: true,
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
  customClass: {
    type: String,
    default: "",
  },
  formatDate: {
    type: String,
    default: "HH:mm",
  },
  autoApply: {
    type: Boolean,
    default: true,
  },
  locale: {
    type: String,
    default: "ja",
  },
});
const date = ref(props.modelValue);

const defaultDate = computed(() => {
  date.value = props.modelValue;
  return props.modelValue;
});
</script>
