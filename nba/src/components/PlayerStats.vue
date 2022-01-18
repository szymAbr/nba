<template>
  <div class="container">
    <h6>ID: {{ id }}</h6>
    <h6>currentPlayer: {{ currentPlayer }}</h6>

    <h2>Season 2018 average scores</h2>

    <h3>{{ playerName }}</h3>

    <div class="container-stats" v-if="currentPlayer">
      <dl class="stats">
        <dt>Games played</dt>
        <dd>{{ currentPlayer.games_played }}</dd>
      </dl>

      <dl class="stats">
        <dt>PTS</dt>
        <dd>{{ currentPlayer.pts }}</dd>
      </dl>

      <dl class="stats">
        <dt>AST</dt>
        <dd>{{ currentPlayer.ast }}</dd>
      </dl>

      <dl class="stats">
        <dt>BLK</dt>
        <dd>{{ currentPlayer.blk }}</dd>
      </dl>

      <dl class="stats">
        <dt>STL</dt>
        <dd>{{ currentPlayer.stl }}</dd>
      </dl>

      <dl class="stats">
        <dt>TO</dt>
        <dd>{{ currentPlayer.turnover }}</dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { store } from "../store/store";
import axios from "axios";

export default {
  name: "PlayerStats",
  data() {
    return {
      stats: store.state.stats,
      // playerName: "",
      updated: false,
    };
  },
  computed: {
    id() {
      return store.state.id;
    },

    currentPlayer() {
      return store.state.currentPlayer;
    },

    playerName() {
      for (let obj of this.stats) {
        if (
          this.currentPlayer &&
          obj.player.id === this.currentPlayer.player_id
        ) {
          const player = obj.player;

          return `${player.first_name} ${player.last_name}`;
        }
      }
      return null;
    },
  },
  watch: {
    id(newId) {
      console.log(newId);

      sessionStorage.setItem("id", newId);
    },

    currentPlayer(newPlayer) {
      if (!this.updated) {
        this.updated = true;
        console.log(newPlayer);
      }

      const json = JSON.stringify(newPlayer);

      sessionStorage.setItem("player", json);
    },
  },
  created() {
    if (typeof store.state.id === "object") {
      const savedId = sessionStorage.getItem("id");

      store.updateId(savedId);
    }

    if (
      store.state.currentPlayer &&
      Object.keys(store.state.currentPlayer).length === 0
    ) {
      const json = sessionStorage.getItem("player");
      const savedPlayer = JSON.parse(json);

      store.updateCurrentPlayer(savedPlayer);
    }
  },
  updated() {
    if (!this.updated) {
      axios
        .get(
          `https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=${this.id}`
        )
        .then((response) => {
          store.updateCurrentPlayer(...response.data.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
};
</script>

<style scoped>
.container {
  width: 50%;
  margin: auto;
}

.container-stats {
  background-color: rgb(55, 68, 182);
}

.stats {
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
