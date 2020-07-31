<template>
  <div class="dashboard-container">
    <el-form :model="serchForm" :inline="true">
      <el-form-item label="商户名称">
        <el-input />
      </el-form-item>
      <el-button>查询</el-button>
    </el-form>
    <div>
      <el-table
        ref="table"
        v-loading="tableLoading"
        :data="tableData"
        :height="tableHeight"
        highlight-current-row
        border
        stripe
      >
        <el-table-column type="index" label="序号" align="center" width="50" />
        <el-table-column prop="pujaName" label="法会名称" align="center" />
        <el-table-column label="类型" align="center">
          <template slot-scope="props">{{ judgeType(props.row.pujaType) }}</template>
        </el-table-column>
        <el-table-column prop="contactPerson" label="联系人" align="center" />
        <el-table-column prop="contactPhone" label="联系方式" align="center" />
        <el-table-column prop="contactPhone" label="活动状态" align="center" />
        <el-table-column prop="createTime" label="录入时间" align="center" />
        <el-table-column label="状态" align="center">
          <template slot-scope="props">{{ judgeStatus(props.row.pujaResult) }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <el-button size="mini" type="primary">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="pagination.pageNum"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
// 商户审核
import { lists } from '@/api/merchants'
export default {
  data() {
    return {
      serchForm: {},
      tableData: [],
      tableHeight: 0,
      tableLoading: false,
      pagination: { // 分页
        pageNum: 1, // 当前页码
        pageSize: 10, // 每页条数
        total: 0 // 数据总条数
      }
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
    getList() {
      lists().then(res => {
        console.log(res)
      })
    },
    handleSizeChange(size) {
      this.serchForm.pageNum = 1
      this.serchForm.pageSize = size
    },
    // 改变页码
    handleCurrentChange(page) {
      this.serchForm.pageNum = page
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
</style>
