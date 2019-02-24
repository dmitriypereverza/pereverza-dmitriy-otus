<style lang="scss">
  .home {
    display: flex;
  }
</style>
  <template>
  <div class="home">
    <GameSettings title="Welcome to Your Vue.js."/>
    <RightBar msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RightBar from '../components/RightBar.vue'; // @ is an alias to /src
import GameSettings from './GameSettings.vue'; // @ is an alias to /src

@Component({
  components: {
    RightBar,
    GameSettings,
  },
})
export default class Home extends Vue {}
</script>
