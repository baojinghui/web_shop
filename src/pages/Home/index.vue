<template>
  <div>
    <!-- 使用在全局注册过的三级联动组件 -->
    <TypeNav />
    <!-- 轮播图 -->
    <ListContainer />
    <!-- 今日推荐 -->
    <Recommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!-- 楼层 -->
    <Floor
      v-for="(item, index) of floorList"
      :list="item"
      :key="item.id"
      :idex="index"
    />
    <!-- 商标 -->
    <Brand />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
export default {
  name: "Home",
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  computed: {
    //通过计算属性拿到仓库中的数据
    ...mapState({
      floorList: (state) => {
        return state.home.floor;
      },
    }),
  },
  mounted() {
    //获取floor中的数据
    this.$store.dispatch("getFloor");
  },
};
</script>

<style></style>
