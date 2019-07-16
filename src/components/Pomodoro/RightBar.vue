<template>
<div>
    <router-link :to="{ name: 'pomodoro'}"><i class="el-icon-close exit"></i></router-link>
    <p class="pomodoro">POMODORO</p>
</div>
</template>
<style lang="sass" scoped>
.exit 
    color: #FFFFFF
    font-size: 48px
</style>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    data() {
        return {};
    },
});
</script>

