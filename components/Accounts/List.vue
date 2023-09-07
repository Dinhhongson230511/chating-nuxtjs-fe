<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="table_list w-100">
    <table v-if="props.dataList?.user?.length" class="table table-striped">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">
            {{ $t("accounts.table.name") }}
          </th>
          <th scope="col">
            {{ $t("accounts.table.email") }}
          </th>
          <th scope="col">
            {{ $t("accounts.table.phone") }}
          </th>
          <th scope="col-1" class="col-1">
            <div class="action_th">
              <div>{{ $t("accounts.table.edit") }}</div>
              <div>{{ $t("accounts.table.delete") }}</div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in props.dataList.user" :key="index">
          <td scope="row">
            {{
              (props.dataList.paginate?.current_page - 1) * NUMBER_PER_PAGE +
              index +
              1
            }}
          </td>
          <td>
            <div class="text-name">
              {{ item?.full_name }}
            </div>
          </td>
          <td class="word-break">{{ item?.email }}</td>
          <td class="word-break">{{ item?.tel }}</td>
          <td class="text-center">
            <div class="btn_action">
              <div>
                <img
                  src="~/assets/images/icon/edit.svg"
                  alt="edit"
                  width="16"
                  height="16"
                  @click="setDataUpdate(item?.id)"
                />
              </div>
              <div>
                <img
                  src="~/assets/images/icon/trash.svg"
                  alt="trash"
                  width="16"
                  height="16"
                  @click="toggleModalDelete(item.id)"
                />
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="data_empty">
      <img src="~/assets/images/icon/empty.png" alt="empty" />
      <div>{{ $t("customer.table.empty") }}</div>
    </div>
    <BasePagination
      :paginate="props.dataList.paginate"
      :change-page="changePage"
    />
    <AccountsUpdate
      :id="accountId"
      :show-modal="showModalUpdate"
      :toggle-modal="toggleModalUpdate"
      :handle-get-list="props.handleGetList"
    />
    <BaseModalDelete
      :content="$t('customer.modal.content.delete')"
      :loading="btnLoadingDelete"
      :show-modal="showModalDelete"
      :submit-delete="handleDeleteAccount"
      :toggle-modal="toggleModalDelete"
    />
  </div>
</template>
<script setup lang="ts">
import { useAccount } from "~/stores/accounts";
import { NUMBER_PER_PAGE } from "~/constants/const";
const props = defineProps({
  dataList: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
    required: false,
  },
  changePage: {
    type: Function,
    required: true,
  },
  handleGetList: {
    type: Function,
    required: true,
  },
});
const accounts = useAccount();

const { $toast } = useNuxtApp();
const showModalUpdate = ref(false);
const showModalDelete = ref(false);
const accountDeleteId = ref();
const btnLoadingDelete = ref(false);
const accountId = ref();

const setDataUpdate = (id: any): void => {
  accountId.value = id;
  toggleModalUpdate();
};

const toggleModalUpdate = (): void => {
  showModalUpdate.value = !showModalUpdate.value;
  const bodyTag = document.getElementsByTagName("body");
  bodyTag[0].classList.toggle("modal-open");
};

const toggleModalDelete = (id: number): void => {
  accountDeleteId.value = id;
  showModalDelete.value = !showModalDelete.value;
  const bodyTag = document.getElementsByTagName("body");
  bodyTag[0].classList.toggle("modal-open");
};

const handleDeleteAccount = (): void => {
  btnLoadingDelete.value = true;
  accounts.deleteAccount(accountDeleteId.value).then((response: any) => {
    btnLoadingDelete.value = false;
    toggleModalDelete(accountDeleteId.value);
    props.handleGetList(1);
    $toast.success(response.data.message);
  });
};
</script>
