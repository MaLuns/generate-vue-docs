## generate-vue-docs
为vue单文件组件生成文档说明。

### 使用
``` js
const { parseDocs } = require('generate-vue-docs')

// vueStr 组件内容,默认返回json文档
parseDocs(vueStr) 

// 返回md文档，并去掉slot部分，props只显示name和desc
parseDocs(vueStr, {
    md: true,
    mdOptions: {
        slots: false,
        props: { name: '参数', desc: '说明' }
    }
})
```

### 默认配置
``` json
{
    md: false,
    mdOptions: {
        // md 生成的表格 会根据此配置 生成标题和列顺序
        props: { name: '参数', desc: '说明', type: '类型', default: '默认值' },
        slots: { name: 'name', desc: '说明' },
        events: { name: '事件名称', desc: '说明' },
        methods: { name: '方法名', desc: '说明', params: '参数' }
    }
}
```