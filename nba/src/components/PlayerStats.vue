<template>
  <div class="container">
    <h2>Season 2018 average scores</h2>

    <h3>{{ playerName }}</h3>

    <div class="container-stats">
      <!-- <div class="stats chart">
        <h4>Games played</h4>
        <h3>{{ currentPlayer ? currentPlayer.games_played : "-" }}</h3>
      </div> -->

      <p>Games played</p>
      <div class="container-chart">
        <div id="games">
          {{ currentPlayer ? gamesPlayed : "-" }}
        </div>
      </div>

      <div class="container-blocks">
        <div class="stats block" v-for="param in statsParams" :key="param">
          <PlayerStatsBlock :param="param" :currentPlayer="currentPlayer" />
        </div>
      </div>
    </div>

    <!-- <PlayerStatsChart /> -->
  </div>
</template>

<script>
// import PlayerStatsChart from "./PlayerStatsChart";
import PlayerStatsBlock from "./PlayerStatsBlock";
import { store } from "../store/store";
import axios from "axios";

export default {
  name: "PlayerStats",
  data() {
    return {
      stats: store.state.stats,
      statsParams: ["pts", "ast", "blk", "stl", "turnover"],
      updated: false,
    };
  },
  components: {
    // PlayerStatsChart,
    PlayerStatsBlock,
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
          const fullName = `${player.first_name} ${player.last_name}`;

          return fullName;
        }
      }
      return store.state.playerName;
    },

    gamesPlayed() {
      return this.currentPlayer.games_played;
    },
  },
  methods: {
    fetchStats() {
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
          console.log("data fetch done");
        });
    },
  },
  watch: {
    id(newId) {
      sessionStorage.setItem("id", newId);
    },

    currentPlayer(newPlayer) {
      if (!this.updated) {
        this.updated = true;
      }

      const json = JSON.stringify(newPlayer);

      sessionStorage.setItem("player", json);
    },

    playerName(newName) {
      sessionStorage.setItem("name", newName);
    },

    gamesPlayed(newNum) {
      const games = document.getElementById("games");

      if (games) games.style.width = `${newNum}%`;
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

    if (!store.state.playerName) {
      const savedName = sessionStorage.getItem("name");

      store.updatePlayerName(savedName);
    }

    this.fetchStats();
  },
  mounted() {
    setTimeout(() => {
      const json = JSON.stringify(this.currentPlayer);

      sessionStorage.setItem("id", this.id);
      sessionStorage.setItem("player", json);
      sessionStorage.setItem("name", this.playerName);
    }, 1000);
  },
  updated() {
    console.log("===updated===");
    if (!this.updated) {
      this.fetchStats();
    }
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  /* margin: auto; */
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.container-stats {
  width: 40rem;
  margin-top: 5rem;
}

.chart {
  font-size: 1.6rem;
}

.container-blocks {
  display: flex;
  justify-content: space-evenly;
  margin-top: 3rem;
  margin-bottom: 3rem;
}

.block {
  border: solid 2px white;
  background-color: rgba(9, 13, 80, 0.74);
  color: white;
  width: 20%;
}

.stats {
  /* width: 100%; */
  /* display: flex;
  align-items: center;
  justify-content: space-between;
  color: black;
  margin: 0.5rem 6rem; */
}

.container-chart {
  box-sizing: border-box;
  width: 100%;
  background-color: #ddd;
}

#games {
  width: 90%;
  color: white;
  background-color: #bf7c18;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
