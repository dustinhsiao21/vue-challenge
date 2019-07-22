<template>
    <el-row type="flex" justify="space-between">
        <!-- left side -->
        <el-col :span="16" class="left" :class="isBreak ? 'bg-blue' : 'bg-pink'">
            <el-col :span="13" :offset="3">
                <!-- input task -->
                <input-task :isBreak="isBreak" @addTask="addTask"></input-task>
                <!-- input task end -->
                <!-- first job todo -->
                <el-row v-show="tasks.length > 0" class="mt-145" type="flex" align="middle">
                    <el-col :span="3">
                        <div class="first-item-circle" @click="itemDone()"></div>
                    </el-col>
                    <el-row>
                        <el-row>
                            <el-col class="doing" v-text="firstTodo"></el-col>
                        </el-row>
                        <!-- first job cost times -->
                        <el-col>
                            <el-col v-for="(tomato, key) in tomatos" :key="key" class="tomato"></el-col>
                        </el-col>
                        <!-- first job cost times end-->
                    </el-row>
                </el-row>
                <el-row v-show="tasks.length == 0" class="mt-145" >
                    <el-col class="doing">YOU NEED TO ADD SOMEYTHING TO START THE CLOCK</el-col>
                </el-row>
                <!-- first job todo end-->
                
                <!-- time countdown -->
                <div class="time" :class="isBreak ? 'color-blue' : 'color-red'">{{ min }}:{{ second }}</div>
                <!-- time countdown end -->
                <!-- time list -->
                <div class="list">
                    <div v-for="(task, index) in lineUpTasks" :key="index">
                        <el-row type="flex" align="middle">
                            <el-col :span="2">
                                <div class="lineup-item-circle"></div>
                            </el-col>
                            <el-col :span="19" v-text="task"></el-col>
                            <el-col :span="1" :push="2"><i class="el-icon-video-play" style="font-size:x-large;font-weight:bold;"></i></el-col>
                        </el-row>
                        <hr>    
                    </div>
                </div>
                <el-row v-if="tasks.length > 3" type="flex" justify="end">
                    <router-link :to="{ name: 'pomo-todolist'}" class="more" :class="isBreak ? 'color-blue' : 'color-red'">MORE</router-link>
                </el-row>
                <!-- time list end -->
            </el-col>
        </el-col>
        <!-- left side end -->
        <!-- nav bar -->
        <el-col :span="8" class="right">
            <el-row class="setting-row">
                <el-col :span="2" :offset="20">
                    <router-link :to="{ name: 'pomo-todolist'}">
                        <i class="el-icon-s-fold setting-icon"></i>
                    </router-link>
                </el-col>
            </el-row>
            <el-row class="setting-row">
                <el-col :span="2" :offset="20">
                    <router-link :to="{ name: 'pomo-analytics'}">
                        <i class="el-icon-data-analysis setting-icon"></i>
                    </router-link>
                </el-col>
            </el-row>
            <el-row class="setting-row">
                <el-col :span="2" :offset="20">
                    <router-link :to="{ name: 'pomo-ringtones'}">
                        <i class="el-icon-bell setting-icon"></i>
                    </router-link>
                </el-col>
            </el-row>
            <el-row class="setting-row">
                <el-col :span="2" :offset="20">
                    <i class="el-icon-refresh setting-icon"></i>
                </el-col>
            </el-row>
            <p class="pomodoro">POMODORO</p>
        </el-col>
        <!-- nav bar end-->
        <!-- time countdown pie -->
        <div class="circle-location">
            <countdown-circle :stop="stop" @toggle="toggle" :isBreak="isBreak"></countdown-circle>
        </div>
        <!-- time countdown pie end-->
    </el-row>
</template>
<style lang="scss" scoped>
@import '../../assets/scss/Pomodoro/_variables.scss';

.color-red {
    color: $red;
}

.color-blue {
    color: $blue;
}

.bg-blue {
    background-color: $blue-light;
}

.bg-pink {
    background-color: $pink;
}

.mt-145 {
    margin-top: 145px;
}

.left {
    height: 100vh;
    min-height: 750px;
    padding: 48px;
    .doing {
        font-weight: bold;
        font-size: 24px;
        color: $blue-dark;
    }

    .time {
        font-size:140px;
        font-weight: bold;
        margin-bottom: 0px;
    }

    .list {
        margin-top: 60px;
        color: $blue-dark;
    }

    .first-item-circle {
        width:40px;
        height:40px;
        border: 2px solid  $blue-dark;
        border-radius: 50%;
    }

    .lineup-item-circle {
        width:24px;
        height:24px;
        border: 2px solid  $blue-dark;
        border-radius: 50%;
    }
    .more {
        text-decoration: none;
    }

    .tomato {
        background-color: $blue-darker;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-left: 5px;
        margin-right: 5px;
    }
}

.right {
    background-color: $blue-darker;
    height: 100vh;
    min-height: 750px;
    padding: 48px;
    .setting-row {
        margin-bottom:48px;
    }

    .setting-icon {
        font-size: x-large;
        color: $white;
    }
    .pomodoro {
        font-size: 24px;
        font-weight: bold;
        color: $white;
        transform: rotate(90deg);
        position: fixed;
        bottom: 50px;
        right: 40px;
    }
}


.circle-location {
    position: absolute;
    width: 600px;
    right: 25vh;
    top:100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<script lang="ts">
import Vue from 'vue';
import CountdownCircle from '../../components/Pomodoro/CountdownCircle.vue';
import InputTask from '../../components/Pomodoro/InputTask.vue';
import moment from 'moment';
import localStorageJs from '../../assets/js/localStorage.js';

export default Vue.extend({
    name: 'Pomodora',
    components: {CountdownCircle, InputTask},
    data() {
        return {
            tasks: [] as string[],
            stop: true as boolean,
            time: 1500 as number,
            isBreak: false as boolean,
            interval: 0 as number,
            tomatos: 0 as number,
        };
    },
    mounted() {
        if (!localStorageJs.get('done')) {
            localStorageJs.store('done', {});
        }

        if (!localStorageJs.get('tasks')) {
            localStorageJs.store('tasks', []);
        }

        this.tasks = localStorageJs.get('tasks');
    },
    computed: {
        lineUpTasks(): [] {
            if (this.tasks.length > 0) {
                const originalTasks = JSON.parse(JSON.stringify(this.tasks));
                return originalTasks.slice(1, 4);
            }
            return [];
        },
        firstTodo(): string {
            if (this.tasks.length > 0) {
                return (JSON.parse(JSON.stringify(this.tasks))).shift();
            }
            return '';
        },
        min(): string {
            const min = Math.floor((this.time * 1000) / (1000 * 60));
            return this.addZeroAndToString(min);
        },
        second(): string {
            const sec = Math.floor((this.time * 1000 % (1000 * 60)) / 1000);
            return this.addZeroAndToString(sec);
        },
    },
    methods: {
        addTask(input: string): void {
            this.tasks.push(input);
            localStorageJs.store('tasks', this.tasks);
        },
        itemDone(): void {
            const done = { [this.firstTodo]: this.tomatos};
            this.saveDone(done);
            this.tasks = this.lineUpTasks;
            localStorageJs.store('tasks', this.tasks);
            this.tomatos = 0;
        },
        toggle(stop: boolean): void {
            if (this.tasks.length === 0) {
                return;
            }
            this.stop = stop;
            if (this.stop === false) {
                this.interval = this.countDown();
            }
            if (this.stop === true) {
                clearInterval(this.interval);
            }
        },
        countDown(): number {
            return setInterval(() => {
                if (this.stop === false) {
                    this.time -- ;
                    if (this.time <= 0) {
                        this.changeInterval();
                    }
                }
            }, 1000);
        },
        changeInterval(): void {
            this.isBreak = !this.isBreak;
            if (this.isBreak) {
                this.tomatos++;
                this.time = 300;
            }
            if (!this.isBreak) {
                this.time = 1500;
            }
            this.ring();
        },
        addZeroAndToString(num: number): string {
            if (num >= 10) {
                return num.toString();
            }
            return '0' + num.toString();
        },
        saveDone(doneItem: object) {
            const done = localStorageJs.get('done');
            const today = moment().format('M/D');
            if (!(today in done)) {
                done[today] = [];
            }
            done[today].push(doneItem);
            localStorageJs.store('done', done);
        },
        ring(): void {
            const audio = new Audio(require('../../assets/Alarm_Clock.mp3'));
            audio.play();
        },
        resetTimer(){
            location.reload();
        },
    },
});
</script>
    
