interface Router {
  pathName: string;
  role?: string[];
  layout: any;
  redirect?: string;
  title?: string;
}

export const publishRoute: Array<Router> = [
  {
    pathName: "/register",
    layout: "",
  },
  {
    pathName: "/login",
    layout: "",
  },
  {
    pathName: "/forgot-password",
    layout: "",
  },
  {
    pathName: "/reset-password",
    layout: "",
  },
];

export const privateRoute: Array<Router> = [
  {
    pathName: "/agency/update",
    layout: "",
  },
  {
    pathName: "/customer",
    layout: "",
  },
  {
    pathName: "/accounts",
    layout: "",
  },
  {
    pathName: "/",
    layout: "",
    title: "Home page",
  },
  {
    pathName: "/reservations",
    layout: "",
    title: "List reservation",
  },
  {
    pathName: "/reservations/create",
    layout: "",
    title: "Create reservation",
  },
];

export const routeNotLogin: Array<Router> = [
  {
    pathName: "/agency/register",
    layout: "",
  },
  {
    pathName: "/company/register",
    layout: "",
  },
];
