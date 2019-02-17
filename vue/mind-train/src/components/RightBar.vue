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

</style>

<template>
  <div class="right">
    <div class="top-panel">
      <button class="btn btn-cancel">
        <span>X </span>
        Отмена
      </button>
      <div class="btn timer">4:22</div>
    </div>

    <div class="formula">
      <div class="formula-panel">
        13 * _ * _
      </div>
      <div class="formula-answer">
        = 54678
      </div>
    </div>

    <div class="calc-panel">
      <div class="calc-row">
        <div class="number"><span>1</span></div>
        <div class="number"><span>2</span></div>
        <div class="number"><span>3</span></div>
        <div class="action"><span><</span></div>
      </div>
      <div class="calc-row">
        <div class="number"><span>4</span></div>
        <div class="number"><span>5</span></div>
        <div class="number"><span>6</span></div>
        <div class="action"><span>></span></div>
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
        <div class="action"><span>=</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['msg']
}
</script>
