<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更换头像</span>
    </div>
    <div>
      <!-- 图片，用来展示用户选择的头像 -->
      <img class="the_img" src="../../assets/images/avatar.jpg" alt="" v-if="!avatar"/>
      <img class="the_img" :src="avatar" alt="" v-else/>

      <!-- 按钮区域 -->
      <div class="btn-box">
        <input type="file" accept="image/*" style="display: none" ref="iptRef" @change="onFileChange" />
        <el-button type="primary" icon="el-icon-plus" @click="chooseImg">选择图片</el-button>
        <el-button type="success" icon="el-icon-upload" :disabled="avatar === ''">上传头像</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { updateUserPicAPI } from '@/api'

export default {
  name: 'UserAvatar',
  data () {
    return {
      avatar: ''
    }
  },
  methods: {
    chooseImg () {
      this.$refs.iptRef.click()
    },
    /*
    * img的src值 只能是图片链接地址(外链http开头,图片文件相对路径)
    *或者是图片的base64字符串 并且字符串是data:image/png...开头  图片转base64 不能
    *
    * 解决方案1:文件-->内存临时地址,这个只能在js内存中,无法发送给后端
    *语法:URL.createObjectURL(文件)
    * this.avatar=URL.createObjectURL(files[0])
    *
    *
    * 解决方案2 文件-->base64字符串(这个字符串可以发送给后台)
    *  */
    onFileChange (e) {
      const files = e.target.files
      if (files.length === 0) {
        // 用户点击了上传头像,但是没有传图,点了关闭
        this.avatar = ''
      } else {
        console.log(files[0])
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.onload = async (e) => {
          this.avatar = e.target.result // e.target.result就是读完的结果
          // 以上都是固定写法
          const res = await updateUserPicAPI(this.avatar)
          console.log(res)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box {
  margin-top: 10px;
}
.preview {
  object-fit: cover;
}
.the_img{
  width: 350px;
  height: 350px;
}
</style>
