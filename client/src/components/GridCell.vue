<template>
  <div v-on:click="handleSelect()" class="cell" :class="[cell.state, noBorder]">
      <p v-if="cell.state !== 'untouched'">&#x25CF</p>
  </div>
</template>

<script>
import { eventBus } from '../main';

export default {
    name: 'grid-cell',
    props: ['cell', 'noBorder'],
    methods: {
        handleSelect(){
            if (this.cell.state === "untouched" && !this.noBorder) {
                eventBus.$emit('cell-selected', this.cell)
            }
        }
    }
}
</script>

<style>
    .cell {
        border-bottom: 1px solid black;
        border-left: 1px solid black;
        text-align: center;
        cursor: crosshair;
    }
    .cell > p {
        font-size: 2.5em;
        margin: 0;
        user-select: none;
    }
    .hit > p {
        color: red;
    }
    .miss > p {
        color: white;
    }
    .untouched:hover {
        border: 3px solid black;
    }
    .no-highlight:hover {
        border-bottom: 1px solid black;
        border-left: 1px solid black;
        border-right: none;
        border-top: none;
    }
</style>