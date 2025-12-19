# 部署 WaterPureLog 合约到 Sepolia 测试网

## 当前状态

✅ 前端已部署到 Vercel  
❌ 合约未部署到 Sepolia 测试网 (Chain ID: 11155111)

## 问题

应用显示 "Contract Not Deployed" 错误，因为合约还没有在 Sepolia 测试网上部署。

## 解决方案

### 步骤 1: 恢复必要的文件

如果文件被删除，需要重新创建以下文件：

1. **contracts/contracts/WaterPureLog.sol** - 合约源代码
2. **contracts/hardhat.config.ts** - Hardhat 配置
3. **contracts/package.json** - 项目依赖
4. **contracts/scripts/deploy.ts** - 部署脚本

### 步骤 2: 配置 Sepolia 网络

在 `hardhat.config.ts` 中配置 Sepolia 网络：

```typescript
networks: {
  sepolia: {
    url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
    // 或使用 Alchemy
    // url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    accounts: [PRIVATE_KEY], // 或使用 mnemonic
    chainId: 11155111,
  },
}
```

**需要的环境变量：**
- `INFURA_API_KEY` 或 `ALCHEMY_API_KEY` - RPC 提供商 API 密钥
- `PRIVATE_KEY` - 部署账户的私钥（需要有 Sepolia ETH）

### 步骤 3: 获取 Sepolia ETH

部署合约需要支付 Gas 费，需要 Sepolia 测试网 ETH：

1. 访问 [Sepolia Faucet](https://sepoliafaucet.com/)
2. 或使用 [Alchemy Faucet](https://sepoliafaucet.com/)
3. 输入你的钱包地址获取测试 ETH

### 步骤 4: 部署合约

```bash
cd action/contracts

# 编译合约
npm run compile

# 部署到 Sepolia
npx hardhat run scripts/deploy.ts --network sepolia
```

部署成功后，会显示合约地址，例如：
```
WaterPureLog deployed to: 0x1234567890123456789012345678901234567890
```

### 步骤 5: 更新前端配置

1. **更新合约地址文件：**

```bash
cd action/frontend
npm run genabi
```

这会读取 Sepolia 部署信息并更新 `abi/WaterPureLogAddresses.ts`

2. **验证地址文件：**

检查 `action/frontend/abi/WaterPureLogAddresses.ts` 应该包含：

```typescript
export const WaterPureLogAddresses = { 
  "11155111": { 
    address: "0x你的合约地址", 
    chainId: 11155111, 
    chainName: "sepolia" 
  },
  "31337": { 
    address: "0x本地地址", 
    chainId: 31337, 
    chainName: "hardhat" 
  },
};
```

### 步骤 6: 重新部署前端

```bash
cd action/frontend

# 构建
npm run build

# 部署到 Vercel
vercel --prod
```

## 验证部署

1. 访问 Vercel 部署的网站
2. 连接 MetaMask 钱包
3. 切换到 Sepolia 测试网
4. 应该不再显示 "Contract Not Deployed" 错误
5. 可以正常使用应用功能

## 故障排除

### 问题 1: 部署失败 - Insufficient funds

**解决：** 确保部署账户有足够的 Sepolia ETH

### 问题 2: 部署失败 - Network error

**解决：** 检查 RPC URL 和 API 密钥是否正确

### 问题 3: 前端仍显示错误

**解决：**
- 确保运行了 `npm run genabi`
- 检查合约地址是否正确
- 清除浏览器缓存
- 重新部署前端

### 问题 4: 合约地址为 0x0000...

**解决：** 说明 Sepolia 部署信息不存在，需要先部署合约

## 注意事项

1. **私钥安全：** 永远不要将私钥提交到 Git 仓库
2. **测试网 ETH：** Sepolia ETH 是免费的，可以从 faucet 获取
3. **Gas 费：** 部署合约需要支付 Gas 费（使用 Sepolia ETH）
4. **合约验证：** 部署后可以在 Etherscan 上验证合约代码

## 相关链接

- [Sepolia Faucet](https://sepoliafaucet.com/)
- [Infura](https://www.infura.io/) - RPC 提供商
- [Alchemy](https://www.alchemy.com/) - RPC 提供商
- [Sepolia Etherscan](https://sepolia.etherscan.io/) - 区块浏览器




