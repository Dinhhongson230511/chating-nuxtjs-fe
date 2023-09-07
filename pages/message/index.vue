<template>
  <NuxtLayout name="admin">
    <div class="content pt-3">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#" class="text-decoration-none d-flex align-items-center">
              <img
                src="~/assets/images/icon/home.svg"
                alt="home"
                class="me-2"
              />
              {{ $t("common.breadcrumb.home") }}
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ $t("message.breadcrumb_page") }}
          </li>
        </ol>
      </nav>
      <div class="content__header">
        <div class="header_left">
          <div class="title">{{ $t("message.title") }}</div>
        </div>
        <div class="header_right row">
          <div class="btn-search-area col-9">
            <BaseFormInput
              type="text"
              :placeholder="$t('message.key_word_placeholder')"
              :required="false"
              v-model="keyword"
            />
          </div>
          <div class="col-3">
            <div class="btn_submit mt-2">
              <Button class="btn btn-create" @click="searchChannels">
                {{ $t("tour.btn_search") }}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div class="content__body mt-3">
        <div>
          <BaseLoading v-if="loading" />
          <div v-else class="table_list">
            <table v-if="channels.length" class="table table-striped">
              <thead>
                <tr>
                  <th scope="col-1">No.</th>
                  <th scope="col-2">
                    {{ $t("message.table.channel_name") }}
                  </th>
                  <th scope="col-2">
                    {{ $t("message.table.date") }}
                  </th>
                  <th scope="col-2" class="col-1">
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(channel, key) in channels" :key="channel.id">
                  <td scope="row">
                      {{
                        key + 1
                      }}
                  </td>
                  <td class="">
                    <div class="text-name">{{ channel.display_name }}</div>
                  </td>
                  <td class="">
                    <div class="text-name">
                      {{ 
                        $moment(channel.created_at).format("YYYY-MM-DD HH:mm:ss") 
                      }}
                    </div>
                  </td>
                  <td class="">
                    <div class="text-name">
                      <nuxt-link :to="`/message/channel/${channel?.id}`">
                        <img
                          src="~/assets/images/icon/chat-message.svg"
                          alt="plus"
                          width="16"
                          height="16"
                        />
                      </nuxt-link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else class="data_empty">
              <img src="~/assets/images/icon/empty.png" alt="empty" />
              <div>{{ $t("customer.table.empty") }}</div>
            </div>
            <BasePagination
              :paginate="channels.paginate"
              :change-page="changePage"
            />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMessage } from "~/stores/messages";
import { NUMBER_PER_PAGE } from "~/constants/const";

const { $moment } = useNuxtApp();
const message = useMessage();
const channels: any = ref([]);
const keyword = ref("");
const loading: Ref<boolean> = ref(true);
const page = ref(1);

const getChannels = (page: number) => {
  loading.value = true;
  const params = { 
    search: keyword.value,
    page: page
  }
  message.getListChannel(params).then((response: any) => {
    loading.value = false;
    const channelList = response.data.data;
    channels.value = channelList.data;
  });
};

function searchChannels() {
  getChannels(page.value);
}

const changePage = (index: number) => {
  if (page.value === index) return;
  page.value = index;
  getChannels(page.value);
};

getChannels(page.value);
</script>
<style lang="scss">
@import "@/assets/scss/pages/tours/style.scss";
</style>
