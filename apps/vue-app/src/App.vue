<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="micro-app micro-app--vue">
    <span class="micro-app__badge">Vue 3</span>
    <h1>Vue 子应用</h1>
    <p>可独立运行，也可通过 bootstrap / mount / unmount 接入微前端基座。</p>
    <button type="button" @click="count++">Count: {{ count }}</button>
  </div>
</template>
