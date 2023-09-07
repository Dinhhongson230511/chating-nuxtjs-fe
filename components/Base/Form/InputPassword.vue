<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/require-explicit-emits -->
<template>
  <div class="mb-2">
    <label v-if="props.label" :for="props.inputId">
      {{ props.label }}
      <span v-if="required">*</span>
    </label>
    <div class="input_password">
      <img src="~/assets/images/icon/block.svg" alt="block" />
      <input
        :id="props.inputId"
        :type="!showPassword ? 'password' : 'text'"
        :value="modelValue"
        class="form-control"
        aria-describedby="emailHelp"
        :placeholder="placeholder"
        :class="{ 'is-invalid': props.errors }"
        :maxlength="props.maxlength"
        @input="$emit('update:modelValue', $event?.target?.value ?? '')"
      />
      <img
        class="eyes_password"
        :class="{ eyes_password_error: props.errors }"
        :src="
          !showPassword
            ? getImageIcon('close_eyes.svg')
            : getImageIcon('show_eye.svg')
        "
        alt="close eyes"
        @click="togglePassword"
      />
      <div v-if="props.errors" class="invalid-feedback">
        {{ props.errors }}
      </div>
    </div>
    <span v-if="suggestText" class="suggest-password">
      {{ suggestText }}
    </span>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  inputId: {
    type: String,
    default: "",
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  suggestText: {
    type: String,
    default: "",
  },
  errors: {
    type: String,
    default: "",
  },
  maxlength: {
    type: Number,
    default: 999,
  },
});

const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>
