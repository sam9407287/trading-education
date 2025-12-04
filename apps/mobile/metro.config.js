// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 保留 Expo 默認的 watchFolders，並添加 monorepo 支持
config.watchFolders = [
  ...(config.watchFolders || []),
  workspaceRoot,
];

// 設置 node_modules 解析路徑
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 禁用 symlinks（避免與 Expo 默認設置衝突）
config.resolver.unstable_enableSymlinks = undefined;

// 讓 Metro 能解析 monorepo 中的包（EAS 要求設為 false）
config.resolver.disableHierarchicalLookup = false;

module.exports = withNativeWind(config, { input: './global.css' });
