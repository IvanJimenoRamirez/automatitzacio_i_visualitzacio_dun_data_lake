import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, prettyDOM } from '@testing-library/react'
import { AdminContent } from '../../components/Admin/Admin'
import { getDictionary } from '../../app/[lang]/dictionaries'
import { SessionProvider } from 'next-auth/react'

describe('Admin page renders', () => {
    let lang = "en-US";
    process.env.NEXT_PUBLIC_API_URL = "http://127.0.0.1:8000";

    test('Admin page renders', async () => {
        let dict = await getDictionary(lang);
        const component = render(
            <SessionProvider
                session={{
                    name: "test",
                    email: "test@test.com",
                    role: 1,
                    accessToken: "unauthorizedToken",
                    tokenType: "bearer",
                    iat: 1686243266,
                    exp: 1686246666,
                    jti: "227f048c-cef8-4b93-94a1-2d42256baa9c",
                }}
            > 
                <AdminContent lang={lang} dict={dict} /> 
            </SessionProvider>)
        expect(component.container).toHaveTextContent(dict.page.admin.manageApiKeys.list)
    })

    describe('No content is shown as the session provided has no token', () => {
        test('Admin page without valid token', async () => {
            let dict = await getDictionary(lang);
            const component = render(
                <SessionProvider
                    session={{
                        name: "test",
                        email: "test@test.com",
                        role: 1,
                        accessToken: "unauthorizedToken",
                        tokenType: "bearer",
                        iat: 1686243266,
                        exp: 1686246666,
                        jti: "227f048c-cef8-4b93-94a1-2d42256baa9c",
                    }}
                > 
                    <AdminContent lang={lang} dict={dict} /> 
                </SessionProvider>)
            expect(component.container).toHaveTextContent(dict.commons.noContent)
        })
    })

    describe('Admin content is shown as the provided session includes a valid token', () => {
        test('Admin page with valid token', async () => {
            let dict = await getDictionary(lang);
            const component = render(
                <SessionProvider
                    session={{
                        name: "test",
                        email: "test@test.com",
                        role: 1,
                        accessToken: global.adminToken,
                        tokenType: "bearer",
                        iat: 1686243266,
                        exp: 1686246666,
                        jti: "227f048c-cef8-4b93-94a1-2d42256baa9c",
                    }}
                > 
                    <AdminContent lang={lang} dict={dict} /> 
                </SessionProvider>
            );
            await new Promise(resolve => setTimeout(resolve, 300));
            expect(component.container).toHaveTextContent("test@user.com");
        })
    })
})