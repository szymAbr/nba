<template>
  <div class="player">
    <h2>{{ player.first_name }} {{ player.last_name }}</h2>
    <div class="router-link stats-link" @click="onClick">
      <router-link to="/stats">Show stats...</router-link>
    </div>
  </div>
</template>

<script>
import { store } from "../store/store";

export default {
  name: "Player",
  props: {
    player: Object,
  },
  data() {
    return {
      id: store.state.id,
    };
  },
  methods: {
    onClick() {
      store.updateId(this.player.id);
    },
  },
};
</script>

<style scoped>
.player {
  background-color: grey;
}

h4 {
  margin-bottom: 0.5rem;
}
</style>
