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
                <el-col><span class="count-number">{{ todayTomato }}</span><span class="tomato">/TOMATO</span></el-col>
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-row>
                <el-col class="count">WEEK</el-col>
            </el-row>
            <el-row>
                <el-col><span class="count-number">{{ weekTomatos }}</span><span class="tomato">/TOMATO</span></el-col>
            </el-row>
        </el-col>
    </el-row>
    <el-row class="mt-46 todoTitle" type="flex" align="middle">
        <el-col :span="12">CHART</el-col>
        <el-col :span="12" class="date-between">
            <i class="el-icon-arrow-left"></i>
                {{ startDate }} - {{ endDate }}
            <i class="el-icon-arrow-right"></i>
        </el-col>
    </el-row>
    <el-row>
        <el-col>
            <div class="mt-10 h-50">
                <bar-chart :input="input" :options="options" :styles="style"></bar-chart>
            </div>
        </el-col>
    </el-row>
</el-row>
</template>
<style lang="scss" scoped>
@import '../../assets/scss/Pomodoro/_variables.scss';

.mt-10 {
    margin-top: 10px;
}

.h-50 {
    height: 50px;
}

.mt-46 {
    margin-top: 46px;
}
.count {
    color: $white;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: bold;
}

.count-number {
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: 64px;
    color: $red;
}

.tomato {
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: 16px;
    color: $blue-dark;
    margin-left: 5px;
}

.date-between {
    color: $white;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: bold;
}

</style>
<script lang="ts">
import BarChart from './Chart.vue';
import moment from 'moment';
import Vue from 'vue';

export default Vue.extend({
    components: {
        BarChart,
    },
    mounted() {
        const fromDate = moment().startOf('week');
        const endDate = moment().endOf('week');
        while (fromDate.isSameOrBefore(endDate)) {
            this.weekdays.push(fromDate.format('M/D'));
            fromDate.add(1, 'days');
        }
        if (localStorage.done) {
            this.done = JSON.parse(localStorage.done);
        }
        this.todayTomato = this.calculateDay();
        this.tomotoEachDays = this.calculateWeek();
    },
    data() {
        return {
            options: {
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                        barPercentage: 0.5,
                        gridLines: {
                            color: '#FFFFFF',
                            display: false,
                        },
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
                            stepSize: 1,
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
            weekdays: [] as string[],
            done: {} as { [index: string]: [ { [index: string]: number} ]},
            todayTomato: 0 as number,
            tomotoEachDays: [] as number[],
        };
    },
    computed: {
        input(): object {
            return {
                labels: JSON.parse(JSON.stringify(this.weekdays)),
                datasets: [{
                    label: ' ',
                    backgroundColor	: '#FFFFFF',
                    data: JSON.parse(JSON.stringify(this.tomotoEachDays)),
                }],
            };
        },
        startDate(): string | undefined {
            return this.weekdays[0];
        },
        endDate(): string | undefined {
            return this.weekdays[6];
        },
        weekTomatos(): number {
            return this.tomotoEachDays.reduce((sum, num) => {
                return sum += num;
            }, 0);
        },
    },
    methods: {
        calculateDay(day = moment().format('M/D')): number {
            let sum = 0;
            if (day in this.done) {
                this.done[day].forEach((element) => {
                    sum += element[Object.keys(element)[0]];
                });
            }
            return sum;
        },
        calculateWeek(): number[] {
            const week = [] as number[];
            this.weekdays.forEach((date) => {
                week.push(this.calculateDay(date));
            });

            return week;
        },
    },
});
</script>

