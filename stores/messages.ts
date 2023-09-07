import { defineStore } from "pinia";
import {
  GET_MESSAGES,
  GET_CHANNELS,
  SEND_MESSAGE,
  GET_LIST_CHANNEL,
  UPDATE_TO_READ,
  GET_CHANNEL,
  CREATE_CHANNEL,
  methodGet,
  methodPost,
} from "~/constants/api";

export interface Message {
  message: string;
}

export interface Channel {
  store_id: number;
  type: string;
}

export const useMessage = defineStore("messages", {
  actions: {
    getMessages(channel: number, params: any) {
      return methodGet(`${GET_MESSAGES}/${channel}/msg`, params);
    },
    getChannels(channel: number, params: any) {
      return methodGet(`${GET_CHANNELS}/${channel}`, params);
    },
    sendMessage(channel: number, params: Message) {
      return methodPost(`${SEND_MESSAGE}/${channel}`, params);
    },
    getListChannel(params: any) {
      return methodGet(`${GET_LIST_CHANNEL}`, params);
    },
    updateToRead(channel: number) {
      return methodGet(`${UPDATE_TO_READ}/${channel}`);
    },
    getChannel(channel: number) {
      return methodGet(`${GET_CHANNEL}/${channel}`);
    },
    createChannel(params: Channel) {
      return methodPost(`${CREATE_CHANNEL}`, params);
    },
  },
});
