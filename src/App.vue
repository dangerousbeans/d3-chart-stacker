<template>
  <div id="app">
    <b-container>
      <h1>D3 Chart Stacker</h1>
      
      <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
      <b-row>
        <b-col cols="9">
          <Chart />
        </b-col>
        <b-col>
          <Layers />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Chart from './components/Chart.vue'
import Layers from './components/Layers.vue'

export default {
  name: 'app',
  components: {
    Chart,
    Layers
  }
}
</script>

<style>
#app {
  
}
</style>
