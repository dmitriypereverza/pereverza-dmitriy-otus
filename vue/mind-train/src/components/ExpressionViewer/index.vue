<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  import { Question } from "@/Types";
  import { VNode } from "vue";

  @Component
  export default class ExpressionViewer extends Vue {
    @Prop() question: Question;
    localQuestion: Question;

    questionExprAll(): any[] {
      if (!this.localQuestion) {
        return [];
      }
      const allOperands = this.localQuestion.operands.concat(this.localQuestion.answers);
      const logicalExpressions = [...this.localQuestion.logicalExpr];

      return allOperands.reduce((accumulator, operand) => {
        accumulator.push(operand, logicalExpressions.shift() || "");
        return accumulator;
      }, []);
    }

    render(createElement): VNode {
      this.localQuestion = Object.assign({}, this.question);
      return createElement("div", { class: "formula-panel" },
        this.questionExprAll().map(item => typeof item === "object"
          ? createElement("span", { class: { active: item.active } }, item.value)
          : ` ${item} `),
      );
    }
  }
</script>

<style lang="scss" scoped>
  .formula-panel {
      height: 50px;

      span {
          display: inline-block;
          width: 20px;
          height: 30px;
          border-bottom: 3px solid grey;
          vertical-align: bottom;
      }

      span.active {
          border-bottom: 3px solid red;
      }
  }
</style>
