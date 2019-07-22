<template>
<div>
    <router-link :to="{ name: 'pomodoro'}"><i class="el-icon-close exit"></i></router-link>
    <p class="pomodoro">POMODORO</p>
</div>
</template>
<style lang="scss" scoped>
@import '../../assets/scss/Pomodoro/_variables.scss';
.exit {
    color: #FFFFFF;
    font-size: 48px;
}
</style>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({

});
</script>

