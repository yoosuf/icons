<template>
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg">
    
    <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
   <!-- Embed the SVG content directly -->
  </svg>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  width: { type: String, default: '24' },
  height: { type: String, default: '24' },
  fill: { type: String, default: 'currentColor' },
  stroke: { type: String, default: 'none' },
  class: { type: String, default: '' },
  style: { type: String, default: '' },
  viewBox: { type: String, default: '0 0 24 24' },
  ariaHidden: { type: Boolean, default: true }
});
</script>