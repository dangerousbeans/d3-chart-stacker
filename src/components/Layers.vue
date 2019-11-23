<template>
  <div >
    <h3>Layers</h3>

    <b-list-group>
      <draggable v-model="layers" group="layers" @start="drag=true" @end="drag=false">
        <Layer v-for="layer in layers" v-bind:key="layer.key" :layer="layer"></Layer>
      </draggable>
    </b-list-group>
  </div>
</template>

<script>
import Layer from './Layer.vue'
import draggable from 'vuedraggable'

export default {
  name: 'Layers',
  components: {
    Layer,
    draggable
  },
  data() {
    return {
      layers: [
        {
          key: 1,
          name: "energy use",
          values: [ 1,2,3 ]
        },
        {
          key: 2,
          name: "energy consumption",
          values: [ 1,2,3 ]
        }
      ]
    }
  }
}
</script>

<style>
</style>
