<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/require-explicit-emits -->
<template>
  <div class="footer__container">
    <div class="footer__container--left">
      <div class="logo_image">
        <img src="~/assets/images/logo.png" alt="logo" width="97" height="50" />
      </div>
      <div class="menu">
        <ul>
          <li v-for="(footer, index) in menuFooter" :key="index">
            <nuxt-link :to="footer?.link">
              <span>{{ $t(footer?.title) }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer__container--right">
      <span class="copyright">
        {{ $t("common.footer.copyright") }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { menuFooter } from "@/constants/menu";
</script>
<style lang="scss">
@import "@/assets/scss/partials/footer.scss";
</style>
