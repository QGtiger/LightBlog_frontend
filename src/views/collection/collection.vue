<template>
  <div class="collection">
    <Title title="收藏夹管理"></Title>
    <div class="table">
      <el-table :data="blogList">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" label-width="120px" class="table-expend">
              <el-form-item label="文章标题:">
                <span>{{ props.row.title }}</span>
              </el-form-item>
              <el-form-item label="文章简介:">
                <div>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="props.row.description"
                    placement="top-start"
                  >
                    <p class="line-clamp-2" style="line-height:28px">{{ props.row.description }}</p>
                  </el-tooltip>
                </div>
              </el-form-item>
              <el-form-item label="文章作者:">
                <div>
                  <router-link
                    :to="{path: '/author/detail', query:{user: props.row.author}}"
                  >{{props.row.author}}</router-link>
                </div>
              </el-form-item>
              <el-form-item label="文章所属专栏:">
                <div>
                  <span>{{ props.row.specialColumn }}</span>
                </div>
              </el-form-item>
              <el-form-item label="文章所属专题:">
                <div>
                  <span>{{ props.row.specialTheme }}</span>
                </div>
              </el-form-item>
              <el-form-item label="文章预览图:">
                <div
                  style="display: flex; align-items:center; cursor: pointer;"
                  @click="handleShowLBImg(props.row)"
                >
                  <img style="width: 20px; margin-top: -2px;" src="@/assets/images/view.png" alt />
                  <span style="margin-left: 10px;color: rgb(95, 151, 220);">点击预览</span>
                </div>
              </el-form-item>
              <el-form-item label="创建时间:">
                <div>
                  <span>{{ $util.Time.getAllTime(props.row.created) }}</span>
                </div>
              </el-form-item>
              <el-form-item label="更新时间:">
                <div>
                  <span>{{ $util.Time.getAllTime(props.row.updated) }}</span>
                </div>
              </el-form-item>
              <el-form-item label="点赞数:">
                <div>
                  <span>{{ props.row.usersLike }} 次</span>
                </div>
              </el-form-item>
              <el-form-item label="被踩次数:">
                <div>
                  <span>{{ props.row.usersDisLike }} 次</span>
                </div>
              </el-form-item>
              <el-form-item label="浏览次数:">
                <div>
                  <span>{{ props.row.scanCount }} 次</span>
                </div>
              </el-form-item>
              <el-form-item label="文章字数:">
                <div>
                  <span>{{ props.row.wordCount }} 字</span>
                </div>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="序号" type="index" :index="indexMethod"></el-table-column>
        <el-table-column label="标题">
          <template v-slot="scope">
            <div>
              <router-link :to="{path: '/blog/'+scope.row.id}">{{ scope.row.title }}</router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="作者" prop="author">
          <template v-slot="scope">
            <div>
              <router-link
                :to="{path: '/author/detail', query:{user:scope.row.author}}"
              >{{ scope.row.author }}</router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="所属专栏" prop="specialColumn"></el-table-column>
        <el-table-column label="所属专题" prop="specialTheme"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template v-slot="scope">
            <div>
              <el-popconfirm
                title="确定移除收藏夹 ？"
                @onConfirm="handleRemove(scope.row.id)"
                :confirmButtonText="'确定'"
                ref="popconfirm"
              >
                <div slot="reference">
                  <span class="del">
                    <i style="color: #bf0000" class="iconfont">&#xe618;</i> 移出收藏夹
                  </span>
                </div>
                <!-- <span slot="reference">删除</span> -->
              </el-popconfirm>
              <!-- <span class="del" @click="handleRemove(scope.row.id)">移出收藏夹</span> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <LBImage :open="isShowLBImg" :src="showImgSrc" @close-img="handleCloseLBImg"></LBImage>
  </div>
</template>

<script>
import Title from '@/components/title/title'
import LBImage from '@/components/LBImage/LBImage'
export default {
  name: 'collection',
  components: {
    Title,
    LBImage
  },
  data() {
    return {
      blogList: [],
      currentPage: 1,
      size: 10,
      isShowLBImg: false,
      showImgSrc: ''
    }
  },
  mounted() {
    this.handleGetCollectBlog()
  },
  methods: {
    handleGetCollectBlog() {
      this.$axios.post('/article/api/myself/collection').then(res => {
        if (res) {
          console.log(res)
          this.blogList = res.data.data
        }
      })
    },
    indexMethod(index) {
      return index + 1 + (this.currentPage - 1) * this.size
    },
    handleCloseLBImg() {
      this.isShowLBImg = false
    },
    handleShowLBImg(item) {
      this.isShowLBImg = true
      this.showImgSrc = item.articlePreview
    },
    handleRemove(id) {
      console.log(id)
      this.$axios
        .post('/article/api/favorite/remove', {
          id
        })
        .then(res => {
          if (res) {
            this.$message.success('已成功移出收藏夹')
            this.blogList = this.blogList.filter(blog => {
              return blog.id !== id
            })
          }
        })
    }
  }
}
</script>

<style lang="less">
.table-expend {
  label {
    color: #99a9bf;
  }
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>