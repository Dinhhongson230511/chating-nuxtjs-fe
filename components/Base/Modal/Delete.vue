<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-if="props.showModal" class="modal_custom modal" aria-hidden="true">
    <div class="modal_dialog modal_dialog--delete">
      <div class="modal_content modal_content-delete">
        <div class="modal_content--header modal_content--header-delete">
          <div class="modal_title"></div>
        </div>
        <div class="modal_scroll">
          <div class="modal_content--body text-center fw-bold">
            {{ props.content }}
          </div>
        </div>
        <div class="modal_content--footer modal_content--footer-delete">
          <button class="btn btn-common" @click="props.toggleModal()">
            {{ $t("common.modal.delete.cancel") }}
          </button>
          <BaseFormButton
            :title="$t('common.modal.delete.submit')"
            :loading="btnLoading"
            class="btn-modal-submit"
            @click="props.submitDelete()"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  content: {
    type: String,
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
    required: true,
  },
  showModal: {
    type: Boolean,
    default: false,
  },
  toggleModal: {
    type: Function,
    required: true,
  },
  submitDelete: {
    type: Function,
    required: true,
  },
});
</script>
