# 中国节假日查询（EdgeOne 模板改造版）

这是一个基于 EdgeOne 模板改造的「节假日查询网站 + API」项目。

所有节假日数据统一来自 `config/holidayAPI.json`。

## 功能

- 首页展示当月节假日放假信息（含调休上班日期）。
- 提供直接 API：`/today`。
- 返回纯文本：`放假` 或 `上班`。

## 规则说明

对任意日期按以下顺序判断：

1. 若在节假日区间（`StartDate` ~ `EndDate`）内 → `放假`
2. 否则若在调休日期（`CompDays`）内 → `上班`
3. 否则若为双休日（周六/周日）→ `放假`
4. 其他工作日（周一至周五）→ `上班`

## API

### `GET /today`

- 响应类型：`text/plain; charset=utf-8`
- 响应内容：`放假` 或 `上班`

## 本地开发

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

生产构建：

```bash
npm run build
```

## 数据来源

- 本地数据文件：`config/holidayAPI.json`
- 上游仓库：`https://github.com/lanceliao/china-holiday-calender`
- 每个节假日条目的 `URL` 字段对应中国政府网相关通知

## 许可证

MIT
