interface Menu {
  link: string;
  icon?: string;
  title: string;
  srcIcon?: string;
}

export const menuFooter: Array<Menu> = [
  {
    link: "#",
    title: "common.footer.diameter_management",
  },
  {
    link: "#",
    title: "common.footer.management_office",
  },
  {
    link: "#",
    title: "common.footer.company_profile",
  },
  {
    link: "#",
    title: "common.footer.business_content",
  },
];

export const menuSidebar: Array<Menu> = [
  {
    link: "/reservations",
    srcIcon: "list-book-room.svg",
    title: "common.sidebar.reservation_list",
  },
  {
    link: "/store/favorite",
    srcIcon: "one_mind_list.svg",
    title: "common.sidebar.favorite_store_list",
  },
  {
    link: "/customer",
    srcIcon: "list-group.svg",
    title: "common.sidebar.groups",
  },
  {
    link: "/tours",
    srcIcon: "tour-list.svg",
    title: "common.sidebar.tours",
  },
  {
    link: "/message/channel/0",
    srcIcon: "message.svg",
    title: "common.sidebar.messages",
  },
  {
    link: "/agency/detail",
    srcIcon: "about.svg",
    title: "common.sidebar.about_list",
  },
  {
    link: "/accounts",
    srcIcon: "account.svg",
    title: "common.sidebar.accounts",
  },
  {
    link: "#",
    srcIcon: "setting.svg",
    title: "common.sidebar.setting_noti",
  },
  {
    link: "/#",
    srcIcon: "logout.png",
    title: "common.sidebar.logout",
  },
];
