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
        <el-table-column prop="name_acronym" label="商户简称" align="center" />
        <el-table-column prop="shop_phone" label="商户手机" align="center" />
        <el-table-column prop="code" label="企业代码" align="center" />
        <el-table-column prop="create_time" label="创建时间" align="center" />
        <el-table-column label="状态" align="center">
          <template slot-scope="props">{{ judgeStatus(props.row.examine) }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="props">
            <el-button v-if="props.row.examine===2" class="btn" size="mini" type="primary" @click="examineHandle(props.row.id)">审核</el-button>
            <el-button class="btn" size="mini" type="primary" @click="seePictureHadnle(props.row)">查看图片</el-button>
            <el-button v-if="props.row.examine===3" class="btn" size="mini" type="primary" @click="seeReasonHandle(props.row)">拒绝理由</el-button>
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
    <el-dialog :visible.sync="showImgOnoff">
      <el-image v-for="(item,index) in srcList" :key="index" :src="item" lazy />
    </el-dialog>
    <el-dialog :visible.sync="showReasonOnoff" title="拒绝理由" @close="clearReason">
      <el-form ref="reason" :model="reason" :rules="reasonRule">
        <el-form-item prop="refuse">
          <el-input v-model="reason.refuse" :disabled="isEdit" type="text-area" />
        </el-form-item>
      </el-form>

      <span v-if="!isEdit" slot="footer" class="dialog-footer">
        <el-button @click="clearReason">取 消</el-button>
        <el-button type="primary" @click="sureReason">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 商户审核
import { lists, examine, refuse } from '@/api/merchants'
export default {
  data() {
    return {
      serchForm: {},
      tableData: [],
      tableHeight: 0,
      tableLoading: false,
      pagination: { // 分页
        page: 1, // 当前页码
        pageSize: 10, // 每页条数
        total: 0 // 数据总条数
      },
      showImgOnoff: false,
      url: '',
      srcList: [],
      reason: { refuse: '' },
      showReasonOnoff: false,
      isEdit: true,
      id: '',
      reasonRule: {
        refuse: [
          { required: true, message: '请输入拒绝理由', trigger: 'blur' }
        ]
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
    sureReason() { // 拒绝
      refuse({ id: this.id, refuse_text: this.reason.refuse }).then(res => {
        if (res.status === 1) {
          this.$message({
            type: 'success',
            message: '拒绝成功'
          })
          this.getList()
          this.isEdit = false
          this.showReasonOnoff = false
          this.reason.refuse = ''
          this.id = ''
        } else {
          this.$message.error(res.message)
        }
      })
    },
    clearReason() { // 取消拒绝
      this.isEdit = false
      this.showReasonOnoff = false
      this.reason.refuse = ''
      this.id = ''
    },
    examineHandle(id) { // 审核
      this.$confirm('审核商户', '提示', {
        confirmButtonText: '通过',
        cancelButtonText: '拒绝',
        type: 'warning'
      }).then(() => {
        examine({ id: id }).then(res => {
          console.log(res)
          if (res.status === 1) {
            this.$message({
              type: 'success',
              message: '审核成功'
            })
            this.getList()
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => {
        this.isEdit = false
        this.showReasonOnoff = true
        this.id = id
      })
    },
    seeReasonHandle(obj) { // 查看拒绝理由
      this.showReasonOnoff = true
      this.isEdit = true
      this.reason.refuse = obj.refuse_text
    },
    seePictureHadnle(obj) { // 查看图片
      if (Array.isArray(obj.imgs_url)) {
        this.showImgOnoff = true
        this.srcList = []
        obj.imgs_url.forEach(item => {
          this.srcList.push(item)
        })
      } else {
        this.$message.error('暂无图片')
      }
    },
    getList() { // 获取列表
      const params = this.pagination
      lists(params).then(res => {
        console.log(res)
        if (res.status === 1) {
          this.tableData = res.data.datas
          this.pagination.total = res.data.listscount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    judgeStatus(status) {
      if (status === 1) {
        return '成功'
      } else if (status === 2) {
        return '待审核'
      } else if (status === 3) {
        return '拒绝'
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
