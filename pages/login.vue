<template>
  <div class="auth__container">
    <form class="auth__container--form" @submit="submitForm">
      <img src="~/assets/images/logo.png" alt="logo" />
      <div class="title">{{ $t("auth.login") }}</div>
      <div class="form-content">
        <div class="form-body">
          <div class="row-item">
            <label for="email">{{ $t("common.mail_address") }}</label>
            <div class="input-content">
              <img src="~/assets/images/icon/email.svg" alt="email" />
              <input
                id="email"
                v-model="email"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.email }"
                :placeholder="$t('common.email')"
              />
              <div v-if="errors.email" class="invalid-feedback">
                {{ errors.email }}
              </div>
            </div>
          </div>
          <BaseFormInputPassword
            v-model="password"
            input-id="passwordConfirmation"
            :label="$t('auth.password')"
            :errors="errors.password"
          />
          <div class="row-item">
            <div class="input-checkbox">
              <input
                id="remember"
                v-model="rememberToken"
                type="checkbox"
                aria-label="Checkbox input"
              />
              <label for="remember" role="button">{{
                $t("auth.save_login_state")
              }}</label>
            </div>
          </div>
        </div>
        <div class="form-footer">
          <BaseFormButton title="ログイン" :loading="btnLoading" />
          <a href="/forgot-password" class="link-forgot-password">
            {{ $t("auth.forgot_password.text_link") }}
          </a>
          <div class="separator">
            <span class="separator-text">または</span>
          </div>
          <div class="btn-register">
            <nuxt-link
              to="/agency/register"
              class="btn btn-agency-member btn-common"
            >
              {{ $t("auth.travel_agency_register") }}
            </nuxt-link>
            <nuxt-link
              to="/company/register"
              class="btn btn-facility-member btn-common"
            >
              {{ $t("auth.company_register") }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { STATUS_CODES } from "~/constants/statusCode";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const rememberToken = ref(false);
const errors: any = ref({});
const btnLoading = ref(false);

const submitForm = (event: Event) => {
  errors.value = {}; // clear error msg
  event.preventDefault();
  authStore
    .login({
      email: email.value,
      password: password.value,
      rememberToken: rememberToken.value,
    })
    .catch((error: any) => {
      btnLoading.value = false;
      if (error.response.status === STATUS_CODES.VALIDATION) {
        errors.value.email = error.response.data.errors.email?.[0];
        errors.value.password = error.response.data.errors.password?.[0];
      } else if (error.response.status === STATUS_CODES.UN_AUTHORIZED) {
        errors.value.email = error.response.data.message;
      }
    });
};
</script>

<style lang="scss">
@import "@/assets/scss/pages/auth/style.scss";
</style>
