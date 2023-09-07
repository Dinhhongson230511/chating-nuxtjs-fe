<template>
  <div>
    <BaseModal
      :title="$t('auth.change_password.title')"
      :show="props.showModal"
      :close-function="handleCloseModal"
      :submit-function="submitForm"
      :btn-loading="btnLoading"
      :btn-submit="$t('auth.change_password.btn')"
    >
      <div class="change_password">
        <BaseFormInputPassword
          v-model="formData.old_password"
          input-id="oldPassword"
          :label="$t('auth.password_reset.old_password.label')"
          :errors="errors.old_password"
          :maxlength="20"
        />
        <BaseFormInputPassword
          v-model="formData.new_password"
          input-id="newPassword"
          :label="$t('auth.password_reset.new_password.label')"
          :errors="errors.new_password"
          :suggest-text="$t('auth.password_reset.new_password.suggest_text')"
          :maxlength="20"
        />
        <BaseFormInputPassword
          v-model="formData.password_confirmed"
          input-id="passwordConfirmation"
          :label="$t('auth.password_reset.password_confirmed.label')"
          :errors="errors.password_confirmed"
          :maxlength="20"
        />
      </div>
    </BaseModal>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { STATUS_CODES } from "~/constants/statusCode";
import { useAuthStore } from "~/stores/auth";
const { $toast } = useNuxtApp();
const errors: any = ref({});
const authStore = useAuthStore();
const btnLoading = ref(false);

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
  toggleModal: {
    type: Function,
    required: true,
  },
});

const formData = ref({
  old_password: "",
  new_password: "",
  password_confirmed: "",
});

const handleClearDataForm = () => {
  return (formData.value = {
    old_password: "",
    new_password: "",
    password_confirmed: "",
  });
};

const handleCloseModal = () => {
  errors.value = {}; // clear error msg
  handleClearDataForm();
  props.toggleModal();
};

const submitForm = () => {
  btnLoading.value = true;
  errors.value = {}; // clear error msg
  authStore
    .changePassword(formData.value)
    .then((response: any) => {
      btnLoading.value = false;
      // TODO: show toast
      handleCloseModal();
      handleClearDataForm();
      $toast.success(response.data.message);
    })
    .catch((error) => {
      btnLoading.value = false;
      if (error.response.status === STATUS_CODES.VALIDATION) {
        Object.entries(error.response.data.errors).map((item: any) => {
          return (errors.value[item?.[0]] = item?.[1]?.[0]);
        });
      } else $toast.error(error.response.data.message);
    });
};
</script>
<style lang="scss">
@import "@/assets/scss/pages/auth/style.scss";
</style>
