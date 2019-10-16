<!-- 挑剔 -->
<template>
   <div class='title-cont'>
       <span class="back" v-if="back"><i class="iconfont" @click="goBack">&#xe636;</i></span>
       <span class="title-border" v-else></span>
       <span class="title-text">{{ title }}</span>
   </div>
</template>

<script>

export default {
    name: 'Title',
    props: ['title', 'back'],
    components: {},
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    mounted() {

    },
    methods: {
        goBack() {
            this.$router.back();
        }
    }
}
</script>
<style lang='less' scoped>

.title-cont{
    height: 80px;
    line-height: 80px;
}


.title-cont .title-text{
    font-size: 20px;    
    color: #151515;
    font-weight: 700;
    line-height: 60px;
}

.title-cont .back{
    display: inline-block;
}

.title-cont .back .iconfont{
    font-size: 30px !important;
    cursor: pointer;
    color: #bf0000;
}

.title-cont .title-text{
    padding-left: 20px;
}

.title-border::before{
    content: '';
    display: inline-block;
    width: 4px;
    height: 20px;
    background-color: #bf0000;
    margin-right: 10px;
    vertical-align: top;
    margin-top: 28px;
}
</style>