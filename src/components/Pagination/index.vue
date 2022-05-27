<template>
  <!-- 手写分页器 -->
  <!-- 上部分 -->
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="starAndEnd.star > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-show="starAndEnd.star > 2" disabled>···</button>

    <!-- 中间部分 -->
    <button
      v-for="(page, index) of starAndEnd.end"
      :key="index"
      v-show="page >= starAndEnd.star"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <!-- 下部分 -->
    <button v-if="starAndEnd.end < totalPage - 1" disabled>···</button>
    <button
      v-if="starAndEnd.end < totalPage"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo === totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button >

    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  //pageNo:当前页码数，pageSize:每一页放多少条数据，total：一共有多少条数据，continues：连续的页码数
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //计算一共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出连续页码的起始和结束位置
    starAndEnd() {
      let star = 0,
        end = 0;
      let { pageNo, totalPage, continues } = this;
      //当总页数小于连续的页码数时
      if (continues > totalPage) {
        star = 1;
        end = totalPage;
      } else {
        //正常现象
        star = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        //当当前页面为pageNo小于parseInt(continues / 2)，【star为负数】纠正
        if (star < 1) {
          star = 1;
          end = continues;
        }
        //当end大于总页码时
        if (end > totalPage) {
          end = totalPage;
          star = totalPage - continues + 1;
        }
      }
      return { star, end };
    },
  },
};
</script>

<style lang="less" scoped>
.active {
  background-color: skyblue;
}
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
