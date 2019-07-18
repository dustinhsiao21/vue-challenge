<template>
<div class="circle-location">
    <div class="countdowncircleborder">
        <div class="countdowncircle" :class=" stop ? 'background-red': 'background-white'"> 
            <div class="play-background" v-show="stop" :class=" stop ? 'background-white': 'background-red'">
                <i class="el-icon-caret-right icon-style"></i>
            </div>
            <i class="el-icon-video-pause icon-style" v-show="!stop"></i>
            <svg :class="stop ? 'paused' : ''"  @click="toggle()">
                <circle r="260" cx="272" cy="274" :style=" stop ? 'animation-play-state: paused':''"></circle>
            </svg>
        </div>
    </div>
</div>
</template>
<style lang="scss" scoped>
@import '../../assets/scss/Pomodoro/_variables.scss';

.circle-location {
    position: absolute;
    width: 600px;
    left: 660px;
    top:100px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.countdowncircleborder {
    width: 540px;
    height: 540px;
    border: 2px solid $red;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
    
.countdowncircle {
    width: 500px;
    height: 500px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.background-red {
    background-color: $red;
}

.background-white {
    background-color: $white;
    border: 2px solid $red;
}

.play-background {
    width: 96px;
    height: 96px;
    border-radius: 50%;
}

svg {
    position: absolute;
    top: 0px;
    right: 30px;
    transform: rotateZ(-90deg);
    width: 544px;
    height: 544px;
    circle {
        fill: none;
        stroke: $red;
        stroke-dasharray: 1660px;
        stroke-dashoffset: 0px;
        stroke-width: 21px;
        animation: countdown 1500s linear infinite forwards;
    }
}

.paused {
    animation-play-state: paused;
}

.icon-style {
    font-size: 96px; 
    color: $red;
}

@keyframes countdown {
    from {
        stroke-dashoffset: 1660px;
    }
    to {
        stroke-dashoffset: 0px;
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    props: ['stop'],
    methods: {
        toggle(): void {
            this.$emit('toggle', !this.stop);
        },
    },
});
</script>

