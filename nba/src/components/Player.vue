<template>
  <div class="player">
    <h2>{{ player.first_name }} {{ player.last_name }}</h2>
    <div class="router-link" @click="onClick">
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.player > h2 {
  margin-top: 2rem;
  font-size: 1.2rem;
}

.router-link {
  margin-bottom: 2rem;
  color: white;
}

a,
a:visited {
  color: white;
}
</style>
