import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import dayjs from 'dayjs';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        trainingStarted: dayjs(),
        tasksSolved: 0,
        taskFailed: 0,
        duration: 7,
        skill: 7,
        operations: {
            add: true,
            sub: true,
            mul: true,
            div: true,
            pow: false
        }
    },
    getters: {
        daysInTraining: state => dayjs().diff(dayjs(state.trainingStarted).startOf('day'), 'day'),
        tasksTotal: state => state.tasksSolved + state.taskFailed,
        accuracy: state => {
            const total = state.tasksSolved + state.taskFailed;
            return total ? state.tasksSolved * 100 / total : 0;
        }
    },
    mutations: {
        changeDuration: (state, value: number) => state.duration = value,
        changeSkill: (state, value: number) => state.skill = value,
        changeOperations: (state, operations) => state.operations = operations,
        addTaskSolved: state => state.tasksSolved = state.tasksSolved + 1,
        addTaskFailed: state => state.taskFailed = state.taskFailed + 1,
    },
    plugins: [createPersistedState()]
});
