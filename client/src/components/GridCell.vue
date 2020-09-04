<template>
  <div v-on:click="handleSelect()" class="cell" :class="cell.state">
      <p v-if="cell.state !== 'untouched'">&#x25CF</p>
  </div>
</template>

<script>
import { eventBus } from '../main';

export default {
    name: 'grid-cell',
    props: ['cell'],
    methods: {
        handleSelect(){
            eventBus.$emit('cell-selected', this.cell)
        }
    }
}
</script>

<style>
    .cell {
        border-bottom: 1px solid black;
        border-left: 1px solid black;
        text-align: center;
    }
    .cell > p {
        font-size: 2.5em;
        margin: 0;
    }
    .hit > p {
        color: red;
    }
    .miss > p {
        color: white;
    }
</style>