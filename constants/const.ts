import i18n from "~/config/i18n";
export const FORMAT_DATE_PICKER = "YYYY/MM/DD";
export const FORMAT_DATE_TIME = "HH:mm:ss";
export const FORMAT_DATE_TIME_H_M = "HH:mm";
export const FORMAT_DATE_AND_TIME = "YYYY/MM/DD HH:mm";
export const MAX_SIZE_IMAGE_UPLOAD = 10 * 1024 * 1024;
export const TEXT_MAX_SIZE_IMAGE_UPLOAD = i18n.global.t(
  "common.max_size_image",
);
export const DEFAULT_PAGE = 1;
export const NUMBER_PER_PAGE = 10;
export const FOOD_TYPES = {
  MAIN: i18n.global.t("common.food_types.main"),
  DRINK: i18n.global.t("common.food_types.drink"),
  SUB_FOOD: i18n.global.t("common.food_types.sub_food"),
  ADD_REQUEST: i18n.global.t("common.food_types.add_request"),
};

export const DgMealsNo = i18n.global.t("common.dgMeals.no");
export const DgMealsYes = i18n.global.t("common.dgMeals.yes");

export const YES = 1;
export const NO = 0;

export const STATUS_CUSTOMER = {
  REQUESTING: "未確定",
  COMPLETE: "確定",
  NOT_RESERVATIONS: "予約なし",
};

export const DgMeals: Array<any> = [
  {
    id: "dgNo",
    label: i18n.global.t("order.card.left.form.d_g.no"),
    value: DgMealsNo,
  },
  {
    id: "dgYes",
    label: i18n.global.t("order.card.left.form.d_g.yes"),
    value: DgMealsYes,
  },
];

export const REQUEST_PRINT_TITLE: Array<any> = [
  {
    id: "requestPrintTitleNo",
    label: i18n.global.t("order.card.left.form.d_g.no"),
    value: NO,
  },
  {
    id: "requestPrintTitleYes",
    label: i18n.global.t("order.card.left.form.d_g.yes"),
    value: YES,
  },
];

export const BOOK_SEAT: Array<any> = [
  {
    id: "bookSeatNo",
    label: i18n.global.t("order.card.left.form.d_g.no"),
    value: NO,
  },
  {
    id: "bookSeatYes",
    label: i18n.global.t("order.card.left.form.d_g.yes"),
    value: YES,
  },
];

export const DAY_OF_WEEKS = [
  i18n.global.t("common.day_of_week.sun"),
  i18n.global.t("common.day_of_week.mon"),
  i18n.global.t("common.day_of_week.tue"),
  i18n.global.t("common.day_of_week.wed"),
  i18n.global.t("common.day_of_week.thu"),
  i18n.global.t("common.day_of_week.fri"),
  i18n.global.t("common.day_of_week.sat"),
];

export const MAX_PEOPLE = 999;
export const MAX_PRICE = 999999999;

export const DAY_START_OF_WEEK = 0;
export const DAY_END_OF_WEEK = 6;

export const YEN = i18n.global.t("common.yen");
export const PEOPLE = i18n.global.t("common.people");

export const HAVE_PARKING = "有り";

export const ACTION_IN_PAGE = {
  PREVIEW: "preview",
  UPDATE: "update",
  CONFIRM: "confirm",
};

export const SLUG_WEEK_DAY = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

// channel type constants
export const CHANNEL_PERSONAL = "PERSONAL";
export const CHANNEL_ORDER = "ORDER";

export const RESERVATION = {
  STATUS_TEXT: {
    REQUESTING: i18n.global.t("reservation.tags.requesting"),
    CONFIRMED: i18n.global.t("reservation.tags.confirmed_reservation"),
    COMPLETED: i18n.global.t("reservation.tags.completion"),
    CANCEL: i18n.global.t("reservation.tags.cancel"),
  },
};
