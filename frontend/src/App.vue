<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="app-container">
    <header>
      <Navbar />
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full viewport height */
}

main {
  flex-grow: 1; /* Makes it take remaining space */
  overflow-y: auto; /* Allows scrolling by default */
}
</style>

