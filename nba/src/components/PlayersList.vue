<template>
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

<script lang="ts">
import Player from "./Player.vue";
import { store } from "../store/store";
import StatsObject from "../types/StatsObject";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PlayersList",
  components: {
    Player,
  },
  data() {
    return {
      stats: store.state.stats as StatsObject[],
    };
  },
});
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
  background-color: rgba(9, 13, 80, 0.74);
}

li {
  padding: 0.5rem;
}
</style>
