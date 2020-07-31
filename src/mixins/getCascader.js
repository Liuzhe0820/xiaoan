import countryArea from '@/utils/area.json'
export default {
  data() {
    return {
      props: {
        lazy: true,
        // checkStrictly: true,
        lazyLoad: (node, resolve) => { this.lzFn(node, resolve) }
      },
      country: '', // 国家
      province: '', // 省份
      city: '', // 市区
      county: '', // 县区
      countrys: '', // 选中的省市集合
      countryList: this.getTreeData(countryArea), // 国家列表
      vals: [],
      valsChildren: [],
      valsChild: [],
      pathvalue: {},
      mechanismCity: ''
    }
  },
  methods: {
    getTreeData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].children) {
          if (data[i].children.length === 0) {
            // children若为空数组，则将children设为undefined
            data[i].children = undefined
          } else {
            // children若不为空数组，则继续 递归调用 本方法
            this.getTreeData(data[i].children)
          }
        }
      }
      return data
    },
    lzFn(node, resolve) {
      console.log(node)
      // if (node.children.length === 0) {
      //   const nodes = {
      //     label: node.label,
      //     value: node.value,
      //     leaf: 1
      //   }
      //   resolve(nodes)
      // }

      const { level } = node
      // console.log(level)
      if (level === 0) {
        setTimeout(() => {
          // this.countryList = countryArea
          const nodes = this.countryList.map(item => ({

            label: item.cname,
            value: item.id,
            leaf: level >= 3
          }))
          console.log(nodes)
          resolve(nodes)
        }, 100)
      } else if (level === 1) {
        // console.log(level, '国家', 11111, node.value)
        // this.countriesId = node.value ? node.value : ''
        this.country = node.label ? node.label : ''
        setTimeout(() => {
          this.vals = this.countryList.find(function(i) {
            return i.id === node.value
          }).children
          const nodes = this.vals.map(item => ({
            label: item.cname,
            value: item.id,
            leaf: level >= 3
          }))
          // console.log(nodes)
          resolve(nodes)
        }, 300)
      } else if (level === 2) {
        // console.log(level, '省市', 2222, node)
        this.province = node.label ? node.label : ''
        setTimeout(() => {
          this.valsChildren = this.vals.find(function(i) {
            return i.id === node.value
          }).children
          const nodes = this.valsChildren.map(item => ({
            label: item.cname,
            value: item.id,
            leaf: level >= 3
          }))
          // console.log(nodes)
          resolve(nodes)
        }, 300)
      } else if (level === 3) {
        // console.log(level, '城市', 3333, node)
        this.city = node.label ? node.label : ''
        setTimeout(() => {
          this.valsChild = this.valsChildren.find(function(i) {
            return i.id === node.value
          }).children
          const nodes = this.valsChild.map(item => ({
            label: item.cname,
            value: item.id,
            leaf: level >= 3
          }))
          // console.log(nodes)
          resolve(nodes)
        }, 300)
      }
      this.mechanismCity = this.country + '' + this.province + '' + this.city + '' + this.county
    },
    handleChange() { // 获取地址
      if (this.dialogType === 'add') {
        this.pathvalue = this.$refs.cascader.getCheckedNodes()[0].data
        this.regionsId = this.pathvalue.value// 获取县级id
        this.county = this.pathvalue.label
      }
    }
  }
}
