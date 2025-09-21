---
title: Ant Design Pro 教程
category:
  - Ant Design
  - Ant Design Pro
date: 2025-09-20
---

# Ant Design Pro 教程 & 注意事项

## 📚 教程资源

- **官网**：https://pro.ant.design/zh-CN/
- **首页模板教程**：https://landing.ant.design/docs/introduce-cn

## 🚀 安装指南

### 基本安装

```bash
# 安装 pro-cli（推荐使用 tyarn）
tyarn global @ant-design/pro-cli
# 或者使用 npm
npm i @ant-design/pro-cli -g

# 创建项目
pro create ant-design-pro

# 选择 umi 版本
? 🐂 使用 umi@4 还是 umi@3 ?
  > umi@3    # 推荐选择

# 选择脚手架类型
? 🚀 要全量的还是一个简单的脚手架?
  > complete  # 推荐选择完整版

# 安装依赖
cd ant-design-pro-v5 && tyarn
```

### 下载全量区块

```bash
# 注意：全量区块需要 umi@3.x 版本，4.x 不支持
cd ant-design-pro/
yarn run pro fetch-blocks --branch=v5

# 如果区块有冲突，先清理：
umi block clear
```

### 🔧 安装问题解决

1. **包管理器推荐**
   - 优先使用 `tyarn`（速度快，兼容性好）
   - 也可使用 `cnpm`（比 tyarn 更快，但与 npm 不完全兼容）

2. **权限问题**
   - 在 CMD 或 Windows PowerShell（管理员）下执行
   - 推荐使用 CMD

3. **Node 版本兼容性**
   ```bash
   # 如果遇到：error commander@11.0.0: The engine "node" is incompatible
   nvm use 16  # 切换到 Node 16+
   
   # 如果启动时遇到：error:0308010C:digital envelope routines::unsupported
   nvm use 14.18.1  # 切换到稳定版本
   ```

4. **Babel 错误**
   ```bash
   # 如果遇到：@babel/helper-compilation-targets: 'opera_mobile' is not a valid target
   # 删除 src/components/index.md 文件
   rm src/components/index.md
   ```

## ⚙️ 常见配置问题

### 1. 静态路由图标问题

**问题**：`Module "./@ant-design/icons/BellOutlined" does not exist in container.`

**解决**：删除 `.umi` 文件夹，重新部署

### 2. 音频文件导入

```bash
# 1. 安装 file-loader
npm install --save-dev file-loader
```

```javascript
// 2. 在 config.ts 中配置
chainWebpack(memo) {
  memo.module
    .rule('media')
    .test(/\.(mp3|4)$/)
    .use('file-loader')
    .loader(require.resolve('file-loader'))
}

// 3. 使用方式
import sound from "@/assets/musicPlayer/1.mp3";
<audio src={sound} autoPlay loop>
  Your browser does not support the audio element.
</audio>
```

### 3. ProTable renderFormItem 使用

#### 方式一：复杂配置

```javascript
renderFormItem: (item, _, form) => {
  return <Select
    showArrow
    allowClear
    showSearch
    style={{width: '100%'}}
    placeholder="请选择调度任务"
    value={form.getFieldValue(`${item.dataIndex}`)}
    onChange={selectValue => {
      // 手动设置表单值
      const newValues = {};
      newValues[`${item.dataIndex}`] = selectValue;
      form.setFieldsValue(newValues);
      
      // 业务逻辑处理
      props.setSelectCronValue(selectValue);
    }}
    optionLabelProp="label"
    optionFilterProp="label"
  >
    {(props.subScheduleList || []).map((item) => (
      <Select.Option value={item.serviceName} label={item.desc} key={item.serviceName}>
        {item.desc}
      </Select.Option>
    ))}
  </Select>
}
```

#### 方式二：简单配置（推荐）

```javascript
{
  fieldProps: {
    onChange: (selectValue) => {
      props.setSelectCronValue(selectValue);
      // 其他业务逻辑
    }
  },
  formItemProps: {
    rules: [
      {
        required: true,
        message: '调度任务为必填项',
      },
    ],
  },
  renderFormItem: () =>
    <Select
      showArrow
      allowClear
      showSearch
      style={{width: '100%'}}
      placeholder="请选择调度任务"
      optionLabelProp="label"
      optionFilterProp="label"
    >
      {(props.subScheduleList || []).map((item) => (
        <Select.Option value={item.serviceName} label={item.desc} key={item.serviceName}>
          {item.desc}
        </Select.Option>
      ))}
    </Select>
}
```

### 4. 密码框自动填充问题

```javascript
// autoComplete="off" 无效时使用：
<Input type="password" autoComplete="new-password" />
```

### 5. useForm 警告解决

```javascript
useEffect(() => {
  if (form && !modalVisible) {
    console.log(record);
  }
  if (form && modalVisible) {
    form.resetFields(); // 重置表单
    form.setFieldsValue(record);
  }
}, [modalVisible]);
```

## 🌐 国际化配置

### 关闭国际化

```bash
# 1. 删除国际化
npm run i18n-remove
# 或
yarn run i18n-remove
```

```javascript
// 2. 在配置中关闭
export default {
  menu: {
    locale: false,  // 关闭国际化
  },
  title: '综合管理平台',
  // 其他配置...
}
```

## 🔧 代理配置

### config.ts 配置

```javascript
export default {
  proxy: proxy[REACT_APP_ENV || 'local'], // 代理配置
  // 其他配置...
}
```

### proxy.ts 配置

```javascript
export default {
  local: {
    '/api': {
      target: 'http://localhost:9330/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/fmsf': {
      target: 'http://localhost:8001/',
      changeOrigin: true,
      pathRewrite: { '^/fmsf': '/fmsf' },
    },
  },
  dev: {
    '/api': {
      target: 'http://114.115.218.225:9330/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    // 其他环境配置...
  }
}
```

## 🎨 样式和 Logo 配置

### 修改标题和 Logo

```javascript
// settings.ts
const Settings = {
  navTheme: 'light',
  primaryColor: '#1890ff',
  layout: 'mix',
  title: '咪哩快看支撑平台',
  logo: '/logo.svg', // public 目录下的文件
}

// App.tsx 中隐藏 logo
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    logo: false, // 完全隐藏 logo
  };
};
```

### 修改加载页面 Logo

```html
<!-- src/pages/document.ejs -->
<img
  src="/your-logo.svg"
  width="32"
  style="margin-right: 8px"
/>
```

## 📦 生产环境优化

### 去掉生产环境日志

```bash
# 1. 安装插件
npm install babel-plugin-transform-remove-console -D
```

```javascript
// 2. config.prod.js
export default {
  extraBabelPlugins: [
    ['transform-remove-console', { exclude: ['error', 'info'] }],
  ],
};
```

```json
// 3. package.json
{
  "scripts": {
    "build:prod": "cross-env UMI_ENV=prod umi build"
  }
}
```

### 配置别名

```javascript
// config.ts 中配置 alias
export default {
  alias: {
    '@': path.resolve(__dirname, 'src'),
  }
}

// 使用示例
// CSS 中：@import '~@/global.less'
// JS 中：import AvatarView from '@/components/GlobalAvatar/AvatarView'
```

## 🔄 UMI4 升级指南

### 主要变更

1. **组件名称变更**
   ```javascript
   // Before (UMI3)
   import { PageHeaderWrapper } from '@ant-design/pro-layout';
   
   // After (UMI4)
   import { PageContainer } from '@ant-design/pro-components';
   ```

2. **插件导入路径变更**
   ```javascript
   // Before
   import { useModel } from '@@/plugin-model/useModel';
   import { useAccess } from '@@/plugin-access/access';
   
   // After
   import { useModel } from '@@/plugin-model';
   import { useAccess } from '@@/plugin-access';
   ```

3. **请求配置变更**
   ```javascript
   // UMI3
   export const request: RequestConfig = {
     errorConfig: {
       errorPage: '',
       adaptor: () => {},
     },
     middlewares: [],
   };
   
   // UMI4
   export const request: RequestConfig = {
     errorConfig: {
       errorHandler: () => {},
       errorThrower: () => {}
     },
     requestInterceptors: [],
     responseInterceptors: [],
   };
   ```

4. **查询参数获取方式变更**
   ```javascript
   // UMI3
   const { query } = history.location;
   const { redirect } = query as { redirect: string };
   
   // UMI4
   const urlParams = new URL(window.location.href).searchParams;
   const redirect = urlParams.get('redirect');
   ```

5. **端口配置变更**
   ```json
   // UMI3 package.json
   {
     "start": "cross-env REACT_APP_ENV=local UMI_ENV=local umi dev --port=8010"
   }
   
   // UMI4 package.json
   {
     "start": "cross-env REACT_APP_ENV=local UMI_ENV=local PORT=8010 max dev"
   }
   ```

### config.ts 新增配置

```javascript
export default {
  // 支持 query 查询参数
  historyWithQuery: {},
  
  // 数据流相关配置
  model: {},
  initialState: {},
  access: {},
  request: {},
}
```

### config.ts 或者 .umirc.ts 升级后, REACT_APP_ENV自定义的变量不能与define默认的变量重名，否则会被默认的覆盖

- https://github.com/umijs/umi/issues/8329

### dynamicImport 在@umi3中是在config.ts中手动配置的，在@umi4 中 将不提供手动配置，将采用自动导入,对应的目录为 src/loading.tsx 作为全局的loading

一个简单的示例：

```ts
import { Spin } from 'antd';
// loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
export default () => (
  <div style={{ paddingTop: 100, textAlign: 'center' }}>
    <Spin size="large" />
  </div>
);
```

> 参考官网：https://umijs.org/docs/introduce/faq

### 注意事项

1. 删除 `app.tsx` 中的 `initialStateConfig` 导出
5. 升级时删除 `node_modules` 重新安装

## 📝 参考资源

- [Ant Design Pro 官方文档](https://pro.ant.design/zh-CN/)
- [UMI 官方文档](https://umijs.org/)
- [全量区块仓库](https://github.com/ant-design/pro-blocks)
- [ProTable 使用案例](https://github.com/ant-design/pro-table/issues/727)
- 实战项目可以参考: universal-manage-web、jasper-web 全部都已经完成升级

---
