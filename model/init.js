import fs from 'fs'

await init()

/** 初始化事件 */
async function init() {
  //检查有没有config/config.yaml
  const configPath = process.cwd().replace(/\\/g, "/") + '/plugins/xiaoye-plugin/'
  let path = configPath + 'config/'
  let pathDef = configPath + 'def/'
  const files = fs.readdirSync(pathDef).filter(file => file.endsWith('.yaml'))
  for (let file of files) {
    if (file == 'help.yaml') {
      continue
    }
    if (!fs.existsSync(`${path}${file}`)) {
      fs.copyFileSync(`${pathDef}${file}`, `${path}${file}`)
    }
  }
}
