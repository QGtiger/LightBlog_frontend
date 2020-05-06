<!-- 用户注册 -->
<template>
  <div class="register">
    <ResetPasss></ResetPasss>
  </div>
</template>

<script>
import ResetPasss from '@/components/login/ResetPass'
export default {
  components: { ResetPasss },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {
    document.querySelector('body').setAttribute('id', 'background')
  },
  methods: {},
  created() {},
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
.register {
  text-align: center;
  margin-top: 200px;
}
</style>
