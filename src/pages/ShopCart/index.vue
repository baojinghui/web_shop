<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(shopCarList, index) of shopCarData"
          :key="shopCarList.skuId"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="shopCarList.isChecked"
              @change="dataChecked(shopCarList.skuId, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="shopCarList.imgUrl" />
            <div class="item-msg">{{ shopCarList.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ shopCarList.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <!-- 减少商品 -->
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('mins', -1, shopCarList)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="shopCarList.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, shopCarList)"
            />
            <!-- 添加商品 -->
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', +1, shopCarList)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{
              shopCarList.skuPrice * shopCarList.skuNum
            }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="#none"
              class="sindelet"
              @click="deleteCarList(shopCarList.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          type="checkbox"
          class="chooseAll"
          :checked="isAllChacked"
          @click="allChecked($event)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ allGoods }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ allPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import throttle from "lodash/throttle";
export default {
  data() {
    return {
      //储存vuex中返回的数据
      shopCarData: [],
    };
  },
  name: "ShopCart",
  computed: {
    //判断底部复选框是否全选，如果商品全部选中就全选
    isAllChacked() {
      return this.shopCarData.every((item) => item.isChecked == 1);
    },
    //计算一共选中了多少件商品
    allGoods() {
      let sum = 0;
      this.shopCarData.forEach((item) => {
        if (item.isChecked == 1) {
          sum += 1;
        }
      });
      return sum;
    },
    //计算出购物车中所选商品的总价格
    allPrice() {
      let sum = 0;
      this.shopCarData.forEach((item) => {
        if (item.isChecked == 1) {
          sum += item.skuNum * item.skuPrice;
        }
      });
      return sum;
    },
  },
  mounted() {
    //每次挂载都重新获取一次后台的数据
    this.getData();
  },
  methods: {
    async getData() {
      try {
        //派发请求获取购物车数据
        const a = await this.$store.dispatch("getShopCarData");
        //拿到vuex购物车中的数据添加到data中
        this.shopCarData =
          this.$store.state.shopCar.ShopCarData[0].cartInfoList || [];
      } catch (error) {
        alert(error.message);
      }
    },
    //修改某个产品个数
    handler: throttle(async function (type, disNum, shopCarList) {
      //type为了区分这三个元素，是加减还是输入框
      //disNum形参,带给服务器变化的量：+变化量(1)    -变化量(-1)    input:最终的个数（并不是变化量）
      //shopCarList:哪于个产品的详细信息【身上有id】
      //最终向服务器发请求，修改数量
      switch (type) {
        // 如果点加号
        case "add":
          //带给服务器变化的量
          disNum = 1;
          break;
        case "mins":
          disNum = shopCarList.skuNum > 1 ? (disNum = -1) : (disNum = 0);
          break;
        case "change":
          // 当改变之后的值小于当前的值时
          //disNum乘以1，如果是NAN，就让disNum=0
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else disNum = parseInt(disNum) - shopCarList.skuNum;
      }
      //派发action,重新从服务器拉取数据
      try {
        //代表修改成功
        await this.$store.dispatch("fetchAddShopCar", {
          skuId: shopCarList.skuId,
          skuNum: disNum,
        });
        //修改成功后重新获取数据
        this.getData();
      } catch (error) {
        console.log(error, 11111111);
      }
    }, 800),
    //删除所点击的产品列表
    async deleteCarList(skuId) {
      try {
        await this.$store.dispatch("getDeleteShopCar", skuId);
        //如果成功重新获取数据
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //修改单个产品复选框的状态
    async dataChecked(skuId, e) {
      try {
        //带给服务器的参数isChecked,不是布尔值，应该是o|1
        let isChecked = e.target.checked ? 1 : 0;
        await this.$store.dispatch("getChangeChecked", { skuId, isChecked });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //删除全部选中商品
    async deleteAllChecked() {
      try {
        await this.$store.dispatch("deleteAllChecked");
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //全部选中
    async allChecked(e) {
      try {
        await this.$store.dispatch("allChecked", e.target.checked ? 1 : 0);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
