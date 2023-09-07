<template>
  <NuxtLayout name="admin">
    <div id="app" class="messages-wrapper">
      <div v-if="isHasChannel">
        <div class="row">
          <div class="col-xl-3 col-lg-4 pr-0"></div>
          <div class="col-xl-9 col-lg-8 pl-0"></div>
        </div>
        <div class="row">
          <div class="col-xl-3 col-lg-4 messages-list pr-0">
            <div id="inbox-chat" class="inbox-chat">
              <div class="chat-list">
                <div class="row">
                  <div class="col-xl-12 col-lg-8 pl-0 mb-2 list-btn-filter">
                    <button
                      type="button"
                      :class="setClassActive('ALL')"
                      class="btn btn-secondary text-uppercase"
                      @click="setActive('ALL')"
                    >
                      {{ $t("message.btn.all") }}
                    </button>
                    <button
                      type="button"
                      :class="setClassActive('ORDER')"
                      class="btn btn-secondary text-uppercase"
                      @click="setActive('ORDER')"
                    >
                      {{ $t("message.btn.personal") }}
                    </button>
                    <button
                      type="button"
                      :class="setClassActive('PERSONAL')"
                      class="btn btn-secondary text-uppercase"
                      @click="setActive('PERSONAL')"
                    >
                      {{ $t("message.btn.order") }}
                    </button>
                  </div>
                  <div class="col-xl-12 col-lg-8 pl-0 mb-2">
                    <div class="input-group group-search">
                      <input
                        ref="searchTxt"
                        v-model="keyword"
                        type="text"
                        class="form-control input-search-channel"
                        :placeholder="$t('message.key_word_placeholder')"
                        aria-label="Recipient's username with two button addons"
                        @input="handleInput"
                      />
                      <button
                        class="btn btn-primary btn-search-channel"
                        type="button"
                        @click="searchChannels"
                      >
                        {{ $t("message.btn.search") }}
                      </button>
                    </div>
                  </div>
                </div>
                <BaseLoading v-if="loading" />
                <div v-else>
                  <div v-if="dataChannel.channels.length">
                    <nuxt-link
                      v-for="c in dataChannel.channels"
                      :key="c.id"
                      :to="`/message/channel/${c.channel_id}`"
                    >
                      <div
                        :class="{
                          'item-active': c.channel_id === dataChannel.channel.id,
                          item: true,
                        }"
                      >
                        <div class="item-content">
                          <div class="item-content-title">
                            <h5>
                              {{ c.name }}
                            </h5>
                          </div>
                          <div v-if="c.msg" class="item-content-excerpt">
                            <span
                              v-if="c.channel_id === channel.id || c.msg_count === 0"
                              class="item-active-seen"
                            >
                              {{ c.msg.message }}
                            </span>
                            <span
                              v-if="c.channel_id !== channel.id && c.msg_count !== 0"
                              class="item-active-not-seen"
                            >
                              {{ c.msg.message }}
                            </span>
                          </div>
                        </div>
                        <div class="item-status">
                          <div
                            v-if="c.channel_id === channel.id || c.msg_count === 0"
                            class="seen"
                          >
                            <h5>
                              <span v-if="c.msg" class="chat-date-seen">
                                {{ formatDateChannel(c.msg.created_at) }}
                              </span>
                            </h5>
                          </div>
                          <div
                            v-if="c.channel_id !== channel.id && c.msg_count !== 0"
                            class="notseen"
                          >
                            <h5>
                              <span v-if="c.msg" class="chat-date-not-seen">
                                {{ formatDateChannel(c.msg.created_at) }}
                              </span>
                            </h5>
                            {{ `${c.channel_id === channel.id ? 0 : c.msg_count}` }}
                          </div>
                        </div>
                      </div>
                    </nuxt-link>
                  </div>
                  <div v-else class="data_empty">
                    <img src="~/assets/images/icon/empty.png" alt="empty" />
                  <div>{{ $t("customer.table.empty") }}</div>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-9 col-lg-8 messages-main px-0">
            <div class="messages-main-heading">
              <div class="row align-items-center">
                <div class="col-9">
                  <div class="messages-main-heading-title">
                    <h4 class="m-3">{{ channel.display_name }}</h4>
                  </div>
                </div>
                <div class="col-3">
                  <div class="messages-main-heading-group">
                    <div class="col-6 tab-chat tab-active">
                      <span class="txt-chat">{{ $t("message.tab.chat") }}</span>
                    </div>
                    <div class="col-6 tab-group-detail">
                      {{ $t("message.tab.group") }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="messages-main-wrapper">
              <div id="msg-history" ref="scroll" class="msg-history">
                <InfiniteLoading
                  force-use-infinite-wrapper=".msg-history"
                  class="show-infinite-loading"
                  direction="top"
                  @infinite="load"
                />
                <div
                  v-for="(msg, index) in messages"
                  :key="index"
                  :class="{
                    'incoming-msg': msg.user_id !== user.id,
                    'outgoing-msg': msg.user_id === user.id,
                  }"
                >
                  <div class="item">
                    <div class="item-header">
                      <div v-if="msg.user_id !== user.id" class="item-avatar">
                        <img :src="msg.avatar ?? '/assets/images/user-profile.png'" alt="sunil" />
                      </div>
                      <div class="item-name">
                        {{ msg.name }}
                      </div>
                      <div v-if="msg.isCompanyUser" class="item-name">
                        {{ $t("message.user_store") }}
                      </div>
                      <div class="item-date">
                        &nbsp; {{ formatDat(msg.created_at) }}
                      </div>
                    </div>
                    <div class="item-content">
                      <template v-for="p in msg.msgs">
                        <p v-if="p.type === 'message'" :key="p.id">
                          {{ p.message }}
                        </p>
                        <template v-if="p.type === 'images'">
                          <p
                            v-for="(img, key) in p.images"
                            :key="`${img}-${key}`"
                          >
                            <img :src="img" class="message-image" />
                          </p>
                        </template>
                        <p v-if="p.type === 'attachments'" :key="p.id">
                          <a
                            v-for="(att, key) in p.attachments"
                            :key="`${att}-${key}`"
                            :href="att.url"
                            target="_blank"
                            class="attachment-link"
                            :class="msg.user_id !== user.id ? 'incoming-message-attachment' : ''"
                            >
                            <i class="fas fa-file"></i> {{ att.name }}
                          </a>
                        </p>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="messages-main-type">
              <div class="wrap-btn-chat">
                <div class="messages-main-type-btn-file">
                  <ul>
                    <li>
                      <div
                        class="attachmentBtn"
                        @click="openInputUploadFiles('image_upload')"
                      >
                        <img
                          src="~/assets/images/icon/chat-image-upload.svg"
                          alt="image-upload"
                        />
                      </div>
                    </li>
                    <li>
                      <div
                        class="attachmentBtn"
                        @click="openInputUploadFiles('attachments_upload')"
                      >
                        <img
                          src="~/assets/images/icon/chat-attachment-upload.svg"
                          alt="attachment-upload"
                        />
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="messages-main-type-ipt">
                  <input
                    id="message_input"
                    v-model="messageInput"
                    type="text"
                    class="write-msg"
                    :placeholder="$t('message.input_message_placeholder')"
                    @keyup.enter="sendMessage"
                  />
                  <input
                    id="image_upload"
                    type="file"
                    name="images"
                    hidden
                    accept="image/*"
                    multiple
                    @change="uploadAttachments($event, 'images')"
                  />
                  <input
                    id="attachments_upload"
                    name="attachments"
                    hidden
                    type="file"
                    multiple
                    @change="uploadAttachments($event, 'attachments')"
                  />
                </div>
              </div>
              <div class="messages-main-type-btn">
                <ul>
                  <li>
                    <div
                      id="send_message_btn"
                      class="btn-send-message"
                      @click="sendMessage"
                    >
                      <img
                        src="~/assets/images/icon/chat-send-message.svg"
                        alt="attachment-upload"
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="data_empty">
        <img src="~/assets/images/icon/empty.png" alt="empty" />
        <div>{{ $t("customer.table.empty") }}</div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import type { Ref } from "vue";
import InfiniteLoading from "v3-infinite-loading";
import { useAuthStore } from "~/stores/auth";
import { useMessage } from "~/stores/messages";
import "v3-infinite-loading/lib/style.css";


// show messages chat
const route = useRoute();
const messages: any = ref([]);
const user: any = ref({});
const page: Ref<number> = ref(1);
const message = useMessage();
const authStore = useAuthStore();
const keyword = ref("");
const { $moment } = useNuxtApp();
const { $toast } = useNuxtApp();
const loading: Ref<boolean> = ref(true);

// show channels list
const dataChannel: any = ref([]);
const channel: any = ref({});
const search = ref("ALL");
const searchType = ref("searchType");
const isActive: any = ref("ALL");
const scroll: any = ref();
const channelId: any = ref();
const intervalChannel: any = ref(null);
const isHasChannel: any = ref(true);

// send message
const messageInput = ref("");

onMounted(() => {
  user.value = authStore.user;
  channelId.value = Number(route.params.id);
  getChannel();
  getChannels();
});

onBeforeUnmount(() => {
  clearInterval(intervalChannel.value);
});

watch(
  () => authStore.user,
  (newValue) => {
    user.value = newValue;
    window.Echo.private(`chat-${channelId.value}`).listen(
      "MessageSent",
      (e: any) => {
        const lastIndex = messages.value.length - 1;
        if (
          messages.value.length <= 0 ||
          e.user.id !== messages.value[lastIndex].user_id
        ) {
          messages.value.push({
            created_at: e.message.created_at,
            name: e.userChatting,
            user_id: e.user.id,
            msgs: [e.message],
            isCompanyUser: e.message.isCompanyUser
          });
        } else {
          messages.value[lastIndex].msgs.push(e.message);
        }
        updateToRead();
        scrollMessage();
      },
    );
  },
);

function scrollHeight() {
  const sc = document.getElementById("msg-history");
  if (sc != null) {
    sc.scrollTop = sc.scrollHeight - sc.clientHeight;
  }
}

// --------------------------Show message chat--------------------------------------
const load = async ($state: any) => {
  if(channelId.value == 0) return;
  try {
    const response = await message.getMessages(channelId.value, {
      page: page.value,
    });
    const data = response.data.data;
    messages.value.unshift(...data.messages);
    page.value++;
    if (data.last_page >= data.current_page) {
      $state.loaded();
    } else {
      $state.complete();
      scrollMessage();
    }
  } catch (error) {
    $state.error();
  }
};

// -----------------------------Date format-----------------------------------
function formatDat(date: string) {
  return $moment(date).calendar(null, {
    sameDay: "hh:mm A  | [今日]",
    nextDay: "hh:mm A  | [明日]",
    nextWeek: "hh:mm A  | YYYY/MM/DD",
    lastDay: "hh:mm A  | [昨日]",
    lastWeek: "hh:mm A  | YYYY/MM/DD",
    sameElse: "hh:mm A  | YYYY/MM/DD",
  });
}

function formatDateChannel(date: string) {
  return $moment(date).format("MMM DD");
}

// ---------------------------Get channels-------------------------------------
const getChannels = () => {
  const params = {
    search: search.value,
    searchType: searchType.value,
  };
  message.getChannels(channelId.value, params).then((response) => {
    loading.value = false;
    const data = response.data.data;
    dataChannel.value = data;
  });
};

const getChannel = () => {
  message.getChannel(channelId.value).then((response) => {
    const data = response.data.data;
    channel.value = data.channel;
    if(channelId.value === 0) {
      navigateTo({ path: `/message/channel/${data.channel.id}` })
    }
  }) 
  .catch((error: any) => {
    isHasChannel.value = false;
  });
};

const setClassActive = (active: string) =>
  active === isActive.value ? "active-btn" : "";
const setActive = (status: string) => {
  isActive.value = status;
  search.value = status;
  searchType.value = "searchType";
  keyword.value = "";
  getChannels();
};

function handleInput(event: any) {
  search.value = event.target.value;
}

function searchChannels() {
  searchType.value = "searchText";
  getChannels();
}

function startInterval() {
  intervalChannel.value = setInterval(() => {
    getChannels();
  }, 15000);
}

function scrollMessage() {
  setTimeout(() => {
    scrollHeight();
  }, 1000);
}

startInterval();

// -------------------------Send message---------------------------------------

function sendMessage() {
  if(messageInput.value != "") {
    message
      .sendMessage(channelId.value, { message: messageInput.value })
      .then(() => {
        messageInput.value = "";
      });
  }
}

// triger open input file
function openInputUploadFiles(type: string) {
  const fileUpload = document.getElementById(type);
  if (fileUpload != null) {
    fileUpload.click();
  }
}

function uploadAttachments(event: any, type: string) {
  const formData = new FormData();
  const ins = event.target.files.length;
  for (let x = 0; x < ins; x++) {
    formData.append(`${type}[]`, event.target.files[x]);
  }
  formData.append("type", type);
  message
    .sendMessage(channelId.value, formData as any)
    .then(() => {})
    .catch((error: any) => {
      $toast.error(error.response.data.message);
    });
}

function updateToRead() {
  message.updateToRead(channelId.value).then();
}
</script>
<style lang="scss">
@import "@/assets/scss/pages/message/_chat.scss";
</style>
