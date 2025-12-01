# 滴答外卖

一个仿美团外卖用户端的简易网页版（前后端），移动端优先设计。

## 结构

- `backend/` Spring Boot 后端（Maven 构建）
- `frontend/` 原生 HTML/CSS/JS 单页应用
- `scripts/test_data.sql` PostgreSQL 测试数据脚本

## 启动

- 后端（本地默认使用 H2，可切换 PostgreSQL）：
  - Windows：在 `backend/` 目录执行 `.\\mvnw.cmd -DskipTests spring-boot:run`
  - 或者安装 Maven 后执行 `mvn -DskipTests spring-boot:run`
  - 切换 PostgreSQL：设置 Spring profile `postgres` 或将 `application-postgres.properties` 配置为当前数据库

- 前端：直接双击打开 `frontend/index.html`，或使用任意静态服务器访问

## API

- `POST /api/users/sendCode` 发送验证码（测试环境直接返回验证码）
- `POST /api/users/login` 登录（手机号+验证码）
- `GET /api/users/{id}/addresses` 地址列表；`POST /api/users/{id}/addresses` 新增地址；`PUT/DELETE /api/addresses/{id}` 修改/删除
- `GET /api/merchants` 商家列表（`sort=distance|rating`，`name` 或 `category` 搜索）
- `GET /api/merchants/{id}` 商家详情
- `GET /api/products/merchant/{id}` 商品列表（可选 `categoryId`）；`GET /api/products/merchant/{id}/categories` 分类列表
- `POST /api/orders` 提交订单；`GET /api/orders?userId=&status=` 订单列表；`POST /api/orders/{id}/pay|complete` 支付/完成

## 测试

- Playwright 端到端测试脚本将生成在 `tests/` 目录（需要安装 Playwright 浏览器：`npx playwright install`）

## 说明

- 为确保“无需手动修改即可运行”，后端默认使用内存 H2 数据库并代码级初始化数据；生产/真实环境可切换 PostgreSQL。
- 前端在后端不可访问时自动启用离线回退数据，方便演示完整流程。
