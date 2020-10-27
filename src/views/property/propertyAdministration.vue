<template>
  <div class="dashboard-container">
    <el-form :model="serchForm" :inline="true">
      <el-form-item label="用户名称">
        <el-input v-model="serchForm.name" />
      </el-form-item>
      <el-form-item label="身份">
        <el-select v-model="serchForm.roletype">
          <el-option v-for="item in roletypeList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-button @click="serchHandle">查询</el-button>
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
        <el-table-column label="用户名称" align="center" prop="user_name" />
        <el-table-column label="创建时间" align="center" prop="create_tim" />
        <el-table-column label="身份" align="center">
          <template slot-scope="props">{{ judgeRoletype(props.row.roletype) }}</template>
        </el-table-column>
        <el-table-column label="角色名称" align="center" prop="rolename" />
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="props">
            <el-button class="btn" size="mini" type="primary" @click="bindHandle(props.row.user_id)">绑定角色</el-button>
          </template>
        </el-table-column>
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
    <el-dialog :visible.sync="bindOnoff" title="绑定角色">
      <el-form>
        <el-form-item>
          <el-select v-model="roletypeId">
            <el-option v-for="item in prorolelist" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearBind">取 消</el-button>
        <el-button type="primary" @click="sureBind">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 物业
import { userlists, prorolelists, adduserrole } from '@/api/property'
export default {
  name: 'PropertyAdministration',
  data() {
    return {
      tableData: [],
      pagination: { // 分页
        page: 1, // 当前页码
        pageSize: 10, // 每页条数
        total: 0 // 数据总条数
      },
      tableHeight: 0,
      serchForm: {
        name: '',
        roletype: ''
      },
      prorolelist: [],
      id: '',
      roletypeId: '',
      bindOnoff: false,
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
      ]
    }
  },
  created() {
    this.getList()
    this._getTableHeight()
    this.getProrolelists()
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
    serchHandle() {
      this.pagination.page = 1
      this.getList()
    },
    sureBind() {
      if (this.roletypeId === '') {
        this.$message.error('请选择绑定角色')
      } else {
        const data = {
          user_id: this.id,
          id: this.roletypeId
        }
        adduserrole(data).then(res => {
          if (res.status === 1) {
            this.$message({
              type: 'success',
              message: '绑定成功'
            })
            this.clearBind()
            this.getList()
          } else {
            this.$message.error(res.message)
            this.clearBind()
          }
        })
      }
    },
    clearBind() {
      this.id = ''
      this.bindOnoff = false
    },
    bindHandle(id) {
      this.id = id
      this.bindOnoff = true
    },
    getProrolelists() { // 获取角色列表
      prorolelists().then(res => {
        if (res.status === 1) {
          this.prorolelist = res.data
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getList() { // 获取列表
      const params = { ...this.pagination, ...this.serchForm }
      userlists(params).then(res => {
        console.log(res)
        if (res.status === 1) {
          this.tableData = res.data.datas
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
