<template>
  <Header />
  <router-view></router-view>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style>
#app {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

html,
body {
  background-color: rgb(58, 67, 146);
}
</style>
