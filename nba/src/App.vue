<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <Header />
  <PlayersList v-bind:players="players"/>
</template>

<script>
import Header from "./components/Header";
import PlayersList from "./components/PlayersList";
import axios from "axios";

export default {
  name: "App",
  components: {
    Header,
    PlayersList,
  },
  data() {
    return {
      loading: true,
      players: [],
    };
  },
  created() {
    axios
      .get("https://www.balldontlie.io/api/v1/players")
      .then((response) => {
        this.players = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
