// eslint-disable-next-line import/default
import Slider from "@vueform/slider";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("vue-slider-component", Slider);
});
