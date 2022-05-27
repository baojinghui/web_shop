<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item  v-for="(slide,index) of skuImageList" :key="slide.id">
      <h3 class="medium">
        <img :src="slide.imgUrl" :class="{active:currentIndex===index}" @click="changeCurrent(index)"/>
        </h3>
    </el-carousel-item>
  </el-carousel>
</template>
</template>

<script>
export default {
  name: "ImageList",
  data() {
    return {
      currentIndex:0
    }
  },
  methods: {
    changeCurrent(index){
      //修改响应式数据，修改边框
      this.currentIndex=index
      //同知兄弟组件修改未轮播图照片
    this.$bus.$emit('getIndex',this.currentIndex)
    }
  },
  props: {
    skuImageList: {
      //如果父组件没有传参，设置默认值为[{}]
      type: Array,
      default: () => {
        return [{}];
      },
    },
  },
};
</script>

<style lang="less" scoped>
.el-carousel {
  overflow: hidden;
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding-left: 50px;
  img{
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    padding: 2px;
    width: 50px;
    height: 50px;
    display: block;
    &.active {
      border: 2px solid #f60;
      padding: 1px;
    }
  }
}
</style>
