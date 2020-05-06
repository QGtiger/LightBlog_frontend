<!-- 评论检举 -->
<template>
  <div class="report-comment-cont">
    <Title title="评论检举"></Title>
    <div class="search-header">
      <el-form :inline="true" :model="searchForm" label-width="100px" label-position="left">
        <el-form-item label="举报类型">
          <el-select v-model="searchForm.reportId">
            <el-option label="全部" value></el-option>
            <el-option
              v-for="item in reportTypeList"
              :key="item.id"
              :label="item.reportType"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleCommentReportList">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="report-table table">
      <el-table :data="reportList">
        <el-table-column label="序号" type="index" :index="indexMethod"></el-table-column>
        <el-table-column label="评论文章" prop="blog"></el-table-column>
        <el-table-column label="举报类型" prop="reportType"></el-table-column>
        <el-table-column label="举报内容" prop="reportText"></el-table-column>
        <el-table-column label="评论内容" width="300">
          <template v-slot="scope">
            <div>
              <div
                class="line-clamp"
                :title="scope.row.commentText"
                v-html="emoji(scope.row.commentText)"
              ></div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="举报人" prop="reportUser"></el-table-column>
        <el-table-column label="操作" width="150">
          <template v-slot="scope">
            <div style="display: flex;">
              <div>
                <el-popconfirm
                  title="确定忽略该检举吗 ？"
                  @onConfirm="handleComment(scope.row, 1)"
                  :confirmButtonText="'确定'"
                  ref="popconfirm"
                >
                  <div slot="reference">
                    <span class="detail">忽略</span>
                  </div>
                  <!-- <span slot="reference">删除</span> -->
                </el-popconfirm>
                <!-- <span class="del" @click="handleRemove(scope.row.id)">移出收藏夹</span> -->
              </div>
              <div>
                <el-popconfirm
                  title="确定删除该评论吗 ？"
                  @onConfirm="handleComment(scope.row, 2)"
                  :confirmButtonText="'确定'"
                  ref="popconfirm"
                >
                  <div slot="reference">
                    <span class="detail">
                      <i class="iconfont">&#xe618;</i> 删除
                    </span>
                  </div>
                  <!-- <span slot="reference">删除</span> -->
                </el-popconfirm>
                <!-- <span class="del" @click="handleRemove(scope.row.id)">移出收藏夹</span> -->
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="currentPage"
        @current-change="handleCommentReportList"
        :size="size"
        :total="total"
        layout="total, prev, pager, next"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Title from '@/components/title/title'
export default {
  components: {
    Title
  },
  data() {
    return {
      currentPage: 1,
      size: 7,
      total: 0,

      reportList: [],
      reportTypeList: [],
      searchForm: {
        reportId: ''
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.handleCommentReportList()
    this.handleReportTypeList()
  },
  methods: {
    handleCommentReportList() {
      this.$axios
        .post(
          '/comment/api/comment/report/list?page=' +
            this.currentPage +
            '&size=' +
            this.size,
          this.$qs.stringify({
            reportId: this.searchForm.reportId
          })
        )
        .then(res => {
          if (res) {
            this.reportList = res.data.data
            this.total = res.data.total
          }
        })
    },
    indexMethod(index) {
      return index + 1 + (this.currentPage - 1) * this.size
    },
    handleReportTypeList() {
      this.$axios.post('/comment/api/report/config/get').then(res => {
        if (res) {
          this.reportTypeList = res.data.data
        }
      })
    },
    handleComment(row, type) {
      this.$axios
        .post('/comment/api/comment/handle/report', {
          type,
          commentId: row.commentId,
          commentReportId: row.comment_report_id,
          isRoot: row.isRoot
        })
        .then(res => {
          if (res.data.success) {
            this.$message.success(res.data.tips)
            this.handleReportTypeList()
          }
        })
    }
  },
  created() {},
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less'>
//@import url(); 引入公共css类
.report-comment-cont {
  .line-clamp {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    -webkit-box-orient: vertical;
  }
}
</style>