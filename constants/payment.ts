import { ISelectValue } from "stores/SearchStore";

export const FoodPaymentMethod: Array<ISelectValue> = [
  {
    id: "invoice",
    name: "reservation.payments.invoice",
    value: "invoice",
  },
  {
    id: "advanceTransfer",
    name: "reservation.payments.advance_transfer",
    value: "advance_transfer",
  },
  {
    id: "cpInvoiceIssued",
    name: "reservation.payments.cp_invoice_issued",
    value: "cp_invoice_issued",
  },
  {
    id: "cpBringOnTheDay",
    name: "reservation.payments.cp_bring_on_the_day",
    value: "cp_bring_on_the_day",
  },
  {
    id: "cash",
    name: "reservation.payments.cash",
    value: "cash",
  },
  {
    id: "cashFeesWillBeDeductedOnTheDay",
    name: "reservation.payments.cash_fees_will_be_deducted_on_the_day",
    value: "cash_fees_will_be_deducted_on_the_day",
  },
];

export const PaymentDrink: Array<ISelectValue> = [
  {
    id: "invoice",
    name: "reservation.payments.invoice",
    value: "invoice",
  },
  {
    id: "advanceTransfer",
    name: "reservation.payments.advance_transfer",
    value: "advance_transfer",
  },
  {
    id: "cpTicketAtALaterDate",
    name: "reservation.payments.cp_ticket_at_a_later_date",
    value: "cp_ticket_at_a_later_date",
  },
  {
    id: "cpBringOnTheDay",
    name: "reservation.payments.cp_bring_on_the_day",
    value: "cp_bring_on_the_day",
  },
  {
    id: "cash",
    name: "reservation.payments.cash",
    value: "cash",
  },
];

export const PaymentAddRequest: Array<ISelectValue> = [
  {
    id: "invoice",
    name: "reservation.payments.invoice",
    value: "invoice",
  },
  {
    id: "cpTicketAtALaterDate",
    name: "reservation.payments.cp_ticket_at_a_later_date",
    value: "cp_ticket_at_a_later_date",
  },
  {
    id: "cpBringOnTheDay",
    name: "reservation.payments.cp_bring_on_the_day",
    value: "cp_bring_on_the_day",
  },
  {
    id: "cash",
    name: "reservation.payments.cash",
    value: "cash",
  },
];

export const PaymentType: Array<ISelectValue> = [
  {
    id: "jtb",
    name: "JTB",
    value: "jtb",
  },
  {
    id: "jtbAunit",
    name: "reservation.payments.jtbAUnit",
    value: "jtbAUnit",
  },
  {
    id: "kinkiNipponTourist",
    name: "reservation.payments.kinki_nippon_tourist",
    value: "kinki_nippon_tourist",
  },
  {
    id: "tobuTopTours",
    name: "reservation.payments.tobu_top_tours",
    value: "tobu_top_tours",
  },
  {
    id: "yomiuriTrip",
    name: "reservation.payments.yomiuri_trip",
    value: "yomiuri_trip",
  },
  {
    id: "meitetsuSightseeing",
    name: "reservation.payments.meitetsu_sightseeing",
    value: "meitetsu_sightseeing",
  },
  {
    id: "hankyuTravelInternational",
    name: "reservation.payments.hankyu_travel_international",
    value: "hankyu_travel_international",
  },
  {
    id: "agriculturalCooperativeTourism",
    name: "reservation.payments.agricultural_cooperative_tourism",
    value: "agricultural_cooperative_tourism",
  },
  {
    id: "tLife",
    name: "reservation.payments.t_life",
    value: "t_life",
  },
];
