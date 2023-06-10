import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render } from '@testing-library/react'
import { Endpoints } from '../../components/Endpoints/Tables/Endpoints'
import { getDictionary } from '../../app/[lang]/dictionaries'

import * as NextAuth from 'next-auth/react';

NextAuth.signOut = jest.fn().mockImplementation(() => Promise.resolve({
  callbackUrl: `/${global.testLanguage}/auth/login`,
  redirect: true,
}));

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
      }),
}));

describe('Endpoints component tests', () => {
    process.env.NEXT_PUBLIC_API_URL = "http://127.0.0.1:8000";

    describe("Temporal landing zone endpoints test", () => {
        test('TemporalLandingZone endpoints renders', async () => {
            let dict = await getDictionary(global.testLanguage);
            const component = render(
                <NextAuth.SessionProvider
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
                    <Endpoints lang={global.testLanguage} dict={dict} type={"zones"} id={"Temporal%20landing%20zone"} /> 
                </NextAuth.SessionProvider>)
            expect(component.container).toHaveTextContent(dict.commons.endpointTable.filter)
            expect(component.container).toHaveTextContent(dict.commons.endpointTable.listOperations)
        })

        describe('Error codes when the session is invalid', () => {
            test('Redirect to login as fetch returned code 401 (invalid session)', async () => {
                let dict = await getDictionary("en-US");
                const component = render(
                    <NextAuth.SessionProvider
                        session={{
                            name: "test",
                            email: "test@user.com",
                            role: 1,
                            accessToken: global.invalidSessionToken,
                            tokenType: "bearer",
                            iat: 1686243266,
                            exp: 1686246666,
                            jti: "227f048c-cef8-4b93-94a1-2d42256baa9c",
                        }}
                    >
                        <Endpoints lang={global.testLanguage} dict={dict} type={"zones"} id={"Temporal%20landing%20zone"} />
                    </NextAuth.SessionProvider>)
                    await new Promise(resolve => setTimeout(resolve, 300));
                    expect(NextAuth.signOut).toHaveBeenCalled();
            })
    
            test('Modal with error code 403 as the provided session has no rights', async () => {
                let dict = await getDictionary("en-US");
                const component = render(
                    <NextAuth.SessionProvider
                        session={{
                            name: "test",
                            email: "test@user.com",
                            role: 1,
                            accessToken: global.userWithZeroRightsToken,
                            tokenType: "bearer",
                            iat: 1686243266,
                            exp: 1686246666,
                            jti: "227f048c-cef8-4b93-94a1-2d42256baa9c",
                        }}
                    > 
                        <Endpoints lang={global.testLanguage} dict={dict} type={"zones"} id={"Temporal%20landing%20zone"} /> 
                    </NextAuth.SessionProvider>)
                    await new Promise(resolve => setTimeout(resolve, 300));
                    expect(component.container).toHaveTextContent(dict.commons.notEnoughPermissions)
            })
        })

        describe('Authorized session', () => {
            test('Correctly renders the endpoints list', async () => {
                let dict = await getDictionary("en-US");
                const component = render(
                    <NextAuth.SessionProvider
                        session={{
                            name: "test",
                            email: "test@user.com",
                            role: 1,
                            accessToken: global.adminToken,
                            tokenType: "bearer",
                            iat: 1686243266,
                            exp: 1686246666,
                            jti: "227f048c-cef8-4b93-94a1-2d42256baa9c",
                        }}
                    > 
                        <Endpoints lang={global.testLanguage} dict={dict} type={"zones"} id={"Temporal%20landing%20zone"} /> 
                    </NextAuth.SessionProvider>)
                    await new Promise(resolve => setTimeout(resolve, 300));
                    expect(component.container).toHaveTextContent("Hello World")
            })

            
        })
    })

    describe("Landing zone endpoints test", () => {
        test('Landing zone endpoints renders', async () => {
            let dict = await getDictionary("en-US");
            const component = render(
                <NextAuth.SessionProvider
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
                    <Endpoints lang={global.testLanguage} dict={dict} type={"zones"} id={"Landing%20zone"} /> 
                </NextAuth.SessionProvider>)
            expect(component.container).toHaveTextContent(dict.commons.endpointTable.filter)
            expect(component.container).toHaveTextContent(dict.commons.endpointTable.listOperations)
        })

        describe('Error codes when the session is invalid', () => {
            test('Redirect to login as fetch returned code 401 (invalid session)', async () => {
                let dict = await getDictionary("en-US");
                const component = render(
                    <NextAuth.SessionProvider
                        session={{
                            name: "test",
                            email: "test@user.com",
                            role: 1,
                            accessToken: global.invalidSessionToken,
                            tokenType: "bearer",
                            iat: 1686243266,
                            exp: 1686246666,
                            jti: "227f048c-cef8-4b93-94a1-2d42256baa9c",
                        }}
                    >
                        <Endpoints lang={global.testLanguage} dict={dict} type={"zones"} id={"Landing%20zone"} />
                    </NextAuth.SessionProvider>)
                    await new Promise(resolve => setTimeout(resolve, 300));
                    expect(NextAuth.signOut).toHaveBeenCalled();
            })
    
            test('Modal with error code 403 as the provided session has no rights', async () => {
                let dict = await getDictionary("en-US");
                const component = render(
                    <NextAuth.SessionProvider
                        session={{
                            name: "test",
                            email: "test@user.com",
                            role: 1,
                            accessToken: global.userWithZeroRightsToken,
                            tokenType: "bearer",
                            iat: 1686243266,
                            exp: 1686246666,
                            jti: "227f048c-cef8-4b93-94a1-2d42256baa9c",
                        }}
                    > 
                        <Endpoints lang={global.testLanguage} dict={dict} type={"zones"} id={"Landing%20zone"} /> 
                    </NextAuth.SessionProvider>)
                    await new Promise(resolve => setTimeout(resolve, 300));
                    expect(component.container).toHaveTextContent(dict.commons.notEnoughPermissions)
            })
        })

        describe('Authorized session', () => {
            test('Correctly renders the endpoints list', async () => {
                let dict = await getDictionary("en-US");
                const component = render(
                    <NextAuth.SessionProvider
                        session={{
                            name: "test",
                            email: "test@user.com",
                            role: 1,
                            accessToken: global.adminToken,
                            tokenType: "bearer",
                            iat: 1686243266,
                            exp: 1686246666,
                            jti: "227f048c-cef8-4b93-94a1-2d42256baa9c",
                        }}
                    > 
                        <Endpoints lang={global.testLanguage} dict={dict} type={"zones"} id={"Landing%20zone"} /> 
                    </NextAuth.SessionProvider>)
                    await new Promise(resolve => setTimeout(resolve, 300));
                    expect(component.container).toHaveTextContent("Upsert data to Landing Zone")
            })
        })
    })

    describe("Formatted zone endpoints test", () => {
        test('Formatted zone endpoints renders', async () => {
            let dict = await getDictionary(global.testLanguage);
            const component = render(
                <NextAuth.SessionProvider
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
                    <Endpoints lang={global.testLanguage} dict={dict} type={"zones"} id={"Formatted%20zone"} /> 
                </NextAuth.SessionProvider>)
            expect(component.container).toHaveTextContent(dict.commons.endpointTable.filter)
            expect(component.container).toHaveTextContent(dict.commons.endpointTable.listOperations)
        })

        describe('Error codes when the session is invalid', () => {
            test('Redirect to login as fetch returned code 401 (invalid session)', async () => {
                let dict = await getDictionary("en-US");
                const component = render(
                    <NextAuth.SessionProvider
                        session={{
                            name: "test",
                            email: "test@user.com",
                            role: 1,
                            accessToken: global.invalidSessionToken,
                            tokenType: "bearer",
                            iat: 1686243266,
                            exp: 1686246666,
                            jti: "227f048c-cef8-4b93-94a1-2d42256baa9c",
                        }}
                    >
                        <Endpoints lang={global.testLanguage} dict={dict} type={"zones"} id={"Formatted%20zone"} />
                    </NextAuth.SessionProvider>)
                    await new Promise(resolve => setTimeout(resolve, 300));
                    expect(NextAuth.signOut).toHaveBeenCalled();
            })
    
            test('Modal with error code 403 as the provided session has no rights', async () => {
                let dict = await getDictionary("en-US");
                const component = render(
                    <NextAuth.SessionProvider
                        session={{
                            name: "test",
                            email: "test@user.com",
                            role: 1,
                            accessToken: global.userWithZeroRightsToken,
                            tokenType: "bearer",
                            iat: 1686243266,
                            exp: 1686246666,
                            jti: "227f048c-cef8-4b93-94a1-2d42256baa9c",
                        }}
                    > 
                        <Endpoints lang={global.testLanguage} dict={dict} type={"zones"} id={"Formatted%20zone"} /> 
                    </NextAuth.SessionProvider>)
                    await new Promise(resolve => setTimeout(resolve, 300));
                    expect(component.container).toHaveTextContent(dict.commons.notEnoughPermissions)
            })
        })
    })

})