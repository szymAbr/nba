import { reactive } from "vue";

export const store = {
  state: reactive({
    stats: [],
    id: [0],
    currentPlayer: {},
    playerName: null,
  }),
  clearStats() {
    this.state.stats.length = 0;
  },
  updateStats(stats) {
    this.state.stats.push(...stats);
  },
  updateId(id) {
    this.state.id = id;
  },
  updateCurrentPlayer(player) {
    this.state.currentPlayer = player;
  },
  updatePlayerName(name) {
    this.state.playerName = name;
  },
};
