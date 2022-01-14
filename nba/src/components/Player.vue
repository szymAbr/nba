<template>
  <div class="player">
    <h3>{{ player.first_name }} {{ player.last_name }}</h3>
    <h4>{{ player.team.full_name }}</h4>
  </div>
</template>

<script>
export default {
  name: "Player",
  props: {
    player: Object,
  },
};
</script>

<style scoped>
.player {
  background-color: grey;
}

h4 {
  margin-bottom: 0.5rem;
}
</style>
