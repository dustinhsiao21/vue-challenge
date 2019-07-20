<template>
    <el-row type="flex" align="middle">    
        <el-col :span="22">
            <input type="input" v-model="input" class="input-task" @focus="input = ''" @keydown.enter="addTask" :class="isBreak ? 'color-blue': 'color-red'">
        </el-col>
        <el-col :span="2">
            <i class="el-icon-plus color-red" @click="addTask"></i>
        </el-col>
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

.input-task {
    padding: 0px 20px;
    width: 100%;
    height: 42px;
    font-style: italic;
    font-size: 16px;
}
</style>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    props: {
        isBreak: Boolean,
    },
    data() {
        return {
            input: 'ADD A NEW MISSION...' as string,
        };
    },
    methods: {
        addTask() {
            if (this.input === 'ADD A NEW MISSION...' || this.input === '') {
                return;
            }
            this.$emit('addTask', this.input);
            this.input = '';
        },
    },
});
</script>


