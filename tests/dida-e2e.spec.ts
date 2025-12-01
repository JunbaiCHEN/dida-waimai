import { test, expect } from '@playwright/test';

// 简化版端到端流程（依赖前端离线回退数据）
// 打开首页 -> 进店 -> 加入购物车 -> 登录 -> 新增地址 -> 下单

test('注册到下单完整流程', async ({ page }) => {
  await page.goto('file:///d:/code/meituan/frontend/index.html');

  // 首页进店
  await page.getByText('进店').first().click();

  // 添加两件商品
  await page.getByText('+').first().click();
  await page.getByText('+').nth(1).click();

  // 去结算，提示登录
  await page.getByText('去结算').click();
  await page.getByRole('button', { name: '我的' }).click();

  // 登录（使用离线验证码）
  await page.getByPlaceholder('请输入手机号').fill('13800000000');
  await page.getByText('获取验证码').click();
  await page.getByPlaceholder('验证码').fill('123456');
  await page.getByText('登录').click();

  // 新增地址
  await page.getByText('新增地址').click();
  // 弹窗无法自动填写，实际测试建议改为表单；此处跳过

  // 返回商家页并结算
  await page.getByRole('button', { name: '首页' }).click();
  await page.getByText('进店').first().click();
  await page.getByText('去结算').click();

  // 查看订单页
  await page.getByRole('button', { name: '订单' }).click();
});
