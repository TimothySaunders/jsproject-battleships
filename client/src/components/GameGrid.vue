<template>
    <div>
        <section v-if="gameState==='setUp' && playerTurn!==player.playerName" class="unplacedShips">
            <div v-for="(ship, key) in unplacedShips" :key="key">
                <img :src="ship.imgURL" :class="ship.type.slice(0, 3)" :width="(ship.length * 40)" >
            </div>
        </section>
        <section v-if="gameState!=='setUp' ||  playerTurn===player.playerName" class="grid" :id="player.playerName">
            <grid-cell
                v-for="(cell, key) in player.grid"
                :key="key"
                :cell="cell"
                :id="'g-' + cell.coords.x + cell.coords.y"
                :noBorder="noBorder"
                :ships="player.ships.notSunk"
                :gameState="gameState"
            ></grid-cell>
        </section>
    </div>
</template>

<script>
import GridCell from "./GridCell.vue";

export default {
  name: "game-grid",
  props: ["player", "playerTurn", "gameState"],
  data(){
      return {
          unplacedShips: [
              {type:"frigate", length: 3, imgURL:require('@/assets/ships/destroyer.png')},
              {type:"destroyer", length: 4, imgURL:require('@/assets/ships/destroyer.png')},
              {type:"submarine", length: 3, imgURL:require('@/assets/ships/submarine.png')}]
      }
  },
  components: { "grid-cell": GridCell },
  computed: {
      noBorder (){
        if (this.playerTurn === this.player.playerName) {
        return "no-highlight";
        }
    }
  }
}
</script>

<style>
/* #g-00 {
  grid-area: 00;
}
#g-01 {
  grid-area: 01;
}
#g-02 {
  grid-area: 02;
}
#g-03 {
  grid-area: 03;
}
#g-04 {
  grid-area: 04;
}
#g-05 {
  grid-area: 05;
}
#g-06 {
  grid-area: 06;
}
#g-07 {
  grid-area: 07;
}
#g-10 {
  grid-area: 10;
}
#g-11 {
  grid-area: 11;
}
#g-12 {
  grid-area: 12;
}
#g-13 {
  grid-area: 13;
}
#g-014 {
  grid-area: 14;
}
#g-15 {
  grid-area: 15;
}
#g-16 {
  grid-area: 16;
}
#g-17 {
  grid-area: 17;
}
#g-20 {
  grid-area: 20;
}
#g-21 {
  grid-area: 21;
}
#g-22 {
  grid-area: 22;
}
#g-23 {
  grid-area: 23;
}
#g-24 {
  grid-area: 24;
}
#g-25 {
  grid-area: 25;
}
#g-26 {
  grid-area: 26;
}
#g-27 {
  grid-area: 27;
}
#g-30 {
  grid-area: 30;
}
#g-31 {
  grid-area: 31;
}
#g-32 {
  grid-area: 32;
}
#g-33 {
  grid-area: 33;
}
#g-34 {
  grid-area: 34;
}
#g-35 {
  grid-area: 35;
}
#g-36 {
  grid-area: 36;
}
#g-37 {
  grid-area: 37;
}
#g-40 {
  grid-area: 40;
}
#g-41 {
  grid-area: 41;
}
#g-42 {
  grid-area: 42;
}
#g-43 {
  grid-area: 43;
}
#g-44 {
  grid-area: 44;
}
#g-45 {
  grid-area: 45;
}
#g-46 {
  grid-area: 46;
}
#g-47 {
  grid-area: 47;
}
#g-50 {
  grid-area: 50;
}
#g-51 {
  grid-area: 51;
}
#g-52 {
  grid-area: 52;
}
#g-53 {
  grid-area: 53;
}
#g-54 {
  grid-area: 54;
}
#g-55 {
  grid-area: 55;
}
#g-56 {
  grid-area: 56;
}
#g-57 {
  grid-area: 57;
}
#g-60 {
  grid-area: 60;
}
#g-61 {
  grid-area: 61;
}
#g-62 {
  grid-area: 62;
}
#g-63 {
  grid-area: 63;
}
#g-64 {
  grid-area: 64;
}
#g-65 {
  grid-area: 65;
}
#g-66 {
  grid-area: 66;
}
#g-67 {
  grid-area: 67;
}
#g-70 {
  grid-area: 70;
}
#g-71 {
  grid-area: 71;
}
#g-72 {
  grid-area: 72;
}
#g-73 {
  grid-area: 73;
}
#g-74 {
  grid-area: 74;
}
#g-75 {
  grid-area: 75;
}
#g-76 {
  grid-area: 76;
}
#g-77 {
  grid-area: 77;
} */
.grid {
  background-image: url("../assets/ocean1.jpg");
  background-size: 100% 100%;
  width: 100%;
  height: 40vh;
  border-top: 1px solid black;
  border-right: 1px solid black;
  display: grid;
  grid-template-areas:
    "70 71 72 73 74 75 76 77"
    "60 61 62 63 64 65 66 67"
    "50 51 52 53 54 55 56 57"
    "40 41 42 43 44 45 46 47"
    "30 31 32 33 34 35 36 37"
    "20 21 22 23 24 25 26 27"
    "10 11 12 13 14 15 16 17"
    "00 01 02 03 04 05 06 07";
  grid-template-rows: repeat(8, 1fr);
  grid-template-columns: repeat(8, 1fr);
}

.gal {
    grid-area: gal;
}
.fri {
    grid-area: fri;
}
.sub {
    grid-area: suu;
}
.des {
    grid-area: des;
}
.car {
    grid-area: car;
}

.unplacedShips {
display: grid;
width: 25%;
border: 1px solid black;
  grid-template-areas:
    "gal gal ... ... ..."
    "fri fri fri ... ..."
    "suu suu suu ... ..."
    "des des des des ..."
    "car car car car car";
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(5, 1fr);
}

</style>