<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <BaseModal
      :title="$t('accounts.modal.title.create')"
      :show="props.showModal"
      :close-function="handleCloseModal"
      :submit-function="submitForm"
      :btn-loading="btnLoading"
    >
      <div class="upload-image">
        <div class="image-preview">
          <img
            :src="
              avatarLink
                ? avatarLink
                : (getImageIcon('avatar_icon.svg') as string)
            "
            alt="avatar"
            class="preview"
          />
        </div>
        <input
          id="uploadImage"
          type="file"
          class="d-none"
          name="uploadImage"
          accept=".jpg,.jpeg,.png,.webp"
          @change="uploadToClient"
        />
        <label
          for="uploadImage"
          class="px-1 py-2 text-primary ms-4"
          role="button"
        >
          <img
            src="~/assets/images/icon/picture_upload.svg"
            alt="upload"
            width="18"
            height="18"
          />
          {{ $t("accounts.modal.upload_image") }}
        </label>
      </div>
      <div v-if="errors.avatar" class="mb-3 error_validate">
        {{ errors.avatar }}
      </div>
      <div class="box-info-account px-1 py-3 rounder">
        <div class="container">
          <div class="row">
            <div class="col-6">
              <BaseFormInput
                v-model="dataForm.last_name"
                input-id="last_name"
                type="text"
                :label="$t('accounts.account_info.last_name')"
                :placeholder="$t('accounts.modal.placeholder.last_name')"
                :errors="errors.last_name"
              />
            </div>
            <div class="col-6">
              <BaseFormInput
                v-model="dataForm.first_name"
                input-id="first_name"
                type="text"
                :label="$t('accounts.account_info.first_name')"
                :placeholder="$t('accounts.modal.placeholder.first_name')"
                :errors="errors.first_name"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <BaseFormInput
                v-model="dataForm.furigana_last_name"
                input-id="furigana_last_name"
                type="text"
                :label="$t('accounts.account_info.furigana_last_name')"
                :placeholder="
                  $t('accounts.modal.placeholder.furigana_last_name')
                "
                :errors="errors.furigana_last_name"
              />
            </div>
            <div class="col-6">
              <BaseFormInput
                v-model="dataForm.furigana_first_name"
                input-id="furigana_first_name"
                type="text"
                :label="$t('accounts.account_info.furigana_first_name')"
                :placeholder="
                  $t('accounts.modal.placeholder.furigana_first_name')
                "
                :errors="errors.furigana_first_name"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <BaseFormInput
                v-model="dataForm.tel"
                input-id="tel"
                type="text"
                :required="false"
                :label="$t('accounts.account_info.tel')"
                :placeholder="$t('accounts.modal.placeholder.tel')"
                :errors="errors.tel"
              />
            </div>
            <div class="col-6">
              <BaseFormInput
                v-model="dataForm.fax"
                input-id="fax"
                type="text"
                :required="false"
                :label="$t('accounts.account_info.fax')"
                :placeholder="$t('accounts.modal.placeholder.fax')"
                :errors="errors.fax"
              />
            </div>
          </div>
          <div class="row">
            <div>
              <BaseFormInput
                v-model="dataForm.email"
                input-id="email"
                type="email"
                :label="$t('accounts.account_info.email')"
                :placeholder="$t('accounts.modal.placeholder.email')"
                :errors="errors.email"
              />
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { STATUS_CODES } from "~/constants/statusCode";
import {
  MAX_SIZE_IMAGE_UPLOAD,
  TEXT_MAX_SIZE_IMAGE_UPLOAD,
} from "~/constants/const";
import { useAccount } from "~/stores/accounts";
const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
  toggleModal: {
    type: Function,
    required: true,
  },
  handleGetList: {
    type: Function,
    required: true,
  },
});

const DATA_INIT = {
  avatar: "",
  last_name: "",
  first_name: "",
  furigana_last_name: "",
  furigana_first_name: "",
  email: "",
  tel: "",
  fax: "",
};

const avatarLink = ref("");
const dataForm = ref({ ...DATA_INIT });
const errors: any = ref({});
const btnLoading = ref(false);
const accounts = useAccount();
const { $toast } = useNuxtApp();

const uploadToClient = (event: any) => {
  if (event.target.files && event.target.files[0]) {
    const i: any = event.target.files[0];
    const maxAllowedSize = MAX_SIZE_IMAGE_UPLOAD;
    if (!(i.size > maxAllowedSize)) {
      avatarLink.value = URL.createObjectURL(i);
      dataForm.value.avatar = i;
    } else errors.value.avatar = TEXT_MAX_SIZE_IMAGE_UPLOAD;
  }
};
const handleCloseModal = () => {
  errors.value = {}; // clear error msg
  clearFormData();
  props.toggleModal();
};

const clearFormData = () => {
  return (dataForm.value = {
    avatar: "",
    last_name: "",
    first_name: "",
    furigana_last_name: "",
    furigana_first_name: "",
    email: "",
    tel: "",
    fax: "",
  });
};

const submitForm = () => {
  btnLoading.value = true;
  errors.value = {}; // clear error msg
  const dataCreate: any = { ...dataForm.value };

  const formData = new FormData();
  Object.keys(dataCreate).forEach((key) => {
    formData.append(key, dataCreate[key]);
  });

  accounts
    .create(formData as any)
    .then((response: any) => {
      btnLoading.value = false;
      $toast.success(response.data.message);
      handleCloseModal();
      clearFormData();
      props.handleGetList(1);
    })
    .catch((error: any) => {
      btnLoading.value = false;
      if (error.response.status === STATUS_CODES.VALIDATION) {
        Object.entries(error.response.data.errors).map((item: any) => {
          return (errors.value[item?.[0]] = item?.[1]?.[0]);
        });
      } else $toast.error(error.response._data.message);
    });
};
</script>
