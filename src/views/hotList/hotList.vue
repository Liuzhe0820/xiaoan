<template>
  <div class="dashboard-container">
    <el-form :inline="true">
      <el-form-item>
        <el-button size="mini" type="primary" @click="addHandle">添加</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-table
        ref="table"
        :data="tableData"
        :height="tableHeight"
        highlight-current-row
        border
        stripe
      >
        <el-table-column type="index" label="序号" align="center" width="50" />
        <el-table-column label="创建时间" align="center" prop="create_time" />
        <el-table-column label="内容" align="center" prop="hotspot_text" />
      </el-table>
      <el-pagination
        :current-page="pagination.page"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        layout="prev, pager, next, jumper"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog :visible.sync="addOnoff" title="添加角色" @close="clearAdd">
      <el-form ref="addForm" :model="addForm" :rules="addFormRule">
        <el-form-item prop="hotspot_text" label="内容">
          <el-input v-model="addForm.hotspot_text" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearAdd">取 消</el-button>
        <el-button type="primary" @click="sureAdd('addForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { listshotspot, addhotspot } from '@/api/hotList'
export default {
  data() {
    return {
      tableData: [],
      pagination: { // 分页
        page: 1, // 当前页码
        pageSize: 10, // 每页条数
        total: 0 // 数据总条数
      },
      tableHeight: 0,
      addForm: {
        hotspot_text: ''
      },
      addOnoff: false,
      addFormRule: {
        hotspot_text: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getHotList()
    this._getTableHeight()
  },
  mounted() {
    window.onresize = () => {
      if (this.resizeFlag) {
        clearTimeout(this.resizeFlag)
      }
      this.resizeFlag = setTimeout(() => {
        this._getTableHeight()
        this.resizeFlag = null
      }, 100)
    }
  },
  methods: {
    sureAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addhotspot(this.addForm).then(res => {
            if (res.status === 1) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.addOnoff = false
              this.getHotList()
            }
          })
        } else {
          this.$message.error('请填写完整信息')
        }
      })
    },
    clearAdd() {
      this.addForm.hotspot_text = ''
    },
    addHandle() {
      this.addOnoff = true
    },
    getHotList() { // 获取列表
      // const params = { ...this.pagination }
      listshotspot().then(res => {
        console.log(res)
        if (res.status === 1) {
          this.tableData = res.data.datas
          this.pagination.total = res.data.listscount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleSizeChange(size) {
      this.pagination.page = 1
      this.pagination.pageSize = size
    },
    // 改变页码
    handleCurrentChange(page) {
      this.pagination.page = page
      this.getHotList()
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.btn{
  margin:5px 0;
}
</style>
