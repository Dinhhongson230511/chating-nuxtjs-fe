import vSelect from "vue-select";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("vue-select", vSelect);
});
