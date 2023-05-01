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
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/DataLakeAPI/Authorization/Login', {
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
                    role: data.role
                }
                return user;
            }
            return null;
      }
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: parseInt(process.env.JWT_MAX_AGE)
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
        };
        session.accessToken = token.accessToken;
        session.tokenType = token.tokenType;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.token;
        token.tokenType = user.tokenType;
      }
      return token;
    },
  },
  secret: process.env.JWT_SECRET,

});