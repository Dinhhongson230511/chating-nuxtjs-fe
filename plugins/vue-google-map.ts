import {
  GoogleMap,
  Marker,
  Polyline,
  CustomMarker,
  MarkerCluster,
  HeatmapLayer,
} from "vue3-google-map";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("GoogleMap", GoogleMap);
  nuxtApp.vueApp.component("Marker", Marker);
  nuxtApp.vueApp.component("Polyline", Polyline);
  nuxtApp.vueApp.component("CustomMarker", CustomMarker);
  nuxtApp.vueApp.component("MarkerCluster", MarkerCluster);
  nuxtApp.vueApp.component("HeatmapLayer", HeatmapLayer);
});
