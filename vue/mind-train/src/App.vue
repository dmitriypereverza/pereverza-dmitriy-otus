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

  export default {
    name: 'app'
  }
</script>
