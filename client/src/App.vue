<template>
  <div id="app">
    <game-grid :player="playerOne"></game-grid>
    <game-grid :player="playerTwo"></game-grid>
  </div>
</template>

<script>
import GameGrid from './components/GameGrid.vue';
import GameService from './services/GameService.js';

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
    saveGame() {},
    pullGame(){
      GameService.getGame()
      .then(result => {
        this.playerOne = result[0];
        this.playerTwo = result[1];
      });

    }
  },
  mounted() {
    this.pullGame();
  },
  computed: {},
  watch: {}
};
</script>


<style>
  #app {
    display: flex;
    justify-content: space-around;
  }
</style>