<template>
  <b-list-group-item >
    {{ layer.name }}
  </b-list-group-item>
</template>

<script>
export default {
  name: 'Layer',
  props: {
    layer: {
      type: Object
    }
  }
}
</script>

<style>
</style>
