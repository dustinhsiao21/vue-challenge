<template>
<el-row>
    <el-row>
        <el-col class="todoTitle">FOCUS TIME</el-col>
    </el-row>
    <el-row class="mt-10">
        <el-col :span="12">
            <el-row>
                <el-col class="count">TODAY</el-col>
            </el-row>
            <el-row>
                <el-col><span class="count-number">20</span><span class="tomato">/TOMATO</span></el-col>
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-row>
                <el-col class="count">WEEK</el-col>
            </el-row>
            <el-row>
                <el-col><span class="count-number">108</span><span class="tomato">/TOMATO</span></el-col>
            </el-row>
        </el-col>
    </el-row>
    <el-row class="mt-46 todoTitle" type="flex" align="middle">
        <el-col :span="12">CHART</el-col>
        <el-col :span="12" class="date-between">
            <i class="el-icon-arrow-left"></i>
                2019.7.1 - 2019.7.7
            <i class="el-icon-arrow-right"></i>
        </el-col>
    </el-row>
    <el-row>
        <el-col>
            <div class="mt-10" style="height:50px;">
                <bar-chart :chartdata="input" :options="options" :styles="style"></bar-chart>
            </div>
        </el-col>
    </el-row>
</el-row>
</template>
<style lang="sass" scoped>
.mt-10
    margin-top: 10px
.mt-46
    margin-top: 46px
.count
    color: #FFFFFF
    font-family: 'Roboto', sans-serif
    font-size: 16px
    font-weight: bold

.count-number
    font-family: 'Roboto', sans-serif
    font-weight: bold
    font-size: 64px
    color: #FF4384

.tomato
    font-family: 'Roboto', sans-serif
    font-weight: bold
    font-size: 16px
    color: #335A83
    margin-left: 5px

.date-between
    color: #FFFFFF
    font-family: 'Roboto', sans-serif
    font-size: 16px
    font-weight: bold

</style>
<script lang="ts">
import BarChart from './Chart/chart.vue';
import Vue from 'vue';

export default Vue.extend({
    components: {
        BarChart,
    },
    data() {
        return {
            input: {
                labels: ['7/1', '7/2', '7/3', '7/4', '7/5', '7/6'],
                datasets: [{
                    label: ' ',
                    backgroundColor	: '#FFFFFF',
                    data: [6, 4, 5, 5, 9, 7],
                }],
            },
            options: {
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: '#FFFFFF',
                            display: false,
                        },
                        barPercentage: 0.5,
                        ticks: {
                            fontColor: '#FFFFFF',
                        },
                    }],
                    yAxes: [{
                        gridLines: {
                            color: '#FFFFFF',
                            display: false,
                        },
                        ticks: {
                            fontColor: '#FFFFFF',
                            beginAtZero: true,
                        },
                    }],
                },
                responsive: true,
                maintainAspectRatio: false,
            },
            style: {
                height: '250px',
                position: 'relative',
            },
        };
    },
});
</script>

