import syw from './readData.js'
import cfg from './readConfig.js'
import moment from "moment";
import { ForwardMsg } from "./index.js"

let util = {

    //根据概率随机获得一个
    async randomGetOne(probability) {
        //概率总和
        let probabilitySum = probability.reduce((acc, cur) => acc + cur)
        let randomNumber = Math.floor(Math.random() * probabilitySum) + 1;
        let sum = 0
        let ret
        for (let i = 0; i < probability.length; i++) {
            sum = sum + probability[i]
            if (randomNumber <= sum) {
                ret = i
                break
            }
        }
        return ret
    },

    //获得一个部位
    async getBuwei() {
        //概率数组 [花,毛,沙,杯,头]
        let probability = cfg.buwei
        let i = await this.randomGetOne(probability)
        return syw.buweiList[i]
    },

    //获得主词条
    async getZhucitiao(buwei) {
        let zhucitiao
        //概率的数组
        let probability

        if (buwei == syw.buweiList[0].name) {//生之花
            zhucitiao = {
                id: "xiaoshengming",
                display: "生命值",
                percentage: false,
            }
        } else if (buwei == syw.buweiList[1].name) {//死之羽
            zhucitiao = {
                id: "xiaogongji",
                display: "攻击力",
                percentage: false,
            }
        } else if (buwei == syw.buweiList[2].name) {//时之沙
            //时之沙主词条的概率
            probability = cfg.shizhisha
            let i = await this.randomGetOne(probability)
            zhucitiao = syw.shizhishazhucitiaoList[i]
        } else if (buwei == syw.buweiList[3].name) {//空之杯
            //空之杯主词条的概率
            probability = cfg.kongzhibei
            let i = await this.randomGetOne(probability)
            zhucitiao = syw.kongzhibeizhucitiaoList[i]
        } else if (buwei == syw.buweiList[4].name) {//理之冠
            //理之冠主词条的概率
            probability = cfg.lizhiguan
            let i = await this.randomGetOne(probability)
            zhucitiao = syw.lizhiguanzhucitiaoList[i]
        }
        return zhucitiao || {
                id: "xiaoshengming",
                display: "生命值",
                percentage: false,
        };
    },

    //获得副词条
    async getFucitiao(zhucitiao, buwei) {
        //确定是三词条还是四词条  [3,4]
        let citiaoProbability = cfg.citiao
        let citiaoNum = await this.randomGetOne(citiaoProbability) == 0 ? 3 : 4

        //副词条列表
        let fucitiaolist = JSON.parse(JSON.stringify(syw.fucitiaoList))

        //副词条概率数组
        let fucitiaoProbability = JSON.parse(JSON.stringify(cfg.fucitiao))

        //把副词条和概率对应起来
        for (let i = 0; i < fucitiaolist.length; i++) {
            fucitiaolist[i] = [fucitiaolist[i], fucitiaoProbability[i]]
        }

        //副词条中不能出现主词条,同时也要移除副词条概率中的值
        if (buwei == syw.buweiList[0].name) {//生之花
            fucitiaolist = await this.removeArr(fucitiaolist, 'xiaoshengming')
        } else if (buwei == syw.buweiList[1].name) {//死之羽
            fucitiaolist = await this.removeArr(fucitiaolist, 'xiaogongji')
        } else {
            fucitiaolist = await this.removeArr(fucitiaolist, zhucitiao.id)
        }

        //返回值
        let ret = []
        //根据词条数量循环获得副词条
        for (let i = 0; i < citiaoNum; i++) {
            //总概率
            let fucitiaoprobability = 0
            fucitiaolist.forEach(item => {
                fucitiaoprobability += item[1];
            });
            //根据总概率获得一个随机值
            let randomNumber = Math.floor(Math.random() * fucitiaoprobability) + 1;
            let sum = 0
            for (let j = 0; j < fucitiaolist.length; j++) {
                sum = sum + fucitiaolist[j][1]
                if (randomNumber <= sum) {
                    ret[i] = fucitiaolist[j][0]
                    fucitiaolist = await this.removeArr(fucitiaolist, fucitiaolist[j][0].id)
                    break
                }
            }
        }
        return ret;
    },

    //给副词条加初始值
    async getFucitiaoData(fucitiao) {
        let ret = []
        //循环每个副词条
        for (let i = 0; i < fucitiao.length; i++) {
            //先判断是第几档
            //强化档位概率数组
            let qianghuadangwei = cfg.qianghua
            //判断强化第几档 [第一档最高,二,三,第四档最低]
            let j = await this.randomGetOne(qianghuadangwei)
            //然后获取这个圣遗物的强化数值
            ret[i] = await this.getData(fucitiao[i].id, j)
        }
        return ret
    },

    //给单个副词条加初始值
    async getOnefucitiaoData(fucitiao) {
        //先判断是第几档
        //强化档位概率数组
        let qianghuadangwei = cfg.qianghua
        //判断强化第几档 [第一档最高,二,三,第四档最低]
        let i = await this.randomGetOne(qianghuadangwei)
        //然后获取这个圣遗物的强化数值
        let ret = await this.getData(fucitiao.id, i)
        return ret
    },

    //获得第四个词条
    async getOneFucitiao(zhucitiao, fucitiao, buwei) {
        //副词条列表
        let fucitiaolist = JSON.parse(JSON.stringify(syw.fucitiaoList))

        //副词条概率数组
        let fucitiaoProbability = JSON.parse(JSON.stringify(cfg.fucitiao))

        //把副词条和概率对应起来
        for (let i = 0; i < fucitiaolist.length; i++) {
            fucitiaolist[i] = [fucitiaolist[i], fucitiaoProbability[i]]
        }

        //副词条中不能出现主词条,同时也要移除副词条概率中的值
        if (buwei == syw.buweiList[0].name) {//生之花
            fucitiaolist = await this.removeArr(fucitiaolist, 'xiaoshengming')
        } else if (buwei == syw.buweiList[1].name) {//死之羽
            fucitiaolist = await this.removeArr(fucitiaolist, 'xiaofangyu')
        } else {
            fucitiaolist = await this.removeArr(fucitiaolist, zhucitiao.id)
        }
        //移除已有的副词条
        for (let i = 0; i < fucitiao.length; i++) {
            fucitiaolist = await this.removeArr(fucitiaolist, fucitiao[i].id)
        }
        //返回值
        let ret
        //总概率
        let fucitiaoprobability = 0
        fucitiaolist.forEach(item => {
            fucitiaoprobability += item[1];
        });
        //根据总概率获得一个随机值
        let randomNumber = Math.floor(Math.random() * fucitiaoprobability) + 1;
        let sum = 0
        for (let i = 0; i < fucitiaolist.length; i++) {
            sum = sum + fucitiaolist[i][1]
            if (randomNumber <= sum) {
                ret = fucitiaolist[i][0]
                fucitiaolist = await this.removeArr(fucitiaolist, fucitiaolist[i][0].id)
                break
            }
        }
        return ret;
    },

    //获得强化的词条
    async getQianghuacitiao(fucitiao) {
        //强化的副词条概率数组
        let probability = cfg.fucitiaoqianghua
        probability = await this.getQianghuagailv(probability, fucitiao)
        //判断强化哪个词条
        let i = await this.randomGetOne(probability)
        return fucitiao[i]
    },

    //获得强化的数值
    async getQianghuashuzhi(fucitiao) {
        //强化档位概率数组
        let qianghuadangwei = cfg.qianghua
        //判断强化第几档 [第一档最高,二,三,第四档最低]
        let i = await this.randomGetOne(qianghuadangwei)
        //然后获取这个圣遗物的强化数值
        let ret = await this.getData(fucitiao.id, i)
        return ret
    },

    //获得每种词条的强化数值
    async getData(fucitiao, i) {
        let ret
        if (fucitiao == 'jingtong') {
            ret = syw.jingtong[i]
        } else if (fucitiao == 'gongjili') {
            ret = syw.gongjili[i]
        } else if (fucitiao == 'fangyuli') {
            ret = syw.fangyuli[i]
        } else if (fucitiao == 'chongneng') {
            ret = syw.chongneng[i]
        } else if (fucitiao == 'shengmingzhi') {
            ret = syw.shengmingzhi[i]
        } else if (fucitiao == 'baojilv') {
            ret = syw.baojilv[i]
        } else if (fucitiao == 'baojishanghai') {
            ret = syw.baojishanghai[i]
        } else if (fucitiao == 'xiaofangyu') {
            ret = syw.xiaofangyu[i]
        } else if (fucitiao == 'xiaoshengming') {
            ret = syw.xiaoshengming[i]
        } else if (fucitiao == 'xiaogongji') {
            ret = syw.xiaogongji[i]
        }
        return ret
    },

    //获得当前强化圣遗物的副词条概率
    async getQianghuagailv(qianghuagailv, fucitiao) {
        //返回值
        let ret = []
        //循环当前圣遗物副词条列表
        for (let i = 0; i < fucitiao.length; i++) {
            //循环总圣遗物副词条列表
            for (let j = 0; j < syw.fucitiaoList.length; j++) {
                //如果当前正在循环的圣遗物等于总圣遗物副词条列表中的圣遗物
                if (fucitiao[i].id == syw.fucitiaoList[j].id) {
                    //总圣遗物列表中的循序和概率中的循序是一样的,所以直接赋值
                    ret[i] = qianghuagailv[j]
                }
            }
        }
        return ret
    },

    //强化
    async qianghua(fucitiao, fucitiaoData, cishu) {
        let guocheng = []
        for (let k = 0; k < cishu; k++) {
            //获得强化的词条
            let benci = await this.getQianghuacitiao(fucitiao)
            //获得强化的数值
            let fucitiaoUpData = await this.getQianghuashuzhi(benci)
            guocheng.push(`${benci.display}+${fucitiaoUpData}${benci.suffix ? '%' : ''}`)
            //循环副词条找到这个副词条然后相加
            for (let j = 0; j < fucitiao.length; j++) {
                if (fucitiao[j] == benci) {
                    fucitiaoData[j] = parseFloat(fucitiaoData[fucitiao.indexOf(benci)]) + parseFloat(fucitiaoUpData)
                    fucitiaoData[j] =
                        // ((fucitiaoData[j] + '').indexOf('.') != -1) ? fucitiaoData[j].toFixed(1) : fucitiaoData[j]
                        fucitiao[j].percentage ? fucitiaoData[j].toFixed(1) : fucitiaoData[j]
                    break
                }
            }
        }
        return { fucitiaoData, guocheng }
    },

    //获得主词条数值
    async getZhucitiaodata(zhucitiao, buwei, level) {
        let ret
        if (buwei == '生之花') {
            ret = syw.shengzhihuaupdata[level]
        } else if (buwei == '死之羽') {
            ret = syw.sizhiyuupdata[level]
        } else {
            if (zhucitiao.id == 'jingtong') {
                ret = syw.jingtongupdata[level]
            } else if (zhucitiao.id == 'gongjili') {
                ret = syw.gongjiliupdata[level] + '%'
            } else if (zhucitiao.id == 'fangyuli') {
                ret = syw.fangyuliupdata[level] + '%'
            } else if (zhucitiao.id == 'chongneng') {
                ret = syw.chongnengupdata[level] + '%'
            } else if (zhucitiao.id == 'shengmingzhi') {
                ret = syw.shengmingzhiupdata[level] + '%'
            } else if (zhucitiao.id == 'baojilv') {
                ret = syw.baojilvupdata[level] + '%'
            } else if (zhucitiao.id == 'baojishanghai') {
                ret = syw.baojishanghaiupdata[level] + '%'
            } else if (zhucitiao.id == 'zhiliaojiacheng') {
                ret = syw.zhiliaoupdata[level] + '%'
            } else if (zhucitiao.id == 'wulijiacheng') {
                ret = syw.wulishanghaiupdata[level] + '%'
            } else {
                ret = syw.shanghaijiachengupdata[level] + '%'
            }
        }
        return ret
    },

    /**
     * 获得副本别名
     * @param {*} e 
     */
    async getAlias(e) {
        let data = ['当前副本别名']
        for (let i = 0; i < syw.fuben.length; i++) {
            data.push(syw.fuben[i].name + '：' + syw.fuben[i].alias.join('，'))
        }
        await ForwardMsg(e, data)
    },

    //随机获得指定位置指定副本的套装之一
    async randomShengyiwu(buwei, fuben) {
        let shengyiwu
        if (buwei == '生之花') {
            shengyiwu = await this.getRandomArrOne(fuben.生之花)
        } else if (buwei == '死之羽') {
            shengyiwu = await this.getRandomArrOne(fuben.死之羽)
        } else if (buwei == '时之沙') {
            shengyiwu = await this.getRandomArrOne(fuben.时之沙)
        } else if (buwei == '空之杯') {
            shengyiwu = await this.getRandomArrOne(fuben.空之杯)
        } else if (buwei == '理之冠') {
            shengyiwu = await this.getRandomArrOne(fuben.理之冠)
        }
        return shengyiwu;
    },

    //确定圣遗物具体部位名字
    async shengyiwu(id, fuben) {
        let shengyiwu = {
            name: '',
            icon: ''
        }

        let result = false
        let fubenId = 0

        if (fuben == '随机') {
            fubenId = Math.floor((Math.random() * syw.fuben.length))
            result = true
        }

        for (let i = 0; i < syw.fuben.length; i++) {
            if (syw.fuben[i].alias.includes(fuben)) {
                fubenId = i
                result = true
            }
        }

        if (result) {
            let num = Math.floor((Math.random() * 2))
            shengyiwu.name = syw.fuben[fubenId].buwei[id].name[num]
            shengyiwu.icon = syw.fuben[fubenId].buwei[id].icon[num]
            return shengyiwu
        }

        return false
    },

    //从数组中随机取一个值
    async getRandomArrOne(arr) {
        return arr[Math.floor((Math.random() * arr.length))]
    },

    //移除数组中的元素
    async removeArr(arr, removeItem) {
        let index = arr.findIndex(item => item[0].id == removeItem)
        let newArr = arr
        if (index > -1) {
            newArr.splice(index, 1)
        }
        return newArr;
    },

    //获得cd
    async getGayCD(e) {
        if (cfg.cd > 0) {
            if (!e.isMaster) {
                let cd = await redis.ttl('xiaoye:syw:cd:qq:' + e.user_id)
                return cd
            }
        }
        return 0
    },

    //设置cd
    async setGayCD(e) {
        if (cfg.cd > 0) {
            await redis.set('xiaoye:syw:cd:qq:' + e.user_id, JSON.stringify('cd'), { EX: cfg.cd })
        }
    },

    //获得剩余次数
    async getCishu(e) {
        if (cfg.cishu > 0) {
            if (!e.isMaster) {
                let data = await redis.get(`xiaoye:syw:cishu:qq:${e.user_id}`)
                if (!data) {
                    return cfg.cishu
                } else {
                    return cfg.cishu - data
                }
            }
        }
        return 999
    },
    async setCishu(e, i) {
        if (cfg.cishu > 0) {
            if (!e.isMaster) {
                let time = moment(Date.now()).add(1, "days").format("YYYY-MM-DD 00:00:00");
                // 到明日0点的剩余秒数
                let exTime = Math.round(
                    (new Date(time).getTime() - new Date().getTime()) / 1000
                );
                let data = await redis.get(`xiaoye:syw:cishu:qq:${e.user_id}`)
                if (!data) {
                    await redis.set(`xiaoye:syw:cishu:qq:${e.user_id}`, i * 1, { EX: exTime })
                } else {
                    await redis.set(`xiaoye:syw:cishu:qq:${e.user_id}`, Number(data) + i, { EX: exTime })
                }
            }
        }
    }
}
export default util
