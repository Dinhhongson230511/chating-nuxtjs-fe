import Echo from "laravel-echo";
import Pusher from "pusher-js";

import { AUTH_PUSHER, methodPost } from "~/constants/api";

declare global {
  interface Window {
    Pusher: any;
    Echo: any;
  }
}

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const appWebsocketsKey = runtimeConfig.public.appWebsocketsKey ?? "";
  const appWebsocketsServer = runtimeConfig.public.appWebsocketsServer ?? "";

  window.Pusher = Pusher;
  // Pusher.logToConsole = true;
  window.Echo = new Echo({
    enabledTransports: ["ws"],
    broadcaster: "pusher",
    key: appWebsocketsKey,
    wsHost: appWebsocketsServer,
    wsPort: 6001,
    cluster: "ap1",
    forceTLS: false,
    disableStats: true,
    authorizer: (channel: any) => {
      return {
        authorize: (socketId: any, callback: any) => {
          const params = {
            socket_id: socketId,
            channel_name: channel.name,
          };

          methodPost(`${AUTH_PUSHER}`, params)
            .then((response) => {
              // eslint-disable-next-line n/no-callback-literal
              callback(false, response.data);
            })
            .catch((error) => {
              // eslint-disable-next-line n/no-callback-literal
              callback(true, error);
            });
        },
      };
    },
  });

  return {
    provide: {
      window,
    },
  };
});
