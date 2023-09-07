import { onBeforeUnmount, onMounted } from "vue";
import moment from "moment";
import {
  FORMAT_DATE_AND_TIME,
  FORMAT_DATE_PICKER,
  FORMAT_DATE_TIME,
  FORMAT_DATE_TIME_H_M,
  RESERVATION,
  YEN,
} from "~/constants/const";
import { STATUS } from "~/constants/reservation";

export const getImageIcon = (name: string) => {
  const assets = import.meta.glob("~/assets/images/icon/*", {
    eager: true,
    import: "default",
  });
  return assets["/assets/images/icon/" + name];
};

export const getImage = (name: string) => {
  const assets = import.meta.glob("~/assets/images/*", {
    eager: true,
    import: "default",
  });
  return assets["/assets/images/" + name];
};

export const replacePhoneNumberToString = (numberPhone: string) => {
  const stringArray = numberPhone.split("-");
  return stringArray.join("");
};

export const useDetectOutsideClick = (callback: any) => {
  onMounted(() => {
    window.addEventListener("click", callback);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("click", callback);
  });

  return { callback };
};

export const formatNumber = (number?: number) => {
  if (typeof number === "number") return number.toLocaleString("en-US");
  else return 0;
};

export const getApiKeyGoogle = () => {
  const runtimeConfig = useRuntimeConfig();
  return runtimeConfig.public.apiKeyGoogle ?? "";
};

export const convertDisplayBusinessHours = (businessHours: any) => {
  return businessHours?.map((item: any) => {
    return item.start_time + "-" + item.end_time;
  });
};

export const displayMinMaxMainFood = (foods: any) => {
  if (foods.length >= 1) {
    let feeFoods = foods.map((food: any) => food.fee);
    feeFoods = [...new Set(feeFoods)];
    if (feeFoods.length > 1) {
      return [
        formatNumber(Math.min(...feeFoods)) + YEN,
        formatNumber(Math.max(...feeFoods)) + YEN,
      ];
    } else {
      return [formatNumber(feeFoods[0]) + YEN];
    }
  }
  return [];
};

export const checkFoodAlready = (food: any) => {
  const now = moment();
  const acceptableStartDate = moment(
    food.acceptable_date_start,
    FORMAT_DATE_PICKER,
  );
  const acceptableEndDate = moment(
    food.acceptable_date_end,
    FORMAT_DATE_PICKER,
  );
  const availableStartTime = moment(
    food.available_hours_start,
    FORMAT_DATE_TIME_H_M,
  );
  const availableEndTime = moment(
    food.available_hours_end,
    FORMAT_DATE_TIME_H_M,
  );
  const withinAcceptableDateRange = now.isBetween(
    acceptableStartDate,
    acceptableEndDate,
    null,
    "[]",
  );
  const currentDay = now.format("ddd").toLowerCase();
  const withinDays = food.days.some((day: any) => day.slug === currentDay);
  now.isBetween(availableStartTime, availableEndTime, null, "[)"); //
  return withinAcceptableDateRange && withinDays;
};

export const stringToNumber = (s: string) => {
  return s.replace(/\D/g, "");
};

export const formattedPhoneNumber = (phoneNumber: string) => {
  const sanitizedInput = phoneNumber.replace(/[^0-9]/g, "");
  const regex = /^(\d{3})(\d{0,4})(\d{0,4})(\d{0,4})/;
  const match = sanitizedInput.match(regex);
  let formattedNumber = "";
  if (match) {
    formattedNumber = match
      .slice(1)
      .filter((group) => group !== "")
      .join("-");
  } else formattedNumber = sanitizedInput;
  return formattedNumber.trim();
};

export const newArrayTimeByMinuteStep = (step: number) => {
  const result = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += step) {
      const hourString = hour.toString().padStart(2, "0");
      const minuteString = minute.toString().padStart(2, "0");
      result.push({
        id: `${hourString}:${minuteString}`,
        name: `${hourString}:${minuteString}`,
      });
    }
  }

  return result;
};

export const formatTime = (time: string, format = "HH:mm") => {
  const now = "00:00";
  time = time.replace(/[^0-9:]/g, "");
  if (!time) return now;

  const arrayLengthTimeUnit = time.split(":").length;
  if (arrayLengthTimeUnit >= 4 || arrayLengthTimeUnit <= 1) return now;

  const currentFormat =
    arrayLengthTimeUnit === 2 ? FORMAT_DATE_TIME_H_M : FORMAT_DATE_TIME;
  return moment(time, currentFormat).format(format);
};

export const formatDate = (date: string, format = "YYYY/MM/DD") => {
  let newDate = moment(date, FORMAT_DATE_PICKER);
  if (newDate.isValid()) return newDate.format(format);

  newDate = moment(date, FORMAT_DATE_AND_TIME);
  if (newDate.isValid()) return newDate.format(format);
};

export const getTextStatusReservations = (status: number): string => {
  switch (status) {
    case 1:
      return RESERVATION.STATUS_TEXT.REQUESTING;
    case 2:
      return RESERVATION.STATUS_TEXT.CONFIRMED;
    case 3:
      return RESERVATION.STATUS_TEXT.COMPLETED;
    case 4:
      return RESERVATION.STATUS_TEXT.CANCEL;
    default:
      return "";
  }
};

export const convertDateTimeReservations = (reservation: object): string => {
  return (
    reservation.reservation_date + " " + reservation.reservation_start_time
  );
};

export const getColorStatusReservations = (status: number): string => {
  switch (status) {
    case STATUS.REQUESTING:
      return "color-request-comfirmed";
    case STATUS.CONFIRMED:
      return "color-request-comfirmed";
    case STATUS.COMPLETED:
      return "bg-primary";
    case STATUS.CANCELLED:
      return "bg-danger";
    default:
      return "";
  }
};

export const truncateString = (str: string, maxLength = 30) => {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  }
  return str;
};
