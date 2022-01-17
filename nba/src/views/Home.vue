<template>
  <div>
    <PlayersList />
  </div>
</template>

<script>
import PlayersList from "../components/PlayersList";
import axios from "axios";
import { store } from "../store/store";

export default {
  name: "Home",
  components: {
    PlayersList,
  },
  data() {
    return {
      loading: true,
      stats: [],
    };
  },
  created() {
    axios
      .get("https://www.balldontlie.io/api/v1/stats")
      .then((response) => {
        this.stats = response.data.data;

        store.clearStats();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        store.updateStats(this.stats);

        this.loading = false;
      });
  },
};
</script>
