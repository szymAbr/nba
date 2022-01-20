<template>
  <div>
    <PlayersList :stats="stats" />
  </div>
</template>

<script lang="ts">
import PlayersList from "../components/PlayersList.vue";
import axios from "axios";
import { store } from "../store/store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {
    PlayersList,
  },
  computed: {
    stats() {
      return store.state.stats;
    },
  },
  created() {
    axios
      .get("https://www.balldontlie.io/api/v1/stats")
      .then((response) => {
        store.updateStats(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
});
</script>
