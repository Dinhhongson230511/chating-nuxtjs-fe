/* eslint-disable import/no-named-as-default-member */
import moment from "moment";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(moment.locale("ja") as any);
  return {
    provide: {
      moment,
    },
  };
});
