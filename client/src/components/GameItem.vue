<template>
  <li v-on:click="gameSelected">
      <p>{{ game.game[0].name }}</p>
  </li>
</template>

<script>
// Imports
import { eventBus } from "../main.js";

// game-item Component
export default {
    name: "game-item",
    props: ["game"],
    methods: {
        gameSelected: function() {
            eventBus.$emit("save-game-selected", this.game);
        }
    }
}
</script>

<style>
li{
    padding: 10px;
    font-weight: bold;
}
li:hover{
    background: rgb(201, 201, 201);
    cursor: pointer;
}
</style>
