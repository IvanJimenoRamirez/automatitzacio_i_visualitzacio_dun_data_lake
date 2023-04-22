import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
            const res = await fetch(process.env.API_URL + '/DataLakeAPI/Authorization/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: credentials.username,
                    password: credentials.password
                })
            });

            const data = await res.json();
            if (res.status === 200) {
                const user = {
                    name: data.name,
                    token: data.access_token,
                    tokenType: data.token_type,
                    email: 'test@test.com',
                    role: 'user'
                }
                return user;
            }
            return null;
      }
    }),
  ],
  callbacks: {
    session: async (session, user) => {
        if (user) {
            session.user.id = user.id;
            session.user.role = user.role;
        }
        return Promise.resolve(session);
    },
    jwt: async (token, user) => {
        return Promise.resolve(token);
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  }
});
