<template>
  <div class="header">
    <div class="headItem">
      <div class="logo none">
        <img src="@/assets/logo/logo.png" alt>
      </div>
      <h3 class="title none">小安居家后台管理系统</h3>
    </div>
    <div class="headItem">
      <el-button @click="logoutHandle">退出</el-button>
    </div>
  </div>
</template>

<script>
// import { logout } from '@/api/login'
export default {
  name: 'PublicHeader',
  methods: {
    logoutHandle() {
      this.$confirm('是否退出', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('user/logout').then(() => {
          this.$router.push({ path: 'login' })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// .none{
//   display: none;
// }
.header {
  width: 100%;
  height: 90px;
  overflow: hidden;
  position: fixed;
  background: #f2f2f2;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 999;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}
.headItem {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.logo {
  height: 60px;
  width: 60px;
  line-height: 68px;
  img {
    width: 100%;
    height: 100%;
  }
}
.title {
  margin-left: 10px;
  font-size: 22px;
  font-weight: 500;
}
</style>
