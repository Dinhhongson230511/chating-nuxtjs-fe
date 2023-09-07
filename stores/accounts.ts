import { defineStore } from "pinia";
import {
  ACCOUNT,
  ACCOUNT_LIST,
  ACCOUNT_DETAIL,
  methodGet,
  methodPost,
  methodDelete,
} from "~/constants/api";

export interface Search {
  keyword: string;
  page: string;
}

export interface Account {
  avatar: any;
  last_name: string;
  first_name: string;
  furigana_last_name: string;
  furigana_first_name: string;
  email: string;
  tel: string;
  fax: string;
}

export const useAccount = defineStore("account", {
  actions: {
    search(params: Search) {
      return methodGet(ACCOUNT_LIST, params);
    },
    create(params: any) {
      return methodPost(ACCOUNT, params);
    },
    update(params: any, id: number) {
      return methodPost(`${ACCOUNT}/${id}`, params);
    },
    getAccount(id: number) {
      return methodGet(`${ACCOUNT_DETAIL}/${id}`);
    },
    deleteAccount(id: number) {
      return methodDelete(`${ACCOUNT}/${id}`);
    },
  },
});
