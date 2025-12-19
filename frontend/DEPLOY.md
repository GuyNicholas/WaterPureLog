# WaterPureLog Vercel 部署指南

## 方法一：使用 Vercel CLI（推荐）

### 1. 安装 Vercel CLI（如果未安装）
```bash
npm install -g vercel
```

### 2. 登录 Vercel
```bash
vercel login
```

### 3. 部署项目
```bash
cd action/frontend
npm run build
vercel --prod
```

或者使用提供的脚本：
```bash
cd action/frontend
chmod +x deploy-vercel.sh
./deploy-vercel.sh
```

## 方法二：使用 Token 部署

### 1. 设置环境变量
```bash
export VERCEL_TOKEN="DYKtMvricdTZiQCAcmH9WrsQ"
```

### 2. 部署
```bash
cd action/frontend
npm run build
vercel --prod --token="$VERCEL_TOKEN"
```

## 方法三：通过 Vercel Web 界面

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "Add New Project"
3. 导入 Git 仓库（如果已连接）或直接上传项目
4. 项目名称设置为: `waterpurelog`
5. 框架预设: Next.js
6. 构建命令: `npm run build`
7. 输出目录: `.next`
8. 安装命令: `npm install --legacy-peer-deps`
9. 点击 "Deploy"

## 项目配置

- **项目名称**: waterpurelog
- **框架**: Next.js 15.5.7
- **构建命令**: `npm run build`
- **安装命令**: `npm install --legacy-peer-deps`
- **Node 版本**: 18.x 或更高

## 环境变量

如果需要设置环境变量，在 Vercel 项目设置中添加：
- 无需特殊环境变量（合约地址通过 ABI 文件配置）

## 注意事项

1. ✅ 项目已配置 `vercel.json`，会自动识别 Next.js 项目
2. ✅ 构建已通过测试，所有类型错误已修复
3. ✅ ABI 文件已包含在项目中，无需额外生成
4. ⚠️ 确保 Vercel Token 有效且有部署权限

## 部署后

部署成功后，Vercel 会提供一个 URL，例如：
- `https://waterpurelog.vercel.app`
- 或自定义域名（如果已配置）

## 故障排除

如果遇到问题：
1. 检查 Vercel Token 是否有效
2. 确认项目名称是否正确
3. 查看 Vercel 构建日志
4. 确保所有依赖已正确安装
