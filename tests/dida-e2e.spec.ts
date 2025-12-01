import { test, expect } from '@playwright/test';

test('注册到下单完整流程', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('file:///d:/code/meituan/frontend/index.html');

  await page.getByText('进店').first().click();
  await page.getByText('+').first().click();
  await page.getByText('+').nth(1).click();

  await page.getByText('去结算').click();
  await page.getByRole('button', { name: '我的' }).click();

  await page.getByPlaceholder('请输入手机号').fill('13800000000');
  await page.getByText('获取验证码').click();
  await page.getByPlaceholder('验证码').fill('123456');
  await page.getByText('登录').click();

  await page.getByText('新增地址').click();
  await page.getByPlaceholder('收货人').fill('张三');
  await page.getByPlaceholder('联系方式').fill('13800000000');
  await page.getByPlaceholder('城市').fill('城市');
  await page.getByPlaceholder('城区').fill('城区');
  await page.getByPlaceholder('详细地址').fill('某路某号');
  await page.getByText('保存').click();

  await page.getByRole('button', { name: '首页' }).click();
  await page.getByText('进店').first().click();
  await page.getByText('去结算').click();

  await page.getByRole('button', { name: '订单' }).click();
  await expect(page.getByText('待支付')).toBeVisible();
});
