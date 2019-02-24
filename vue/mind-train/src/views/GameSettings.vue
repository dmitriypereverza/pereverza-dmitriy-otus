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

  .checkbox-list {
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
      Добро пожаловать на {{ daysInTraining + 1}} тренировочный день.<br/>
      Ваш последний результат - решено {{tasksSolved}} из {{tasksTotal}}.<br/>
      Общая точность {{accuracy}}%.
    </div>

    <h2>Настройки</h2>

    <vue-slider v-model="durationSlider.value" v-bind="durationSlider.options" @drag-end="onChangeDuration"></vue-slider>
    <span>Длительность {{durationSlider.value}} минут</span>
    <vue-slider v-model="complexitySlider.value" v-bind="complexitySlider.options" @drag-end="onChangeSkill"></vue-slider>
    <span>Сложность {{complexitySlider.value}}</span>

    <div class="checkbox-list">
      <label>
        <input type="checkbox" v-model="operations.add" @change="onChangeOperations"/> Суммирование
      </label>
      <label>
        <input type="checkbox" v-model="operations.sub" @change="onChangeOperations"/> Разность
      </label>
      <label>
        <input type="checkbox" v-model="operations.mul" @change="onChangeOperations"/> Умножение
      </label>
      <label>
        <input type="checkbox" v-model="operations.div" @change="onChangeOperations"/> Деление
      </label>
      <label>
        <input type="checkbox" v-model="operations.pow" @change="onChangeOperations"/> Возведение в степень
      </label>
    </div>

    <button @click="play()">Play</button>

  </div>

</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import vueSlider from 'vue-slider-component/src/vue2-slider.vue';
  import { State, Getter, Mutation } from 'vuex-class';

  @Component({
    components: {
      vueSlider
    }
  })
  export default class RightBar extends Vue {
    @Prop() private title!: string;
    @State onboardingSeen;
    @State operations;
    @Getter daysInTraining;
    @State tasksSolved;
    @Getter tasksTotal;
    @Getter accuracy;
    @State skill;
    @State duration;
    @Mutation changeOperations;
    @Mutation changeDuration;
    @Mutation changeSkill;

    public checkBoxes: any;

    durationSlider = {
      value: 0,
      options: {
        min: 1,
        max: 15,
        tooltip: false,
        piecewiseLabel: true,
      },
    };

    complexitySlider = {
      value: 0,
      options: {
        min: 1,
        max: 10,
        tooltip: false,
        piecewiseLabel: true,
      },
    };

    // noinspection JSUnusedGlobalSymbols
    created () {
      this.durationSlider.value = this.duration;
      this.complexitySlider.value = this.skill;
    }

    // noinspection JSUnusedGlobalSymbols
    onChangeOperations () {
      this.changeOperations(this.operations);
    }

    onChangeSkill() {
      this.changeSkill(this.complexitySlider.value);
    }

    onChangeDuration() {
      this.changeDuration(this.durationSlider.value);
    }

    play () {
      console.log(this.checkBoxes);
    }
  }
</script>
