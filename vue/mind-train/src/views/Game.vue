<template>
  <div class="game">
    <div class="top-panel">
      <button class="btn btn-cancel" @click="gameStop">
        <span>X </span>Отмена
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
        <div class="number" @click="insertNumber(1)"><span>1</span></div>
        <div class="number" @click="insertNumber(2)"><span>2</span></div>
        <div class="number" @click="insertNumber(3)"><span>3</span></div>
        <div class="action" @click="shiftNextSelectField(-1)"><span><</span></div>
        <div class="action" @click="shiftNextSelectField(1)"><span>></span></div>
      </div>
      <div class="calc-row">
        <div class="number" @click="insertNumber(4)"><span>4</span></div>
        <div class="number" @click="insertNumber(5)"><span>5</span></div>
        <div class="number" @click="insertNumber(6)"><span>6</span></div>
        <div class="action" @click="insertNumber('')"><span>C</span></div>
        <div class="number hidden"></div>
      </div>
      <div class="calc-row">
        <div class="number" @click="insertNumber(7)"><span>7</span></div>
        <div class="number" @click="insertNumber(8)"><span>8</span></div>
        <div class="number" @click="insertNumber(9)"><span>9</span></div>
        <div class="action"><span>?</span></div>
        <div class="number hidden"></div>
      </div>
      <div class="calc-row">
        <div class="number hidden"></div>
        <div class="number" @click="insertNumber(0)"><span>0</span></div>
        <div class="number hidden"></div>
        <div class="action" @click="checkResult()"><span>=</span></div>
        <div class="number hidden"></div>
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
    @Mutation addTaskFailed;

    timer: any;
    secondsRemained = 0;
    timeRemained = '00:00';

    question: Question = {
      operands: [],
      answers: [],
      logicalExpr: [],
      equalValue: 0
    };

    created () {
      this.secondsRemained = this.duration * 60;
      this.timerStart();
      this.tick();

      this.question.answers = Array(this.skill).fill('');
      this.question.operands = Array(1).fill('');
      this.question.logicalExpr = new Array(this.question.operands.length + this.question.answers.length - 1).fill('');

      this.generateTask();
    }

    tick() {
      this.timeRemained = moment.utc(0).seconds(this.secondsRemained).format('mm:ss');
      if (this.secondsRemained <= 0) {
        this.timerFinish();
      }
      this.secondsRemained--;
    }

    generateTask() {
      const availableOperators = this.operations
              .filter((operation: Operation) => operation.value)
              .map((operation: Operation) => operation.stringDefinition);

      this.question = Object.assign({}, this.question, {
        logicalExpr: this.question.logicalExpr.map(() => this.getRandomArrayStringItem(availableOperators)),
        operands: this.question.operands.map(() => this.getRandomOperand()),
        answers: this.question.answers.map(() => ({ value: this.getRandomOperand(), active: false})),
      });
      this.question.equalValue = this.evaluate();

      if (!this.question.equalValue ||
          this.question.equalValue % 1 ||
          this.question.equalValue > 20 * this.skill ||
          this.question.equalValue < -10 * this.skill
      ) {
        this.generateTask();
      }
      this.question.answers = this.question.answers
              .map((val: ActiveInterface, index) => ({ value: '', active: index === 0 }));
    }

    evaluate () {
      const expr = this.expressionStringBuild();
      return expr.length ? mathjs.eval(expr) : NaN;
    }

    private expressionStringBuild (): string {
      const allOperands = [...this.question.operands];
      if (this.question.answers.find((answer: ActiveInterface) => answer.value === '')) {
        return '';
      }
      this.question.answers.forEach((answer: ActiveInterface) => allOperands.push(answer.value));
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

    getActiveFieldIndex(): number {
      return this.question.answers.findIndex((item: ActiveInterface) => item.active);
    }

    insertNumber(number) {
      this.question.answers[this.getActiveFieldIndex()].value = number;
      this.shiftNextSelectField(1);
    }

    gameStop() {
      this.timerStop();
      this.addTaskFailed();
      this.$router.push('/');
    }

    timerFinish() {
      this.timerStop();
      this.$router.push('/');
    }

    timerStop() {
      clearInterval(this.timer);
    }

    timerStart() {
      this.timer = setInterval(this.tick, 1000)
    }

    checkResult() {
      this.timerStop();
      const isSuccess = this.question.equalValue === this.evaluate();
      if (isSuccess) {
        this.addTaskSolved();
      } else {
        this.addTaskFailed();
      }
      this.showModal(isSuccess);
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
          {
            title: 'Закрыть',
            default: true,
            handler: () => {
              this.timerStart();
              this.generateTask();
              this.$modal.hide('dialog');
            }
          }
        ]
      })
    }

    getRandomArrayStringItem(array: string[]): string {
      return array[Math.floor(Math.random() * array.length)];
    }

    getRandomOperand (): string {
      return Math.floor(Math.random() * this.skill + 1).toString();
    }
  }
</script>

<style lang="scss" scoped>
  .game {
    width: 100%;
    height: 100%;
    padding: 20px;
    font-size: 16px;
    color: gray;

    .top-panel {
      display: flex;
      justify-content: space-between;

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
    }

    .formula {
      padding: 20px;
      text-align: center;
      font-size: 28px;
    }

    .calc-panel {
      height: 100%;
      padding: 20px;
      text-align: center;
      color: black;
      font-weight: bold;

      .calc-row {
        display: flex;
        align-items: center;
        justify-content: center;

        > * {
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

        > *:hover {
          cursor: pointer;
        }

        > *.hidden {
          visibility: hidden;
        }

        .number {
          background-color: #E74C3C;
          max-width: 50%;
        }

        .action {
          background-color: #979797;
        }
      }
    }
  }
</style>
