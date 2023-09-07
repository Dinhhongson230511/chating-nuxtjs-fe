<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/require-explicit-emits -->
<template>
  <div class="mb-3 input_custom">
    <label v-if="props.label" :for="props.inputId" class="mb-2"
      >{{ props.label
      }}<span v-if="required" class="text-required ms-1">*</span></label
    >
    <input
      :id="props.inputId"
      v-model="inputNumber"
      type="text"
      class="form-control"
      aria-describedby="emailHelp"
      :placeholder="placeholder"
      :class="{ 'is-invalid': props.errors }"
      :disabled="disabled"
      :maxlength="props.maxlength"
      @input="formatNumber"
    />
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
  oldValue: {
    type: String,
    default: "",
  },
  inputName: {
    type: String,
    default: "",
  },
});
const inputNumber = ref(props.oldValue);

const emit = defineEmits<{
  (e: "modelValue", value: any): void;
}>();

const formatNumber = () => {
  const numericValue = inputNumber.value.replace(/[^0-9]/g, "");
  let formattedValue = "";
  for (let i = 0; i < numericValue.length; i++) {
    if (i === 3 || i === 7) {
      formattedValue += "-";
    }
    formattedValue += numericValue[i];
  }
  emit("modelValue", {
    name: props.inputName,
    data: formattedValue,
  });
  inputNumber.value = formattedValue;
};

formatNumber();
</script>
