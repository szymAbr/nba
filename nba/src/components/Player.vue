<template>
  <div class="player">
    <h2>
      {{ player ? player.first_name : null }}
      {{ player ? player.last_name : null }}
    </h2>
    <div class="router-link" @click="onClick">
      <router-link to="/stats">Show stats</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { store } from "../store/store";
import Player from "../types/Player";

export default defineComponent({
  name: "Player",
  props: {
    player: Object as PropType<Player>,
  },
  data() {
    return {
      id: store.state.id as number | number[],
    };
  },
  methods: {
    onClick() {
      store.updateId(this.player!.id);
    },
  },
});
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
