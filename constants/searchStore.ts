import { ISelectValue } from "~/stores/SearchStore";

export const Smoking: Array<ISelectValue> = [
  {
    id: "noSmoking",
    name: "home.search.smoking.no",
    value: "禁煙",
  },
  {
    id: "smoking",
    name: "home.search.smoking.yes",
    value: "喫煙",
  },
  {
    id: "smokingArea",
    name: "home.search.smoking.areas",
    value: "分煙",
  },
];

export const Parking: Array<ISelectValue> = [
  {
    id: "parkingYes",
    name: "home.search.parking.yes",
    value: "有り",
  },
  {
    id: "parkingNo",
    name: "home.search.parking.no",
    value: "無し",
  },
];
