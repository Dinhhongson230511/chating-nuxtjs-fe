<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/require-explicit-emits -->
<template>
  <div
    class="input_custom"
    :class="{ 'mb-3': !props.customClass, 'input-group': !!props.groupText }"
  >
    <label v-if="props.label" :for="props.inputId" class="mb-2"
      >{{ props.label
      }}<span v-if="required" class="text-required ms-1">*</span></label
    >
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
      @blur="blurInput"
    />
    <span v-if="props.groupText" class="input-group-text text-secondary">
      {{ props.groupText }}
    </span>
    <div v-if="props.textSuggest" class="text-suggest">
      {{ props.textSuggest }}
    </div>
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
  type: {
    type: String,
    default: "", // Default input type is text
  },
  modelValue: {
    type: [String],
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
  groupText: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["blurInput"]);
const inputId = ref(props.inputId);

const blurInput = (event: Event) => {
  const { target } = event;
  const { value } = target as HTMLInputElement;
  emit("blurInput", { value, inputId: inputId.value });
};
</script>
