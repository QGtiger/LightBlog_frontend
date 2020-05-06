<!-- 个人专栏页面 -->
<template>
  <div class="personal-column">
    <Title title="个人专栏"></Title>
    <div class="search-cont">
      <div class="search-form">
        <el-form :model="searchForm" :inline="true">
          <el-form-item label="专栏名称:">
            <el-input v-model="searchForm.columnName" placeholder="请输入专栏名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleGetColumnList">搜索</el-button>
            <el-button type="warning" @click="handleJumpAddColumn">添加专栏</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="column-table table">
      <el-table :data="columnList">
        <el-table-column type="index" label="序号" :index="indexMethod" width="180px"></el-table-column>
        <el-table-column prop="columnName" label="专栏名称"></el-table-column>
        <el-table-column prop="description" label="专栏简介"></el-table-column>
        <el-table-column label="创建时间">
          <template v-slot="scope">
            <div>{{ $util.Time.getAllTime(scope.row.created) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <div>{{ scope.row.status === 1 ? '发布' : '未发布' }} (是否显示在个人主页)</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <div>
              <span
                class="up"
                v-if="scope.row.status === 0"
                @click="handlePubColumn(scope.row.id, scope.row.columnName)"
              >发布</span>
              <span
                class="down"
                v-else
                @click="handleDownColumn(scope.row.id, scope.row.columnName)"
              >不显示</span>
              <span class="del" @click="handleDelColumn(scope.row.id, scope.row.columnName)">删除</span>
              <span class="update" @click="handleUpdateColumn(scope.row.id)">编辑</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="currentPage"
        @current-change="handleGetColumnList"
        :page-size="size"
        :total="total"
        layout="total, prev, pager, next"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Title from '@/components/title/title'
import qs from 'qs'
export default {
  components: {
    Title
  },
  data() {
    return {
      searchForm: {
        columnName: ''
      },
      status: '',
      currentPage: 1,
      size: 10,
      total: 0,
      columnList: []
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.handleGetColumnList()
  },
  methods: {
    handleSearchColumn() {
      //搜索个人专栏
    },
    handleJumpAddColumn() {
      // 跳转到新增专栏页面
      this.$router.push('add')
    },
    indexMethod(index) {
      //table 序号
      return index + 1 + (this.currentPage - 1) * this.size
    },
    handlePubColumn(id, columnName) {
      //发布
      console(id, columnName)
    },
    handleDownColumn(id, columnName) {
      //不显示在主页
    },
    handleDelColumn(id, columnName) {
      //删除column
      this.$confirm(
        '确认删除个人专栏 -- 《' +
          columnName +
          '》 ？ 该专栏下的文章也会删除 !',
        '提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          center: 'true'
        }
      )
        .then(() => {
          this.$axios
            .post(
              '/article/api/del/personal_column',
              qs.stringify({
                columnId: id
              })
            )
            .then(res => {
              if (res) {
                this.$message.success('删除成功')
                this.handleGetColumnList()
              }
            })
        })
        .catch(() => {})
    },
    handleUpdateColumn(id) {
      //跳转到编辑页面
      this.$router.push({
        path: 'update',
        query: {
          id
        }
      })
    },
    handleGetColumnList() {
      this.$axios
        .post(
          '/article/api/get/personal_column?page=' +
            this.currentPage +
            '&size=' +
            this.size,
          qs.stringify({
            status: this.status,
            columnName: this.searchForm.columnName
          })
        )
        .then(res => {
          if (res) {
            this.columnList = res.data.data
            this.total = res.data.total
          }
        })
    }
  },
  created() {}
}
</script>
<style>
</style>