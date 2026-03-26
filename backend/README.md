# FastAPI Demo

这是一个最小可运行的 FastAPI 工程模板（含示例 CRUD 与测试）。

## 本地启动

```bash
cd backend

# 首次使用 uv：安装依赖并创建虚拟环境
uv sync --dev

# 使用 uv 运行，确保命令使用该环境的依赖
uv run -- uvicorn app.main:app --reload --port 8000
```

浏览器访问：
- `GET http://localhost:8000/health`
- 示例：`POST http://localhost:8000/items`

## Cursor 调试

1. 确保已安装依赖：`uv sync --dev`
2. 使用 `Run and Debug` 选择调试项：`FastAPI: uvicorn (reload)`
3. 断点调试时，建议只在 `app/` 代码中打断点（`justMyCode: false` 也允许你进入依赖库）

## 运行测试

```bash
cd backend
uv sync --dev
uv run -- pytest -q
```

## 目录结构

- `app/main.py`：FastAPI 路由与示例业务逻辑
- `tests/test_main.py`：接口测试
