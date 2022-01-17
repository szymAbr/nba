<template>
  <div class="stats">
    <PlayerStats v-if="id" :id="parseInt(id)" />
    <router-link to="/" exact>Home</router-link>
  </div>
</template>

<script>
import PlayerStats from "../components/PlayerStats";
import { store } from "../store/store";

export default {
  name: "Stats",
  components: {
    PlayerStats,
  },
  computed: {
    id() {
      return store.state.id;
    },
  },
};
</script>
