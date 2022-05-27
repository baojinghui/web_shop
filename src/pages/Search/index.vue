<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑 -->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 如果searchParams.categoryName，则展示分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="delBread">×</i>
            </li>
            <!-- 如果searchParams.keyWord，则展示关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyWord">
              {{ searchParams.keyWord }}<i @click="removeKeyWord">×</i>
            </li>
            <!-- trademark品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 平台的售卖属性值的面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) of searchParams.peops"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合
                    <span
                      v-show="isOne"
                      class=""
                      :class="{
                        'el-icon-upload2': isAsc,
                        'el-icon-download': isDesc,
                      }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格<span
                      v-show="isTwo"
                      :class="{
                        'el-icon-upload2': isAsc,
                        'el-icon-download': isDesc,
                      }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(goods, index) of goodsList"
                :key="goods.id"
                :index="index"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`">
                      <img v-lazy="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器，这里需要向子组件传递数据 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
import Pagination from "@/components/Pagination";
export default {
  name: "Search",
  data() {
    return {
      //要带给服务器的参数
      searchParams: {
        //一级分类的id
        category1Id: "",
        //二级分类的id
        category2Id: "",
        //三级分类的id
        category3Id: "",
        //搜索的关键字
        keyWord: "",
        //价格升序降序:默认降序
        order: "1:desc",
        //当前是分页器的第几页
        pageNo: 1,
        //表示展示数据的个数
        pageSize: 10,
        //平台售卖属性操作带的参数
        peops: [],
        //品牌
        trademark: "",
      },
    };
  },
  components: { SearchSelector, Pagination },
  computed: {
    //mapGetters里面的写法：传递数组，因为getters中的数据没有划分模块
    ...mapGetters(["goodsList"]),
    // 判断是几来确定给谁添加active这个类,来动态添加背景颜色，从而确定当前用是什么方式排序
    isOne() {
      //当前为综合排序
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      //当前为按价格排序
      return this.searchParams.order.indexOf("2") != -1;
    },
    //通过判断当前saerchParams中order包含asc还是desc来确定当前升序和降序
    isAsc() {
      //包含asc为升序
      return this.searchParams.order.includes("asc");
    },
    isDesc() {
      //包含desc为降序
      return this.searchParams.order.includes("desc");
    },
    ...mapState({
      total: (state) => {
        return state.search.searchList.total;
      },
    }),
  },
  methods: {
    //声明一个函数，在每次更新数据发请求时调用
    getData() {
      //通知vuex发送请求，拿数据存在vuex的state中
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    //移除分类的面包屑：searchParams.categoryName为undefined让面包屑的内容为空从而不展示面包屑
    delBread() {
      //把categoryName清空，并且重新请求一次数据，渲染
      this.searchParams.categoryName = undefined;
      //每次发完请求把请求参数清空，等待下次传递
      //带给服务器参数说明可有可无的：如果属性值为空的字符串还是会把相应的字段带给服务器造成服务器压力，但是你把相应的字段变为undefined,当前这个字段不会带给服务器
      this.category1Id = undefined;
      this.category2Id = undefined;
      this.category3Id = undefined;
      this.getData();
      //通过在当前页面进行路由跳转从而更新url地址，让url中的参数消失
      if (this.$route.params) {
        this.$router.push({
          name: "search", //不携带 参数
          params: this.$route.params, //删除query参数保留params参数
        });
      }
    },
    //移除关键字的面包屑
    removeKeyWord() {
      this.searchParams.keyWord = undefined;
      this.getData();
      //通过全局事件总线，让header组件中的搜索框清空
      this.$bus.$emit("clear");
      if (this.$route.query) {
        this.$router.push({
          name: "search",
          query: this.$route.query,
        });
      }
    },
    //自定义事件回调,从子组件中获取品牌信息
    trademarkInfo(trademarkData) {
      // 整理品牌字段的参数
      this.searchParams.trademark = `${trademarkData.tmId}:${trademarkData.tmName}`;
      this.getData();
    },
    //移除配牌信息的面包屑
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    //收集子组件传递过来的售卖属性
    attrInfo(attrs, attrValue) {
      let props = `${attrs.attrId}:${attrValue}:${attrs.attrName}`;
      //如果peops数组中存在过一个属性了，就不在往数组里面重复推入元素
      if (!this.searchParams.peops.includes(props))
        this.searchParams.peops.push(props);
    },
    //移除售卖属性的面包屑
    removeAttr(index) {
      this.searchParams.peops.splice(index, 1);
    },
    //对综合的升序和降序进行控制
    changeOrder(flag) {
      //flag形参，用来判段用户传进来的是1还是2
      //这里是点击之前的数据状态
      let orginOrder = this.searchParams.order;
      let orginFlag = orginOrder.split(":")[0];
      let orginSort = orginOrder.split(":")[1];
      let newOrder = "";
      if (flag === orginFlag) {
        newOrder = `${orginFlag}:${orginSort === "desc" ? "asc" : "desc"}`;
      } else newOrder = `${flag}:${orginSort}`;
      this.searchParams.order = newOrder;
      this.getData();
    },
    // 定义自定义事件，得到子组件传递过来的当前分页器的页码数
    getPageNo(pageNo) {
      this.searchParams.pageNo = pageNo;
      this.getData();
    },
  },
  //做据监听：监听组件实例身上的属性的两性伯变化
  watch: {
    //监听路由信息是否发生变化，如果发生变化，再次发起清求
    $route(newvalue, oldvalue) {
      //再次发起请求之前整理合并要想服务器发送的参数,
      Object.assign(this.searchParams, this.$route.params, this.$route.query); //合并路由参数
      //冉次发回ajax请求
      this.getData();
      //每次发完请求把请求参数清空，等待下次传递，不然上次请求的参数不会清除
      this.category1Id = undefined;
      this.category2Id = undefined;
      this.category3Id = undefined;
    },
  },
  //当组件挂载完毕之前执行一次，让data中的数据和路由传递过来的参数合并，发请求时使用合并在一起的参数,【先与mounted之前】
  beforeMount() {
    Object.assign(this.searchParams, this.$route.params, this.$route.query); //合并路由参数，其中包括展示面包屑的categoryName属性
  },
  mounted() {
    //在挂载时调用一次获取数据的函数
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
