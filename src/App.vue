<script setup lang="ts">
import ActivityHeart from './components/ActivityHeart.vue'
import Activity from './components/Activity.vue'
import LinkBroken02 from './components/LinkBroken02.vue';
import Share05 from './components/Share05.vue';
import Download04 from './components/Download04.vue';
import DownloadCloud01 from './components/DownloadCloud01.vue';
</script>

<template>
  <div>
    <ActivityHeart class="logo" />
    <Activity  class="logo"  />
    <LinkBroken02   class="logo" />
    <Share05  class="logo"  />
    <Download04  class="logo"  />
    <DownloadCloud01  class="logo"  />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  color: black;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
