<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <button
    class="btn btn-submit"
    :type="formType"
    :disabled="props.loading"
    :class="customClass"
  >
    <img
      v-if="props.iconImage"
      :alt="iconAlt"
      :width="iconWidth"
      :height="iconHeight"
      :src="getImageIcon(props.iconImage) as String"
      :class="iconClass"
      class="mr-2"
    />
    <span v-if="props.loading" class="spinner-border spinner-border-sm"></span>
    {{ props.title }}
  </button>
</template>
<script setup lang="ts">
const props = defineProps({
  customClass: {
    type: Object,
    default: () => {},
  },
  loading: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  iconImage: {
    type: String,
    default: "",
  },
  iconWidth: {
    type: Number,
    default: 16,
    required: false,
  },
  iconHeight: {
    type: Number,
    default: 16,
    required: false,
  },
  iconAlt: {
    type: String,
    default: "icon",
  },
  iconClass: {
    type: Object,
    default: () => {},
  },
  formType: {
    type: String,
    default: "submit",
  },
});
</script>
