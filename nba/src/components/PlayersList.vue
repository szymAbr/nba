<template>
  <ul class="players-list">
    <li v-for="player in stats" :key="player.player.id">
      <Player :player="player.player" />
    </li>
  </ul>
</template>

<script>
import Player from "./Player";
import { store } from "../store/store";

export default {
  name: "PlayersList",
  components: {
    Player,
  },
  data() {
    return {
      stats: store.state.stats,
    };
  },
};
</script>

<style scoped>
.players-list {
  width: 30%;
  margin: auto;
}

li {
  padding: 0.5rem;
}
</style>
