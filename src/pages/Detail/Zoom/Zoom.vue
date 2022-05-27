<template>
  <div class="spec-preview">
    <img :src="imgObj" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      current: 0,
    };
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
  methods: {
    handler(e) {
      let mask = this.$refs.mask;
      let big = this.$refs.big;
      //offsetXY 针对目标元素的左上角坐标 也就是.event这个盒子
      let left = e.offsetX - mask.offsetWidth / 2;
      let top = e.offsetY - mask.offsetHeight / 2;
      //约束范围
      if (left <= 0) left = 0;
      //因为两个蒙版正好是整个盒子的宽度，所以当left大于一个蒙版宽度时，剩余空间正好被另一个蒙版宽度填充
      if (left >= mask.offsetWidth) left = mask.offsetWidth;
      if (top < 0) top = 0;
      if (top >= mask.offsetHeight) top = mask.offsetHeight;
      // 修改遮罩层的left，top属性，这个属性是以带有绝对定位的父盒子为参照
      mask.style.top = top + "px";
      mask.style.left = left + "px";
      big.style.left = -2 * left + "px";
      big.style.top = -2 * top + "px";
    },
  },
  computed: {
    imgObj() {
      return this.skuImageList[this.current].imgUrl || {};
    },
  },
  mounted() {
    //获取兄弟组件传递过来的索引
    this.$bus.$on("getIndex", (index) => {
      this.current = index;
    });
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
