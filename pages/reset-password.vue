<template>
  <div class="auth__container">
    <BaseLoading v-if="loading" />
    <form v-else class="auth__container--form" @submit="submitForm">
      <img src="~/assets/images/logo.png" alt="logo" />
      <div class="title">パスワード変更</div>
      <div class="form-content">
        <div class="form-body">
          <BaseFormInputPassword
            v-model="formData.new_password"
            input-id="password"
            label="新規のパスワード"
            :errors="errors.new_password"
            suggest-text="パスワードは 数字・英大文字・英小文字・記号 のうち3種類を使用し8桁以上で設定して下さい。"
            :maxlength="20"
          />
          <BaseFormInputPassword
            v-model="formData.password_confirmed"
            input-id="passwordConfirmation"
            label="新規のパスワード（確認）"
            :errors="errors.password_confirmed"
            :maxlength="20"
          />
        </div>
        <div class="form-footer">
          <BaseFormButton title="変更" :loading="btnLoading" />
          <a href="/login" class="link-back">戻る</a>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { STATUS_CODES } from "~/constants/statusCode";
import { useAuthStore } from "~/stores/auth";
const { $toast } = useNuxtApp();
const { token } = useRoute().query;
const errors: any = ref({});
const authStore = useAuthStore();
const loading: Ref<boolean> = ref(true);
const btnLoading = ref(false);

const formData = ref({
  new_password: "",
  password_confirmed: "",
});

authStore
  .checkTokenResetPass(token)
  .then((response: any) => {
    if (response?.status === STATUS_CODES.OK) {
      loading.value = false;
    }
  })
  .catch((error: any) => {
    $toast.error(error.response?.data.message);
    navigateTo("/");
  });

const submitForm = (event: Event) => {
  event.preventDefault();
  btnLoading.value = true;
  errors.value = {}; // clear error msg
  authStore
    .resetPassword({
      token,
      new_password: formData.value.new_password,
      password_confirmed: formData.value.password_confirmed,
    })
    .then((response: any) => {
      btnLoading.value = false;
      // TODO: show toast
      $toast.success(response.data.message);
      navigateTo("/login");
    })
    .catch((error) => {
      btnLoading.value = false;
      if (error.response.status === STATUS_CODES.VALIDATION) {
        Object.entries(error.response.data.errors).map((item: any) => {
          return (errors.value[item?.[0]] = item?.[1]?.[0]);
        });
      } else {
        // TODO: show toast
        $toast.error(error.response.data.message);
      }
    });
};
</script>
<style lang="scss">
@use "@/assets/scss/pages/auth/style.scss";
</style>
