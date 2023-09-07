<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/require-explicit-emits -->
<template>
  <div class="mb-2">
    <label v-if="props.label" :class="{ 'mb-2': props.label }">
      {{ props.label }}
      <span v-if="required">*</span>
    </label>
    <select
      :value="modelValue"
      class="form-select"
      aria-label="Default select example"
      :class="{
        'is-invalid': props.errors,
        'black-text': modelValue !== '',
      }"
      :disabled="props.disabled"
      @input="$emit('update:modelValue', $event?.target?.value ?? '')"
    >
      <option v-if="props.placeholder" value="" hidden disabled selected>
        {{ props.placeholder }}
      </option>
      <option
        v-for="(item, index) in props.dataOption"
        :key="index"
        :value="item?.value"
      >
        {{ props.lang ? $t(item?.name) : item?.name }}{{ props.unit }}
      </option>
    </select>
    <div v-if="props.textSuggest" class="text-suggest">
      {{ props.textSuggest }}
    </div>
    <div v-if="props.errors" class="invalid-feedback">
      {{ props.errors }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ISelectValue } from "~/stores/SearchStore";

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
    type: Array<ISelectValue>,
    default: () => [],
    required: true,
  },
  errors: {
    type: String,
    default: "",
  },
  unit: {
    type: String,
    default: "",
  },
  textSuggest: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  lang: {
    type: Boolean,
    default: false,
  },
});
</script>
