<style>
  #app {
    display: flex;
    width: 70%;
    margin: 60px auto auto;
  }
</style>

<template>
  <div id="app">
    <LeftBar title="Привет"/>
    <RightBar msg="Правый"/>
  </div>
</template>

<script>
  import LeftBar from './components/LeftBar.vue';
  import RightBar from './components/RightBar.vue';

  export default {
    name: 'app',
    components: {
      LeftBar,
      RightBar,
    }
  }
</script>
