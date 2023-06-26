import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, {NextAuthOptions, Session} from "next-auth";
import jwt_decode from "jwt-decode";

export const authOptions:NextAuthOptions = {

    // configure one or more authentication providers
    providers: [
        // ... add more providers here


        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              email: { label: "email", type: "email", placeholder: "email" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

            try {
                const {email,password} = credentials as any;
                const res = await fetch("http://127.0.0.1:8000/auth/jwt/create/", {
                    method: "POST",
                    headers: {
                        "content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                });

                const user = await res.json();

                if (res.ok && user){
                    console.log(user);
                    
                    return jwt_decode(user.access);
                } else return null;

            } catch (error) {
                console.error("Error during authorization:", error);
                return null;
              }
            
            },
          })

    ],

    session:{
        strategy:"jwt",
    },


    pages: {
        signIn: "/auth/login",
    },




};

export default NextAuth(authOptions)