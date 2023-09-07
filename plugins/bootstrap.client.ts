import {
  Button,
  Collapse,
  Dropdown,
  Modal,
  Popover,
  ScrollSpy,
  Tab,
  Tooltip,
} from "bootstrap";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      Tooltip,
      Popover,
    },

    bootstrap: {
      Button,
      Collapse,
      Dropdown,
      Modal,
      ScrollSpy,
      Tab,
    },
  };
});
