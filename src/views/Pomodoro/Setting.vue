<template>
<div class="container">
    <el-row>
        <el-col :span="9">
            <el-row type="flex" justify="center">
                <setting-nav></setting-nav>
            </el-row>
        </el-col>
        <el-col :span="10">
            <el-row type="flex" justify="center">
                <el-col :span="17">
                    <router-view />
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="5" :push="3">
            <right-bar></right-bar>
        </el-col>
    </el-row>
</div>
</template>
<style lang="scss">
@import '../../assets/scss/Pomodoro/_variables.scss';
div {
    font-family: 'Roboto', sans-serif;
}

.todoTitle {
    font-size: 24px;
    color: $white;
    padding: 8px 8px 8px 16px;
    background-color: $blue-dark;
}

.container {
    background-color: $blue-darker;
    padding-top: 45px;
    height: 100vh;
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

</style>

<script lang="ts">
import Vue from 'vue';
import RightBar from '../../components/Pomodoro/RightBar.vue';
import SettingNav from '../../components/Pomodoro/Setting-nav.vue';
export default Vue.extend({
    components: {RightBar, SettingNav},
});
</script>

