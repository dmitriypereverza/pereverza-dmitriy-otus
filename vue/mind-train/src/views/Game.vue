<template>
  <div class="right">
    <div class="top-panel">
      <button class="btn btn-cancel" @click="gameStop">
        <span>X </span>Отмена
      </button>
      <button class="btn btn-cancel" @click="onDebug">
        Debug
      </button>
      <div class="btn timer">{{ timeRemained }}</div>
    </div>

    <div class="formula">
      <expression-viewer :question="question"/>
      <div class="formula-answer">
        = {{ question.equalValue }}
      </div>
    </div>

    <div class="calc-panel">
      <div class="calc-row">
        <div class="number"><span>1</span></div>
        <div class="number"><span>2</span></div>
        <div class="number"><span>3</span></div>
        <div class="action" @click="shiftNextSelectField(-1)"><span><</span></div>
      </div>
      <div class="calc-row">
        <div class="number"><span>4</span></div>
        <div class="number"><span>5</span></div>
        <div class="number"><span>6</span></div>
        <div class="action" @click="shiftNextSelectField(1)"><span>></span></div>
      </div>
      <div class="calc-row">
        <div class="number"><span>7</span></div>
        <div class="number"><span>8</span></div>
        <div class="number"><span>9</span></div>
        <div class="action"><span>?</span></div>
      </div>
      <div class="calc-row">
        <div class="number hidden"></div>
        <div class="number"><span>0</span></div>
        <div class="number hidden"></div>
        <div class="action" @click="winGame"><span>=</span></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Mutation, State } from 'vuex-class';
  import moment from "moment";
  import mathjs from "mathjs";
  import { ActiveInterface, Operation, Question } from "@/Types"
  import ExpressionViewer from "@/views/ExpressionViewer.vue";

  @Component({
    components: {
      ExpressionViewer
    }
  })
    export default class Game extends Vue {
      @State operations;
      @State skill;
      @State duration;
      @Mutation addTaskSolved;
      @Mutation addTasksFailed;

      timeStarted = moment();
      timeRemained = '00:00';

      question: Question = {
        operands: [],
        answers: [],
        logicalExpr: [],
        equalValue: 0
      };

      created () {
        this.tick();
        setInterval(this.tick, 1000);
        this.question.answers = Array(Math.floor(this.skill/2)).fill('');
        this.question.operands = Array(Math.floor(this.skill/4)).fill('');
        this.question.logicalExpr = new Array(this.question.operands.length + this.question.answers.length - 1).fill('');

        this.generateTask();
      }

      tick() {
        const secondsElapsed = moment().diff(this.timeStarted, 'seconds', false);
        const secondsRemained = this.duration * 60 - secondsElapsed;
        this.timeRemained = moment.utc(0).seconds(secondsRemained).format('mm:ss');
        if (secondsRemained <= 0) {
          return this.gameStop();
        }
      }

      generateTask() {
        const availableOperators = this.operations
                .filter((operation: Operation) => operation.value)
                .map((operation: Operation) => operation.stringDefinition);

        this.question.logicalExpr = this.question.logicalExpr.map(() => this.getRandomArrayStringItem(availableOperators));
        this.question.operands = this.question.operands.map(() => this.getRandomOperand());
        this.question.answers = this.question.answers.map(() => this.getRandomOperand());
        this.question.equalValue = this.evaluate();

        if (this.question.equalValue % 1) {
          this.generateTask();
        }

        this.question.answers = this.question.answers.map((val: ActiveInterface, index) => ({ val: '', active: index === 0 }));
      }

      evaluate (): number {
        let expr = this.expressionStringBuild();
        console.log(expr);
        return mathjs.eval(expr);
      }

      private expressionStringBuild (): string {
        const allOperands = this.question.operands.concat(this.question.answers);
        const logicalExpressions = [...this.question.logicalExpr];

        return allOperands.reduce((accumulator, operand) => {
          return `${accumulator} ${operand} ${logicalExpressions.shift() || ''}`
        }, '');
      }

      shiftNextSelectField(offset) {
        const { answers } = this.question;
        offset = offset < 0 ? answers.length - (Math.abs(offset) % answers.length) : offset;
        const activeAnswerIndex = answers.findIndex((item: ActiveInterface) => item.active);
        this.question.answers = answers.map((item: ActiveInterface, index) => {
          item.active = index === (activeAnswerIndex + offset) % answers.length;
          return item;
        });
      }

      onDebug () {
        console.log(this.evaluate());
      }

      gameStop() {

      }

      winGame() {
        this.showModal(true);
      }

      failGame() {
        this.showModal(false);
      }

      showModal (isSuccess: boolean) {
        this.$modal.show('dialog', {
          title: isSuccess
                  ? 'Победа'
                  : 'Неудача',
          text: isSuccess
                  ? 'Отлично!'
                  : 'К сожалению, это неправильный ответ. Попробуйте еще раз.',
          buttons: [
            { title: 'Закрыть', default: true }
          ]
        })
      }

      getRandomArrayStringItem(array: Array<string>): string {
        return array[Math.floor(Math.random() * array.length)];
      }

      getRandomOperand (multi = 1): string {
        return Math.floor(Math.random() * this.skill * multi + 1).toString();
      }

    }
</script>

<style scoped>
  .right {
    width: 100%;
    height: 100%;
    padding: 20px;
    font-size: 16px;
    color: gray;
  }

  .top-panel {
    display: flex;
    justify-content: space-between;
  }

  .btn {
    border: 1px solid #979797;
    border-bottom: 2px solid #979797;
    padding: 10px;
    text-align: center;
    font-size: 18px;
  }

  .timer {
    border: 2px solid #6e7397;
    border-right: 20px solid #6e7397;

  }

  .formula {
    padding: 20px;
    text-align: center;
    font-size: 28px;
  }
  .formula-panel {
    height: 50px;
  }
  .formula-answer {
  }

  .calc-panel {
    height: 100%;
    padding: 20px;
    text-align: center;
    color: black;
    font-weight: bold;
  }

  .calc-row {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .calc-row > * {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 30px;
    box-shadow: -4px 6px 13px grey;
  }

  .calc-row > *:hover {
    cursor: pointer;
  }

  .calc-row > *.hidden {
    visibility: hidden;
  }

  .calc-row .number {
    background-color: #E74C3C;
    max-width: 50%;
  }
  .calc-row .action {
    background-color: #979797;
  }

  .formula span {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-bottom: 3px solid grey;
  }

  .formula span.active {
    border-bottom: 3px solid red;
  }

</style>
