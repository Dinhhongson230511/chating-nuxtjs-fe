<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="sidebar__container left-0"
    :class="{ active_sidebar: !isShowSidebar }"
  >
    <div class="sidebar__container--top">
      <div class="box-subject">
        <div class="box-image">
          <img
            :src="
              props.userAvatar
                ? props.userAvatar
                : (getImageIcon('avatar_icon.svg') as string)
            "
            alt=""
          />
        </div>
        <span>名前</span>
      </div>
      <ul>
        <li>
          <nuxt-link to="#">
            <img
              src="~/assets/images/icon/shop_icon.svg"
              alt="shop window"
              width="20"
              height="20"
            />
            <div
              v-if="isShowSidebar"
              class="ms-2 d-flex justify-content-between w-100"
            >
              <span>{{ $t("common.sidebar.favorite_store") }}:</span>
              <span class="text-orange-500">10</span>
            </div>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="#">
            <img
              src="~/assets/images/icon/clock.svg"
              alt="shop window"
              width="20"
              height="20"
            />
            <div
              v-if="isShowSidebar"
              class="ms-2 d-flex justify-content-between w-100"
            >
              <span>{{ $t("common.sidebar.current_reservation") }}:</span>
              <span class="text-orange-500">0件</span>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="sidebar__container--bottom">
      <div class="items">
        <ul>
          <li
            v-for="(sidebar, index) in menuSidebar"
            :key="index"
            :class="{ active_route: sidebar?.link == route.fullPath }"
          >
            <nuxt-link
              v-if="sidebar?.srcIcon != 'logout.png'"
              :to="sidebar?.link"
            >
              <img
                :src="getImageIcon(sidebar.srcIcon as string)"
                alt="shop window"
                width="20"
                height="20"
              />
              <span class="ms-2">{{ $t(sidebar?.title) }}</span>
            </nuxt-link>
            <div v-else role="button" @click="authStore.logout()">
              <img
                :src="getImageIcon(sidebar.srcIcon as string)"
                alt="shop window"
                width="20"
                height="20"
              />
              <span class="ms-2">{{ $t(sidebar?.title) }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="button-toggle" role="button" @click="handleToggleSidebar()">
      <img
        :src="
          isShowSidebar
            ? getImageIcon('icon-close-sidebar.svg')
            : getImageIcon('icon-open-sidebar.svg')
        "
        alt="close sidebar"
        width="20"
        height="20"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { menuSidebar } from "@/constants/menu";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const route = useRoute();
const isShowSidebar: Ref<boolean> = ref(true);

const handleToggleSidebar = () => {
  isShowSidebar.value = !isShowSidebar.value;
  const layoutBody = document.getElementById("layoutBody");
  layoutBody?.classList.toggle("width-content");
};

const props = defineProps({
  userAvatar: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/partials/sidebar.scss";
</style>
