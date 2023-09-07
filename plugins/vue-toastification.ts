import Toast, { useToast } from "vue-toastification";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    timeout: 3000,
    maxToasts: 5,
    newestOnTop: true,
  });

  return {
    provide: {
      toast: useToast(),
    },
  };
});
