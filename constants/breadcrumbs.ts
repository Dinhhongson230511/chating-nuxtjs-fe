import i18n from "~/config/i18n";

export interface IBreadCrumb {
  url?: string;
  label?: string;
}
export const BreadCrumbHome: Array<IBreadCrumb> = [
  {
    url: "/",
    label: i18n.global.t("common.breadcrumb.home"),
  },
];

export const BreadCrumbStoreDetail: Array<IBreadCrumb> = [...BreadCrumbHome];
