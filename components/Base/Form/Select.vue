<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/require-explicit-emits -->
<template>
  <div :class="{ 'mb-2': !customClass }">
    <label v-if="props.label" :class="{ 'mb-2': props.label }">
      {{ props.label }}
      <span v-if="required">*</span>
    </label>
    <select
      :value="modelValue"
      class="form-select"
      aria-label="Default select example"
      :class="{ 'is-invalid': props.errors } + ' ' + customClass"
      :disabled="props.disabled"
      @input="$emit('update:modelValue', $event?.target?.value ?? '')"
    >
      <option v-if="props.placeholder" value="" selected>
        {{ props.placeholder }}
      </option>
      <option
        v-for="(item, index) in props.dataOption"
        :key="index"
        :value="index"
      >
        {{ item }}{{ props.unit }}
      </option>
    </select>
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
  label: {
    type: String,
    default: "",
    required: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  dataOption: {
    type: Array,
    default: () => [],
    required: true,
  },
  errors: {
    type: String,
    default: "",
  },
  customClass: {
    type: String,
    default: "",
  },
  unit: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
