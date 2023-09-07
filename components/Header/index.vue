<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="header__container">
    <div class="header__container--left">
      <div class="logo_image">
        <img src="~/assets/images/logo.png" alt="logo" width="97" height="50" />
      </div>
      <div class="menu">
        <ul>
          <li>
            <nuxt-link to="/">
              <img
                src="~/assets/images/icon/search.svg"
                alt="search"
                width="18"
                height="18"
              />
              <span>{{ $t("common.header.search") }}</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/reservations">
              <img
                src="~/assets/images/icon/reservation_list.svg"
                alt="reservation list"
                width="18"
                height="18"
              />
              <span>
                {{ $t("common.sidebar.reservation_list") }}
              </span>
            </nuxt-link>
          </li>
          <li>
            <div
              class="d-flex justify-content-between align-items-center select-customer"
            >
              <img
                src="~/assets/images/icon/people.svg"
                alt="reservation list"
                width="18"
                height="18"
              />
              <div class="select-value">
                <select
                  v-model="customerIdSelected"
                  class="form-select border-0 p-0 select-text"
                  @change="handleChangeValue"
                >
                  <option selected :value="null">
                    {{ $t("common.header.customer.placeholder") }}
                  </option>
                  <option
                    v-for="(item, index) in customers"
                    :key="index"
                    :value="item?.id"
                  >
                    {{ item?.name }}
                  </option>
                </select>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="header__container--right">
      <div class="profile">
        <img
          :src="
            userAvatar ? userAvatar : (getImageIcon('avatar.svg') as string)
          "
          alt="avatar"
          width="32"
          height="32"
        />
        <nuxt-link to="/accounts">
          {{ $t("common.header.account") }}
        </nuxt-link>
      </div>
      <nuxt-link to="/contact/create">
        {{ $t("common.header.inquiry") }}
      </nuxt-link>
      <select id="lang" name="lang" class="d-none">
        <option value="en">{{ $t("common.header.lang.ja") }}</option>
        <option value="en">{{ $t("common.header.lang.en") }}</option>
      </select>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCustomer } from "~/stores/customer";
defineProps({
  userAvatar: {
    type: String,
    default: "",
  },
});

const router = useRoute();

const customer = useCustomer();
const customerIdSelected = ref(router.query.customer_id ?? null);
const { customerId, customers } = storeToRefs(useCustomer());

const handleGetListCustomer = () => {
  customer.search({ per_page: 0 }).then((response: any) => {
    const { data } = response.data;
    (customers as any).value = data.map((res: any) => {
      return {
        ...res,
        value: res.id,
      };
    });
  });
};
const handleChangeValue = () => {
  (customerId as any).value = customerIdSelected.value;
};
handleGetListCustomer();
</script>

<style lang="scss">
@import "@/assets/scss/partials/header.scss";
</style>
