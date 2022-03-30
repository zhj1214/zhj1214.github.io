/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2022-03-25 14:09:39
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-03-25 16:28:43
 */
module.exports = {
  ignores: [(commit) => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0],
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新的需求、功能
        'fix', // 修复bug
        'perf', // 性能优化
        'style', // 样式、界面修改
        'docs', // 文档、描述
        'test', // 测试
        'refactor', // 代码重构，没有加新功能或者修复bug
        'build', // 部署
        'ci', // 主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
        'chore', //  改变构建流程、或者增加依赖库、工具等
        'revert', // 回滚到上一个版本
        'wip', //
        'workflow', // 工作流程
        'types', //
        'release', // 生产环境部署
      ],
    ],
  },
};
