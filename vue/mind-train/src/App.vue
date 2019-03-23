<style>
  #app {
    display: flex;
    width: 70%;
    margin: 60px auto auto;
  }
</style>

<template>
  <div id="app">
    <router-view></router-view>
    <v-dialog/>
  </div>
</template>

<script>
  export default {
    name: "app",
  };
</script>
