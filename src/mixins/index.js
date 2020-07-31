export default {
  methods: {
    // 计算table高度
    _getTableHeight() {
      const tableH = 350
      const tableHeightDetil = window.innerHeight - tableH
      if (tableHeightDetil <= 300) {
        this.tableHeight = 300
      } else {
        this.$nextTick(() => {
          this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 152 - 70
        })
      }
    },
    // 复制链接 json串
    async handleCopyLink(type, module, fieldId = 0, id = 0, kind) {
      console.log(type, module, fieldId, id, kind)
      const objLink = {
        type: type, // 1列表 2详情
        module: module, // 1发现 2段品制 3商城  4活动
        fieldId: fieldId, // 分类id
        id: id,
        kind // 是否为视频 3
      }
      await this.$copyText(JSON.stringify(objLink))
      this.$message.success('复制成功')
    }
  }
}
