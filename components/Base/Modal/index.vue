<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-if="props.show" class="modal_custom modal" aria-hidden="true">
    <div class="modal_dialog">
      <div class="modal_content">
        <div class="modal_content--header">
          <div class="modal_title">{{ props.title }}</div>
          <div class="icon_close">
            <img
              src="~/assets/images/icon/close.svg"
              alt="logo"
              width="32px"
              height="32px"
              @click="props.closeFunction()"
            />
          </div>
        </div>
        <div class="modal_scroll">
          <div class="modal_content--body">
            <slot />
          </div>
        </div>
        <div
          v-if="props.btnSave"
          class="modal_content--footer"
          :class="[
            { 'justify-content-between': props.btnCancel },
            { 'justify-content-end': props.btnRedirect },
          ]"
        >
          <button
            v-if="props.btnCancel"
            class="btn btn-common"
            @click="props.closeFunction()"
          >
            {{ props.btnCancel ? props.btnCancel : $t("common.modal.cancel") }}
          </button>
          <BaseFormButton
            v-if="props.btnSave && props.btnSubmit"
            :title="
              props.btnSubmit
                ? props.btnSubmit
                : $t('common.modal.submit.create')
            "
            :loading="btnLoading"
            class="btn-modal-submit"
            @click="props.submitFunction()"
          />
          <NuxtLink
            v-if="props.btnRedirect"
            :to="props.linkRedirect"
            class="link-redirect"
            target="_blank"
          >
            {{ props.btnRedirect }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  show: {
    type: Boolean,
    default: false,
  },
  closeFunction: {
    type: Function,
    required: true,
  },
  submitFunction: {
    type: Function,
    required: true,
  },
  btnCancel: {
    type: String,
    default: "",
    required: false,
  },
  btnSubmit: {
    type: String,
    default: "",
    required: false,
  },
  btnRedirect: {
    type: String,
    default: "",
    required: false,
  },
  btnLoading: {
    type: Boolean,
    default: false,
    required: false,
  },
  btnSave: {
    type: Boolean,
    default: true,
    required: false,
  },
  linkRedirect: {
    type: String,
    default: "",
    required: false,
  },
});
</script>
