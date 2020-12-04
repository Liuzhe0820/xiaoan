<template>
  <div class="dashboard-container">
    <el-form :model="serchForm" :inline="true">
      <el-form-item label="标题">
        <el-input v-model="serchForm.name" />
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
        <el-table-column prop="id" label="id" align="center" />
        <el-table-column prop="title" label="标题" align="center" />
        <el-table-column prop="count_money" label="总价" align="center" />
        <el-table-column prop="contacts_name" label="联系人" align="center" />
        <el-table-column prop="contacts_phone" label="手机号" align="center" />
        <el-table-column prop="region" label="区域" align="center" />
        <el-table-column prop="cate_name" label="分类名称" align="center" />
        <el-table-column prop="region" label="区域" align="center" />
        <el-table-column label="操作" align="center" width="100">
          <template slot-scope="props">
            <el-button class="btn" size="mini" type="primary" @click="detailHadnle(props.row)">查看</el-button>
            <el-button class="btn" size="mini" type="primary" @click="removeHandle(props.row.id)">删除</el-button>
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
    <el-dialog :visible.sync="detailOnoff" title="详情">
      <el-form label-width="100px">
        <el-form-item label="标题">
          <el-input v-model="detailObj.title" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="detailObj.title" type="textarea" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="detailObj.single_money" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="总价">
          <el-input v-model="detailObj.count_money" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="detailObj.contacts_name" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="detailObj.contacts_phone" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="区域">
          <el-input v-model="detailObj.region" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="detailObj.detailed_address" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="广告图片">
          <el-image
            :src="detailObj.advertisement_img"
            fit="fill"
          />
        </el-form-item>
        <el-form-item label="广告图片">
          <el-image
            v-for="(item,index) in detailObj.top_imgs"
            :key="index"
            :src="item"
            fit="fill"
          />
        </el-form-item>
        <el-form-item label="广告链接">
          <el-input v-model="detailObj.advertisement_url" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="开始时间">
          <el-input v-model="detailObj.release_time" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="detailObj.end_time" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="detailObj.create_time" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input v-model="detailObj.update_time" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="detailObj.cate_name" :disabled="isDisabled" />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// 商户订单
import { orderlistss, deletecorder } from '@/api/merchants'
export default {
  data() {
    return {
      isDisabled: true,
      serchForm: {
        id: '',
        name: ''
      },
      tableData: [],
      pagination: { // 分页
        page: 1, // 当前页码
        pageSize: 10, // 每页条数
        total: 0 // 数据总条数
      },
      detailOnoff: false,
      detailObj: {},
      tableHeight: 0
    }
  },
  created() {
    this.serchForm.id = this.$route.query.shopId
    this.getOrderlistss()
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
    getOrderlistss() {
      const params = { ...this.pagination, ...this.serchForm }
      orderlistss(params).then(res => {
        console.log(res)
        if (res.status === 1) {
          this.tableData = res.data.datas
          this.pagination.total = res.data.listscount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    removeHandle(id) { // 删除
      console.log(id)
      this.$confirm('删除订单', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletecorder({ id: id }).then(res => {
          if (res.status === 1) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getOrderlistss()
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    detailHadnle(obj) { // 查看
      this.detailOnoff = true
      this.detailObj = obj
    },
    serchHandle() { // 搜索
      this.getOrderlistss()
    },
    handleSizeChange(size) {
      this.pagination.page = 1
      this.pagination.pageSize = size
    },
    // 改变页码
    handleCurrentChange(page) {
      this.pagination.page = page
      this.getOrderlistss()
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
