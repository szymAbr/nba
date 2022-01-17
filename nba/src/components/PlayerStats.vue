<template>
  <div class="container">
    <h6>ID: {{ id }}</h6>
    <h6>currentPlayer: {{ currentPlayer }}</h6>

    <h2>Season 2018 average scores</h2>

    <h3>{{ playerName }}</h3>

    <div class="container-stats">
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
  // props: {
  //   id: Number,
  // },
  data() {
    return {
      stats: store.state.stats,
      savedId: 0,
      savedPlayer: {},
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
        if (obj.player.id === this.currentPlayer.player_id) {
          const player = obj.player;

          return `${player.first_name} ${player.last_name}`;
        }
      }
      return "kaszanka";
    },
  },
  // keep id and player in sessionStorage!

  // created() {
  //   const json = sessionStorage.getItem("currentPlayer");

  //   this.savedId = sessionStorage.getItem("id");
  //   this.savedPlayer = JSON.parse(json);

  //   console.log(`savedId: ${this.savedId}`);
  //   console.log("savedPlayer:");
  //   console.log(this.savedPlayer);
  // },
  updated() {
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
  },
  beforeUnmount() {
    const json = JSON.stringify(this.currentPlayer);

    sessionStorage.setItem("id", this.id);
    sessionStorage.setItem("currentPlayer", json);
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
