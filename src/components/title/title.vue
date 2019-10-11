<!-- 挑剔 -->
<template>
   <div class='title-cont'>
       <span class="title-text">{{ title }}</span>
   </div>
</template>

<script>

export default {
    name: 'Title',
    props: ['title'],
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

.title-text::before{
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