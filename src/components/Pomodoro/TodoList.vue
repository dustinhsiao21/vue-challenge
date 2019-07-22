<template>
<div>
    <el-row flex="type" justify="center">
        <el-col :span="23">
            <input-task :isBreak="isBreak" @addTask="addTask"></input-task>
        </el-col>
    </el-row>
    <div>
        <div @click="toggleTodo()">
            <el-row>
                <el-col class="todoTitle mt-48">
                    <el-col :span="22">
                        <div style="padding-left:8px;">TO-DO</div>
                    </el-col>
                    <el-col :span="2">
                        <i v-if="showTodo" class="el-icon-caret-top icon"></i>
                        <i v-else class="el-icon-caret-bottom icon"></i>
                    </el-col>                    
                </el-col>
            </el-row>
        </div>
        <el-row v-show="showTodo">
            <div v-for="(task, index) in tasks" :key="index" class="item" @click="finished(index)">
                <el-row type="flex" align="middle">
                    <el-col :span="2">
                        <div class="small-circle"></div>
                    </el-col>
                    <el-col :span="10" v-text="task" class="text-white"></el-col>
                    <el-col :span="12">
                        <el-row type="flex" justify="end">
                            <i class="el-icon-video-play icon-white"></i>
                        </el-row>
                    </el-col>
                </el-row>
                <hr>
            </div>
            <div v-show="tasks.length == 0" class="empty">
                NOTHING TO DO NOW
            </div>
        </el-row>
    </div>
    <div class="mt-10">
        <div @click="toggleDone()">
            <el-row>
                <el-col class="todoTitle">
                    <el-col :span="22">
                        <div style="padding-left:8px;">Done</div>
                    </el-col>
                    <el-col :span="2">
                        <i v-if="showDone" class="el-icon-caret-top icon"></i>
                        <i v-else class="el-icon-caret-bottom icon"></i>
                    </el-col>                    
                </el-col>
            </el-row>
        </div>
        <el-row v-show="showDone">
            <div v-show="done !=='{}'" v-for="(items, date) in done" :key="date" class="item">
                <div v-for="(name, tomatos) in items" :key="tomatos" class="item">
                    <div v-show="name != ''">
                        <el-row type="flex" align="middle">
                            <el-col :span="2">
                                <i class="el-icon-circle-check check-icon"></i>
                            </el-col>
                            <el-col :span="10" v-text="Object.keys(name)[0]" class="text-white line-through italic"></el-col>
                            <el-col :span="12">
                                <el-row type="flex" justify="end">
                                    <div v-for="(count, index) in name[Object.keys(name)[0]]" :key="index" class="tomato"></div>
                                </el-row>
                            </el-col>
                        </el-row>
                        <hr>
                    </div>
                </div>
            </div>
            <div v-show="done === '{}'" class="empty">
                NONE
            </div>
        </el-row>
    </div>
</div>
</template>
<style lang="scss" scoped>
@import '../../assets/scss/Pomodoro/_variables.scss';

.mt-48 {
    margin-top: 48px;
}

.mt-10 {
    margin-top: 10px;
}

.collapse {
    width: 100%;
}

.icon {
    font-size: small;
}
.item {
    margin-top: 10px;
}

.small-circle {
    width:24px;
    height:24px;
    border: 2px solid $white;
    border-radius: 50%;
}
.text-white {
    color: $white;
    font-size: 16px;
}
.icon-white {
    color: $white;
    font-size: 24px;
}
.empty {
    color: $white;
    margin: 10px;
}
.line-through {
    text-decoration: line-through;
}
.italic {
    font-style: italic;
}
.check-icon {
    color: $white;
    font-size: 32px;
}
.tomato {
    background-color: $white;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-left: 5px;
    margin-right: 5px;
}
</style>

<script lang="ts">
import Vue from 'vue';
import InputTask from './InputTask.vue';
import moment from 'moment';
import localStorageJs from '../../assets/js/localStorage.js';

export default Vue.extend({
    components : {InputTask},
    data() {
        return {
            showTodo: true as boolean,
            showDone: true as boolean,
            tasks: [] as string[],
            done: {} as Array<{}>,
            isBreak: false as boolean, // need to get from vuex
        };
    },
    mounted() {
        if (localStorageJs.get('tasks')) {
            this.tasks = localStorageJs.get('tasks');
        }

        if (localStorageJs.get('done')) {
            this.done = localStorageJs.get('done');
        }
    },
    methods: {
        addTask(val: string): void {
            this.tasks.push(val);
            localStorage.store('tasks', this.tasks);
        },
        toggleTodo(): void {
            this.showTodo = ! this.showTodo;
        },
        toggleDone(): void {
            this.showDone = ! this.showDone;
        },
        finished(index: number, tomato: number = 1): void {
            const removed = this.tasks.splice(index, 1).toString();
            const doneItem = { [removed]: tomato};
            this.done = this.saveDone(doneItem);
            localStorage.store('tasks', this.tasks);
        },
        saveDone(doneItem: object): Array<{}> {
            const done = JSON.parse(localStorage.done);
            const today = moment().format('M/D');
            if (!(today in done)) {
                done[today] = [];
            }
            done[today].push(doneItem);
            localStorage.store('done', done);
            return done;
        },
    },
});
</script>

