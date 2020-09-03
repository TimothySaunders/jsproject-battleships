<template>
  <div id="app"></div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      playerOne: [],
      playerTwo: [],
      playerTurn: null,
      turns: 0
    };
  },
  components: {
    //game-grid
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