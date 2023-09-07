<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li
        v-for="(item, index) in breadCrumbs"
        :key="index"
        class="breadcrumb-item"
        :class="{ active: index == breadCrumbs.length - 1 }"
        :aria-current="index == breadCrumbs.length - 1 ? 'page' : 'step'"
      >
        <a
          v-if="index === 0 || index !== breadCrumbs.length - 1"
          :href="item?.url"
          class="text-decoration-none d-flex align-items-center"
        >
          <img
            v-if="index === 0"
            src="~/assets/images/icon/home.svg"
            alt="home"
            class="me-2"
          />
          {{ item?.label }}
        </a>
        <span v-if="index === breadCrumbs.length - 1">{{ item?.label }}</span>
      </li>
    </ol>
  </nav>
</template>
<script setup lang="ts">
defineProps({
  breadCrumbs: {
    type: Array,
    required: true,
  },
});
</script>
