# Git 仓库初始化指南

本文档说明如何为项目初始化 Git 仓库并关联到远程仓库。

## 步骤 1: 初始化 Git 仓库

在项目根目录（`main` 目录）执行以下命令：

```bash
# 进入项目目录
cd e:\中鸿万城\zhonghong-wancheng-admin\main

# 初始化 Git 仓库
git init
```

## 步骤 2: 检查 Git 状态

```bash
# 查看 Git 状态
git status
```

## 步骤 3: 添加文件到暂存区

```bash
# 添加所有文件
git add .

# 或者选择性添加文件
git add package.json README.md src/ public/
```

## 步骤 4: 创建初始提交

```bash
# 创建初始提交
git commit -m "初始提交: 基于 TailAdmin React 模板创建中鸿万城管理后台"
```

## 步骤 5: 创建远程仓库

在 GitHub、GitLab 或 Gitee 上创建一个新仓库，仓库名称为 `zhonghongwancheng-admin`。

### GitHub 示例

1. 访问 https://github.com/new
2. 仓库名称: `zhonghongwancheng-admin`
3. 描述: `中鸿万城管理后台系统`
4. 选择私有或公开
5. 不要初始化 README、.gitignore 或许可证（因为我们已经有了）
6. 点击 "Create repository"

## 步骤 6: 关联远程仓库

```bash
# 添加远程仓库（将 YOUR_USERNAME 替换为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/zhonghongwancheng-admin.git

# 或者使用 SSH（如果你配置了 SSH 密钥）
git remote add origin git@github.com:YOUR_USERNAME/zhonghongwancheng-admin.git

# 查看远程仓库
git remote -v
```

## 步骤 7: 推送代码到远程仓库

```bash
# 重命名主分支为 main（如果默认是 master）
git branch -M main

# 推送到远程仓库
git push -u origin main
```

## 步骤 8: 验证

访问你的远程仓库地址，确认代码已成功推送。

## 后续操作

### 创建开发分支

```bash
# 创建并切换到开发分支
git checkout -b develop

# 推送开发分支到远程
git push -u origin develop
```

### 日常开发流程

```bash
# 1. 切换到开发分支
git checkout develop

# 2. 创建功能分支
git checkout -b feature/功能名称

# 3. 开发完成后提交
git add .
git commit -m "功能描述"

# 4. 推送到远程
git push -u origin feature/功能名称

# 5. 合并到开发分支（通过 Pull Request 或直接合并）
git checkout develop
git merge feature/功能名称
```

## 分支策略建议

```
main/master          # 主分支（生产环境）
├── develop          # 开发分支
├── feature/xxx      # 功能分支
├── bugfix/xxx       # 修复分支
└── release/xxx      # 发布分支
```

## 常见问题

### Q: 如果已经存在 .git 目录怎么办？

A: 如果项目是从原仓库克隆的，需要删除原有的 Git 历史：

```bash
# 删除 .git 目录
rm -rf .git

# Windows PowerShell
Remove-Item -Recurse -Force .git

# 然后重新初始化
git init
git add .
git commit -m "初始提交"
```

### Q: 如何移除现有的远程仓库？

A: 如果之前已经关联了远程仓库，需要先移除：

```bash
# 查看现有远程仓库
git remote -v

# 移除远程仓库
git remote remove origin

# 然后添加新的远程仓库
git remote add origin https://github.com/YOUR_USERNAME/zhonghongwancheng-admin.git
```

### Q: 如何忽略已经提交的文件？

A: 如果某些文件已经被提交但应该被忽略：

```bash
# 从 Git 跟踪中移除文件（但保留本地文件）
git rm --cached 文件名

# 更新 .gitignore
# 然后提交更改
git add .gitignore
git commit -m "更新 .gitignore"
```

## 注意事项

1. **不要提交敏感信息**: 确保 `.env` 文件、API 密钥等敏感信息已添加到 `.gitignore`
2. **定期提交**: 建议频繁提交，每次提交包含一个完整的更改
3. **提交信息**: 使用清晰、有意义的提交信息
4. **分支管理**: 遵循分支策略，不要在 main 分支直接开发

## 参考资源

- [Git 官方文档](https://git-scm.com/doc)
- [GitHub 指南](https://guides.github.com/)
- [Git 分支策略](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E6%96%B0%E5%BB%BA%E4%B8%8E%E5%90%88%E5%B9%B6)

---

**最后更新**: 2025年1月

