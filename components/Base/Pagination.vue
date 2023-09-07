<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-template-shadow -->
<template>
  <div v-if="props?.paginate?.num_page > 1" class="paginate">
    <nav aria-label="Page navigation example">
      <ul class="pagination mb-0">
        <li
          class="page-item"
          @click="changePage(props?.paginate.current_page - 1)"
        >
          <a class="page-link" href="javascript:void(0)">&lt;</a>
        </li>
        <template v-if="props?.paginate.current_page > 1">
          <li class="page-item" @click="changePage(1)">
            <a class="page-link" href="javascript:void(0)">1</a>
          </li>
          <template v-if="displayedPages[0] > 2">
            <li class="page-item disabled">
              <a class="page-link" href="javascript:void(0)">...</a>
            </li>
          </template>
        </template>

        <template v-for="page in displayedPages" :key="page">
          <li
            class="page-item"
            :class="{ active: page === props?.paginate?.current_page }"
            @click="changePage(page)"
          >
            <a class="page-link" href="javascript:void(0)">{{ page }}</a>
          </li>
        </template>

        <template
          v-if="props?.paginate.current_page < props?.paginate.num_page"
        >
          <template
            v-if="
              props?.paginate.num_page -
                displayedPages[displayedPages.length - 1] >
              1
            "
          >
            <li class="page-item disabled">
              <a class="page-link" href="javascript:void(0)">...</a>
            </li>
          </template>
          <li class="page-item" @click="changePage(props?.paginate.num_page)">
            <a class="page-link" href="javascript:void(0)">{{
              props?.paginate.num_page
            }}</a>
          </li>
        </template>
        <li
          class="page-item"
          @click="
            props?.paginate?.current_page < props?.paginate?.num_page
              ? changePage(props?.paginate.current_page + 1)
              : ''
          "
        >
          <a class="page-link" href="javascript:void(0)">&gt;</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  paginate: {
    type: Object,
    required: true,
  },
  changePage: {
    type: Function,
    required: true,
  },
});

const displayedPages = computed(() => {
  const { current_page } = props.paginate;
  const numPages = props.paginate.num_page;

  const pages: any = [current_page];
  const pageRange = 1;
  for (let i = 1; i <= pageRange; i++) {
    if (current_page - i > 1) {
      pages.unshift(current_page - i);
    }
  }
  // Show pages after the current page
  for (let i = 1; i <= pageRange; i++) {
    if (current_page + i < numPages) {
      pages.push(current_page + i);
    }
  }
  return pages;
});
</script>

<style lang="scss" scoped>
.paginate {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
</style>
