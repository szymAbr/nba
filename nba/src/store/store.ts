import { reactive } from "vue";

export const store = {
  state: reactive({
    stats: [],
    id: 0,
    currentPlayer: {},
    playerName: "",
  }),
  clearStats() {
    this.state.stats.length = 0;
  },
  updateStats(stats: any) {
    this.state.stats = stats;
  },
  updateId(id: number) {
    this.state.id = id;
  },
  updateCurrentPlayer(player: Object) {
    this.state.currentPlayer = player;
  },
  updatePlayerName(name: string) {
    this.state.playerName = name;
  },
};
