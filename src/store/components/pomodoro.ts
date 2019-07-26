import $ls from '@/assets/js/localStorage';
import moment from 'moment';
import { Module } from 'vuex';

 // date: [ {'task': tomato count } ], ex: 7/18:[{'THE FIRST THING TO DO' : 3}]
interface Done {
    [index: string]: [ { [index: string]: number } ];
}

const store: Module<any, any> = {
    namespaced: true,
    state: {
        tasks: [] as string[],
        done: {} as Done[],
        tomatos: 0 as number,
    },
    getters: {
        firstTodo(state): string {
            if (state.tasks.length > 0) {
                return (JSON.parse(JSON.stringify(state.tasks))).shift();
            }
            return '';
        },
        lineUpTasks(state): [] {
            if (state.tasks.length > 0) {
                const originalTasks = JSON.parse(JSON.stringify(state.tasks));
                return originalTasks.slice(1, 4);
            }
            return [];
        },
    },
    mutations: {
        TASKS_GET(state, tasks) {
            state.tasks = tasks;
        },
        DONE_GET(state, done) {
            state.done = done;
        },
        ADD_TASK(state, task: string) {
            state.tasks.push(task);
            $ls.store('tasks', state.tasks);
        },
        ITEM_FINISHED(state, payload: { [index: number]: number} = {0: state.tomatos}): void {
            if (state.tasks.length < 0) {
                return;
            }
            const index: number = parseInt(Object.keys(payload)[0], 10);
            const tomatos: number = payload[index];
            const finishedTodo = state.tasks.splice(index, 1).toString();
            const done = { [finishedTodo]: tomatos };
            const today = moment().format('M/D');
            if (!(today in state.done)) {
                state.done[today] = [];
            }
            state.done[today].push(done);
            $ls.store('done', state.done);
            $ls.store('tasks', state.tasks);
            state.tomatos = 0;
        },
    },
    actions: {
        TASKS_INIT({ commit, state }) {
            const data = $ls.get('tasks');
            if (data === null) {
                $ls.store('tasks', state.tasks);
            } else {
                commit('TASKS_GET', data);
            }
        },
        DONE_INIT( {commit, state }) {
            const data = $ls.get('done');
            if (data === null) {
                $ls.store('done', state.done);
            } else {
                commit('DONE_GET', data);
            }
        },
    },
};

export default store;
