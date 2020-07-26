<template>
  <div class="header">
    <div class="headItem">
      <div class="logo">
        <img src="@/assets/logo/logo.png" alt>
      </div>
      <h3 class="title">小安居家后台管理系统</h3>
    </div>
    <div class="headItem">
      <el-button>退出</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PublicHeader'
}
</script>

<style lang="scss" scoped>
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
