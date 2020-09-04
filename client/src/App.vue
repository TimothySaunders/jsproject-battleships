<template>
  <div id="app"></div>
</template>

<script>
import GameGrid from './components/GameGrid.vue';

export default {
  name: "App",
  data() {
    return {
      playerOne: {},
      playerTwo: {},
      playerTurn: null,
      turns: 0
    };
  },
  components: {
    'game-grid': GameGrid
  },
  methods: {
    checkIfHit() {},
    switchPlayer() {},
    checkIfShipSunk() {},
    checkIfAllSunk() {},
    saveGame() {}
  },
  mounted() {},
  computed: {},
  watch: {}
};
</script>


<style>
</style>