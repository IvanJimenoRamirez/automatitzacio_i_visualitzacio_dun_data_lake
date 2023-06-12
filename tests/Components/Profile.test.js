/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, prettyDOM } from '@testing-library/react'
import { ProfileTable } from '../../components/Profile/ProfileTable'
import { getDictionary } from '../../app/[lang]/dictionaries'
import { SessionProvider } from 'next-auth/react'

describe('Profile page tests', () => {
  const lang = 'en-US'
  process.env.NEXT_PUBLIC_API_URL = 'http://127.0.0.1:8000'
  const styles = {
    loader: '',
    hidden: '',
    result: '',
    error: '',
    success: '',
    profileWrapper: '',
    profileContainer: ''
  }

  test('Profile page renders', async () => {
    const dict = await getDictionary(lang)
    const component = render(
      <SessionProvider
        session={{
          user: {
            name: 'test',
            email: 'test@test.com',
            role: 1
          },
          accessToken: global.adminToken,
          tokenType: 'bearer',
          iat: 1686243266,
          exp: 1686246666,
          jti: '227f048c-cef8-4b93-94a1-2d42256baa9c'
        }}
      >
        <ProfileTable lang={lang} dict={dict} styles={styles} />
      </SessionProvider>)
    expect(component.container).toHaveTextContent(dict.page.profile.info)
  })

  test('Profile page renders', async () => {
    const dict = await getDictionary(lang)
    const component = render(
      <SessionProvider
        session={{
          user: {
            name: 'test',
            email: 'test@test.com',
            role: 1
          },
          accessToken: global.adminToken,
          tokenType: 'bearer',
          iat: 1686243266,
          exp: 1686246666,
          jti: '227f048c-cef8-4b93-94a1-2d42256baa9c'
        }}
      >
        <ProfileTable lang={lang} dict={dict} styles={styles} />
      </SessionProvider>)
    await new Promise(resolve => setTimeout(resolve, 600))
    prettyDOM(component.container)
    expect(component.container).toHaveTextContent('test@test.com')
  })
})
