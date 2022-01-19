<template>
  <!-- <ul class="players-list">
    <li v-for="player in stats" :key="player.player.id">
      <Player :player="player.player" />
    </li>
  </ul> -->

  <div class="players-list-main">
    <div
      class="players-list-element"
      v-for="player in stats"
      :key="player.player.id"
    >
      <Player :player="player.player" />
    </div>
  </div>
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
.players-list-main {
  width: 80%;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(5, 10rem);
  grid-template-rows: repeat(5, 10rem);
}

.players-list-element {
  border: solid 2px white;
  /* background-color: rgb(199, 110, 68); */
  background-color: rgba(9, 13, 80, 0.74);
}

li {
  padding: 0.5rem;
}
</style>
