<template>
  <div v-if="stats" class="players-list-main">
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
import StatsObject from "../types/StatsObject";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "PlayersList",
  components: {
    Player,
  },
  props: {
    stats: Array as PropType<StatsObject[]>,
  },
});
</script>

<style scoped>
.players-list-main {
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 5rem;
  display: grid;
  grid-gap: 1rem;
}

@media (min-width: 600px) {
  .players-list-main {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 800px) {
  .players-list-main {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1000px) {
  .players-list-main {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1200px) {
  .players-list-main {
    grid-template-columns: repeat(5, 1fr);
  }
}

.players-list-element {
  border: solid 2px white;
  background-color: rgba(9, 13, 80, 0.74);
}

li {
  padding: 0.5rem;
}
</style>
