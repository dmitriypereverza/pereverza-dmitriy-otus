<style>
  #app {
    display: flex;
    width: 70%;
    margin: 60px auto auto;
  }
</style>

<template>
  <div id="app">
    <router-link to="/">Home</router-link> |
    <router-link to="/game">Game</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  import GameSettings from './views/GameSettings.vue';
  import RightBar from './components/RightBar.vue';

  export default {
    name: 'app',
    components: {
      GameSettings,
      RightBar,
    }
  }
</script>
