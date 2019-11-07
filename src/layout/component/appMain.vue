<!-- appMain -->
<template>
    <transition name="slide" mode="out-in">
        <router-view :key="key"/>
    </transition>
</template>

<script>

export default {
    name: 'AppMain',
    components: {},
    computed:{
        key() {
            return this.$route.path + Math.random();
        }
    }
}
</script>
<style lang='less' scoped>

</style>