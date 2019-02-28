import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        trainingStarted: moment(),
        tasksSolved: 0,
        taskFailed: 0,
        duration: 7,
        skill: 7,
        operations: [
            { code: 'add', value: true, stringDefinition: '+', title: 'Суммирование' },
            { code: 'sub', value: true, stringDefinition: '-', title: 'Разность' },
            { code: 'mul', value: true, stringDefinition: '*', title: 'Умножение' },
            { code: 'div', value: true, stringDefinition: '/', title: 'Деление' },
            { code: 'pow', value: true, stringDefinition: '^', title: 'Возведение в степень' },
        ],
    },
    getters: {
        daysInTraining: state => moment().diff(state.trainingStarted, 'days'),
        tasksTotal: state => state.tasksSolved + state.taskFailed,
        accuracy: state => {
            const total = state.tasksSolved + state.taskFailed;
            return total ? state.tasksSolved * 100 / total : 0;
        },
    },
    mutations: {
        changeDuration: (state, value: number) => state.duration = value,
        changeSkill: (state, value: number) => state.skill = value,
        changeOperations: (state, operations) => state.operations = operations,
        addTaskSolved: state => state.tasksSolved = state.tasksSolved + 1,
        addTaskFailed: state => state.taskFailed = state.taskFailed + 1,
    },
    plugins: [createPersistedState()],
});
