<template>
    <el-row>
        <el-col :span="16" class="left">
            <el-col :span="13" :offset="3">
                <el-input placeholder="ADD A NEW MISSION..." maxlength="445" v-model="input" suffix-icon="el-icon-plus" @change="add"></el-input>
                <el-row style="margin-top:145px;">
                    <el-col :span="3">
                        <div class="circle"></div>
                    </el-col>
                    <el-col :span="21" class="doing" v-text="firstTodo"></el-col>
                </el-row>
                <div class="time">{{ min }}:{{ second }}</div>
                <div class="list">
                    <div v-for="(task, index) in lineUpTasks" :key="index">
                        <el-row>
                            <el-col :span="2">
                                <div class="small-circle"></div>
                            </el-col>
                            <el-col :span="19" v-text="task"></el-col>
                            <el-col :span="1" :push="2"><i class="el-icon-video-play"></i></el-col>
                        </el-row>
                        <hr>    
                    </div>
                </div>
                <el-row v-if="tasks.length > 3" type="flex" justify="end">
                    <router-link :to="{ name: 'pomo-todolist'}" class="more">MORE</router-link>
                </el-row>
            </el-col>
        </el-col>
        <el-col :span="8" class="right">
            <div>
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
            </div>
            <p class="pomodoro">POMODORO</p>
        </el-col>
        <countdown-circle :stop="stop" @toggle="toggle"></countdown-circle>
    </el-row>
</template>
<style lang="scss" scope>
.left {
    background-color: #FFEDF7;
    height: 100vh;
    min-height: 750px;
    padding: 48px;
}

.right {
    background-color: #003164;
    height: 100vh;
    min-height: 750px;
    padding: 48px;
}

.doing {
    font-weight: bold;
    font-size: 24px;
    color:#003164;
}

.time {
    color:#FF4384;
    font-size:140px;
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    margin-bottom: 0px;
}

.list {
    margin-top: 60px;
    color:#003164;
}

.circle {
    width:48px;
    height:48px;
    border: 2px solid #003164;
    border-radius: 50%;
}

.small-circle {
    width:24px;
    height:24px;
    border: 2px solid #003164;
    border-radius: 50%;
}

.setting-row {
    margin-bottom:48px;
}

.setting-icon {
    font-size: x-large;
    color: #FFFFFF;
}

.more {
    text-decoration: none;
    font-family: 'Roboto', sans-serif;
    color: #FF4384;
}

.pomodoro {
    font-size: 24px;
    font-weight: bold;
    color: #FFFFFF;
    transform: rotate(90deg);
    position: fixed;
    bottom: 50px;
    right: 40px;
}
</style>

<script lang="ts">
import Vue from 'vue';
import CountdownCircle from '../../components/Pomodoro/CountdownCircle.vue';

export default Vue.extend({
    name: 'Pomodora',
    components: {CountdownCircle},
    data() {
        return {
            input: '' as string,
            tasks: [''] as [string],
            stop: true as boolean,
            workTimeRemining: 1500 as number,
            interval: 0 as number,
        };
    },
    mounted() {
        if (localStorage.tasks) {
            this.tasks = JSON.parse(localStorage.tasks);
        }
    },
    computed: {
        lineUpTasks(): [] | undefined {
            if (this.tasks.length > 0) {
                const originalTasks = JSON.parse(JSON.stringify(this.tasks));
                return originalTasks.slice(1, 4);
            }
        },
        firstTodo(): string | undefined {
            if (this.tasks.length > 0) {
                return (JSON.parse(JSON.stringify(this.tasks))).shift();
            }
        },
        min(): string {
            const min = Math.floor((this.workTimeRemining * 1000) / (1000 * 60));
            return this.addZeroAndToString(min);
        },
        second(): string {
            const sec = Math.floor((this.workTimeRemining * 1000 % (1000 * 60)) / 1000);
            return this.addZeroAndToString(sec);
        },
    },
    methods: {
        add(val: string): void {
            this.tasks.push(val);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },
        toggle(stop: boolean): void {
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
                    this.workTimeRemining -- ;
                }
            }, 1000);
        },
        addZeroAndToString(num: number): string {
            if (num > 10) {
                return num.toString();
            }
            return '0' + num.toString();
        },
    },
});
</script>
    
