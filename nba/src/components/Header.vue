<template>
  <header>
    <h2>NBA Players</h2>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
});
</script>

<style scoped>
header {
  color: red;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 43px;
  -webkit-text-stroke: 2px white;
  margin: 1rem;
}
</style>
