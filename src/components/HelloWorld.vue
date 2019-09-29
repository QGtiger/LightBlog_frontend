<template>
  <div class="hello">
    <div class="title-cont">
      <p class="title">
        <span data-wow-delay="0.1s" class="wow bounceInDown center">H</span>
        <span data-wow-delay="0.2s" class="wow bounceInDown center">e</span>
        <span data-wow-delay="0.3s" class="wow bounceInDown center">l</span>
        <span data-wow-delay="0.4s" class="wow bounceInDown center">l</span>
        <span data-wow-delay="0.5s" class="wow bounceInDown center">o</span>
        <span data-wow-delay="0.6s" class="wow bounceInDown center">,</span>
        <span data-wow-delay="0.7s" class="wow bounceInDown center">L</span>
        <span data-wow-delay="0.8s" class="wow bounceInDown center">i</span>
        <span data-wow-delay="0.9s" class="wow bounceInDown center">g</span>
        <span data-wow-delay="1s" class="wow bounceInDown center">h</span>
        <span data-wow-delay="1.1s" class="wow bounceInDown center">t</span>
        <span data-wow-delay="1.2s" class="wow bounceInDown center">B</span>
        <span data-wow-delay="1.3s" class="wow bounceInDown center">l</span>
        <span data-wow-delay="1.4s" class="wow bounceInDown center">o</span>
        <span data-wow-delay="1.5s" class="wow bounceInDown center">g</span>
      </p>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {

    }
  },
  mounted() {
    // $('.title-cont .title').css({ 'transform': 'translateY(0)', 'opacity': 1 });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@font-face{
  font-family: MainFont;
  src: url(../assets/font/GoodVibrationsROB Script.ttf);
}

.title-cont .title{
  font-size: 70px;
  color: #f6f6f6;
  font-family: MainFont;
  text-align: center;
}

</style>
