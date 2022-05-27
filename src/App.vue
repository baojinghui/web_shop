<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter === true" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: { Header, Footer },
  mounted() {
    //获取三级列表所展示数据，通知vuex发请求，储存与仓库，这样路由跳转时不会销毁App组件，不会重复发送请求，优化性能
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>
