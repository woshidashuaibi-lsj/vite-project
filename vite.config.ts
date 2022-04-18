import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { normalizePath } from "vite";
import autoprefixer from "autoprefixer";
import pxtorem from "postcss-pxtorem";
import cssnano from "cssnano";
// 如果类型报错，需要安装 @types/node: pnpm i @types/node -D
import path from "path";

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve("./src/variable.scss"));

// https://vitejs.dev/config/
export default defineConfig({
	// css 相关的配置
	css: {
		// 配置类名展示
		modules: {
			// 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
			// 其中，name 表示当前文件名，local 表示类名
			generateScopedName: "[name]__[local]___[hash:base64:5]",
		},
		// 将某个scss文件全局话，即全都引入这个文件
		preprocessorOptions: {
			scss: {
				// additionalData 的内容会在每个 scss 文件的开头自动注入
				additionalData: `@import "${variablePath}";`,
			},
		},
		// 配置 scss 文件不同浏览器下兼容的不同的样式前缀
		postcss: {
			plugins: [
				autoprefixer({
					// 指定目标浏览器
					overrideBrowserslist: ["Chrome > 40", "ff > 31", "ie 11"],
				}),
				// 将px转换成rem 适配移动端
				pxtorem({
					rootValue: 16, //结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
					propList: ["*"],
					exclude: /node_modules/i, //这里表示不处理node_modules文件夹下的内容
				}),
				cssnano({
					preset: "default",
				}),
			],
		},
	},
	plugins: [
		react({
			babel: {
				// 加入 babel 插件
				// 以下插件包都需要提前安装
				// 当然，通过这个配置你也可以添加其它的 Babel 插件
				plugins: [
					// 适配 styled-component
					"babel-plugin-styled-components",
					// // 适配 emotion
					// "@emotion/babel-plugin",
				],
			},
			// 注意: 对于 emotion，需要单独加上这个配置
			// 通过 `@emotion/react` 包编译 emotion 中的特殊 jsx 语法
			// jsxImportSource: "@emotion/react",
		}),
	],
});
