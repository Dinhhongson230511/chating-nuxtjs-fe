<template>
  <div class="auth__container">
    <form class="auth__container--form" @submit="submitForm">
      <img src="~/assets/images/logo.png" alt="logo" />
      <div class="title">{{ $t("auth.forgot_password.title") }}</div>
      <div class="form-content">
        <div class="form-body">
          <div class="row-item">
            <label for="email">メールアドレス</label>
            <div class="input-content">
              <img src="~/assets/images/icon/email.svg" alt="email" />
              <input
                id="email"
                v-model="email"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors?.email }"
                :placeholder="$t('common.email')"
              />
              <div v-if="errors?.email" class="invalid-feedback">
                {{ errors?.email }}
              </div>
            </div>
          </div>
        </div>
        <div class="form-footer">
          <span class="text-reset-pass">
            パスワードを再設定します。<br />ご登録されている内容を入力してください。
          </span>
          <BaseFormButton title="再設定" :loading="btnLoading" />
          <a href="/login" class="link-back">戻る</a>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { SEND_RESET_PASSWORD_MAIL, createEndpoint } from "~/constants/api";
import { STATUS_CODES } from "~/constants/statusCode";
const { $toast } = useNuxtApp();

const email = ref("");
const errors: any = ref({});
const btnLoading = ref(false);

const submitForm = (event: Event) => {
  event.preventDefault();
  btnLoading.value = true;
  errors.value = {}; // clear error msg
  $fetch(createEndpoint(SEND_RESET_PASSWORD_MAIL), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
    }),
  })
    .then((response: any) => {
      btnLoading.value = false;
      // TODO: show toast
      $toast.success(response.message);
    })
    .catch((e: any) => {
      btnLoading.value = false;
      const status = e.response.status;
      if (status === STATUS_CODES.VALIDATION) {
        errors.value.email = e.response._data.errors.email?.[0];
      } else if (status === STATUS_CODES.BAD_REQUEST) {
        // TODO: show toast
        $toast.error(e.response._data.message);
      } else {
        // TODO: show toast
        $toast.error(e.response._data.message);
      }
    });
};
</script>
<style lang="scss">
@use "@/assets/scss/pages/auth/style.scss";
</style>
