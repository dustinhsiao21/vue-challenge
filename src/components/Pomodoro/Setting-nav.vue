<template>
<el-col :span="9">
    <div>
        <el-row class="nav-item">
            <el-col>
                <router-link :to="{ name:'pomo-todolist' }" class="link-item">
                    <i id="pomo-todolist" class="el-icon-s-fold setting-icon nav-icon"></i>
                    TO-DO LIST
                </router-link>
            </el-col>
        </el-row>
        <el-row class="nav-item">
            <el-col>
                <router-link :to="{ name:'pomo-analytics' }" class="link-item">
                    <i id="pomo-analytics" class="el-icon-data-analysis setting-icon nav-icon"></i>
                    ANALYTICS
                </router-link>
            </el-col>
        </el-row>
        <el-row class="nav-item">
            <el-col>
                <router-link :to="{ name:'pomo-ringtones' }" class="link-item">
                    <i id="pomo-ringtones" class="el-icon-bell setting-icon nav-icon"></i>
                    RINGTONES
                </router-link>
            </el-col>
        </el-row>
    </div>
    <div class="circle">
        <div class="start-button">
            <div class="start-icon-circle">
                <div class="start-icon-background">
                    <i class="el-icon-caret-right start-icon"></i>
                </div>
            </div>
        </div>
        <div class="circle-item">
            <div class="counting">
                25:00
            </div>
            <div class="counting-item">
                THE FIRST THING TO DO
            </div>
        </div>
    </div>
</el-col>
</template>
<style lang="scss" scoped>
@import '../../assets/scss/Pomodoro/_variables.scss';

.nav-item {
    color: $red;
    font-size: 40px;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
    margin-bottom: 30px;
}

.link-item {
    text-decoration: none;
    color: $blue;
}

.nav-icon {
    color: inherit;
    font-size: 36px;
    margin-right:10px;
}

.circle {
    color: $white;
    position: fixed;
    background-color: $pink;
    width: 350px;
    height: 350px;
    border-radius: 50%;
    left: 85px;
    bottom: -175px;
    .circle-item {
        margin-top: 10px;
        text-align: center;
        .counting {
            color: $red;
            font-size: 64px;
            font-family: 'Roboto', sans-serif;
            font-weight: bold;
        }
        .counting-item {
            color: $blue-dark;
            font-size: 16px;
            font-family: 'Roboto', sans-serif;
            font-weight: bold;
        }
    }
    .start-button {
        margin-top: -60px;
        margin-left: 116px;
        width: 116px;
        height: 116px;
        background-color: $blue-dark;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        .start-icon-circle {
            width: 104px;
            height: 104px;
            border: 2px solid $red;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            .start-icon-background {
                width: 96px;
                height: 96px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: $red;
                border-radius: 50%;
                .start-icon {
                    font-size: 72px;
                    color: $white;
                }
            }
        }
    }
}

.router-link-active {
    color: $red;
}
</style>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({

});
</script>

