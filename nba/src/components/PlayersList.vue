<template>
  <ul class="players-list">
    <li v-for="player in players" :key="player.id">
      <Player v-bind:player="player" />
    </li>
  </ul>
</template>

<script>
import Player from "./Player";

export default {
  name: "PlayersList",
  props: {
    players: Array,
  },
  components: {
    Player,
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
