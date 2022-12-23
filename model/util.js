import syw from './readConfig.js'

let util = {

    //发送转发消息
    //输入data一个数组,元素是字符串,每一个元素都是一条消息.
    async ForwardMsg(e, data) {
        let msgList = [];
        for (let i of data) {
            msgList.push({
                message: i,
                nickname: Bot.nickname,
                user_id: Bot.uin,
            });
        }
        if (msgList.length == 1) {
            await e.reply(msgList[0].message);
        }
        else {
            await e.reply(await Bot.makeForwardMsg(msgList));
        }
        return;
    },

    //获得第四个副词条
    async randomFucitiao4(zhucitiao, fucitiao, buwei) {
        let fucitiaolist = JSON.parse(JSON.stringify(syw.fucitiaos))
        if (buwei == '生之花') {
            fucitiaolist = await this.removeArr(fucitiaolist, '小生命')
        } else if (buwei == '死之羽') {
            fucitiaolist = await this.removeArr(fucitiaolist, '小攻击')
        } else {
            fucitiaolist = await this.removeArr(fucitiaolist, zhucitiao)
        }
        for (let i = 0; i < fucitiao.length; i++) {
            fucitiaolist = await this.removeArr(fucitiaolist, fucitiao[i])
        }
        let data = await this.getRandomArrOne(fucitiaolist)
        return data;
    },

    //给第四个副词条加初始值
    async fucitiao4AddData(fucitiao) {
        let data
        if (fucitiao == '精通') {
            data = await this.getRandomArrOne(syw.jingtong)
        } else if (fucitiao == '攻击力') {
            data = await this.getRandomArrOne(syw.gongjili)
        } else if (fucitiao == '防御力') {
            data = await this.getRandomArrOne(syw.fangyuli)
        } else if (fucitiao == '充能') {
            data = await this.getRandomArrOne(syw.chongneng)
        } else if (fucitiao == '生命值') {
            data = await this.getRandomArrOne(syw.shengmingzhi)
        } else if (fucitiao == '暴击率') {
            data = await this.getRandomArrOne(syw.baojilv)
        } else if (fucitiao == '暴击伤害') {
            data = await this.getRandomArrOne(syw.baojishanghai)
        } else if (fucitiao == '小防御') {
            data = await this.getRandomArrOne(syw.xiaofangyu)
        } else if (fucitiao == '小生命') {
            data = await this.getRandomArrOne(syw.xiaoshengming)
        } else if (fucitiao == '小攻击') {
            data = await this.getRandomArrOne(syw.xiaogongji)
        }
        return data
    },

    //随机获得副词条
    async randomFucitiao(zhucitiao, buwei) {
        let sum = await this.getRandomArrOne([3, 4])
        let fucitiaolist = JSON.parse(JSON.stringify(syw.fucitiaos))
        if (buwei == '生之花') {
            fucitiaolist = await this.removeArr(fucitiaolist, '小生命')
        } else if (buwei == '死之羽') {
            fucitiaolist = await this.removeArr(fucitiaolist, '小攻击')
        } else {
            fucitiaolist = await this.removeArr(fucitiaolist, zhucitiao)
        }
        let fucitiao = await this.randomArr(fucitiaolist, sum)
        return fucitiao;
    },

    //双爆副词条
    async NBFucitiao(zhucitiao, buwei) {
        let fucitiaolist
        if (buwei == '生之花') {
            fucitiaolist = ['小攻击', '攻击力', '暴击率', '暴击伤害']
        } else if (buwei == '死之羽') {
            fucitiaolist = ['精通', '攻击力', '暴击率', '暴击伤害']
        } else if (buwei == '时之沙') {
            fucitiaolist = await this.removeArr(['精通', '攻击力', '暴击率', '暴击伤害', '充能'], zhucitiao)
        } else if (buwei == '空之杯') {
            fucitiaolist = ['精通', '攻击力', '暴击率', '暴击伤害']
        } else if (buwei == '理之冠') {
            fucitiaolist = await this.removeArr(['精通', '攻击力', '暴击率', '暴击伤害', '充能'], zhucitiao)
        }
        return fucitiaolist;
    },

    //确定副词条初始值
    async fucitiaoAddData(fucitiao) {
        let fucitiaoData = []
        for (let index = 0; index < fucitiao.length; index++) {
            if (fucitiao[index] == '精通') {
                fucitiaoData.push(await this.getRandomArrOne(syw.jingtong))
            } else if (fucitiao[index] == '攻击力') {
                fucitiaoData.push(await this.getRandomArrOne(syw.gongjili) + '%')
            } else if (fucitiao[index] == '防御力') {
                fucitiaoData.push(await this.getRandomArrOne(syw.fangyuli) + '%')
            } else if (fucitiao[index] == '充能') {
                fucitiaoData.push(await this.getRandomArrOne(syw.chongneng) + '%')
            } else if (fucitiao[index] == '生命值') {
                fucitiaoData.push(await this.getRandomArrOne(syw.shengmingzhi) + '%')
            } else if (fucitiao[index] == '暴击率') {
                fucitiaoData.push(await this.getRandomArrOne(syw.baojilv) + '%')
            } else if (fucitiao[index] == '暴击伤害') {
                fucitiaoData.push(await this.getRandomArrOne(syw.baojishanghai) + '%')
            } else if (fucitiao[index] == '小防御') {
                fucitiaoData.push(await this.getRandomArrOne(syw.xiaofangyu))
            } else if (fucitiao[index] == '小生命') {
                fucitiaoData.push(await this.getRandomArrOne(syw.xiaoshengming))
            } else if (fucitiao[index] == '小攻击') {
                fucitiaoData.push(await this.getRandomArrOne(syw.xiaogongji))
            }
        }
        return fucitiaoData;
    },

    //给副词条加%
    async fucitiaoAddfuhao(fucitiao, fucitiaoData) {
        let data = fucitiaoData
        if (fucitiao == '攻击力' || fucitiao == '防御力' || fucitiao == '充能' || fucitiao == '生命值' || fucitiao == '暴击率' || fucitiao == '暴击伤害') {
            data = data + '%'
        }
        return data
    },

    //副词条升级提升数值
    async fucitiaoUpData(fucitiao) {
        let fucitiaoData
        if (fucitiao == '精通') {
            fucitiaoData = await this.getRandomArrOne(syw.jingtong)
        } else if (fucitiao == '攻击力') {
            fucitiaoData = await this.getRandomArrOne(syw.gongjili)
        } else if (fucitiao == '防御力') {
            fucitiaoData = await this.getRandomArrOne(syw.fangyuli)
        } else if (fucitiao == '充能') {
            fucitiaoData = await this.getRandomArrOne(syw.chongneng)
        } else if (fucitiao == '生命值') {
            fucitiaoData = await this.getRandomArrOne(syw.shengmingzhi)
        } else if (fucitiao == '暴击率') {
            fucitiaoData = await this.getRandomArrOne(syw.baojilv)
        } else if (fucitiao == '暴击伤害') {
            fucitiaoData = await this.getRandomArrOne(syw.baojishanghai)
        } else if (fucitiao == '小防御') {
            fucitiaoData = await this.getRandomArrOne(syw.xiaofangyu)
        } else if (fucitiao == '小生命') {
            fucitiaoData = await this.getRandomArrOne(syw.xiaoshengming)
        } else if (fucitiao == '小攻击') {
            fucitiaoData = await this.getRandomArrOne(syw.xiaogongji)
        }
        return fucitiaoData;
    },

    //移除数组中的元素
    async removeArr(arr, removeItem) {
        let index = arr.indexOf(removeItem)
        let newArr = arr
        if (index > -1) {
            newArr.splice(index, 1)
        }
        return newArr;
    },

    //随机获得主词条
    async randomZhucitiao(buwei) {
        let zhucitiao
        if (buwei == '生之花') {
            zhucitiao = '生命值'
        } else if (buwei == '死之羽') {
            zhucitiao = '攻击力'
        } else if (buwei == '时之沙') {
            zhucitiao = await this.getRandomArrOne(syw.shizhishazhucitiaos)
        } else if (buwei == '空之杯') {
            zhucitiao = await this.getRandomArrOne(syw.kongzhibeizhucitiaos)
        } else if (buwei == '理之冠') {
            zhucitiao = await this.getRandomArrOne(syw.lizhiguanzhucitiaos)
        }
        return zhucitiao;
    },

    //双爆主词条
    async NBZhucitiao(buwei) {
        let zhucitiao
        if (buwei == '生之花') {
            zhucitiao = '生命值'
        } else if (buwei == '死之羽') {
            zhucitiao = '攻击力'
        } else if (buwei == '时之沙') {
            zhucitiao = await this.getRandomArrOne(['攻击力', '充能', '精通'])
        } else if (buwei == '空之杯') {
            zhucitiao = await this.getRandomArrOne(['草元素伤害加成', '雷元素伤害加成', '风元素伤害加成', '岩元素伤害加成', '火元素伤害加成', '水元素伤害加成', '冰元素伤害加成'])
        } else if (buwei == '理之冠') {
            zhucitiao = await this.getRandomArrOne(['暴击率', '暴击伤害'])
        }
        return zhucitiao;
    },

    //主词条升级+20
    async randomUpZhucitiao(zhucitiao, buwei) {
        let zhucitiaoData
        if (buwei == '生之花') {
            zhucitiaoData = '4780'
        } else if (buwei == '死之羽') {
            zhucitiaoData = '311'
        } else {
            if (zhucitiao == '精通') {
                zhucitiaoData = '187'
            } else if (zhucitiao == '攻击力') {
                zhucitiaoData = '46.6%'
            } else if (zhucitiao == '防御力') {
                zhucitiaoData = '58.3%'
            } else if (zhucitiao == '充能') {
                zhucitiaoData = '51.8%'
            } else if (zhucitiao == '生命值') {
                zhucitiaoData = '46.6%'
            } else if (zhucitiao == '暴击率') {
                zhucitiaoData = '31.1%'
            } else if (zhucitiao == '暴击伤害') {
                zhucitiaoData = '62.2%'
            } else if (zhucitiao == '治疗加成') {
                zhucitiaoData = '35.9%'
            } else {
                zhucitiaoData = '46.6%'
            }
        }
        return zhucitiaoData;
    },

    //给主词条加初始值
    async zhucitiaoAddData(zhucitiao, buwei) {
        let zhucitiaoData
        if (buwei == '生之花') {
            zhucitiaoData = '717'
        } else if (buwei == '死之羽') {
            zhucitiaoData = '47'
        } else {
            if (zhucitiao == '精通') {
                zhucitiaoData = '28'
            } else if (zhucitiao == '攻击力') {
                zhucitiaoData = '7.0%'
            } else if (zhucitiao == '防御力') {
                zhucitiaoData = '8.7%'
            } else if (zhucitiao == '充能') {
                zhucitiaoData = '7.8%'
            } else if (zhucitiao == '生命值') {
                zhucitiaoData = '7.0%'
            } else if (zhucitiao == '暴击率') {
                zhucitiaoData = '4.7%'
            } else if (zhucitiao == '暴击伤害') {
                zhucitiaoData = '9.3%'
            } else if (zhucitiao == '治疗加成') {
                zhucitiaoData = '5.4%'
            } else {
                zhucitiaoData = '7.0%'
            }
        }
        return zhucitiaoData;
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

    //从数组中随机取n个值
    async randomArr(arr, count) {
        let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    },

    //从数组中随机取一个值
    async getRandomArrOne(arr) {
        return arr[Math.floor((Math.random() * arr.length))]
    }
}
export default util
// export {
//     ForwardMsg,
//     randomFucitiao4,
//     fucitiao4AddData,
//     randomFucitiao,
//     NBFucitiao,
//     fucitiaoAddData,
//     fucitiaoAddfuhao,
//     fucitiaoUpData,
//     removeArr,
//     randomZhucitiao,
//     NBZhucitiao,
//     randomUpZhucitiao,
//     zhucitiaoAddData,
//     randomShengyiwu,
//     randomArr,
//     getRandomArrOne
// }