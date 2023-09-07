<template>
  <div class="group-select-time">
    <label v-if="label" :for="inputId">
      {{ label ?? "" }}
      <span v-if="required">*</span>
    </label>
    <vue-select
      :id="inputId"
      v-model="getModel"
      :value="modelValue"
      :options="options"
      label="name"
      :reduce="(option: any) => option.id"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="[{ 'is-invalid': props.errors }]"
      @update:model-value="updateModel"
    >
      <template #no-options="">
        {{ $t("common.empty") }}
      </template>
      <template #open-indicator="{ attributes }">
        <span v-bind="attributes" class="me-2">
          <img
            src="~/assets/images/icon/arrow_down.svg"
            alt="arrow_down"
            width="12"
            height="12"
          />
        </span>
      </template>
    </vue-select>
    <div v-if="errors" class="invalid-feedback">
      {{ errors }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, computed, toRefs, ref } from "vue";
import { newArrayTimeByMinuteStep } from "~/composables/Helpers";

const props = defineProps({
  required: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  inputId: {
    type: String,
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
  label: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["onSetTime"]);
const options = reactive(newArrayTimeByMinuteStep(30, "name"));
const { modelValue, inputId } = toRefs(props);
const newValue = ref(null);
const getModel = computed(() => newValue.value || modelValue.value);
const updateModel = (value: string) => {
  newValue.value = value;
  emit("onSetTime", { inputId: inputId.value, getModel: getModel.value });
};
</script>
<style lang="scss">
.group-select-time {
  .vs__selected {
    margin-top: 0;
  }

  .vs__clear {
    display: flex;
  }
}

.disabled-btn-cancel {
  .vs__clear {
    display: none;
  }
}
</style>
