<template>
  <h4 :title="paramInfo()">{{ checkParam() }}</h4>
  <h3>{{ currentPlayer ? currentPlayer[param] : "-" }}</h3>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PlayerStatsBlock",
  props: {
    param: String,
    currentPlayer: Object,
  },
  methods: {
    checkParam() {
      if (this.param === "turnover") {
        return "TO";
      } else {
        return this.param.toUpperCase();
      }
    },

    paramInfo() {
      switch (this.param) {
        case "pts":
          return "points";
        case "ast":
          return "assists";
        case "blk":
          return "blocks";
        case "stl":
          return "steals";
        case "turnover":
          return "turnovers";
        default:
          break;
      }
    },
  },
});
</script>
