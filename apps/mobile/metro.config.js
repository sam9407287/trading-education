// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');
const fs = require('fs');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 明確設置項目根目錄
config.projectRoot = projectRoot;

// 監視 packages 目錄以支持共享代碼
config.watchFolders = [
  path.resolve(workspaceRoot, 'packages/shared'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 設置 node_modules 解析路徑
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 處理 pnpm 符號鏈接問題
config.resolver.unstable_enableSymlinks = true;

// 自定義解析器來處理 monorepo 路徑問題
const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // 如果在根目錄嘗試解析 ./index，重定向到 mobile 項目
  if (context.originModulePath === workspaceRoot + '/.' && moduleName === './index') {
    return {
      filePath: path.resolve(projectRoot, 'node_modules/expo-router/entry.js'),
      type: 'sourceFile',
    };
  }
  
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }
  
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: './global.css' });

