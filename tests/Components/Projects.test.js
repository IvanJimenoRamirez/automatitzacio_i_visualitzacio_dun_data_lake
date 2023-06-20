/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-import-assign */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { ListProjects } from '../../components/Projects/ListProjects'
import { getDictionary } from '../../app/[lang]/dictionaries'
import { SessionProvider } from 'next-auth/react'
import { Endpoints } from '../../components/Endpoints/Tables/Endpoints'

import * as NextAuth from 'next-auth/react'

NextAuth.signOut = jest.fn().mockImplementation(() => Promise.resolve({
  callbackUrl: `/${global.testLanguage}/auth/login`,
  redirect: true
}))

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

describe('Projects list tests', () => {
  const lang = 'en-US'
  process.env.NEXT_PUBLIC_API_URL = 'http://127.0.0.1:8000'

  test('Projects list renders', async () => {
    const dict = await getDictionary(lang)
    const component = render(
      <SessionProvider
        session={{
          name: 'test',
          email: 'test@test.com',
          role: 1,
          accessToken: 'unauthorizedToken',
          tokenType: 'bearer',
          iat: 1686243266,
          exp: 1686246666,
          jti: '227f048c-cef8-4b93-94a1-2d42256baa9c'
        }}
      >
        <ListProjects lang={lang} styles={{ project: '' }} dict={dict} />
      </SessionProvider>)
  })

  describe('No projects shown as the user provided has no rights', () => {
    test('Admin page without valid token', async () => {
      const dict = await getDictionary(lang)
      const component = render(
        <SessionProvider
          session={{
            name: 'test',
            email: 'test@test.com',
            role: 1,
            accessToken: 'unauthorizedToken',
            tokenType: 'bearer',
            iat: 1686243266,
            exp: 1686246666,
            jti: '227f048c-cef8-4b93-94a1-2d42256baa9c'
          }}
        >
          <ListProjects lang={lang} styles={{ project: '' }} dict={dict} />
        </SessionProvider>)
      await new Promise(resolve => setTimeout(resolve, 200))
      expect(component.container).toHaveTextContent(dict.commons.noContent)
    })
  })

  describe('Projects are shown as the user has permissions', () => {
    test('User with permissions can view the "test" project', async () => {
      const dict = await getDictionary(lang)
      const component = render(
        <SessionProvider
          session={{
            name: 'test',
            email: 'test@test.com',
            role: 1,
            accessToken: global.adminToken,
            tokenType: 'bearer',
            iat: 1686243266,
            exp: 1686246666,
            jti: '227f048c-cef8-4b93-94a1-2d42256baa9c'
          }}
        >
          <ListProjects lang={lang} styles={{ project: '' }} dict={dict} />
        </SessionProvider>
      )
      await new Promise(resolve => setTimeout(resolve, 200))
      expect(component.container).toHaveTextContent('test')
    })
  })
})

describe('Projects endpoints tests', () => {
  const lang = 'en-US'
  process.env.NEXT_PUBLIC_API_URL = 'http://127.0.0.1:8000'

  test('Projects endpoints renders', async () => {
    const dict = await getDictionary(global.testLanguage)
    const component = render(
      <NextAuth.SessionProvider
        session={{
          name: 'test',
          email: 'test@test.com',
          role: 1,
          accessToken: 'unauthorizedToken',
          tokenType: 'bearer',
          iat: 1686243266,
          exp: 1686246666,
          jti: '227f048c-cef8-4b93-94a1-2d42256baa9c'
        }}
      >
        <Endpoints type='projects' id={1} dict={dict} lang={lang} />
      </NextAuth.SessionProvider>)
    expect(component.container).toHaveTextContent(dict.commons.endpointTable.filter)
    expect(component.container).toHaveTextContent(dict.commons.endpointTable.listOperations)
  })

  describe('Error codes when the session is invalid', () => {
    test('Redirect to login as fetch returned code 401 (invalid session)', async () => {
      const dict = await getDictionary('en-US')
      const component = render(
        <NextAuth.SessionProvider
          session={{
            name: 'test',
            email: 'test@user.com',
            role: 1,
            accessToken: global.invalidSessionToken,
            tokenType: 'bearer',
            iat: 1686243266,
            exp: 1686246666,
            jti: '227f048c-cef8-4b93-94a1-2d42256baa9c'
          }}
        >
          <Endpoints type='projects' id={1} dict={dict} lang={lang} />
        </NextAuth.SessionProvider>)
      await new Promise(resolve => setTimeout(resolve, 300))
      expect(NextAuth.signOut).toHaveBeenCalled()
    })

    test('Modal with error code 403 as the provided session has no rights', async () => {
      const dict = await getDictionary('en-US')
      const component = render(
        <NextAuth.SessionProvider
          session={{
            name: 'test',
            email: 'test@user.com',
            role: 1,
            accessToken: global.userWithZeroRightsToken,
            tokenType: 'bearer',
            iat: 1686243266,
            exp: 1686246666,
            jti: '227f048c-cef8-4b93-94a1-2d42256baa9c'
          }}
        >
          <Endpoints type='projects' id={1} dict={dict} lang={lang} />
        </NextAuth.SessionProvider>)
      await new Promise(resolve => setTimeout(resolve, 300))
      expect(component.container).toHaveTextContent(dict.commons.notEnoughPermissions)
    })
  })

  describe('Authorized session', () => {
    test('Correctly renders the endpoints list', async () => {
      const dict = await getDictionary('en-US')
      const component = render(
        <NextAuth.SessionProvider
          session={{
            name: 'test',
            email: 'test@user.com',
            role: 1,
            accessToken: global.adminToken,
            tokenType: 'bearer',
            iat: 1686243266,
            exp: 1686246666,
            jti: '227f048c-cef8-4b93-94a1-2d42256baa9c'
          }}
        >
          <Endpoints type='projects' id={1} dict={dict} lang={lang} />
        </NextAuth.SessionProvider>)
      await new Promise(resolve => setTimeout(resolve, 300))
      expect(component.container).toHaveTextContent('Get available filters')
    })
  })
})
