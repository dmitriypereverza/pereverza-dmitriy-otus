<style scoped>
  .left {
    background-color: #7f7f7f;
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

    <vue-slider v-model="sliders.durationSlider.value" v-bind="sliders.durationSlider.options"></vue-slider>
    <span>Длительность {{sliders.durationSlider.value}} минут</span>
    <vue-slider v-model="sliders.complexitySlider.value" v-bind="sliders.complexitySlider.options"></vue-slider>
    <span>Сложность {{sliders.complexitySlider.value}}</span>

    <div class="checkbox-list">
      <div class="checkbox-item">
        <input type="checkbox" v-model="checkBoxes.checkSums" />
        <span>Суммирование</span>
      </div>
      <div class="checkbox-item">
        <input type="checkbox" v-model="checkBoxes.checkDifferent" />
        <span>Разность</span>
      </div>
      <div class="checkbox-item">
        <input type="checkbox" v-model="checkBoxes.checkMultiple" />
        <span>Умножение</span>
      </div>
      <div class="checkbox-item">
        <input type="checkbox" v-model="checkBoxes.checkSeparation" />
        <span>Деление</span>
      </div>
      <div class="checkbox-item">
        <input type="checkbox" v-model="checkBoxes.checkPow" />
        <span>Возведение в степень</span>
      </div>
    </div>

    <button @click="submit()">OK</button>

  </div>

</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import vueSlider from 'vue-slider-component/src/vue2-slider.vue';

    @Component({
        components: {
            vueSlider,
        }
    })
    export default class LeftBar extends Vue {
        @Prop() private title!: string;

        checkBoxes = {
            checkSums: false,
            checkDifferent: false,
            checkMultiple: false,
            checkSeparation: false,
            checkPow: false,
        };

        sliders = {
            durationSlider: {
                value: 1,
                options: {
                    min: 1,
                    max: 15,
                    tooltip: false,
                    piecewiseLabel: true,
                },
            },
            complexitySlider: {
                value: 1,
                options: {
                    min: 1,
                    max: 10,
                    tooltip: false,
                    piecewiseLabel: true,
                },
            },
        };

        // noinspection JSUnusedLocalSymbols
        private submit() {
            console.log(this.checkBoxes);
        }
    }
</script>
