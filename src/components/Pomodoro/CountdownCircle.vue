<template>
<div class="circle-location">
    <div class="countdowncircleborder" :class="isBreak ? 'border-color-blue' : 'border-color-red'">
        <div class="countdowncircle" 
            :class=" circleStyle"> 
            <div 
            class="play-background" 
            v-show="stop" 
            :class=" stop ? 'bg-white': 'bg-' + defaultColor"
            >
                <i class="el-icon-caret-right icon-style" 
                :class="stop ? 'color-' + defaultColor : 'color-white'"></i>
            </div>
            <i class="el-icon-video-pause icon-style"
            :class="stop ? 'color-white' : 'color-'+ defaultColor " 
            v-show="!stop">
            </i>
            <svg @click="toggle()">
                <circle v-show="!isBreak" r="260" cx="272" cy="274" class="animation animation-work" :style=" stop ? 'animation-play-state: paused':''"></circle>
                <circle v-show="isBreak" r="260" cx="272" cy="274" class="animation animation-break" :style=" stop ? 'animation-play-state: paused':''"></circle>
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
    border-width: 2px;
    border-style: solid;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
    
.countdowncircle {
    width: 500px;
    height: 500px;
    border: 2px solid $red;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.color-red {
    color: $red;
}

.color-blue {
    color: $blue;
}

.color-white {
    color: $white;
}

.bg-red {
    background-color: $red;
}

.bg-blue {
    background-color: $blue;
}

.bg-white {
    background-color: $white;
}

.border-color-red {
    border-color: $red;
}

.border-color-blue {
    border-color: $blue;
}

.stroke-red{
    stroke: $red;
}

.stroke-blue{
    stroke: $blue;
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
    .animation {
        fill: none;
        stroke-dasharray: 1634px;
        stroke-dashoffset: 0px;
        stroke-width: 21px;
    }
    .animation-work {
        stroke: $red;
        animation: countdown 1500s linear infinite normal;
    }
    .animation-break {
        stroke: $blue;
        animation: countdown 300s linear infinite normal;
    }
}

.paused {
    animation-play-state: paused;
}

.icon-style {
    font-size: 96px; 
}

@keyframes countdown {
    from {
        stroke-dashoffset: 1634px;
    }
    to {
        stroke-dashoffset: 0px;
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    props: {
        stop : Boolean,
        isBreak: Boolean,
    },
    computed: {
        defaultColor(): string {
            if (this.isBreak) {
                return 'blue';
            }
            return 'red';
        },
        circleStyle(): string {
            let bgColor = '';
            if (this.stop) {
                bgColor = 'bg-' + this.defaultColor;
            } else {
                bgColor = 'bg-white';
            }
            return bgColor + ' ' + 'border-color-' + this.defaultColor;
        },
    },
    methods: {
        toggle(): void {
            this.$emit('toggle', !this.stop);
        },
    },
});
</script>

