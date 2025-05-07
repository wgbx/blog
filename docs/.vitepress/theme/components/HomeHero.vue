<template>
  <div class="content">
    <img :src="theme.profile" width="135" height="135" class="profile" />
  </div>
</template>

<script lang="ts" setup>
import { useData } from 'vitepress'
const { theme } = useData()
</script>

<style scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
}
.profile {
  border-radius: 50%;
  cursor: pointer;
  border: 5px solid var(--vp-profile-border);
}

@keyframes profile-transform {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.profile:hover {
  animation: 5s linear 0s infinite profile-transform;
}
</style>
