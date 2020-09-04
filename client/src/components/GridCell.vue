<template>
  <div v-on:click="handleSelect()">
      <!-- <img src="" alt="" v-if="cell.state === 'hit'">
      <img src="" alt="" v-if="cell.state === 'nothit'"> -->
      <p>{{ cell.coords }}</p>
  </div>
</template>

<script>
import { eventBus } from '../main';

export default {
    name: 'grid-cell',
    props: ['cell'],
    methods: {
        handleSelect(){
            eventBus.$emit('cell-selected', this.cell);
            // console.log("cell clicked");
        }
    }
}
</script>

<style>

</style>