import { test, expect, request } from '@playwright/test'

declare const process: { env: { GITHUB_TOKEN?: string } }

const REPO = 'Test-Repo-API-1'
const USER = 'andrewatef101'

test('create Bug Report via API', async ({ request }) => {
  const LoginBug = await request.post(`https://api.github.com/repos/${USER}/${REPO}/issues`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    data: {
      title: 'Login button is not clickable',
      body: 'when I click on Login button a fehlermeldung tritt auf',
    },
  })
  expect(LoginBug.ok()).toBeTruthy()

  const issues = await request.get(`https://api.github.com/repos/${USER}/${REPO}/issues`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  })
  expect(issues.ok()).toBeTruthy()

  expect(await issues.json()).toContainEqual(
    expect.objectContaining({
      title: 'Login button is not clickable',
      body: 'when I click on Login button a fehlermeldung tritt auf',
    })
  )
})
