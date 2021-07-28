const fs = require('fs')
const path = require('path');
let vueStr = fs.readFileSync(path.resolve(__dirname, 'index.vue'), 'utf8')
const { parseDocs } = require('../src')

const config = {
    md: true,
    mdOptions: {
        props: { name: '参数', type: '类型', desc: '说明', default: '默认值' },
        slots: { name: 'name', desc: '说明' },
        events: { name: '事件名称', desc: '说明' },
        methods: { name: '方法名', desc: '说明', params: '参数', res: '返回值' }
    }
}

//console.log(JSON.stringify(parseDocs(vueStr), null, 2));
console.log(parseDocs(vueStr, config));