import VueDatePicker from "@vuepic/vue-datepicker";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("vue-date-picker", VueDatePicker);
});
