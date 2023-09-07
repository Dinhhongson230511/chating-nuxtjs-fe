import FullCalendar from "@fullcalendar/vue3";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("vue-full-calendar", FullCalendar);
});
