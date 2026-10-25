# Sixian Du academic website

根据用户提供的 Sixian Du CV.doc 制作。以 GitHub 的 [Minimal Light](https://github.com/yaoyao-liu/minimal-light) 为基础，将其原生 HTML 版本的个人资料栏、wrapper/header/section 布局与论文列表结构定制为静态网站。保留了上游基础样式与 CC0 许可证，另增加自定义视觉样式与交互。

## 使用

- `dist/index.html`：主页；`dist/cv.html`：适合打印和保存 PDF 的学术简历。
- `dist/assets/site.css`：定制设计；`app.js`：语言、主题、筛选与引用交互。
- `dist/assets/papers.js`：论文元数据；HTML 中也包含完整论文，关闭 JavaScript 仍可阅读。
- 直接将 dist 目录中的内容上传 GitHub Pages、静态主机或自有服务器即可；无依赖、无构建步骤。
- 推荐通过静态 HTTP 服务器预览；也可直接打开 index.html。

## 内容处理

学历、项目、奖项、报告与照片来自提供的简历。预计2027年毕业被明确标注；未将预计 IELTS 成绩作为事实展示。简历中重复出现的 Frontiers in Public Health 论文只保留一次。科研项目均标为参与经历，不声称主持。手机号未放入页面。

主页收录10篇精选论文，均补充了 DOI；以出版社、PubMed 与 Crossref 的记录核对论文元数据，其中 HIV 论文补全了末位作者，2024年高血压论文补全了最后一位作者。未将简历中的在审/修回稿件列为已发表成果。

已通过 ORCID 公共 API 核对 Sixian Du 的身份（0009-0009-9804-4645），并通过出版社及 PubMed 补充2026年 HIV 医共体研究和2025年 JMIR Research Protocols 研究方案。主页、联系栏及简历均包含 ORCID 链接。其余数据反映用户提供简历的范围，未声称已穷尽所有成果；后续可更新日期、论文及项目状态。

## 原模板

- 仓库：https://github.com/yaoyao-liu/minimal-light
- 原始 HTML：https://github.com/yaoyao-liu/minimal-light/tree/main/html_source_file
- 许可证：`dist/assets/minimal-light-LICENSE.txt`（CC0 1.0）

外部字体不可用时自动使用本地系统字体。照片为简历内原图的网页尺寸压缩版本。

## 正式发布

作者：杜思娴（Sixian Du）。左上角标识：sixiandu 杜思娴。正式 GitHub Pages 地址：https://naturedu.github.io/ 。仓库：https://github.com/naturedu/naturedu.github.io 。
