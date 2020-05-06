<!-- 博客详情 -->
<template>
  <div class="blog-detail">
    <div class="blog-cont">
      <div class="markdown-cont">
        <span class="svg-container" v-if="blogInfo.isRecommend">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icontuijian-right" />
          </svg>
        </span>
        <el-breadcrumb
          style="padding: 25px;background-color: rgb(251, 251, 251);"
          separator-class="el-icon-arrow-right"
        >
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            :to="{ path: '/theme/list', query: {id: blogInfo.specialColumnId} }"
          >{{ blogInfo.specialColumn }}</el-breadcrumb-item>
          <el-breadcrumb-item
            :to="{path: '/theme/blog/'+blogInfo.specialThemeId}"
          >{{ blogInfo.specialTheme }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ blogInfo.title }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="blog-header">
          <div class="blog-title">
            <h1>{{ blogInfo.title }}</h1>
          </div>
          <div class="blog-author">
            <div class="avator">
              <router-link :to="{ path: '/author/detail', query: { user: blogInfo.author } }">
                <img :src="blogInfo.author_url" alt="233" />
              </router-link>
            </div>
            <div class="author-info">
              <p>
                <router-link
                  :to="{ path: '/author/detail', query: { user: blogInfo.author } }"
                >{{ blogInfo.author }}</router-link>
              </p>
              <p class="tips-footer">
                <span class="create-time">{{ $util.Time.getAllTime(blogInfo.updated) }}</span>
                &nbsp;&nbsp;
                <span
                  class="word-count"
                >字数: {{handleNumToThousands(blogInfo.wordCount)}}</span>
                &nbsp;&nbsp;
                <span
                  class="read-count"
                >阅读数: {{handleNumToThousands(blogInfo.scanCount)}}</span>
                &nbsp;&nbsp;
                <span
                  class="like-count"
                >点赞数: {{handleNumToThousands(blogInfo.usersLike)}}</span>
              </p>
            </div>
          </div>
        </div>
        <mavon-editor
          class="md"
          :value="body"
          :subfield="false"
          :defaultOpen="'preview'"
          :toolbarsFlag="false"
          :editable="false"
          :scrollStyle="true"
          :ishljs="true"
          :boxShadow="false"
        ></mavon-editor>
      </div>
      <div class="fixed-box">
        <div class="markdown-meta-right">
          <div class="author-info">
            <div class="author-avator">
              <div
                style="display:inline-block;cursor:pointer"
                @click="handleJumpAuthorDetail(blogInfo.author)"
              >
                <el-avatar :src="blogInfo.author_url"></el-avatar>
              </div>
            </div>
            <div class="author-avator-right">
              <div class="right-top">
                <span
                  class="author-text"
                  @click="handleJumpAuthorDetail(blogInfo.author)"
                >{{ blogInfo.author }}</span>
                <div
                  class="follow-cont"
                  v-if="blogInfo.author != $store.state.username"
                  style="display: inline-block; float:right"
                >
                  <span class="follow-author" v-if="!isFollow" @click="handleFollowAuthor">+ 关注</span>
                  <span class="follow-author" v-else @click="handleFollowAuthor">- 取消关注</span>
                </div>
              </div>
              <div class="right-bottom">
                <span class="meta-text">已发布了 {{ blogInfo.author_blogsCount }} 篇文章</span>
              </div>
            </div>
          </div>
          <div class="blog-description">
            <span>本篇文章字数 {{ blogInfo.wordCount }}</span>
            <span>阅读数: {{ blogInfo.scanCount }} 人</span>
            <span>点赞数: {{ blogInfo.usersLike }} 人</span>
            <span style="word-break: break-word;">基本介绍: {{ blogInfo.description }}</span>
            <span>更新时间: {{ $util.Time.getAllTime(blogInfo.updated) }}</span>
          </div>
          <div class="recommendBlogsList">
            <div
              class="recommend-blog"
              v-for="item in blogInfo.author_recommendBlogsList"
              :key="item.id"
            >
              <div class="title-cont">
                <p
                  class="title-text"
                  style="cursor: pointer;"
                  @click="handleJumpBlogDetail(item.id)"
                >{{ item.title }}</p>
              </div>
              <div class="meta-footer">
                <span>{{ item.scanCount }}人 阅读</span>
                <span>{{ item.usersLike }}人 点赞</span>
                <span>{{ $util.Time.getFormatTime(item.updated) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="comment-page-cont">
        <div class="comment-editor">
          <img class="commentator-avator" :src="this.$store.state.avatorUrl" alt />
          <div class="editor-cont">
            <div class="editor-body">
              <textarea
                ref="commentEditor"
                rows="8"
                class="editor"
                v-model="commentText"
                @focus="handleFocusTextarea"
              ></textarea>
              <div class="editor-meta-footer">
                <div class="f-right">
                  <i
                    title="预览"
                    @click="handleShowPreviewComment"
                    class="preview-btn iconfont"
                  >&#xe605;</i>
                </div>
              </div>
              <transition
                name="staggered-fade"
                :css="false"
                @before-enter="beforeEnter"
                @enter="enter"
                @leave="leave"
              >
                <div class="preview-cont" v-if="isShowPreviewComment">
                  <div v-html="emoji(commentText)"></div>
                </div>
              </transition>
            </div>
            <div class="editor-footer">
              <transition name="el-fade-in-linear">
                <div class="meta" v-if="isShowCommentBtn">
                  <i
                    style="font-size: 26px;padding:10px;display: inline-block;cursor:pointer;"
                    class="iconfont"
                    @click="handleShowEmoji"
                  >&#xe745;</i>
                  <div class="btn-list">
                    <button
                      class="confirm-comment"
                      :class="{ confirm_hover :  commentText != ''}"
                      @click="handleConfirmComment"
                      :disabled="commentText == ''"
                    >发布</button>
                    <button class="cancel-comment" @click="handleCancelComment">取消</button>
                  </div>
                  <transition name="el-fade-in-linear" mode>
                    <div class="emoji-box" v-if="showEmoji">
                      <i class="iconfont cancel-btn" @click="showEmoji = false">&#xe63a;</i>

                      <vue-emoji @select="selectEmoji"></vue-emoji>
                      <span class="pop-arrow arrow"></span>
                    </div>
                  </transition>
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div class="comment-pagination-cont" ref="commentPagination">
          <lb-comments
            :currentUser="this.$store.state.username"
            :commentsList="commentsList"
            :commentsCount="commentExtra.comments_count"
            :total="total"
            :size="size"
            :reportTypeList="reportTypeList"
            @pageChange="handleChangeCommentPage"
          ></lb-comments>
        </div>

        <div class="fixed-bottom">
          <div class="fixed-main-cont">
            <div class="comment-textarea">
              <textarea
                class="bottom-comment-textarea"
                ref="bottomTexteara"
                v-model="initCommentBottom"
                :class="focusTextarea ? 'focus-textarea' : ''"
                @focus="handleFocusBottomTextarea"
              ></textarea>
              <transition name="fade">
                <div class="right-meta" v-show="focusTextarea">
                  <i
                    style="margin-right: 10px;padding: 4px;font-size: 20px;float:left; display: inline-block;cursor:pointer;"
                    class="iconfont"
                    @click="handleShowSelectEmoji"
                  >&#xe745;</i>
                  <div style="margin-top:4px">
                    <span
                      class="confirm-comment"
                      :class="{ confirm_hover :  initCommentBottom != ''}"
                      @click="handleConfirmBottomComment"
                    >确认</span>
                    <span class="cancel-comment" @click="handleCancelBottomCommment">取消</span>
                  </div>
                </div>
              </transition>
            </div>
            <div class="comment-num bottom-icon" @click="handleScrollToComment">
              <i class="iconfont commentIcon">&#xe60c;</i>
              <div class="comment-num num">{{ handleNumToThousands(commentExtra.comments_count) }}</div>
            </div>
            <div
              class="comment-like bottom-icon"
              @click="handleBlogLike"
              :class="is_like ? 'color-red' : ''"
            >
              <i class="iconfont thumb-btn">&#xe600;</i>
              <div class="num">{{handleNumToThousands(like_count)}}</div>
            </div>
            <div
              class="comment-like bottom-icon"
              @click="handleBlogDisLike"
              :class="is_dislike ? 'color-67c23a' : ''"
            >
              <i class="iconfont thumb-btn" style="transform: rotate(180deg)">&#xe600;</i>
              <div class="num">{{handleNumToThousands(dislike_count)}}</div>
            </div>
            <div class="bottom-icon" style="cursor: pointer" @click.stop>
              <i class="iconfont" style="font-size: 20px" @click="handleShowMoreMenu">&#xe865;</i>
              <transition name="slide-bottom-fade">
                <div class="more-menu" v-show="isShowMoreMenu">
                  <ul>
                    <li @click="handleCollect">{{ is_collected ? '移出收藏夹' : '收藏文章' }}</li>
                    <li @click="handleReportArticle">举报文章</li>
                  </ul>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="el-fade-in-linear" mode>
      <div
        class="emoji-box-fixed"
        :style="{ left: emojiClientX + 'px', top: emojiClientY  + 'px'}"
        v-if="absoluteEmoji"
      >
        <i class="iconfont cancel-btn" @click="absoluteEmoji = false">&#xe63a;</i>

        <vue-emoji @select="selectBottomEmoji"></vue-emoji>
        <span class="pop-arrow arrow"></span>
      </div>
    </transition>
    <report-dialog
      :showDialog="isShowReportDialog"
      @cancel-edit="handleCancelReport"
      @confirm-report="handleConfirmReport"
      :reportTypeList="reportTypeList"
      ref="reportDialog"
      key="article_report"
    ></report-dialog>
  </div>
</template>

<script>
import qs from 'qs'
import vueEmoji from '@/components/emoji/emoji.vue'
import Velocity from 'velocity-animate'
import ReportDialog from '@/components/LBComments/dialogReport'
import { scrollTo } from '@/utils/scrollTo.js'

export default {
  components: {
    vueEmoji,
    ReportDialog
  },
  data() {
    return {
      blogId: '',
      body: '',
      blogInfo: {},
      isFollow: false,

      commentText: '', //评论文字
      isShowCommentBtn: false, //是否显示评论按钮,
      showEmoji: false, //是否显示emoji
      isShowPreviewComment: false, //是否 预览 评论,

      currentPage: 1, //评论
      total: 0,
      size: 10,
      commentsList: [], //评论列表

      commentExtra: {}, //评论 extra
      focusTextarea: false, //bottom textarea是否focus

      bottomCommentText: '',

      absoluteEmoji: false,
      emojiClientX: 0,
      emojiClientY: 0,

      is_like: false,
      like_count: 0,
      is_dislike: false,
      dislike_count: 0,

      isShowMoreMenu: false,

      is_collected: false, //是否收藏

      isShowReportDialog: false,
      reportTypeList: []
    }
  },
  computed: {
    initCommentBottom: {
      get: function() {
        return this.bottomCommentText.replace(/(^\s*)|(\s*$)/g, '')
      },
      set: function(value) {
        this.bottomCommentText = value
      }
    }
  },
  watch: {
    blogId() {
      document.body.removeEventListener(
        'click',
        this.handleHiddenMoreMenu,
        false
      ) //error
    },
    '$route.params'(to, from) {
      console.log('watch route')
    }
  },
  mounted() {
    this.blogId =
      this.$route.params.id == undefined ? '' : this.$route.params.id
    this.$route.params.id == undefined ? '' : this.handleGetBlogDetail()
    $(window).scroll(function() {
      if ($(window).scrollTop() >= 80) {
        $('.fixed-box').addClass('fixed-css')
      } else {
        $('.fixed-box').removeClass('fixed-css')
      }
    })
    this.handleGetComments(this.currentPage)
    this.handleCommentExtra()

    this.handleReportTypeList()
  },
  methods: {
    handleReportArticle() {
      this.isShowReportDialog = true
    },
    handleReportTypeList() {
      this.$axios.post('/comment/api/report/config/get').then(res => {
        if (res) {
          this.reportTypeList = res.data.data
        }
      })
    },
    handleCancelReport() {
      this.isShowReportDialog = false
    },
    handleConfirmReport(data) {
      console.log(data)
    },
    handleCollect() {
      this.$axios
        .post(
          '/article/api/blog/collect',
          this.$qs.stringify({
            id: this.blogId,
            action: this.is_collected ? 'not-collect' : 'collect'
          })
        )
        .then(res => {
          if (res) {
            this.is_collected = !this.is_collected
            this.$message.closeAll()
            this.$message.success(res.data.tips)
          }
        })
    },
    handleShowMoreMenu() {
      this.isShowMoreMenu = !this.isShowMoreMenu
    },
    handleBlogLike() {
      //文章点赞
      this.$axios
        .post(
          '/article/api/blog/like',
          this.$qs.stringify({
            id: this.blogId,
            action: 'like'
          })
        )
        .then(res => {
          if (res.data.success) {
            this.$message.closeAll()
            this.$message.success(res.data.tips)
            this.is_like = res.data.is_like
            this.like_count = res.data.like_count
            // this.is_dislike = res.data.is_dislike;
            // this.dislike_count = res.data.dislike_count;
          }
        })
    },
    handleBlogDisLike() {
      //caicai 文章
      this.$axios
        .post(
          '/article/api/blog/like',
          this.$qs.stringify({
            id: this.blogId,
            action: 'dislike'
          })
        )
        .then(res => {
          if (res.data.success) {
            this.$message.closeAll()
            this.$message.success(res.data.tips)
            this.is_dislike = res.data.is_dislike
            this.dislike_count = res.data.dislike_count
          }
        })
    },
    handleTest() {
      console.log(123)
    },
    handleScrollToComment() {
      scrollTo(
        document.getElementsByClassName('wrap')[0],
        this.$refs.commentPagination
      )
      // document.getElementsByClassName('wrap')[0].scrollTop = this.$refs.commentPagination.offsetTop;
    },
    handleCancelBottomCommment() {
      this.initCommentBottom = ''
      this.focusTextarea = false
    },
    handleShowSelectEmoji(e) {
      this.emojiClientX = e.clientX - 200
      this.emojiClientY = e.clientY - 230
      this.absoluteEmoji = true
      console.log(this.emojiClientX)
    },
    handleCommentExtra() {
      this.$axios
        .post(
          '/comment/api/comment/extra',
          this.$qs.stringify({
            blogId: this.blogId
          })
        )
        .then(res => {
          if (res) {
            this.commentExtra = res.data.data
            console.log(res)
          }
        })
    },
    handleGetComments(page) {
      this.$axios
        .post(
          '/comment/api/comment/get?page=' + page + '&size=' + this.size,
          this.$qs.stringify({
            blogId: this.blogId
          })
        )
        .then(res => {
          if (res) {
            console.log(res.data.data)
            this.commentsList = res.data.data
            this.total = res.data.total
          }
        })
    },
    handleChangeCommentPage(page) {
      this.handleGetComments(page)
    },
    handleGetBlogDetail() {
      this.$axios
        .post(
          '/article/api/detail/blog',
          qs.stringify({
            id: this.blogId
          })
        )
        .then(res => {
          if (res) {
            this.blogInfo = res.data.data
            this.is_like = res.data.is_like
            this.is_dislike = res.data.is_dislike
            this.like_count = res.data.data.usersLike
            this.dislike_count = res.data.data.usersDisLike
            ;(this.is_collected = res.data.is_collected),
              (this.body = res.data.data.body)
            this.isFollow = res.data.is_follow
          }
        })
    },
    handleJumpBlogDetail(id) {
      //跳转到文章详情
      this.$router.push('/blog/' + id)
    },
    handleJumpAuthorDetail(username) {
      this.$router.push({
        path: '/author/detail',
        query: {
          user: username
        }
      })
    },
    handleFollowAuthor() {
      //关注 用户
      let type = this.isFollow ? 'notFollow' : 'follow'
      this.$axios
        .post(
          '/account/api/author/follow',
          qs.stringify({
            follow: this.blogInfo.author,
            type: type
          })
        )
        .then(res => {
          if (res) {
            this.$message.success(this.isFollow ? '取消关注成功' : '关注成功')
            this.isFollow = this.isFollow ? false : true
          }
        })
    },
    handleNumToThousands(num) {
      var str = (num || 0).toString()
      var result = ''
      while (str.length > 3) {
        result = ',' + str.slice(-3) + result
        str = str.slice(0, str.length - 3)
      }
      if (str) {
        result = str + result
      }
      return result
    },
    handleFocusTextarea() {
      this.isShowCommentBtn = true
    },
    handleCancelComment() {
      this.isShowCommentBtn = false
      this.commentText = ''
      this.isShowPreviewComment = false
      this.showEmoji = false
    },
    handleShowEmoji() {
      this.showEmoji = true
    },
    selectEmoji(code) {
      let strList = this.commentText.split('')
      let selectionStart = this.$refs.commentEditor.selectionStart
      strList.splice(selectionStart, 0, code)
      this.commentText = strList.join('')
      this.showEmoji = false
    },
    selectBottomEmoji(code) {
      let strList = this.initCommentBottom.split('')
      let selectionStart = this.$refs.bottomTexteara.selectionStart
      strList.splice(selectionStart, 0, code)
      this.initCommentBottom = strList.join('')
      this.absoluteEmoji = false
    },
    handleConfirmComment() {
      if (this.commentText.replace(/(^\s*) | (\s*$)/g, '').length === 0) {
        this.$message.warning('评论内容不能为空')
        return
      }
      this.$axios
        .post(
          '/comment/api/comment/post',
          this.$qs.stringify({
            blogId: this.blogId,
            commentatorName: this.$store.state.username,
            commentText: this.commentText
          })
        )
        .then(res => {
          if (res) {
            this.$message.success('感谢你的评论')
            this.commentsList.unshift({
              comment_root: res.data.data,
              comment_reply: []
            })
            this.total += 1
            this.handleCancelComment()
          }
        })
    },
    handleConfirmBottomComment() {
      if (this.initCommentBottom.replace(/(^\s*) | (\s*$)/g, '').length === 0) {
        this.$message.warning('评论内容不能为空')
        return
      }
      this.$axios
        .post(
          '/comment/api/comment/post',
          this.$qs.stringify({
            blogId: this.blogId,
            commentatorName: this.$store.state.username,
            commentText: this.initCommentBottom
          })
        )
        .then(res => {
          if (res) {
            this.$message.success('感谢你的评论')
            this.commentsList.unshift({
              comment_root: res.data.data,
              comment_reply: []
            })
            this.total += 1
            this.focusTextarea = false
            this.initCommentBottom = ''
            this.absoluteEmoji = false
          }
        })
    },
    handleShowPreviewComment() {
      this.isShowPreviewComment = this.isShowPreviewComment ? false : true
    },

    beforeEnter(el) {
      el.style.opacity = 0
    },
    enter(el, done) {
      var delay = el.dataset.index * 150
      setTimeout(() => {
        Velocity(el, { opacity: 1 }, { complete: done })
      }, delay)
    },
    leave(el, done) {
      var delay = el.dataset.index * 150
      setTimeout(() => {
        Velocity(el, { opacity: 0, height: '0px' }, { complete: done })
      }, delay)
    },
    handleFocusBottomTextarea() {
      this.focusTextarea = true
    },
    handleBlurBottomTextarea() {
      this.focusTextarea = false
    },
    handleHiddenMoreMenu() {
      console.log('clickout moremenu')
      this.isShowMoreMenu = false
      document.body.removeEventListener(
        'click',
        this.handleHiddenMoreMenu,
        false
      )
    },
    handlePreventDefault(e) {
      e.preventDefault()
    }
  },
  created() {},
  beforeUpdate() {
    document.body.removeEventListener('click', this.handleHiddenMoreMenu, false)
  },
  updated() {
    if (this.isShowMoreMenu) {
      document.body.addEventListener('click', this.handleHiddenMoreMenu, false)
    } else {
      document.body.removeEventListener(
        'click',
        this.handleHiddenMoreMenu,
        false
      )
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave')
    document.body.removeEventListener('click', this.handleHiddenMoreMenu, false)
    next()
  },
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less'>
//@import url(); 引入公共css类
@media screen and (max-width: 1290px) {
  .fixed-css {
    left: 1143px;
  }
}

.slide-bottom-fade-enter-active,
.slide-bottom-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-bottom-fade-enter,
.slide-bottom-fade-leave-to {
  opacity: 0;
  transform: translateY(40px);
}

.emoji-box-fixed {
  z-index: 30030;
  position: fixed;
  top: 0;
  box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  .cancel-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    color: red;
    padding: 4px;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.3s ease;
  }
  .cancel-btn:hover {
    background-color: #ccc;
  }
}

.fixed-css {
  position: fixed;
  top: 10px;
  right: 10%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.cancel-comment {
  display: inline-block;
  padding: 5px 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  color: #a1a1a1;
  background-color: #eee;
  cursor: pointer;
  outline: none;
  transition: all 0.4s;
}
.cancel-comment:hover {
  background-color: #ccc;
  color: #303133;
  transition: all 0.4s;
}
.confirm-comment {
  display: inline-block;
  padding: 5px 15px;
  border-radius: 5px;
  border: 1px solid #f56c6c73;
  color: #f5f7fa;
  background-color: #f56c6ccc;
  cursor: not-allowed;
  outline: none;
  margin-right: 10px;
  transition: all 0.4s;
}
.confirm_hover {
  cursor: pointer;
}
.confirm_hover:hover {
  background-color: #f56c6c;
  transition: all 0.4s;
}

.fixed-bottom {
  position: fixed;
  padding: 8px 0;
  width: 100%;
  background-color: #fff;
  bottom: 0;
  left: 0;
  z-index: 2020;
  border-top: 1px solid #ccc;
  box-shadow: 0px 0px 12px #b3a7a7;
  .fixed-main-cont {
    margin-left: 10%;
    display: flex;
    align-items: center;
    .more-menu-show {
      top: -63px !important;
      opacity: 1 !important;
    }
    .more-menu {
      position: absolute;
      font-size: 14px;
      top: -63px;
      width: 100px;
      background-color: #fff;
      color: #808080;
      z-index: 3030;
      -webkit-box-shadow: 2px 0 6px #ccc;
      box-shadow: 2px 0 6px #ccc;
      border-radius: 3px;
      left: calc(50% - 50px);
      ul {
        list-style: none;
        li {
          text-align: left;
          padding: 2px 0 2px 15px;
        }
      }
    }
    .more-menu::after {
      content: '';
      display: block;
      width: 0px;
      height: 0px;
      position: absolute;
      border: 6px solid transparent;
      border-top: 6px solid #fff;
      left: calc(50% - 3px);
    }
    .comment-num,
    .comment-like {
      cursor: pointer;
    }
    .comment-textarea {
      position: relative;
      .right-meta {
        font-size: 12px;
        position: absolute;
        top: 8px;
        right: 3px;
        width: 94px;
        .cancel-comment {
          margin-top: 4px;
          padding: 3px 8px;
        }
        .confirm-comment {
          padding: 3px 8px;
        }
      }
      .bottom-comment-textarea {
        border: none;
        padding: 10px 15px;
        width: 300px;
        height: 26px;
        outline: none;
        background-color: #eee;
        border-radius: 10px;
        transition: all 0.3s ease;
      }
      .focus-textarea {
        height: 58px;
        width: 350px;
        padding-right: 100px;
      }
    }
    .thumb-btn {
      font-size: 28px;
    }
    .commentIcon {
      font-size: 20px;
      padding-top: 3px;
    }
    .bottom-icon {
      margin-left: 20px;
      display: flex;
      align-items: center;
      position: relative;
      color: #a1a1a1;
      .num {
        padding-top: 3px;
      }
      .comment-num {
        padding-left: 5px;
      }
    }
  }
}

.blog-detail {
  margin-bottom: 100px;
  .blog-cont {
    width: 80%;
    min-width: 1000px;
    padding-top: 40px;
    margin: 0px auto;
    position: relative;
    .comment-page-cont {
      margin-top: 30px;
      width: calc(100% - 330px);
      .comment-editor {
        padding: 20px 0px 20px 30px;
        .commentator-avator {
          width: 60px;
          height: 60px;
          border-radius: 100%;
          box-shadow: 2px 2px 7px #808080;
          float: left;
        }
        .editor-cont {
          padding-left: 90px;
          padding-top: 25px;
          .editor-body {
            position: relative;
            box-shadow: rgb(161, 161, 161) 4px 4px 6px;
            background-color: #eee;
            border-radius: 6px;
            padding-bottom: 15px;
            .editor-meta-footer {
              display: flex;
              justify-content: flex-end;
              padding: 7px 0;
              margin: 0 16px;
              .f-right {
                margin-right: 5px;
                .preview-btn {
                  color: rgb(128, 128, 128);
                  font-size: 20px;
                  padding: 5px;
                  cursor: pointer;
                  transition: all 0.3s ease-in 0s;
                }
                .preview-btn:hover {
                  color: #303133;
                  transition: all 0.3s ease-in 0s;
                }
              }
            }
            .preview-cont {
              padding: 0px 15px;
              div {
                word-break: break-word;
                white-space: pre-wrap;
              }
              img {
                vertical-align: bottom;
              }
            }
          }
          textarea {
            padding: 12px 16px;
            width: calc(100% - 32px);
            // height: 90px;
            font-size: 16px;
            border: none;
            outline: none;
            background-color: transparent;
            resize: none;
            display: inline-block;
            vertical-align: top;
            outline-style: none;
            // overflow: hidden;
            overflow-wrap: break-word;
            font-family: none;
          }
          .editor-body::before {
            content: '';
            position: absolute;
            top: 0px;
            left: -17px;
            border: 10px solid transparent;
            border-right: 10px solid #eee;
            border-top: 10px solid #eee;
          }
          .editor-footer {
            .meta {
              position: relative;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
          }
          .emoji-box {
            position: absolute;
            z-index: 10;
            left: -10px;
            top: 44px;
            -webkit-box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.2);
            box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.2);
            background: white;
            .cancel-btn {
              position: absolute;
              border: none;
              color: #ff4949;
              right: 5px;
              top: 5px;
              z-index: 10;
              padding: 10px;
              transition: all 0.4s;
              border-radius: 7px;
              cursor: pointer;
            }
            .cancel-btn:hover {
              background-color: #eee;
              transition: all 0.4s;
            }
          }
        }
      }
      .comment-pagination-cont {
        margin-top: 30px;
        .comment-list {
          border: 1px solid #dcdfe6;
          padding: 20px 35px;
          border-radius: 4px;
        }
      }
    }

    .markdown-cont {
      width: calc(100% - 330px);
      min-width: 600px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      position: relative;
      .svg-container {
        position: absolute;
        right: -4px;
        top: -5px;
        font-size: 40px;
      }
      .blog-header {
        background-color: rgb(251, 251, 251);
        .blog-title {
          h1 {
            padding-left: 25px;
            font-size: 40px;
            font-family: fantasy;
          }
        }
        .blog-author {
          margin-top: 20px;
          padding-left: 25px;
          padding-bottom: 10px;
          display: flex;
          .avator {
            width: 35px;
            height: 35px;
            border-radius: 100%;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
          .author-info {
            margin-left: 10px;

            .tips-footer {
              font-size: 13px;
              color: #909399d4;
            }
          }
        }
      }
    }

    .markdown-meta-right {
      width: 280px;
      height: 450px;
      background-color: rgb(251, 251, 251);
      border-radius: 4px;
      position: absolute;
      right: 0;
      top: 40px;
      padding: 8px 12px;
      box-shadow: 0px 0px 10px #cccc;

      .author-info {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-end;
        padding-bottom: 10px;
        border-bottom: 1px solid #96969670;
        .author-avator-right {
          width: 100%;
          height: 44px;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          line-height: 22px;
          .author-text {
            cursor: pointer;
          }
          .follow-author {
            float: right;
            border: 1px solid #e46c0e;
            padding: 0px 15px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            color: #e46c0e;
          }
          .author-text:hover {
            color: #777;
          }
          .right-bottom {
            font-size: 12px;
            color: #969696;
          }
        }
      }

      .blog-description {
        font-size: 12px;
        color: #969696;
        display: flex;
        flex-direction: column;
        padding: 5px;
        border-bottom: 1px solid #96969670;
      }

      .recommendBlogsList {
        .recommend-blog {
          padding: 5px;
          .title-cont {
            padding: 8px 0px 5px;
            .title-text {
              font-size: 15px;
              transition: all 0.3s ease-out;
            }
            .title-text:hover {
              color: #18b0de;
            }
          }

          .meta-footer {
            font-size: 12px;
            color: #969696;
            display: flex;
            justify-content: space-between;
            flex-direction: row;
          }
        }
      }
    }
  }
}
</style>