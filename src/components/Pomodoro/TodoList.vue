<template>
<div>
    <el-row>
        <el-input placeholder="ADD A NEW MISSION..." v-model="input" suffix-icon="el-icon-plus" @change="add"></el-input>
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
            <div v-show="done.length > 0" v-for="(item, index) in done" :key="index" class="item">
                <div v-show="item != ''">
                    <el-row type="flex" align="middle">
                        <el-col :span="2">
                            <i class="el-icon-circle-check check-icon"></i>
                        </el-col>
                        <el-col :span="10" v-text="Object.keys(item)[0]" class="text-white line-through italic"></el-col>
                        <el-col :span="12">
                            <el-row type="flex" justify="end">
                                <div v-for="(count, index) in item[Object.keys(item)[0]]" :key="index" class="tomato"></div>
                            </el-row>
                        </el-col>
                    </el-row>
                    <hr>
                </div>
            </div>
            <div v-show="done.length == 0" class="empty">
                NONE
            </div>
        </el-row>
    </div>
</div>
</template>
<style lang="scss" scoped>
.mt-48 {
    margin-top:48px;
}

.mt-10 {
    margin-top:10px;
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
    color: #FFFFFF;
}

.line-through {
    text-decoration: line-through;
}

.italic {
    font-style: italic;
}

.check-icon {
    color: #FFFFFF;
    font-size: 32px;
}

.tomato {
    background-color: #FFFFFF;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-left: 5px;
    margin-right: 5px;
}

</style>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    data() {
        return {
            showTodo: true,
            showDone: false,
            tasks: [] as string[],
            done: [] as Array<{}>,
            input: '',
        };
    },
    mounted() {
        if (localStorage.tasks) {
            this.tasks = JSON.parse(localStorage.tasks);
        }
    },
    methods: {
        add(val: string): void {
            this.tasks.push(val);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },
        toggleTodo(): void {
            this.showTodo = ! this.showTodo;
        },
        toggleDone(): void {
            this.showDone = ! this.showDone;
        },
        finished(index: number, tomato: number = 1): void {
            const removed = this.tasks.splice(index, 1).toString();
            this.done.push({ [removed]: tomato});
        },
    },
});
</script>

