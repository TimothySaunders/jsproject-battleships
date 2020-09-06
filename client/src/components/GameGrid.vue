<template>
  <div>
    <!-- ship selection grid-->
    <section v-if="gameState==='setUp' && playerTurn!==player.playerName" class="unplacedShips">
      <h2 class="head"> Position Your Fleet!</h2>
      <div
        v-for="(ship, key) in unplacedShips"
        :key="key"
        class="shipIcon"
        :class="ship.type.slice(0, 4).toLowerCase()"
        draggable="true"
        v-on:dragstart="startDrag($event, ship)"
        :id="ship.type"
      >
        <img :src="ship.imgURL" :width="(ship.length * 53)" draggable="false"/>
      </div>
      <div
        v-for="(ship, index) in unplacedShips"
        :class="ship.type.slice(0, 1).toLowerCase() +'nam'"
        :key="index + 5"
      >
        <p>{{ship.type}} Name:</p>
        <input type="text" style="width: 90px;" v-model="unplacedShips[index].name"/>
      </div>
      <div class="sail">
        <button v-on:click="submitFleet()" >Set Sail!</button>
      </div>
    </section>
    <!-- game grid -->
    <section
      v-if="gameState!=='setUp' ||  playerTurn===player.playerName"
      class="grid"
      :id="player.playerName"
    >
      <grid-cell
        v-for="(cell, key) in player.grid"
        :key="key"
        :cell="cell"
        :id="'g-' + cell.coords.x + cell.coords.y"
        :noBorder="noBorder"
        :ships="player.ships.notSunk"
        :gameState="gameState"
        :selectedShip="selectedShip"
      ></grid-cell>
    </section>
  </div>
</template>

<script>
import GridCell from "./GridCell.vue";
import { eventBus } from "@/main.js";

export default {
  name: "game-grid",
  props: ["player", "playerTurn", "gameState", "selectedShip"],
  data() {
    return {
      unplacedShips: [
        {
          name: "",
          type: "Frigate",
          length: 3,
          imgURL: require("@/assets/ships/frigate.png"),
          coords: []
        },
        {
          name: "",
          type: "Destroyer",
          length: 4,
          imgURL: require("@/assets/ships/destroyer.png"),
          coords: []
        },
        {
          name: "",
          type: "Submarine",
          length: 3,
          imgURL: require("@/assets/ships/submarine.png"),
          coords: []
        },
      ]
    };
  },
  components: { "grid-cell": GridCell },
  computed: {
    noBorder() {
      if (this.playerTurn === this.player.playerName) {
        return "no-highlight";
      }
    },
  },
  methods: {
    startDrag(event, ship) {
      eventBus.$emit('change-selected-ship', ship);
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("html", event.target);
    },
    submitFleet(){
      if (this.unplacedShips.every(ship => ship.coords.length >0)) {
        //probably an eventbus
      }
    }
  },
  mounted(){
    eventBus.$on('place-ship', (coords) => {
      const shipIndex = this.unplacedShips.indexOf(this.selectedShip)
      // shipIndex evaluates to -1 and then to correct value
        // runs the if statement twice so always gets it on the second attempt
      if (shipIndex >= 0) {
        this.unplacedShips[shipIndex].coords = coords
      
        // grid rows are numbered 1-8 top-to-botom
        // our coords are numbered 0-7 bottom-to-top
        const row = 8 - parseInt(coords[0][0])
        const startCol = parseInt(coords[0][1]) + 1
        const endCol = startCol + this.unplacedShips[shipIndex].length - 1
        const newShipImage = document.createElement("img")
        newShipImage.classList.add("new-ship-image")
        newShipImage.src = this.selectedShip.imgURL
        newShipImage.width = this.selectedShip.length * 53
        newShipImage.draggable = false
        newShipImage.style.gridRow = `${row} / ${row}`
        newShipImage.style.gridColumn = `${startCol} / ${endCol}`
        event.target.parentNode.appendChild(newShipImage)

        //make source ship opaque and undraggable to avoid duplicate drags
        const sourceShip = document.querySelector(`#${this.selectedShip.type}`)
        sourceShip.draggable = false
        sourceShip.querySelector("img").style.opacity="0.35"
      }
    })
  }
};
</script>

<style>
.grid {
  background-image: url("../assets/ocean1.jpg");
  background-size: 100% 100%;
  width: 424px;
  height: 424px;
  border-top: 1px solid black;
  border-right: 1px solid black;
  display: grid;
  grid-template-areas:
    "g70 g71 g72 g73 g74 g75 g76 g77"
    "g60 g61 g62 g63 g64 g65 g66 g67"
    "g50 g51 g52 g53 g54 g55 g56 g57"
    "g40 g41 g42 g43 g44 g45 g46 g47"
    "g30 g31 g32 g33 g34 g35 g36 g37"
    "g20 g21 g22 g23 g24 g25 g26 g27"
    "g10 g11 g12 g13 g14 g15 g16 g17"
    "g00 g01 g02 g03 g04 g05 g06 g07";
  grid-template-rows: repeat(8, 1fr);
  grid-template-columns: repeat(8, 1fr);
}

.unplacedShips {
  background-image: url("../assets/ocean1.jpg");
  background-size: 100% 100%;
  width: 424px;
  height: 424px;
  display: grid;
  width: 424px;
  height: 424px;
  border: 1px solid black;
  grid-template-areas:
    ".... .... head head head head .... ...."
    ".... .... head head head head .... ...."
    "gnam gnam gnam gall gall .... .... ...."
    "fnam fnam fnam frig frig frig .... ...."
    "snam snam snam subm subm subm .... ...."
    "dnam dnam dnam dest dest dest .... ...."
    "cnam cnam cnam carr carr carr carr carr"
    ".... .... .... sail sail .... .... ....";
  grid-template-rows: repeat(8, 1fr);
  grid-template-columns: repeat(8, 1fr);
}

.unplacedShips > div {
  text-align: center;
}

.unplacedShips > div > p {
  margin: 8px 0 0 2px;
  font-weight: bold;
}
.unplacedShips > div > input {
  margin: 0;
}

.shipIcon {
  cursor: grab;
}

.head {
    grid-area: head;
}

.gall {
  grid-area: gall;
}
.gnam {
  grid-area: gnam;
}
.frig {
  grid-area: frig;
}
.fnam {
  grid-area: fnam;
}
.subm {
  grid-area: subm;
}
.snam {
  grid-area: snam;
}
.dest {
  grid-area: dest;
}
.dnam {
  grid-area: dnam;
}
.carr {
  grid-area: carr;
}
.cnam {
  grid-area: cnam;
}
.sail {
  grid-area: sail;
  margin-top: 16px;
}


#g-00 {
  grid-area: g00;
}
#g-01 {
  grid-area: g01;
}
#g-02 {
  grid-area: g02;
}
#g-03 {
  grid-area: g03;
}
#g-04 {
  grid-area: g04;
}
#g-05 {
  grid-area: g05;
}
#g-06 {
  grid-area: g06;
}
#g-07 {
  grid-area: g07;
}
#g-10 {
  grid-area: g10;
}
#g-11 {
  grid-area: g11;
}
#g-12 {
  grid-area: g12;
}
#g-13 {
  grid-area: g13;
}
#g-014 {
  grid-area: g14;
}
#g-15 {
  grid-area: g15;
}
#g-16 {
  grid-area: g16;
}
#g-17 {
  grid-area: g17;
}
#g-20 {
  grid-area: g20;
}
#g-21 {
  grid-area: g21;
}
#g-22 {
  grid-area: g22;
}
#g-23 {
  grid-area: g23;
}
#g-24 {
  grid-area: g24;
}
#g-25 {
  grid-area: g25;
}
#g-26 {
  grid-area: g26;
}
#g-27 {
  grid-area: g27;
}
#g-30 {
  grid-area: g30;
}
#g-31 {
  grid-area: g31;
}
#g-32 {
  grid-area: g32;
}
#g-33 {
  grid-area: g33;
}
#g-34 {
  grid-area: g34;
}
#g-35 {
  grid-area: g35;
}
#g-36 {
  grid-area: g36;
}
#g-37 {
  grid-area: g37;
}
#g-40 {
  grid-area: g40;
}
#g-41 {
  grid-area: g41;
}
#g-42 {
  grid-area: g42;
}
#g-43 {
  grid-area: g43;
}
#g-44 {
  grid-area: g44;
}
#g-45 {
  grid-area: g45;
}
#g-46 {
  grid-area: g46;
}
#g-47 {
  grid-area: g47;
}
#g-50 {
  grid-area: g50;
}
#g-51 {
  grid-area: g51;
}
#g-52 {
  grid-area: g52;
}
#g-53 {
  grid-area: g53;
}
#g-54 {
  grid-area: g54;
}
#g-55 {
  grid-area: g55;
}
#g-56 {
  grid-area: g56;
}
#g-57 {
  grid-area: g57;
}
#g-60 {
  grid-area: g60;
}
#g-61 {
  grid-area: g61;
}
#g-62 {
  grid-area: g62;
}
#g-63 {
  grid-area: g63;
}
#g-64 {
  grid-area: g64;
}
#g-65 {
  grid-area: g65;
}
#g-66 {
  grid-area: g66;
}
#g-67 {
  grid-area: g67;
}
#g-70 {
  grid-area: g70;
}
#g-71 {
  grid-area: g71;
}
#g-72 {
  grid-area: g72;
}
#g-73 {
  grid-area: g73;
}
#g-74 {
  grid-area: g74;
}
#g-75 {
  grid-area: g75;
}
#g-76 {
  grid-area: g76;
}
#g-77 {
  grid-area: g77;
}
</style>