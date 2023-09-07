<template>
  <div class="header__container">
    <div class="header__container--left">
      <div class="logo_image">
        <img src="~/assets/images/logo.png" alt="logo" width="97" height="50" />
      </div>
      <div class="menu">
        <ul>
          <li>
            <nuxt-link to="#">
              <img
                src="~/assets/images/icon/search.svg"
                alt="search"
                width="18"
                height="18"
              />
              <span>店舗検索</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="#">
              <img
                src="~/assets/images/icon/reservation_list.svg"
                alt="reservation list"
                width="18"
                height="18"
              />
              <span>予約一覧</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="#">
              <img
                src="~/assets/images/icon/one_mind_list.svg"
                alt="list"
                width="18px"
                height="18px"
              />
              <span>気になる！リスト</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="header__container--right">
      <nuxt-link to="/login" class="btn btn-login">ログイン</nuxt-link>
      <nuxt-link to="#">問い合わせ</nuxt-link>
      <select id="lang" name="lang">
        <option value="en">日本語</option>
        <option value="en">EN</option>
      </select>
    </div>
  </div>
</template>
<style lang="scss">
@import "@/assets/scss/partials/header.scss";
</style>
