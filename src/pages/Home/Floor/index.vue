<template>
  <!--楼层-->
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{ list.name }}</h3>
        <!-- 最上方的tab栏 -->
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li
              class="active"
              v-for="(tab, index) of list.navList"
              :key="index"
            >
              <a :href="`#${index}`" data-toggle="tab">{{ tab.text }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <!-- 最左侧的list -->
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="(keyword, index) of list.keywords" :key="index">
                  {{ keyword }}
                </li>
              </ul>
              <img :src="list.imgUrl" />
            </div>
            <!-- 轮播图 -->
            <el-carousel trigger="click" height="360px">
              <el-carousel-item
                v-for="carouse in list.carouselList"
                :key="carouse.id"
              >
                <img :src="carouse.imgUrl" alt="" />
              </el-carousel-item>
            </el-carousel>
            <!-- 轮播图右侧的list两个图片 -->
            <div class="split">
              <span class="floor-x-line"></span>
              <div
                class="floor-conver-pit"
                v-for="(pit, index) of list.recommendList.slice(0, 2)"
                :key="index"
              >
                <img :src="pit" />
              </div>
            </div>
            <div class="split center">
              <img :src="list.bigImg" />
            </div>
            <!-- 最右侧的两个list图片 -->
            <div class="split">
              <span class="floor-x-line"></span>
              <div
                class="floor-conver-pit"
                v-for="(pit, index) of list.recommendList.slice(2, 4)"
                :key="index"
              >
                <img :src="pit" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Floor",
  props: ["list"],
};
</script>

<style lang="less" scoped>
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: "|";
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: "";
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .el-carousel {
            width: 330px;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}
</style>
