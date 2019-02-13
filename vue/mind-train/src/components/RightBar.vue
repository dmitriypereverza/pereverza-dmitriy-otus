<style scoped>
  .right {
    background-color: #7f7f7f;
    width: 100%;
    height: 100%;
  }
</style>
<template>
  <div class="right">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class RightBar extends Vue {
        @Prop() private msg!: string;
    }
</script>
