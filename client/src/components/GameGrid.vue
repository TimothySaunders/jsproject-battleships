<template>
    <section class="grid">
        <grid-cell v-for="(cell, key) in player.grid" :key="key" :cell="cell" :id="cell.coords"/>
    </section>
</template>

<script>
import GridCell from './GridCell.vue';

export default {
    name: 'game-grid',
    props: ['player'],
    components: {'grid-cell': GridCell}
};
</script>

<style>
    .grid{
        display: grid;
    }
</style>