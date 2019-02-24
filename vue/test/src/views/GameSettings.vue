<style scoped>
  .left {
    width: 100%;
    height: 100%;
    padding: 20px;
  }
  .left h1 {
    font-size: 32px;
  }

  .left .decsription {
    font-size: 24px;
    min-height: 60px;
  }

  .checkbox-list {
    display: flex;
    flex-direction: column;
  }

  .checkbox-list .checkbox-item {
    display: flex;
  }

  .checkbox-list .checkbox-item > input {
    margin-right: 10px;
  }
</style>
<template>
  <div class="left">
    <h1>{{ title }}</h1>
    <div class="decsription">
      Добро пожаловать на {{1}} тренировочный день.<br/>
      Ваш последний результат - решено {{10}} из {{25}}.<br/>
      Общая точность {{80}}%.
    </div>

    <h2>Настройки</h2>

    <vue-slider v-model="durationSlider.value" v-bind="durationSlider.options"></vue-slider>
    <span>Длительность {{durationSlider.value}} минут</span>
    <vue-slider v-model="complexitySlider.value" v-bind="complexitySlider.options"></vue-slider>
    <span>Сложность {{complexitySlider.value}}</span>

    <div class="checkbox-list">
      <div class="checkbox-item">
        <input type="checkbox" v-model="checkBoxes" value="sum" />
        <span>Суммирование</span>
      </div>
      <div class="checkbox-item">
        <input type="checkbox" v-model="checkBoxes" value="diff" />
        <span>Разность</span>
      </div>
      <div class="checkbox-item">
        <input type="checkbox" v-model="checkBoxes" value="multiple" />
        <span>Умножение</span>
      </div>
      <div class="checkbox-item">
        <input type="checkbox" v-model="checkBoxes" value="separation" />
        <span>Деление</span>
      </div>
      <div class="checkbox-item">
        <input type="checkbox" v-model="checkBoxes" value="pow"/>
        <span>Возведение в степень</span>
      </div>
    </div>

    {{ checkBox }}

    <button @click="play()">Play</button>

  </div>

</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import vueSlider from 'vue-slider-component/src/vue2-slider.vue';

  @Component({
    components: {
      vueSlider
    }
  })
  export default class RightBar extends Vue {
    @Prop() private title!: string;

    public checkBoxes: Array;

    // noinspection JSUnusedGlobalSymbols
    mounted () {
      this.checkBoxes = [];
    }

    durationSlider = {
      value: 1,
      options: {
        min: 1,
        max: 15,
        tooltip: false,
        piecewiseLabel: true,
      },
    };

    complexitySlider = {
      value: 1,
      options: {
        min: 1,
        max: 10,
        tooltip: false,
        piecewiseLabel: true,
      },
    };

    play () {
      console.log(this.checkBoxes);
    }
  }
</script>
