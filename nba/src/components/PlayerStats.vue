<template>
  <div class="container">
    <h2>Season 2018 average scores</h2>

    <h3>{{ playerName }}</h3>

    <div class="container-stats">
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
  </div>
</template>

<script lang="ts">
import PlayerStatsBlock from "./PlayerStatsBlock.vue";
import { store } from "../store/store";
import axios from "axios";
import { defineComponent } from "vue";
import StatsObject from "../types/StatsObject";

export default defineComponent({
  name: "PlayerStats",
  data() {
    return {
      stats: store.state.stats as StatsObject[],
      statsParams: ["pts", "ast", "blk", "stl", "turnover"] as string[],
      updated: false as boolean,
    };
  },
  components: {
    PlayerStatsBlock,
  },
  computed: {
    id(): number | number[] {
      return store.state.id;
    },

    currentPlayer(): any {
      return store.state.currentPlayer;
    },

    playerName(): string {
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

    gamesPlayed(): number {
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
          store.updateCurrentPlayer(response.data.data[0]);
        })
        .catch((error: string) => {
          console.log(error);
        })
        .finally(() => {
          console.log("data fetch complete");
        });
    },
  },
  watch: {
    id(newId: number | string) {
      sessionStorage.setItem("id", newId.toString());
    },

    currentPlayer(newPlayer: Object) {
      if (!this.updated) {
        this.updated = true;
      }

      const json = JSON.stringify(newPlayer);

      sessionStorage.setItem("player", json);
    },

    playerName(newName: string) {
      sessionStorage.setItem("name", newName);
    },

    gamesPlayed(newNum: number) {
      const games = document.getElementById("games");

      if (games) games.style.width = `${newNum}%`;
    },
  },
  created() {
    if (typeof store.state.id === "object") {
      const savedId: string | null = sessionStorage.getItem("id");

      savedId ? store.updateId(parseInt(savedId)) : null;
    }

    if (
      store.state.currentPlayer &&
      Object.keys(store.state.currentPlayer).length === 0
    ) {
      const json: string | null = sessionStorage.getItem("player");
      let savedPlayer = "";

      json ? (savedPlayer = JSON.parse(json)) : null;

      store.updateCurrentPlayer(savedPlayer);
    }

    if (!store.state.playerName) {
      const savedName: string | null = sessionStorage.getItem("name");

      savedName ? store.updatePlayerName(savedName) : null;
    }

    this.fetchStats();
  },
  mounted() {
    setTimeout(() => {
      const json: string = JSON.stringify(this.currentPlayer);

      sessionStorage.setItem("id", this.id.toString());
      sessionStorage.setItem("player", json);
      sessionStorage.setItem("name", this.playerName);
    }, 1000);
  },
  updated() {
    if (!this.updated) {
      this.fetchStats();
    }
  },
});
</script>

<style scoped>
h2 {
  margin-bottom: 4rem;
}

.container {
  width: 100%;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.container-stats {
  width: 40rem;
  margin-top: 4rem;
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
