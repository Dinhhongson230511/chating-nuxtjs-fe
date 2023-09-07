<template>
  <div class="content pt-3">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#" class="text-decoration-none d-flex align-items-center">
            <img src="~/assets/images/icon/home.svg" alt="" class="me-2" />
            {{ $t("common.breadcrumb.home") }}
          </a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">マイページ</li>
      </ol>
    </nav>

    <div class="content__header account_content">
      <div class="account_header">
        <div class="title">{{ $t("accounts.header.title") }}</div>
        <div class="edit_account_auth">
          <div>
            <button class="btn btn-primary" @click="toggleModalChangePassword">
              <img
                src="~/assets/images/icon/clock_white.svg"
                alt="edit"
                width="16"
                height="16"
              />
              {{ $t("accounts.header.btn.change_password") }}
            </button>
            <AccountsChangePassword
              :id="authUserId"
              :show-modal="showModalChangePassword"
              :toggle-modal="toggleModalChangePassword"
            />
          </div>
          <div>
            <button class="btn btn-primary" @click="toggleModalUpdate">
              <img
                src="~/assets/images/icon/edit_white.svg"
                alt="edit"
                width="16"
                height="16"
              />
              {{ $t("accounts.header.btn.update") }}
            </button>
            <AccountsUpdate
              :id="authUserId"
              :show-modal="showModalUpdate"
              :toggle-modal="toggleModalUpdate"
              :handle-get-list="handleGetListAccount"
            />
          </div>
        </div>
      </div>
      <div class="w-100 mt-2 account-info">
        <div class="row d-flex justify-content-center">
          <div class="row">
            <div class="col">
              <BaseFormInput
                :model-value="dataAccountAuth?.last_name ?? ''"
                input-id="name"
                type="text"
                :label="$t('accounts.account_info.last_name')"
                :disabled="true"
                :required="false"
              />
            </div>
            <div class="col">
              <BaseFormInput
                :model-value="dataAccountAuth?.first_name ?? ''"
                input-id="name"
                type="text"
                :label="$t('accounts.account_info.first_name')"
                :disabled="true"
                :required="false"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <BaseFormInput
                :model-value="dataAccountAuth?.furigana_last_name ?? ''"
                input-id="name"
                type="text"
                :label="$t('accounts.account_info.furigana_last_name')"
                :disabled="true"
                :required="false"
              />
            </div>
            <div class="col">
              <BaseFormInput
                :model-value="dataAccountAuth?.furigana_first_name ?? ''"
                input-id="name"
                type="text"
                :label="$t('accounts.account_info.furigana_first_name')"
                :disabled="true"
                :required="false"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <BaseFormInput
                :model-value="dataAccountAuth?.tel"
                input-id="name"
                type="text"
                :label="$t('accounts.account_info.tel')"
                :disabled="true"
                :required="false"
              />
            </div>
            <div class="col">
              <BaseFormInput
                :model-value="dataAccountAuth?.fax"
                input-id="name"
                type="text"
                :label="$t('accounts.account_info.fax')"
                :disabled="true"
                :required="false"
              />
            </div>
          </div>
          <div class="row">
            <div>
              <BaseFormInput
                :model-value="dataAccountAuth?.email"
                input-id="name"
                type="text"
                :label="$t('accounts.account_info.email')"
                :disabled="true"
                :required="false"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="title mt-3 w-100">
        {{ $t("accounts.header.title_account_list") }}
      </div>
      <div class="list_accounts mt-2">
        <div class="search_accounts">
          <BaseFormInput
            v-model="dataForm.keyword"
            input-id="name"
            type="text"
            :label="'キーワードから探す '"
            placeholder="担当者名・メール・電話番号"
            :required="false"
            @input="handleInputKeyUpSearch"
          />
        </div>
        <div class="create-account mb-3">
          <button
            type="button"
            class="btn btn-create d-block float-end btn-create-account"
            data-toggle="modal"
            data-target="#staticBackdrop"
            @click="toggleModalCreate"
          >
            <img
              src="~/assets/images/icon/plus.svg"
              alt="plus"
              width="16"
              height="16"
            />
            {{ $t("accounts.header.btn.create") }}
          </button>
          <AccountsCreate
            :show-modal="showModalCreate"
            :toggle-modal="toggleModalCreate"
            :handle-get-list="handleGetListAccount"
          />
        </div>
      </div>
      <BaseLoading v-if="loading" class="align-center w-100" />
      <AccountsList
        v-else
        :data-list="dataList"
        :change-page="changePage"
        :handle-get-list="handleGetListAccount"
        class="w-100 mb-5"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import type { Ref } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useAccount } from "~/stores/accounts";
definePageMeta({
  layout: "admin",
});

const authStore = useAuthStore();
const dataAccountAuth = ref();

onMounted(() => {
  dataAccountAuth.value = authStore.user;
});

watch(
  () => authStore.user,
  (newValue) => {
    dataAccountAuth.value = newValue;
  },
);

const showModalCreate = ref(false);
const toggleModalCreate = (): void => {
  showModalCreate.value = !showModalCreate.value;
  const bodyTag = document.getElementsByTagName("body");
  bodyTag[0].classList.toggle("modal-open");
};
const showModalUpdate = ref(false);
const authUserId = ref();
const toggleModalUpdate = (): void => {
  authUserId.value = authStore?.user?.id ?? 0;
  showModalUpdate.value = !showModalUpdate.value;
  const bodyTag = document.getElementsByTagName("body");
  bodyTag[0].classList.toggle("modal-open");
};

const showModalChangePassword = ref(false);
const toggleModalChangePassword = (): void => {
  showModalChangePassword.value = !showModalChangePassword.value;
  const bodyTag = document.getElementsByTagName("body");
  bodyTag[0].classList.toggle("modal-open");
};

const page = ref(1);
const loading: Ref<boolean> = ref(true);

const dataForm: any = ref({
  keyword: "",
  page: page.value,
});

const accounts = useAccount();
const dataList: any = ref({});
const timeOutInputKeyword = ref();

const handleGetListAccount = (page: number) => {
  accounts
    .search({
      ...dataForm.value,
      page,
    })
    .then((response: any) => {
      loading.value = false;
      dataList.value = response.data.data;
    });
};

handleGetListAccount(page.value);

const changePage = (index: number) => {
  if (page.value === index) return;
  page.value = index;
  handleGetListAccount(index);
};

const handleInputKeyUpSearch = () => {
  if (timeOutInputKeyword.value) {
    clearTimeout(timeOutInputKeyword.value);
  }
  timeOutInputKeyword.value = setTimeout(() => {
    handleGetListAccount(1);
  }, 500);
};
</script>

<style lang="scss">
@import "@/assets/scss/pages/accounts/styles";
</style>
