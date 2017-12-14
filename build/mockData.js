var express = require('express'), app = express(), Mock = require('mockjs')
var bodyParser = require('body-parser')
var session = require('express-session')
var sess = {
  secret: 'keyboard cat',
  cookie: {}
}

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

function getSendJson(data) {
  return {
    msg: '',
    success: true,
    value: data
  }
}

/* 登入 */
app.post('/api/login', function(req, res) {
  console.log(req.query)
  console.log(req.body)
  console.log(req)

  var data = {
    success: true,
    msg: '登入成功'
  }

  if (req.body.pass !== '123456') {
    data.success = false
    data.msg = '密码错误'
  } else {
    data.value = {
      userName: req.body.userName
    }
    req.session.authenticated = true
  }
  res.send(JSON.stringify(data))
})
app.get('/api/isLogin', function(req, res) {
  var sess = req.session
  var data = {
    success: true
  }
  if (sess.authenticated) {
    data = {
      success: true,
      msg: '已登入',
      value: {
        userName: '王明明'
      }
    }
  } else {
    data = {
      success: false,
      msg: '未登入'
    }
  }
  res.send(JSON.stringify(data))
})

/* 我的采购单 */
app.get('/order/purchase/listPurchaseOrderBySelf.json', function(req, res) {
  const data = []
  const count = 30

  for (let i = 0; i < count; i++) {
    data.push(Mock.mock({
      'id': 101050,
      'createTime': '@date',
      'updateTime': '@date',
      'version': 0,
      'customerId': 1,
      'customerName': null,
      'purchaseSn': '2017061600002',
      'contacts': '中华人民共和国',
      'telephone': '18812345678',
      'receiveDate': '@date',
      'minPrice|1': [0, 15000, 15008, 15999],
      'maxPrice|1': [16000, 16111, 16088, 16222],
      'deadline': '@date',
      'batchCount': 1,
      'province': '浙江',
      'city': '杭州',
      'area': '余杭区',
      'address': '西溪花园',
      'remark': '棉花棉花',
      'purchaseStatus|1': ['Purchasing', 'Colse', 'Complete', 'Invalid'],
      'supplyNum': 0,
      'keyword': [
        '手摘棉',
        '双28'
      ],
      'origin|1': [
        '北疆',
        '浙江'
      ],
      'type|1': [
        '机械棉',
        '手摘棉'
      ],
      'colorGrade': [
        'white1',
        'white2'
      ],
      'micronGrade': [
        'C1',
        'C2'
      ],
      'micronAverage': {
        'min': 1.2,
        'max': 2.3
      },
      'breakLoadAverage': {
        'min': 20,
        'max': 28
      },
      'lengthAverage': {
        'min': 29,
        'max': 30
      },
      'purchaseStatusName': '采购中',
      'colorGrade2': [
        '白棉1级',
        '白棉2级'
      ],
      'supplyId': null,
      'supplyStatusName': null,
      'startTime': null,
      'endTime': null
    }))
  }
  var obj = {
    total: 30,
    rows: data,
    pagNum: 1

  }
  res.send(JSON.stringify(getSendJson(obj)))
})

/* 首页棉花列表 */
app.post('/api/home/cottonList', function(req, res) {
  const data = []
  const count = 30

  var obj = {
    total: 30,
    rows: data,
    pagNum: 1

  }

  for (let i = 0; i < count; i++) {
    data.push(Mock.mock({
      'id': '@increment',
      'kind|1': ['锯齿细绒棉', '白白细绒棉', '白黑细绒棉'],
      'color|1': ['白棉1级', '白棉2级', '白棉3级'],
      'len|1-50.1': 1,
      'strong|1-50.1': 1,
      'micronaire|1-2': 1,
      'regain|1-50': 1,
      'trashContent|1-20': 1,
      'user': '@cname',
      'mobile': /^1[0-9]{10}$/,
      'distance|1-50': 1,
      'address': '@county(true)',
      'time': '@date',
      'price|10000-20000': 1,
      'property|10000-99999': 1
    }))
  }

  res.send(JSON.stringify(getSendJson(obj)))
})

/* 首页棉花列表 */
app.get('/cotton/search/list.json', function(req, res) {
  const data = []
  const count = 30

  var obj = {
    total: 30,
    rows: data,
    pagNum: 1

  }
  for (let i = 0; i < count; i++) {
    data.push(Mock.mock({
      'batchType|1': [1, 2],
      'code|10000000000-99999999999': 1,
      'bagCount|100-999': 1,
      'batchCount': 1,
      'type|1': ['细绒锯齿棉', '机采锯齿棉'],
      'colorGrade|1': ['白棉1级', '白棉2级', '淡点污棉1级', '淡黄屋面1级', '黄染棉1级', '白棉5级'],
      'lengthAverage|26-28.1': 1,
      'breakLoadAverage|24-28.1': 1,
      'micronAverage|3-5.1': 1,
      'moisture|1-3.1': 1,
      'trash|0-4.1': 1,
      'factory|1': ['奎屯世丰棉业有限公司', '库尔勒玖润棉业有限公司', ' 莎车县叶尔羌棉业有限责任公司'],
      'contact': '@cname',
      'mobile': /^1[0-9]{10}$/,
      'storage|1': ['奎屯世丰棉业有限公司', '库尔勒玖润棉业有限公司', ' 莎车县叶尔羌棉业有限责任公司'],
      'distance|1000-9999': 1,
      'isProduct|1': [0, 1],
      'createDate': '@date',
      'price|14000-20000': 1,
      'settlementMethod|1': [1, 2],
      'property|10000-99999': 1,
      'createYear': '@date',
      'grossweight|40-50.3': 1,
      'stdweight|40-50.3': 1,
      'checkStorage|1': ['奎屯世丰棉业有限公司', '库尔勒玖润棉业有限公司', ' 莎车县叶尔羌棉业有限责任公司']
    }))
  }

  res.send(JSON.stringify(getSendJson(obj), null, 10))
})

app.get('/cotton/search/getBatchListByCode.json', function(req, res) {
  const data = []
  const count = 30

  var obj = {
    total: 30,
    rows: data,
    pagNum: 1

  }
  for (let i = 0; i < count; i++) {
    data.push(Mock.mock({
      'batchType|1': [1, 2],
      'code|10000000000-99999999999': 1,
      'bagCount|100-999': 1,
      'batchCount': 1,
      'type|1': ['细绒锯齿棉', '机采锯齿棉'],
      'colorGrade|1': ['白棉1级', '白棉2级', '淡点污棉1级', '淡黄屋面1级', '黄染棉1级', '白棉5级'],
      'lengthAverage|26-28.1': 1,
      'breakLoadAverage|24-28.1': 1,
      'micronAverage|3-5.1': 1,
      'moisture|1-3.1': 1,
      'trash|0-4.1': 1,
      'factory|1': ['奎屯世丰棉业有限公司', '库尔勒玖润棉业有限公司', ' 莎车县叶尔羌棉业有限责任公司'],
      'contact': '@cname',
      'mobile': /^1[0-9]{10}$/,
      'storage|1': ['奎屯世丰棉业有限公司', '库尔勒玖润棉业有限公司', ' 莎车县叶尔羌棉业有限责任公司'],
      'distance|1000-9999': 1,
      'isProduct|1': [0, 1],
      'createDate': '@date',
      'price|14000-20000': 1,
      'settlementMethod|1': [1, 2],
      'property|10000-99999': 1,
      'createYear': '@date',
      'grossweight|40-50.3': 1,
      'stdweight|40-50.3': 1,
      'checkStorage|1': ['奎屯世丰棉业有限公司', '库尔勒玖润棉业有限公司', ' 莎车县叶尔羌棉业有限责任公司']
    }))
  }

  res.send(JSON.stringify(getSendJson(obj), null, 10))
})

// 根据批次获取包信息
app.get('/cotton/search/getBagListByCode.json', function(req, res) {
  const data = []
  const count = 30

  var obj = {
    total: 30,
    rows: data,
    pagNum: 1

  }
  for (let i = 0; i < count; i++) {
    data.push(Mock.mock({
      'colorGrade|1': ['白棉1级', '白棉2级', '淡点污棉1级', '淡黄屋面1级', '黄染棉1级', '白棉5级'],
      'ya': '@number',
      'lengthGrade|26-28.1': 1,
      'micron|3-5.1': 1,
      'micronLevel|3-5.1': 1,
      'micronGrade|3-5.1': 1,
      'rd|3-5.1': 1,
      'plusB|3-5.1': 1,
      'length|3-5.1': 1,
      'uniformityIndex|3-5.1': 1,
      'breakLoad|3-5.1': 1
    }))
  }

  res.send(JSON.stringify(getSendJson(obj), null, 10))
})

/* 采购单列表 */
app.get('/order/purchase/listPurchaseOrder.json', function(req, res) {
  const data = []
  const count = 30

  var obj = {
    total: 30,
    rows: data,
    pagNum: 1

  }
  for (let i = 0; i < count; i++) {
    data.push(Mock.mock({
      'id': '@increment',
      'batchType|1': [1, 2],
      'customerId|10000-100000': 1,
      'purchaseSn|10000000000-99999999999': 1,
      'contacts': '@cname',
      'telephone': /^1[0-9]{10}$/,
      'receiveDate': '@date',
      'minPrice|1': [0, 14999, 15222],
      'maxPrice|1': [0, 15999, 16666],
      'deadline': '@date',
      'batchCount': 1,
      'province': '@province',
      'city': '@city',
      'area': '@county',
      'address': '@ctitle',
      'purchaseStatus|1': ['Purchasing', 'Close', 'Complete', 'Invalid'],
      'purchaseStatusName|20-30': 1,
      'supplyNum': '@number',
      'remark': '@ctitle',
      'lengthAverage|1': [{max: 4, min: 3}, {max: 5, min: 3}, {max: 4, min: 3.4}],
      'breakLoadAverage|1': [{max: 4, min: 3}, {max: 5, min: 3}, {max: 4, min: 3.4}],
      'micronAverage|1': [{max: 4, min: 3}, {max: 5, min: 3}, {max: 4, min: 3.4}],
      'micronGrade|1': [ 'A', 'A1', 'B', 'C', 'C1' ],
      'keyword|1-4': ['双28', '双29'],
      'origin': '@province',
      'type': ['细绒棉', '机采棉', '皮辊细绒棉'],
      'colorGrade': ['白棉1级', '白棉2级', '淡点污棉1级', '淡黄屋面1级', '黄染棉1级', '白棉5级'],
      'createTime': '@date',
      'updateTime': '@date'
    }))
  }

  res.send(JSON.stringify(getSendJson(obj), null, 10))
})

/* 采购单详情 */
app.get('/order/purchase/getPurchaseOrderBySn.json', function(req, res) {
  const data = Mock.mock({
    'id': '@increment',
    'batchType|1': [1, 2],
    'customerId|10000-100000': 1,
    'purchaseSn|10000000000-99999999999': 1,
    'contacts': '@cname',
    'telephone': /^1[0-9]{10}$/,
    'receiveDate': '@date',
    'minPrice|1': [0, 14999, 15222],
    'maxPrice|1': [0, 15999, 16666],
    'deadline': '@date',
    'batchCount': 1,
    'province': '@province',
    'city': '@city',
    'area': '@county',
    'address': '@ctitle',
    'purchaseStatus|1': ['Purchasing', 'Close', 'Complete', 'Invalid'],
    'purchaseStatusName|20-30': 1,
    'supplyNum': '@number',
    'remark': '@ctitle',
    'lengthAverage|1': [{max: 4, min: 3}, {max: 5, min: 3}, {max: 4, min: 3.4}],
    'breakLoadAverage|1': [{max: 4, min: 3}, {max: 5, min: 3}, {max: 4, min: 3.4}],
    'micronAverage|1': [{max: 4, min: 3}, {max: 5, min: 3}, {max: 4, min: 3.4}],
    'micronGrade|1': [ 'A', 'A1', 'B', 'C', 'C1' ],
    'keyword|1-4': ['双28', '双29'],
    'origin': '@province',
    'type': ['细绒棉', '机采棉', '皮辊细绒棉'],
    'colorGrade': ['白棉1级', '白棉2级', '淡点污棉1级', '淡黄屋面1级', '黄染棉1级', '白棉5级'],
    'createTime': '@date',
    'updateTime': '@date'
  })

  res.send(JSON.stringify(getSendJson(data), null, 10))
})

/* 根据批号获取详情 */
app.get('/cotton/search/getByBatchCode.json', function(req, res) {
  const data = Mock.mock({
    'batchCode|10000000000-99999999999': 1,
    'breakLoad1|20-30': 1,
    'breakLoad1Rate|20-30': 1,
    'breakLoad2|20-30': 1,
    'breakLoad2Rate|20-30': 1,
    'breakLoad3|20-30': 1,
    'breakLoad3Rate|20-30': 1,
    'breakLoad4|20-30': 1,
    'breakLoad4Rate|20-30': 1,
    'breakLoad5|20-30': 1,
    'breakLoad5Rate|20-30': 1,
    'breakLoadAverage|20-30': 1,
    'breakLoadMax|20-30': 1,
    'breakLoadMin|20-30': 1,
    'checkOrg|1': ['奎屯世丰棉业有限公司', '库尔勒玖润棉业有限公司', ' 莎车县叶尔羌棉业有限责任公司'],
    'checkStorage|1': ['奎屯世丰棉业仓库', '库尔勒玖润棉业仓库', ' 莎车县叶尔羌棉'],
    'checkType|1': [0, 1],
    'colorGrade|20-30': 1,
    'contact': '@cname',
    'createTime': '@date',
    'checkDate': '@date',
    'currentStorage|1': ['奎屯世丰棉业仓库', '库尔勒玖润棉业仓库', ' 莎车县叶尔羌棉'],
    'emptyweight|100-999': 1,
    'factory|1': ['奎屯世丰棉业有限公司', '库尔勒玖润棉业有限公司', ' 莎车县叶尔羌棉业有限责任公司'],
    'factoryCode|10000000000-99999999999': 1,
    'factoryAddress|1': '@county()',
    'grossweight|55-80.2': 1,
    'id': '@number',
    'isProduct|1': [0, 1],
    'lab|20-30': 1,
    'length25|20-30': 1,
    'length26|20-30': 1,
    'length27|20-30': 1,
    'length28|20-30': 1,
    'length29|20-30': 1,
    'length30|20-30': 1,
    'length31|20-30': 1,
    'length32|20-30': 1,
    'lengthAverage|20-30': 1,
    'lengthMax|20-30': 1,
    'lengthMin|20-30': 1,
    'lengthgrade|20-30': 1,
    'lightSpotted1|20-30': 1,
    'lightSpotted2|20-30': 1,
    'lightSpotted3|20-30': 1,
    'mobile': /^1[0-9]{10}$/,
    'micronA|20-30': 1,
    'micronB|20-30': 1,
    'micronC|20-30': 1,
    'micronGrade|20-30': 1,
    'micronGradeA1|20-30': 1,
    'micronGradeA1Rate|20-30': 1,
    'micronGradeB1|20-30': 1,
    'micronGradeB1Rate|20-30': 1,
    'micronGradeB2|20-30': 1,
    'micronGradeB2Rate|20-30': 1,
    'micronGradeC1|20-30': 1,
    'micronGradeC1Rate|20-30': 1,
    'micronGradeC2|20-30': 1,
    'micronGradeC2Rate|20-30': 1,
    'micronMax|20-30': 1,
    'micronMin|20-30': 1,
    'micronverage|20-30': 1,
    'moisture|10-100': 1,
    'netweight|50-100': 1,
    'origin|1': ['北疆', '南疆', '其他', '进口棉'],
    'plusBAverage|20-30': 1,
    'plusBMax|20-30': 1,
    'plusBMin|20-30': 1,
    'rdAverage|20-30': 1,
    'rdMax|20-30': 1,
    'rdMin|20-30': 1,
    'remark|20-30': 1,
    'standard|20-30': 1,
    'stdweight|50-100': 1,
    'tareweight|50-100': 1,
    'totalBag|100-200': 1,
    'trash|10-50': 1,
    'type|1': ['细绒棉', '机采棉', '皮辊细绒棉'],
    'uniformityIndex1|20-30': 1,
    'uniformityIndex1Rate|20-30': 1,
    'uniformityIndex2|20-30': 1,
    'uniformityIndex2Rate|20-30': 1,
    'uniformityIndex3|20-30': 1,
    'uniformityIndex3Rate|20-30': 1,
    'uniformityIndex4|20-30': 1,
    'uniformityIndex4Rate|20-30': 1,
    'uniformityIndex5|20-30': 1,
    'uniformityIndex5Rate|20-30': 1,
    'uniformityIndexAverage|20-30': 1,
    'uniformityIndexMax|20-30': 1,
    'uniformityIndexMin|20-30': 1,
    'updateTime': '@date',
    'vehicleweight|50-150': 1,
    'version|20-30': 1,
    'white1|20-30': 1,
    'white2|20-30': 1,
    'white3|20-30': 1,
    'white4|20-30': 1,
    'white5|20-30': 1,
    'yellow1|20-30': 1,
    'yellow2|20-30': 1,
    'yellowish1|20-30': 1,
    'yellowish2|20-30': 1,
    'yellowish3|20-30': 1,
    'ygP1|20-30': 1,
    'ygP2|20-30': 1,
    'ygP3|20-30': 1,
    'property': '3129A'
  })
  res.send(JSON.stringify(getSendJson(data), null, 30))
})

/* 搜索联想关键词 */
app.get('/cotton/search/listAssociate.json', function(req, res) {
  const data = []
  const count = 30

  for (let i = 0; i < count; i++) {
    data.push(Mock.mock({
      'value|10090000000-99999999999': 1,
      'keyword': req.query.keyword,
      'type|1': [1, 2, 3, 4]
    }))
  }
  res.send(JSON.stringify(getSendJson(data), null, 10))
})

module.exports = app
