<template>
  <div class="layout layout-user">
    <Header
      class="layout--header"
      :user-avatar="dataAccountAuth?.avatar ?? ''"
    />
    <div class="layout--body">
      <slot />
    </div>
    <Footer class="layout--footer border-top" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";
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
</script>
