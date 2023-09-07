// /constants/endpoints.ts
import axios from "axios";

export const getApiBase = () => {
  const runtimeConfig = useRuntimeConfig();
  return runtimeConfig.public.apiBase ?? "http://localhost:8000/api/v1";
};

export function axiosBase() {
  const token = useCookie("token");
  const axiosBase = axios.create({
    baseURL: getApiBase(),
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  axiosBase.interceptors.request.use(function (config: any) {
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token.value}`,
      };
    }
    return config;
  });
  return axiosBase;
}

export function createEndpoint(
  endpoint: string,
  params?: Record<string, string | number>,
): string {
  const baseURL = getApiBase();
  let url = `${baseURL}${endpoint}`;
  if (params) {
    Object.keys(params).forEach((key) => {
      url = url.replace(`:${key}`, encodeURIComponent(params[key].toString()));
    });
  }
  return url;
}

export function methodGet(url: string, params?: any) {
  return axiosBase().get(createEndpoint(url), { params });
}

export function methodPost(url: string, body?: any) {
  return axiosBase().post(createEndpoint(url), body);
}

export function methodPut(url: string, body?: any) {
  return axiosBase().put(createEndpoint(url), body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function methodDelete(url: string) {
  return axiosBase().delete(createEndpoint(url));
}

// API Endpoint with param
export const LOGIN = "/login"; // POST
export const LOGOUT = "/logout"; // POST
export const SEND_RESET_PASSWORD_MAIL = "/send-email"; // POST
export const RESET_PASSWORD = "/reset-password"; // POST
export const CHECK_TOKEN_SEND_EMAIL = "/check-token"; // get
export const CHANGE_PASSWORD = "/change-password"; // get

// agency travel
export const TRAVEL_AGENCIES_REGISTER = "/travel-agencies/register"; // post
export const TRAVEL_AGENCIES_DETAIL = "/travel-agencies/detail"; // get
export const TRAVEL_AGENCIES_UPDATE = "/travel-agencies/update"; // get
export const TRAVEL_GET_USER_LOGIN = "/travel-agencies/get-user"; // get
export const TRAVEL_AGENCIES_STORE_FAVORITE = "/travel-agencies/favorites"; // get

// customer group
export const CUSTOMER_GROUP = "/customers"; // get|post
export const CUSTOMER_GET_LIST = "/customers/list"; // get
export const CUSTOMER_GET_DETAIL = "/customers/detail"; // get

// account
export const ACCOUNT_LIST = "/accounts/list"; // get
export const ACCOUNT = "/account"; // post
export const ACCOUNT_DETAIL = "/account/detail"; // get

// company
export const COMPANY_REGISTER = "/companies/register"; // post

// data search
export const GET_DATA_SEARCH_STORE = "/data-searches-store"; // get
export const SEARCH_STORES = "/stores"; // get
export const STORE_DETAIL = "/store/detail"; // get
export const USER_LIKE_STORE = "/stores/like"; // post
export const USER_CREATE_COMMENT = "/comments"; // post
export const GET_ALL_COMMENT = "/comments"; // get
export const STORE_ORDERED = "/stores-ordered"; // get

// prefectures
export const GET_PREFECTURES = "/prefectures"; // get

// reservations
export const GET_RESERVATIONS = "/reservations"; // get
export const CONFIRM_CREATE_RESERVATIONS = "/reservations/confirm"; // post
export const CREATE_RESERVATIONS = "/reservations/"; // post

// store
export const FOOD_SPECIAL = "food-special"; // get

// messages
export const GET_MESSAGES = "/messages/show-message"; // get
export const GET_CHANNELS = "/messages/show-left"; // get
export const SEND_MESSAGE = "/messages/send-message"; // post
export const GET_LIST_CHANNEL = "/messages/channels"; // get
export const UPDATE_TO_READ = "/messages/update-read"; // get
export const GET_CHANNEL = "/messages/show"; // get

// channel
export const CREATE_CHANNEL = "/messages/channel-create"; // post

// auth pusher
export const AUTH_PUSHER = "/pusher/auth"; // post

export const CONTACT = "/contacts"; // rest api
