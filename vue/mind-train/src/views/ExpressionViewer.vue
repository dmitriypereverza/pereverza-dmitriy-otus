<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { Question } from "@/Types"

  @Component
    export default class ExpressionViewer extends Vue {
      @Prop() private question: Question;
      localQuestion: Question;

      created() {
        this.localQuestion = Object.assign({}, this.question);
      }

      get questionExprAll(): any[] {
        if (!this.localQuestion) {
          return [];
        }
        const allOperands = this.localQuestion.operands.concat(this.localQuestion.answers);
        const logicalExpressions = [...this.localQuestion.logicalExpr];

        return allOperands.reduce((accumulator, operand) => {
          accumulator.push(operand, logicalExpressions.shift() || '');
          return accumulator;
        }, []);
      }

      render (createElement) {
        return createElement('div', { class: 'formula-panel' },
          this.questionExprAll.map(function (item) {
            if (typeof item === 'object') {
              return createElement('span', { class: { active: item.active } })
            }
            return ` ${item} `;
          })
        )
      }
    }
</script>

<style scoped>
  .formula-panel {
    height: 50px;
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
