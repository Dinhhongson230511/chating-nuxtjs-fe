import { defineStore } from "pinia";
import {
  CHANGE_PASSWORD,
  CHECK_TOKEN_SEND_EMAIL,
  LOGIN,
  LOGOUT,
  RESET_PASSWORD,
  methodGet,
  methodPost,
} from "~/constants/api";
import { STATUS_CODES } from "~/constants/statusCode";

interface TravelAgency {
  id: number | string;
  name: string;
  furigana_name: string;
  tel: string;
  fax: string;
  post_code: number | string;
  prefecture: string;
  locality: string;
  address_lines: string;
  bank_name: string;
  bank_branch: string;
  bank_account_number: number | string;
  bank_account_name: string;
  bank_account_name_kana: string;
  approval_status: number | string;
  approved_by_id: number | string;
  created_at: any;
  updated_at: any;
  deleted_at: any;
}

interface User {
  id: number;
  user_name: string;
  email: string;
  avatar: string | null;
  role: string;
  full_name: string | null;
  first_name: string | null;
  last_name: string | null;
  furigana_first_name: string | null;
  furigana_last_name: string | null;
  travel_agency_id: number | string | null;
  travel_agency: TravelAgency;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  accessToken: string | null;
}

export interface LoginParams {
  email: string;
  password: string;
  rememberToken: boolean;
}

export interface ResetPasswordParams {
  token: any;
  new_password: string;
  password_confirmed: string;
}

export interface ChangePasswordBodies {
  old_password: string;
  new_password: string;
  password_confirmed: string;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    isLoggedIn: false,
    user: null,
    accessToken: null,
  }),
  getters: {
    isAuthenticated(state) {
      return state.isLoggedIn && state.accessToken !== null;
    },
  },
  actions: {
    login(body: LoginParams) {
      const { $toast } = useNuxtApp();
      return methodPost(LOGIN, body).then((response: any) => {
        if (response.status === STATUS_CODES.OK) {
          const { data } = response.data;
          const token = useCookie("token");
          token.value = data.access_token;
          this.isLoggedIn = true;
          this.user = data.user;
          this.accessToken = data.access_token;
          $toast.success(response.data.message);
          navigateTo("/");
        }
      });
    },
    logout() {
      const { $toast } = useNuxtApp();
      const token = useCookie("token");
      const user = useCookie("user");
      this.isLoggedIn = false;
      this.user = null;
      this.accessToken = null;
      token.value = null;
      user.value = null;
      return methodPost(LOGOUT).then((response: any) => {
        $toast.success(response.data.message);
        navigateTo("/login");
      });
    },
    async checkTokenResetPass(token: any) {
      return await methodGet(CHECK_TOKEN_SEND_EMAIL, { token });
    },
    resetPassword(body: ResetPasswordParams) {
      return methodPost(RESET_PASSWORD, body);
    },
    changePassword(body: ChangePasswordBodies) {
      return methodPost(CHANGE_PASSWORD, body);
    },
  },
});
