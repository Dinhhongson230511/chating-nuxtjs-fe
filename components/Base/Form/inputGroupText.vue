<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/require-explicit-emits -->
<template>
  <div class="input_custom" :class="{ 'mb-3': !props.customClass }">
    <label v-if="props.label" :for="props.inputId" class="mb-2">
      {{ props.label }}
      <span v-if="required" class="text-required ms-1">*</span>
    </label>
    <div class="input-group">
      <input
        :id="props.inputId"
        :type="type ?? 'text'"
        :value="modelValue"
        class="form-control"
        aria-describedby="emailHelp"
        :placeholder="placeholder"
        :class="[{ 'is-invalid': props.errors }, props.customClass]"
        :disabled="disabled"
        :maxlength="props.maxlength"
        :min="props.min"
        :max="props.max"
        @input="$emit('update:modelValue', $event?.target?.value ?? '')"
      />
      <span class="input-group-text text-secondary">
        {{ $t("common.people") }}
      </span>
      <div v-if="props.errors" class="invalid-feedback">
        {{ props.errors }}
      </div>
    </div>
    <div
      v-if="props.textSuggest"
      class="text-suggest"
      :class="props.classTextSuggest"
    >
      {{ props.textSuggest }}
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
  type: {
    type: String,
    default: "", // Default input type is text
  },
  modelValue: {
    type: [String, Number],
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
  min: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    default: 999,
  },
  customClass: {
    type: String,
    default: "",
  },
  textSuggest: {
    type: String,
    default: "",
  },
  classTextSuggest: {
    type: String,
    default: "",
  },
});
</script>
