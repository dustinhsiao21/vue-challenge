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
                <div class="time">25:00</div>
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
        <div class="circle-location">
            <div class="countdowncircleborder">
                <div class="countdowncircle">
                    <div class="play-background" v-if="ready" @click="play()">
                        <i class="el-icon-caret-right" style="font-size:96px; color:#FF4384"></i>
                    </div>
                    <i class="el-icon-video-pause" style="font-size:96px; color:white" v-else @click="play()"></i>
                </div>
            </div>
        </div>
    </el-row>
</template>
<style lang="scss" scope>
.left {
    background-color: #FFEDF7;
    height: 100vh;
    padding: 48px;
}

.right {
    background-color: #003164;
    height: 100vh;
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

.circle-location {
    position: absolute;
    width: 600px;
    left: 660px;
    top:100px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.countdowncircleborder{
    width: 540px;
    height: 540px;
    border: 2px solid #FF4384;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
    
.countdowncircle{
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background-color: #FF4384;
    display: flex;
    justify-content: center;
    align-items: center;
}

.setting-row {
    margin-bottom:48px;
}

.setting-icon {
    font-size: x-large;
    color: #FFFFFF;
}

.play-background {
    width: 96;
    height: 96px;
    background-color: #FFFFFF;
    border-radius: 50%;
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

export default Vue.extend({
    name: 'Pomodora',
    data() {
        return {
            input: '',
            tasks: [''],
            ready: true,
        };
    },
    mounted() {
        if (localStorage.tasks) {
            this.tasks = JSON.parse(localStorage.tasks);
        }
    },
    computed: {
        lineUpTasks() {
            if (this.tasks.length > 0) {
                const originalTasks = JSON.parse(JSON.stringify(this.tasks));
                originalTasks.shift();
                return originalTasks;
            }
        },
        firstTodo() {
            if (this.tasks.length > 0) {
                const originalTasks = JSON.parse(JSON.stringify(this.tasks));
                return originalTasks.shift();
            }
        },
    },
    methods: {
        add(val: string) {
            this.tasks.push(val);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },
        play() {
            this.ready = ! this.ready;
        },
    },
});
</script>
    
