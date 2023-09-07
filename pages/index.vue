<template>
  <div>
    <div class="section-banner-search">
      <Carousel :wrap-around="true" :autoplay="5000">
        <Slide key="1">
          <div class="carousel__item">
            <img
              src="~/assets/images/banner/freepik_19954644_1.png"
              alt=""
              :class="'image-carousel'"
            />
            <div>Rettyで自分にBESTなお店をさがそう</div>
          </div>
        </Slide>
        <Slide key="2">
          <div class="carousel__item">
            <img
              src="~/assets/images/banner/pathway-middle-buildings-dark-sk.png"
              alt=""
              class="image-carousel"
            />
            <div>Rettyで自分にBESTなお店をさがそう</div>
          </div>
        </Slide>
        <Slide key="3">
          <div class="carousel__item">
            <img
              src="~/assets/images/banner/day-city-view_1.png"
              alt=""
              class="image-carousel"
            />
            <div>Rettyで自分にBESTなお店をさがそう</div>
          </div>
        </Slide>
        <template #addons>
          <Pagination />
        </template>
      </Carousel>
      <div
        class="section_search d-flex justify-content-center"
        :class="{
          'z-index-9':
            !hiddenModalObsession || !hiddenModalGenre || !hiddenModalArea,
        }"
      >
        <div class="shadow d-inline-block box_search">
          <label>{{ $t("common.search.title") }}</label>
          <div class="form_search d-flex row border">
            <div class="col-11">
              <div class="row">
                <div
                  class="col-2 border-end p-0 d-flex justify-content-between align-items-center px-2 filter-option"
                  @click="handleShowHiddenModalArea"
                >
                  <span class="text-truncate me-2">
                    {{
                      !dataAreaLength
                        ? $t("common.search.placeholder.area")
                        : ""
                    }}
                    {{ !!dataAreaLength ? `エリア (${dataAreaLength})` : "" }}
                  </span>
                  <img src="~/assets/images/icon/icon-down.svg" alt="icon" />
                </div>
                <div class="col-2 border-end p-0">
                  <BaseFormDatePicker
                    v-model="dataFormSearch.date"
                    :placeholder="$t('common.search.placeholder.date')"
                    :required="false"
                    :custom-class="'border-0 mb-0 mt-0'"
                    format-date="MM月dd日"
                  />
                </div>
                <div class="col-1 border-end p-0 select-search">
                  <select
                    v-model="dataFormSearch.time"
                    class="form-select border-0"
                    aria-label="Default select example"
                    @change="handleChangeSelect"
                  >
                    <option selected :value="''">時間</option>
                    <option
                      v-for="index in listHoursInDay"
                      :key="index"
                      :value="index"
                    >
                      {{ index }}
                    </option>
                  </select>
                  <span>
                    {{ $t("home.search.time") }}
                  </span>
                </div>
                <div class="col-1 border-end p-0 select-search">
                  <select
                    v-model="dataFormSearch.max_people"
                    class="form-select border-0"
                    aria-label="Default select example"
                    @change="handleChangeSelect"
                  >
                    <option selected :value="''">人数</option>
                    <option v-for="index in 100" :key="index" :value="index">
                      {{ index }}
                    </option>
                  </select>
                  <span>
                    {{ $t("common.people") }}
                  </span>
                </div>
                <div
                  class="col-2 border-end p-0 d-flex justify-content-between align-items-center px-2 filter-option"
                  @click="handleShowHiddenModalGenre"
                >
                  <span class="text-truncate me-2">
                    {{ $t("common.search.placeholder.gerne") }}
                    {{ !!dataDishLength ? `(${dataDishLength})` : "" }}
                  </span>
                  <img src="~/assets/images/icon/icon-down.svg" alt="icon" />
                </div>
                <div
                  class="col-2 border-end p-0 d-flex justify-content-between align-items-center px-2 filter-option"
                  @click="handleShowHiddenModalObsession"
                >
                  <span class="text-truncate me-2">
                    {{ $t("common.search.placeholder.category") }}
                    {{ !!obsessionLength ? `(${obsessionLength})` : "" }}
                  </span>
                  <img src="~/assets/images/icon/icon-down.svg" alt="icon" />
                </div>
                <div class="col-2 border-end p-0">
                  <BaseFormInput
                    v-model="dataFormSearch.keyword"
                    :placeholder="$t('common.search.placeholder.key_word')"
                    :custom-class="'border-0 mb-0'"
                    @input="handleInputKeyUp"
                  />
                </div>
              </div>
            </div>
            <div class="col-1 p-0">
              <button
                class="btn btn-primary w-100 btn-search"
                @click="handleSearch"
              >
                検索({{ totalStores }}件)
              </button>
            </div>
            <div
              class="bg-white position-absolute modal-show-filter border rounded modal-area"
              :class="{ 'd-none': hiddenModalArea }"
            >
              <BaseModalSearchArea
                :data-prefecture="dataPrefecture"
                @sub-area-checked="handleGetDataAreaCheckedIds"
              />
            </div>
            <div
              class="bg-white position-absolute modal-show-filter border rounded p-20 modal-genre"
              :class="{ 'd-none': hiddenModalGenre }"
            >
              <SearchStoreGenre
                :data-categories="dataCategories"
                @sub-categories-checked="handleGetDataDishCheckedIds"
              />
            </div>
            <div
              class="bg-white position-absolute modal-show-filter border rounded modal-obsession"
              :class="{ 'd-none': hiddenModalObsession }"
            >
              <SearchStoreObsession
                :data-room-seat-types="dataRoomSeatTypes"
                :data-allergy-compatibilities="dataAllergyCompatibilities"
                :data-dietary-restrictions="dataDietaryRestrictions"
                @obsession="handleGetDataObsession"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="list_store_map">
      <div class="list_store position-relative">
        <div class="list_store--header position-map-btn">
          <div class="list_store--tabs">
            <button
              class="list_store--item-tabs border-0"
              :class="{ 'color-tabs-orange': !isShowMap }"
              role="button"
              @click="showListStore"
            >
              <img
                src="~/assets/images/icon/tour-list.svg"
                alt="tour"
                :class="{ 'tour-list': !isShowMap }"
              />
              <span>{{ $t("home.btn_list_store") }}</span>
            </button>
            <button
              class="list_store--item-tabs border-0"
              :class="{ 'color-tabs-orange': isShowMap }"
              role="button"
              @click="showMap"
            >
              <img
                src="~/assets/images/icon/map.svg"
                alt="map"
                :class="{ 'tour-list': isShowMap }"
              />
              <span>{{ $t("home.btn_map_store") }}</span>
            </button>
          </div>
        </div>
        <div v-show="!isShowMap" class="list_store--main">
          <BaseLoading v-if="loadingList" />
          <div v-else>
            <StoreListItem
              v-for="(item, index) in dataResponse.list.stores"
              :key="index"
              :store="item"
            />
          </div>
          <div class="paginate_list_store">
            <BasePagination
              :paginate="dataResponse.list.paginate"
              :change-page="changePage"
            />
          </div>
        </div>
        <div v-show="isShowMap" id="mapContainer" class="map_container">
          <div ref="listStore" class="list_store">
            <BaseLoading v-if="loading" />
            <div v-else>
              <StoreItem
                v-for="(item, index) in dataResponse.stores"
                :id="`storeItem${item.lat}`"
                :key="index"
                :store="item"
                :handle-goto-store="handleGotoStore"
                :class="{ active_store: activeStoreItemLatLng == item.lat }"
              />
              <div v-if="!dataResponse.stores.length" class="store_not_found">
                {{ $t("store.store_not_found") }}
              </div>
            </div>
          </div>
          <div id="map" class="map-store">
            <GoogleMap
              ref="mapRef"
              :api-key="apiKeyGoogle"
              style="width: 100%; height: 100%"
              :center="locationDefault"
              :zoom="9"
              :max-zoom="19"
              :min-zoom="3"
              gesture-handling="greedy"
            >
              <MarkerCluster>
                <Marker
                  v-for="(location, i) in locations"
                  :key="i"
                  :options="{
                    position: location,
                    icon:
                      activeStoreItemLatLng == location.lat
                        ? getImageIcon('maker_active.svg')
                        : getImageIcon('maker.svg'),
                  }"
                  :clickable="true"
                  @click="handleClickMarker(location)"
                />
              </MarkerCluster>
            </GoogleMap>

            <div class="toggle_list_store" @click="handleCloseListStoreMap">
              <img
                :src="
                  !isShowListStoreMap
                    ? getImageIcon('icon-close-sidebar.svg')
                    : getImageIcon('icon-open-sidebar.svg')
                "
                width="24"
                height="24"
                alt="icon close and open map"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="dataResponse.storesOrdered?.length">
      <StoreProposal :list-store="dataResponse.storesOrdered" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import { listHoursInDay } from "@/constants/fakeDataSearch";
import {
  useSearchStore,
  ICategory,
  IPrefecture,
  IRoomSeatType,
  IAllergyCompatibilities,
  IDietaryRestriction,
} from "~/stores/SearchStore";
definePageMeta({
  layout: "user",
});
const searchStore = useSearchStore();
const dataCategories: Ref<ICategory[]> = ref([]);
const dataPrefecture: Ref<IPrefecture[]> = ref([]);
const dataRoomSeatTypes: Ref<IRoomSeatType[]> = ref([]);
const dataAllergyCompatibilities: Ref<IAllergyCompatibilities[]> = ref([]);
const dataDietaryRestrictions: Ref<IDietaryRestriction[]> = ref([]);
const loading = ref(true);
const loadingList = ref(true);

searchStore.getCategories().then((response) => {
  dataCategories.value = response.data.data?.categories;
  dataPrefecture.value = response.data.data?.prefectures;
  dataRoomSeatTypes.value = response.data.data?.roomSeatTypes;
  dataAllergyCompatibilities.value = response.data.data?.allergyCompatibilities;
  dataDietaryRestrictions.value = response.data.data?.dietaryRestrictions;
});

// show genre filter
const hiddenModalGenre = ref(true);
const handleShowHiddenModalGenre = (event: Event) => {
  event.stopPropagation();
  hiddenModalGenre.value = !hiddenModalGenre.value;
  hiddenModalArea.value = true;
  hiddenModalObsession.value = true;
};

// show areas
const hiddenModalArea = ref(true);
const handleShowHiddenModalArea = (event: Event) => {
  event.stopPropagation();
  hiddenModalArea.value = !hiddenModalArea.value;
  hiddenModalGenre.value = true;
  hiddenModalObsession.value = true;
};

// show obsession
const hiddenModalObsession = ref(true);
const handleShowHiddenModalObsession = (event: Event) => {
  event.stopPropagation();
  hiddenModalObsession.value = !hiddenModalObsession.value;
  hiddenModalArea.value = true;
  hiddenModalGenre.value = true;
};

useDetectOutsideClick((event: Event) => {
  const modalGenre = document.querySelector(".modal-genre");
  const modalArea = document.querySelector(".modal-area");
  const modalObsession = document.querySelector(".modal-obsession");
  if (modalGenre && !modalGenre.contains(event.target as HTMLInputElement)) {
    hiddenModalGenre.value = true;
  }
  if (modalArea && !modalArea.contains(event.target as HTMLInputElement)) {
    hiddenModalArea.value = true;
  }
  if (
    modalObsession &&
    !modalObsession.contains(event.target as HTMLInputElement)
  ) {
    hiddenModalObsession.value = true;
  }
});

const isShowMap = ref(true);
const isShowListStoreMap = ref(false);
const showMap = () => {
  isShowMap.value = true;
};
const showListStore = () => {
  isShowMap.value = false;
};
const handleCloseListStoreMap = () => {
  document
    .getElementById("mapContainer")
    ?.classList.toggle("close-list-store-map");
  isShowListStoreMap.value = !isShowListStoreMap.value;
};

// search
const defaultPage = 1;
const defaultNumberPage = "10";
const mapRef = ref(null);
const dataDishLength = ref(0);
const obsessionLength = ref(0);
const activeStoreItemLatLng = ref(0);
const dataAreaLength = ref(0);
const page = ref(defaultPage);
const totalPerPage = ref(defaultPage);
const apiKeyGoogle = getApiKeyGoogle();
const timeOutInputKeyword = ref();
const listStore: any = ref(null);

const dataFormSearch = ref({
  keyword: "",
  max_people: "",
  date: "",
  time: "",
  sub_categories_ids: "",
  parking: "",
  type_seat_ids: "",
  allergy_compatibility_ids: "",
  dietary_restriction_ids: "",
  area_ids: "",
  smoking_policy: "",
  paginate: "",
  page: page.value,
});
const dataStorePaginate = ref({});
const totalStores = ref(0);
const locations: Ref<{ lat: number; lng: number }[]> = ref([]);
const locationDefault: Ref<{ lat: number; lng: number }> = ref({
  lat: 35.68294120549073,
  lng: 139.76687997680727,
});

const dataResponse: any = reactive({
  list: [],
  stores: [],
  storesOrdered: [],
});

const handleGetDataObsession = (data: any) => {
  obsessionLength.value = 0;
  Object.entries(data || []).map((item: any) => {
    obsessionLength.value += item[1].length;
    return obsessionLength;
  });
  dataFormSearch.value = {
    ...dataFormSearch.value,
    type_seat_ids: data.roomSeatTypeChecked.length
      ? `[${data.roomSeatTypeChecked}]`
      : "",
    allergy_compatibility_ids: data.allergyCompatChecked.length
      ? `[${data.allergyCompatChecked}]`
      : "",
    dietary_restriction_ids: data.dietaryRestrictionChecked.length
      ? `[${data.dietaryRestrictionChecked}]`
      : "",
    parking: `${data.parkingChecked.length > 1 ? "" : data.parkingChecked}`,
    smoking_policy: `${data.smokingChecked}`,
  };
  handleGetCountStore();
};

const handleGetDataDishCheckedIds = (data: any) => {
  dataDishLength.value = data.value.length;
  dataFormSearch.value = {
    ...dataFormSearch.value,
    sub_categories_ids: data.value.length ? `[${data.value}]` : "",
  };
  handleGetCountStore();
};

const handleGetDataAreaCheckedIds = (data: any) => {
  dataAreaLength.value = data.value.length;
  dataFormSearch.value = {
    ...dataFormSearch.value,
    area_ids: data.value.length ? `[${data.value}]` : "",
  };
  handleGetCountStore();
};

const handleLocation = () => {
  locations.value = [];
  dataResponse.stores.map((store: any) => {
    const itemLatLng = {
      lat: parseFloat(store.lat),
      lng: parseFloat(store.long),
    };
    return locations.value.push(itemLatLng);
  });
};

const handleSearchStore = async () => {
  loading.value = true;
  dataResponse.stores = [];
  dataFormSearch.value = {
    ...dataFormSearch.value,
    paginate: "",
    page: defaultPage,
  };

  await searchStore.searchStore(dataFormSearch.value).then((response) => {
    loading.value = false;
    const { data } = response.data;
    const { stores, paginate } = data;
    dataStorePaginate.value = paginate;
    totalPerPage.value = paginate.num_page;
    totalStores.value = paginate.total;
    dataResponse.stores = stores;
    handleLocation();
  });
};

const handleGotoStore = (data: any) => {
  activeStoreItemLatLng.value = data.lat;
  if (mapRef.value?.ready) {
    mapRef.value.map.panTo({
      lat: Number(data.lat),
      lng: Number(data.long),
    });
    mapRef.value.map.setZoom(10);
  }
};

const handleGetCountStore = async () => {
  await searchStore.getCountStore(dataFormSearch.value).then((response) => {
    totalStores.value = response;
  });
};

const handleChangeSelect = () => {
  handleGetCountStore();
};

// get location current for map
const showCurrentPosition = (position: any) => {
  locationDefault.value = {
    lat: Number(position.coords.latitude),
    lng: Number(position.coords.longitude),
  };
  return locationDefault;
};
const locationTurnOff = () => locationDefault;
const handleGetLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showCurrentPosition, locationTurnOff, {
      timeout: 1000,
      enableHighAccuracy: true,
      maximumAge: 1000,
    });
  } else locationTurnOff();
};

const handleInputKeyUp = () => {
  if (timeOutInputKeyword.value) {
    clearTimeout(timeOutInputKeyword.value);
  }
  timeOutInputKeyword.value = setTimeout(() => {
    handleGetCountStore();
  }, 500);
};

const handleClickMarker = (location: any) => {
  activeStoreItemLatLng.value = location.lat;
  const element = document.getElementById(`storeItem${location.lat}`);
  if (element) {
    listStore.value.scrollTop = element.offsetTop;
  }
};

// open search store list
const handleSearchStoreList = async (page: number) => {
  dataResponse.list = [];
  dataFormSearch.value = {
    ...dataFormSearch.value,
    paginate: defaultNumberPage,
    page,
  };
  loadingList.value = true;
  await searchStore.searchStore(dataFormSearch.value).then((response) => {
    loadingList.value = false;
    const { data } = response.data;
    dataResponse.list = data;
    handleLocation();
  });
};

const changePage = (index: number) => {
  if (page.value === index) return;
  page.value = index;
  dataFormSearch.value = {
    ...dataFormSearch.value,
    paginate: defaultNumberPage,
    page: index,
  };
  handleSearchStoreList(index);
};
// close search store list
const handleSearch = () => {
  handleSearchStore();
  handleSearchStoreList(defaultPage);
};

const handleGetStoresOrdered = () => {
  searchStore.getStoreOrdered().then((response) => {
    const { data } = response.data;
    dataResponse.storesOrdered = data;
  });
};

onMounted(async () => {
  handleGetLocation();
  handleSearchStore();
  handleGetStoresOrdered();
  await handleSearchStoreList(defaultPage);
});
</script>
<style lang="scss">
@import "@/assets/scss/pages/home/style.scss";
</style>
