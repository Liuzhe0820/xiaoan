<template>
  <div class="header" />
</template>

<script>
export default {
  name: 'PublicHeader'
}
</script>

<style lang="scss" scoped>
.header{
  width: 100%;
  height: 90px;
  overflow: hidden;
  position: fixed;
  background: #f2f2f2;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  z-index: 999;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}
</style>
