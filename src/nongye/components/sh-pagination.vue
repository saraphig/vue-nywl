<template>
  <div class="sh-pagination">
    <!-- <div class="sh-pagination-info">共{{Math.ceil(total/pageSize)}}页/{{total}}条数据</div> -->
    <div class="sh-pagination-info">共{{ pageCount }}页/{{total}}条数据</div>
    <ul class="sh-pagination-list">
      <!-- 上一页 -->
      <li :class="['sh-pagination-item']"
        @click="prev">&lt;</li>
      <!-- 首页 -->
      <!-- <li :class="['sh-pagination-item']" v-show="index >= perPages&&Math.ceil(total/pageSize)>3" @click="first">1</li> -->
      <li :class="['sh-pagination-item']"
        v-show="index >= perPages&& pageCount > 3"
        @click="first">1</li>
      <!-- 前置省略号 -->
      <li :class="['sh-pagination-item']"
        v-if="showPrevMore">...</li>
      <!-- 循环生成页数 -->
      <li :class="['sh-pagination-item', {'sh-pagination-item--active' : index === pager}]"
        v-for="pager in pagers"
        @click="go(pager)">{{ pager }}</li>
      <!-- 后置省略号 -->
      <li :class="['sh-pagination-item']"
        v-if="showNextMore">...</li>
      <!-- 末页 -->
      <li :class="['sh-pagination-item']"
        v-show="index<= pages-perPages+1&&Math.ceil(total/pageSize)>3"
        @click="last">{{pages}}</li>
      <!-- 下一页 -->
      <li :class="['sh-pagination-item']"
        @click="next">&gt;</li>

    </ul>
  </div>

</template>

<script>
export default {
  name: "ShPagination",
  componentName: "ShPagination",
  //通过props来接受从父组件传递过来的值
  props: {
    //页面中的可见页码，其他的以...替代, 必须是奇数
    perPages: {
      type: Number,
      default: 3
    },
    //当前页码
    pageIndex: {
      type: Number,
      default: 1
    },
    //每页显示条数
    pageSize: {
      type: Number,
      default: 10
    },
    //总记录数
    total: {
      type: Number,
      default: 1
    }
  },
  methods: {
    first() {
      if (this.index !== 1) {
        this.go(1);
      }
    },
    prev() {
      if (this.index > 1) {
        this.go(this.index - 1);
      }
    },
    next() {
      if (this.index < this.pages) {
        this.go(this.index + 1);
      }
    },
    last() {
      if (this.index != this.pages) {
        this.go(this.pages);
      }
    },
    go(page) {
      if (this.index !== page) {
        //父组件通过change方法来接受当前的页码
        this.$emit("change", page, this.pageSize);
      }
    }
  },
  computed: {
    //计算总页码
    pages() {
      let tmpRem = this.size % this.limit;
      this.pageCount = (this.size - tmpRem) / this.limit + (tmpRem > 0 ? 1 : 0);
      return this.pageCount;
      //return Math.ceil(this.size / this.limit);
    },

    //计算页码，当count等变化时自动计算
    pagers() {
      const array = [];
      const perPages = this.perPages;
      const pageCount = this.pages;
      let current = this.index;
      const _offset = (perPages - 1) / 2;

      const offset = {
        start: current - _offset,
        end: current + _offset
      };

      //-1, 3
      if (offset.start < 1) {
        offset.end = offset.end + (1 - offset.start);
        offset.start = 1;
      }
      if (offset.end > pageCount) {
        offset.start = offset.start - (offset.end - pageCount);
        offset.end = pageCount;
      }
      if (offset.start < 1) offset.start = 1;

      this.showPrevMore = offset.start > 1;
      this.showNextMore = offset.end < pageCount;

      for (let i = offset.start; i <= offset.end; i++) {
        array.push(i);
      }
      return array;
    }
  },
  data() {
    return {
      index: this.pageIndex, //当前页码
      limit: this.pageSize, //每页显示条数
      size: this.total || 1, //总记录数
      showPrevMore: false,
      showNextMore: false,
      pageCount: 0,
    };
  },
  watch: {
    pageIndex(val) {
      this.index = val || 1;
    },
    pageSize(val) {
      this.limit = val || 10;
    },
    total(val) {
      this.size = val || 1;
    }
  }
};
</script>

<style scoped>
.sh-pagination {
  font-size: 0;
  text-align: right;
}
.sh-pagination-info {
  position: relative;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  display: inline-block;
  padding-right: 15px;
}
.sh-pagination-list {
  vertical-align: top;
  display: inline-block;
}
.sh-pagination-item {
  margin: 0 5px;
  min-width: 30px;
  border-radius: 2px;
  padding: 0 4px;
  background: #fff;
  vertical-align: top;
  display: inline-block;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  border: solid 1px #e3e8ea;
  color: #444444;
  user-select: none;
}

.sh-pagination-item:hover {
  color: #41a259;
}
.sh-pagination-item--active {
  color: #41a259;
  border: solid 1px #41a259;
}
</style>