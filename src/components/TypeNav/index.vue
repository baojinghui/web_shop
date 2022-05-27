<template>
  <div class="type-nav">
    <div class="container">
      <!--  利用事件委派 当鼠标离开这个大盒子时不显示背景  -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 子元素进行点击事件，触发事件委派，把所有的click事件委派到父元素身上通过goSearch回调进行跳转,这样就避免给每个子元素都绑定一个点击事件的回调 -->
            <div class="all-sort-list2" @click="goSearch($event)">
              <div
                class="item"
                v-for="(c1, index) of categoryList"
                :key="c1.categoryId"
              >
                <!-- 一级标题： 鼠标进入某个一级分类时，把当前分类的index传给data中的currentIndex,当当前鼠标所指的index与data中的currentIndex一样，就动态绑定一个样式-->
                <h3
                  @mouseenter="changeIndex(index)"
                  :class="{ cur: index === currentIndex }"
                >
                  <!-- 绑定一个自定义属性，data-是自定义属性的,值等于当前分级的名字，用于判断当前所点击的是a，要进行路由跳转的标签 -->
                  <!-- 通过category1，2，3Id获得来判断点击的a是几级分类的 -->
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >
                    {{ c1.categoryName }}
                  </a>
                </h3>
                <!-- 二级分类： 当鼠标经过的下标等于data中的索引就显示当前一级分类的二级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: index === currentIndex ? 'block' : 'none',
                  }"
                >
                  <div
                    class="subitem"
                    v-for="c2 of c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >
                          {{ c2.categoryName }}
                        </a>
                      </dt>
                      <dd>
                        <em v-for="c3 of c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true, //控制路由跳转后，列表的隐藏
    };
  },
  methods: {
    //当鼠标移动到某个元素时获取哪个元素的索引，并设置节流
    changeIndex(index) {
      clearTimeout(timer);
      const timer = setTimeout(() => {
        this.currentIndex = index;
      }, 50);
    },
    //鼠标离开让data中的currentIndex等于-1，这样就不会给h3动态添加样式背景
    leaveIndex() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") this.show = false;
    },
    //进行路由跳转的方法,
    goSearch(event) {
      //最好的解决方案：编程式导航+事件委派
      //存在一些问题：事件委派，是把全部的子节点【h3、dt、d1、em】的事件委派给父亲节点
      //点击a标签的时候，才会进行路由跳转【怎么能确定点击的一定是a标签】
      //存在另外一个问题：即使你能确定点击的是标签，如何区分是一级、二级、三级分类的标签。
      //第一个问题：把子节点当中a标签，我加上自定义属性data-categoryName,其余的子节点是没有的
      let element = event.target;
      //获取到当前出发这个事件的节点【h3、a、dt、dl】,需要带有data-categoryname.这样节点【一定是a标签】I
      //节点有一个dataset属性，可以获取节点的自定义属性与属性值,是一个对象形式，可以结构出来,但是得到的自定义属性是小写的，而且没有连字符
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        let loction = { name: "search" }; //路由信息
        let query = { categoryName: categoryname }; //为query参数动态添加categoryname和category1id
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        //如果路由跳转时有params参数，也要把params参数和query参数合并带过去
        //注意this.$route.params是一个空对象，判断条件为真，下面的if条件会一直被执行
        if (this.$route.params) {
          loction.params = this.$route.params;
          //整理参数
          loction.query = query;
          // 路由跳转
          this.$router.push(loction);
        }
      }
    },
    //当鼠标进入时让列表显示
    enterShow() {
      this.show = true;
    },
  },
  mounted() {
    //进行路由跳转后，三级联动组件会在search组件中重新挂载，根据路由路径判断当前所在路由是谁，是search就隐藏，不是search就显示
    if (this.$route.path !="/home") this.show = false;
  },
  computed: {
    //读取state中的数据
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList.slice(0, 16);
      },
    }),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    //过渡动画的样式
    //过渡动画进入开始状态
    .sort-enter,
    .sort-leave-to {
      height: 0px;
    }
    //过渡动画进入的结束状态
    .sort-enter-to,
    .sort-leave {
      height: 461px;
    }
    //定义整个进入和离开动画的所需要的时间
    .sort-enter-active,
    .sort-leave {
      transition: all 0.5s linear;
    }
  }
}
</style>
