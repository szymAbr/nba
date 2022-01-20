<template>
  <h4>{{ checkParam() }}</h4>
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
  },
});
</script>

<style scoped></style>
