<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
      <el-form ref="form" :model="form" :rules="rulesObj">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item  prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item prop="repassword">
          <el-input v-model="form.repassword" placeholder="请确认密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-reg" @click="registerFn">注册</el-button>
          <el-link type="info" @click="$router.push('/login')">去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
/*
* 经验:前端绑定的数据对象属性名,可以直接跟要调用的功能接口的参数名一致
* 好处是:我可以直接把前段对象(带有同名的属性和前端的值)发给后台
*  */
import { registerAPI } from '@/api'

export default {
  name: 'my-register',
  data () {
    /* 注意必须要在data函数里定义此箭头函数,才能确保this.form的使用 */
    const samePwd = (rule, value, callback) => { // 校验两次输入密码是否一致
      // console.log(rule)
      // console.log(value)
      // console.log(callback)
      if (value !== this.form.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      form: { // 表单数据对象
        username: '', // 用户名
        password: '', // 密码
        repassword: ''// 确认密码
      },
      rulesObj: { // 表单规则校验对象
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: '用户名必须是1-10位的大小写数字和字母',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15的非空字符',
            trigger: 'blur'
          }
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur' }, // 此处相当于又判断了一次正则,可以写也可以不写,不写直接判断跟上次输入是否相等
          { validator: samePwd, trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    // 注册,点击事件
    registerFn () {
      // JS兜底校验
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 1.通过校验,调用注册接口
          /* 这里又是一个解构赋值,把axios返回的数据对象里data字段对应的值保存在res上 */
          const { data: res } = await registerAPI(this.form)
          console.log(res)
          // 2.elementUI还在Vue原型链上添加了弹窗提示,$message属性
          /* 注册失败,提醒用户 */
          if (res.code !== 0) return this.$message.error(res.message) // 这里的return必须写 ,阻止后边的代码继续执行
          // 3.注册成功,提示用户
          this.$message.success(res.message)
          // 4.跳转到登录页面
          this.$router.push('/login')
        } else {
          return false // 阻止默认提交行为(表单下边的提示会自动出现)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.reg-container {
  background: url('../../assets/images/login_bg.jpg') center;
  background-size: cover;
  height: 100%; /*这个高度是依赖父级的高度,它的挂载点是App.vue body的默认高度可以是页面高度,图片就可以显示了*/

  .reg-box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;

    .title-box {
      height: 60px;
      background: url('../../assets/images/login_title.png') center no-repeat;
    }

    .btn-reg {
      width: 100%;
    }
  }
}
</style>
