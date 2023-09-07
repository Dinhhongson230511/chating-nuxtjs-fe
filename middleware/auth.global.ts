import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/auth";
import { useAgency } from "~/stores/agency";
import { privateRoute, publishRoute } from "~/constants/route";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineNuxtRouteMiddleware((to, from) => {
  const { accessToken, isLoggedIn, user } = storeToRefs(useAuthStore()); // make authenticated state reactive
  const agency = useAgency();

  const token = useCookie("token"); // get token from cookies
  if (token.value) {
    agency.getInfoAgencyLogin().then((response: any) => {
      (user as any).value = response.data.data;
    });
    isLoggedIn.value = true;
    accessToken.value = token.value;
  }

  // if token exist and on publish route will redirect to home page
  if (
    token.value &&
    publishRoute.map((item) => item.pathName).includes(to.path)
  ) {
    return navigateTo("/");
  }

  // if token doesn't exist and on private route will redirect to log in
  if (
    !token.value &&
    privateRoute.map((item) => item.pathName).includes(to.path)
  ) {
    abortNavigation();
    return navigateTo("/login");
  }
});
