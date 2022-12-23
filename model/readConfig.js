import YAML from "yaml";
import fs from "fs";

const configPath = process.cwd() + '/plugins/xiaoye-plugin/config/config.yaml'
let data = await YAML.parse(
    fs.readFileSync(configPath, "utf8")
);

let config = {
    shizhisha: data.shizhisha,
    kongzhibei: data.kongzhibei,
    lizhiguan: data.lizhiguan,
    citiao: data.citiao,
    buwei: data.buwei,
    qianghua: data.qianghua,
    fucitiao: data.fucitiao,
    fucitiaoqianghua: data.fucitiaoqianghua,
    cd: data.cd
}
export default config