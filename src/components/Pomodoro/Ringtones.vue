<template>
<el-row>
    <el-row>
        <el-col class="todoTitle">WORK</el-col>
    </el-row>
    <el-row>
        <el-col :span="8" v-for="(ring, key) in workRings" :key="key">
            <el-row class="py-15" type="flex" align="middle">
                <el-col :span="5" type="flex" justify="center" align="middle">
                    <div class="circle" :class="workSelected(ring) ? 'border-red': ''">
                        <div v-show="workSelected(ring)" class="selected">
                        </div>
                    </div>
                </el-col>
                <el-col :span="19" class="ring-name" v-text="ring"></el-col>
            </el-row>
        </el-col>
    </el-row>
    <el-row class="mt-30">
        <el-col class="todoTitle">BREAK</el-col>
    </el-row>
    <el-row>
        <el-col :span="8" v-for="(ring, key) in breakRings" :key="key">
            <el-row class="py-15" type="flex" align="middle">
                <el-col :span="5">
                    <div class="circle" :class="breakSelected(ring) ? 'border-red': ''">
                        <div v-show="breakSelected(ring)" class="selected">
                        </div>
                    </div>
                </el-col>
                <el-col :span="19" class="ring-name" v-text="ring"></el-col>
            </el-row>
        </el-col>
    </el-row>
</el-row>
</template>
<style lang="scss" scoped>
@import '../../assets/scss/Pomodoro/_variables.scss';

.mt-30 {
    margin-top: 30px;
}
.py-15 {
    padding-top: 15px;
    padding-bottom: 15px;
}

.circle {
    border: 2px solid $white;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    .selected {
        width: 14px;
        height: 14px;
        background-color: $red;
        border-radius: 50%;
    }
}

.border-red {
    border-color: $red;
}


.ring-name {
    color: $white;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: bold;
}

</style>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    data() {
        return {
            workRings: [
                'NONE',
                'DEFAULT',
                'ALARM',
                'ALERT',
                'BEEP',
                'BELL',
                'DROP',
                'HORN',
                'MUSIC',
                'RING',
                'WARNING',
                'WHISTLE',
            ] as string[],
            breakRings: [
                'NONE',
                'DEFAULT',
                'ALARM',
                'ALERT',
                'BEEP',
                'BELL',
                'DROP',
                'HORN',
                'MUSIC',
                'RING',
                'WARNING',
                'WHISTLE',
            ] as string[],
            workRingSelected: 'ALARM' as string,
            breakRingSelected: 'ALARM' as string,
        };
    },
    methods: {
        workSelected(ring: string): boolean {
            return ring === this.workRingSelected;
        },
        breakSelected(ring: string): boolean {
            return ring === this.breakRingSelected;
        },
    },
});
</script>

