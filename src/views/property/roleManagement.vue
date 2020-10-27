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
        <el-table-column label="身份" align="center">
          <template slot-scope="props">{{ judgeRoletype(props.row.roletype) }}</template>
        </el-table-column>
        <el-table-column label="名称" align="center" prop="name" />

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
        <el-form-item prop="roletype">
          <el-select v-model="addForm.roletype">
            <el-option v-for="item in roletypeList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="名称">
          <el-input v-model="addForm.name" />
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
import { prorolelists, addrole } from '@/api/property'
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
        name: '',
        roletype: 1
      },
      addFormRule: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        roletype: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ]
      },
      roletypeList: [
        {
          value: 1,
          label: '物业主管'
        },
        {
          value: 2,
          label: '物业人员'
        },
        {
          value: 3,
          label: '维修工'
        }
      ],
      addOnoff: false
    }
  },
  created() {
    this.getList()
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
          addrole(this.addForm).then(res => {
            if (res.status === 1) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.addOnoff = false
              this.getList()
            }
          })
        } else {
          this.$message.error('请填写完整信息')
        }
      })
    },
    clearAdd() {
      this.addForm.name = ''
      this.addForm.roletype = 1
    },
    addHandle() {
      this.addOnoff = true
    },
    getList() { // 获取列表
      const params = { ...this.pagination }
      prorolelists(params).then(res => {
        console.log(res)
        if (res.status === 1) {
          this.tableData = res.data
          this.pagination.total = res.data.listscount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    judgeRoletype(type) { // 判断身份
      if (type === 0) {
        return '暂无身份'
      } else if (type === 1) {
        return '物业主管'
      } else if (type === 2) {
        return '物业人员'
      }
    },
    handleSizeChange(size) {
      this.pagination.page = 1
      this.pagination.pageSize = size
    },
    // 改变页码
    handleCurrentChange(page) {
      this.pagination.page = page
      this.getList()
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
