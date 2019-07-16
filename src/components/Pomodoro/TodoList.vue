<template>
<div>
    <el-row>
        <el-input placeholder="ADD A NEW MISSION..." v-model="input" suffix-icon="el-icon-plus" @change="add"></el-input>
    </el-row>
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
        <el-row v-show="showTodo">
            <div v-for="(task, index) in tasks" :key="index" class="item">
                <el-row type="flex" align="middle">
                    <el-col :span="2">
                        <div class="small-circle"></div>
                    </el-col>
                    <el-col :span="19" v-text="task" class="text-white"></el-col>
                    <el-col :span="1" :push="1"><i class="el-icon-video-play icon-white"></i></el-col>
                </el-row>
                <hr>
            </div>
        </el-row>
    </div>
    <div>
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
            <div v-for="(item, index) in done" :key="index" class="item">
                <div v-if="item != ''">
                    <el-row type="flex" align="middle">
                        <el-col :span="2">
                            <div class="small-circle"></div>
                        </el-col>
                        <el-col :span="19" v-text="item" class="text-white"></el-col>
                        <el-col :span="1" :push="1"><i class="el-icon-video-play icon-white"></i></el-col>
                    </el-row>
                    <hr>
                </div>
                <div v-else class="empty">
                    NONE
                </div>
            </div>
        </el-row>
    </div>
</div>
</template>
<style lang="scss" scoped>
.mt-48 {
    margin-top:48px;
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
    border: 2px solid #FFFFFF;
    border-radius: 50%;
}

.text-white {
    color: #FFFFFF;
    font-size: 16px;
}

.icon-white {
    color: #FFFFFF;
    font-size: 24px;
}

.empty {
    color: #FFFFFF
}

</style>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    data() {
        return {
            showTodo: true,
            showDone: false,
            tasks: [''],
            done: [''],
            input: '',
        };
    },
    mounted() {
        if (localStorage.tasks) {
            this.tasks = JSON.parse(localStorage.tasks);
        }
    },
    methods: {
        add(val: string) {
            this.tasks.push(val);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },
        toggleTodo() {
            this.showTodo = ! this.showTodo;
        },
        toggleDone() {
            this.showDone = ! this.showDone;
        },
    },
});
</script>

