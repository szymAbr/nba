<template>
  <div class="stats">
    <PlayerStats v-if="id" :id="id" />
    <div class="router-link">
      <router-link to="/" exact>Home</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import PlayerStats from "../components/PlayerStats.vue";
import { store } from "../store/store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Stats",
  components: {
    PlayerStats,
  },
  computed: {
    id() {
      return store.state.id as string | number;
    },
  },
});
</script>

<style scoped>
.router-link,
a,
a:visited {
  color: white;
  margin-bottom: 5rem;
}
</style>
