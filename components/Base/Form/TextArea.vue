<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/require-explicit-emits -->
<template>
  <div class="input_custom" :class="{ 'mb-3': !props.customClass }">
    <label v-if="props.label" :for="props.inputId" class="mb-2">
      {{ props.label }}
      <span v-if="required" class="text-required ms-1">*</span>
    </label>
    <textarea
      :id="props.inputId"
      :value="modelValue"
      class="form-control"
      aria-describedby="emailHelp"
      :placeholder="placeholder"
      :class="[{ 'is-invalid': props.errors }, props.customClass]"
      :disabled="disabled"
      :maxlength="props.maxlength"
      :min="props.min"
      :max="props.max"
      :rows="props.rows"
      @input="$emit('update:modelValue', $event?.target?.value ?? '')"
    ></textarea>
    <div v-if="props.errors" class="invalid-feedback">
      {{ props.errors }}
    </div>
  </div>
</template>
<script setup lang="ts">
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
    type: [String],
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
  maxlength: {
    type: Number,
    default: 255,
  },
  customClass: {
    type: String,
    default: "",
  },
  rows: {
    type: String,
    default: "3",
  },
});
</script>
