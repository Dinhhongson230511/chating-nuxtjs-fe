<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="w-100 p-3">
    <div class="d-flex justify-content-between align-items-center w-25">
      <select
        :value="selectedValue"
        class="form-select w-75"
        aria-label="Default select example"
        @change="changeSelect($event)"
      >
        <option value="" selected>{{}}</option>
        <option
          v-for="(item, index) in props.dataPrefecture"
          :key="index"
          :value="item.id"
        >
          {{ item.name }}
        </option>
      </select>
      <div class="d-flex justify-content-center align-items-center">
        <input
          :id="`allArea${selectedValue}`"
          v-model="checkedAllArea"
          :disabled="!selectedValue"
          type="checkbox"
          class="me-2"
          @change="handleCheckAllArea($event, dataAreas)"
        />
        <label :for="`allArea${selectedValue}`">全域</label>
      </div>
    </div>
    <div v-if="props.dataPrefecture?.length" class="data-sub-area mt-2">
      <div v-for="(area, index) in dataAreas" :key="index">
        <div class="d-flex justify-content-start align-items-center">
          <input
            :id="`id${area.id}`"
            v-model="areaChecked"
            :value="area.id"
            type="checkbox"
            class="checkbox-search"
            @change="openSubArea($event, area)"
          />
          <label role="button" :for="`id${area.id}`" class="ms-2">
            {{ area?.name }}
          </label>
        </div>
        <div
          v-if="area?.sub_areas.length"
          :id="area.name + area.id"
          class="d-none sub-area"
        >
          <div
            v-for="(itemSubArea, indexSubArea) in area?.sub_areas"
            :key="indexSubArea"
            class="ms-3 d-flex justify-content-start align-items-center"
          >
            <input
              :id="itemSubArea.name + itemSubArea.id"
              v-model="subAreas"
              :value="itemSubArea.id"
              type="checkbox"
              class="checkbox-search"
              @change="handleCheckSubArea($event, area)"
            />
            <label
              role="button"
              :for="itemSubArea.name + itemSubArea.id"
              class="ms-2"
            >
              {{ itemSubArea?.name }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { IPrefecture, IArea } from "~/stores/SearchStore";
const emit = defineEmits<{
  (e: "subAreaChecked", areaChecked: any): void;
}>();

const props = defineProps({
  dataPrefecture: {
    type: Object,
    required: true,
  },
});

const dataAreas: Ref<IArea[]> = ref([]);
const selectedValue = ref("");
const areaChecked: any = ref([]);
const subAreas: any = ref([]);
const checkedAllArea: any = ref(false);

const changeSelect = (event: Event) => {
  event.preventDefault();
  // eslint-disable-next-line array-callback-return
  props.dataPrefecture.filter((item: IPrefecture) => {
    selectedValue.value = (event.target as HTMLInputElement).value;
    if (Number(item.id) === Number((event.target as HTMLInputElement).value)) {
      dataAreas.value = item.areas;
      areaChecked.value = [];
      subAreas.value = [];
      checkedAllArea.value = false;
      const subAreaClass = document.querySelectorAll(".sub-area");
      subAreaClass.forEach(function (div) {
        div.classList.add("d-none");
      });
      emit("subAreaChecked", subAreas);
    }
  });
};

const handleCheckSubArea = (event: Event, area: any) => {
  event.preventDefault();
  const subAreaIds = area?.sub_areas.map((e: any) => e.id);
  const elementArea = document.getElementById(
    `id${area.id}`,
  ) as HTMLInputElement;
  elementArea.checked = subAreaIds.every((subAreaId: any) =>
    subAreas.value.includes(subAreaId),
  );

  // checked area
  if (elementArea.checked) areaChecked.value.push(area?.id);
  else
    areaChecked.value = areaChecked.value.filter((id: any) => id !== area.id);

  // checked all areas
  checkedAllArea.value = areaChecked.value.length === dataAreas.value.length;

  emit("subAreaChecked", subAreas);
};

const openSubArea = (event: Event, dataItem: IArea) => {
  event.preventDefault();
  const showItem = document.getElementById(`${dataItem.name}${dataItem.id}`);
  showItem?.classList.toggle("d-none");
  const data = dataItem.sub_areas.map((i: any) => i.id);
  const check = areaChecked.value.includes(dataItem.id);
  checkedAllArea.value = dataAreas.value.length === areaChecked.value.length;
  if (check) subAreas.value = [...subAreas.value, ...data];
  else subAreas.value = subAreas.value.filter((x: number) => !data.includes(x));
  emit("subAreaChecked", subAreas);
};

const handleCheckAllArea = (event: Event, prefecture: any) => {
  event.preventDefault();
  if (checkedAllArea.value) {
    areaChecked.value = prefecture.map((x: any) => x.id);
    subAreas.value = prefecture
      ?.map((x: any) => {
        return x.sub_areas.map((y: any) => y.id);
      })
      .flat(Infinity);
  } else {
    areaChecked.value = [];
    subAreas.value = [];
  }
  emit("subAreaChecked", subAreas);
};
</script>
