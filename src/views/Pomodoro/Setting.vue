<template>
<div class="container">
    <el-row>
        <setting-nav></setting-nav>
        <el-col :span="10">
            <el-row type="flex" justify="center">
                <el-col :span="17">
                    <router-view />
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="1" :push="2">
            <right-bar></right-bar>
        </el-col>
    </el-row>
</div>
</template>
<style lang="scss">
.todoTitle {
    font-size: 24px;
    font-family: 'Roboto', sans-serif;
    color: #FFFFFF;
    padding: 8px 8px 8px 16px;
    background-color:#335A83;
}

.container {
    background-color: #003164;
    padding-top: 45px;
    height: 100vh;
    padding-left: 85px;
}
</style>

<script lang="ts">
import Vue from 'vue';
import RightBar from '../../components/Pomodoro/RightBar.vue';
import SettingNav from '../../components/Pomodoro/Setting-nav.vue';
export default Vue.extend({
    components: {RightBar, SettingNav},
    data() {
        return {
            selectedNav: '' as string | undefined,
        };
    },
    mounted() {
        this.selectedNav = this.$route.path.split('/').pop();
    },
});
</script>

