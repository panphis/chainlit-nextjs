import { NEXT_PUBLIC_BASE_PATH } from "@/lib/constants";
import { login } from "@/service";
import type {
  LoginRequest,
  NextAuthSession,
  NextAuthUser,
  UserLoginInfo,
} from "@/types";
import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const loginByPassword = async (
  credentials: LoginRequest
): Promise<UserLoginInfo | null> => {
  if (!credentials?.email || !credentials?.password) {
    return null;
  }
  try {
    const response = await login(credentials);
    return response.data.data;
  } catch (_error) {
    console.log("login by password error", _error);
    return null;
  }
};

const nextAuth = NextAuth({
  basePath: `/api/auth`,
  trustHost: true,
  cookies: {
    sessionToken: {
      name: "next-auth.session-token-admin",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: NEXT_PUBLIC_BASE_PATH,
      },
    },
    callbackUrl: {
      name: "next-auth.callback-url-admin",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: NEXT_PUBLIC_BASE_PATH,
      },
    },
    csrfToken: {
      name: "next-auth.csrf-token-admin",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: NEXT_PUBLIC_BASE_PATH,
      },
    },
    pkceCodeVerifier: {
      name: "next-auth.pkce-code-verifier-admin",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: NEXT_PUBLIC_BASE_PATH,
      },
    },
    state: {
      name: "next-auth.state-admin",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: NEXT_PUBLIC_BASE_PATH,
      },
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await loginByPassword(credentials as LoginRequest);
        if (!user) {
          throw new Error("Invalid credentials.");
        }
        return user as unknown as User;
      },
    }),
  ],
  pages: {
    signIn: `${NEXT_PUBLIC_BASE_PATH}/login`,
    error: `${NEXT_PUBLIC_BASE_PATH}/login`,
  },
  callbacks: {
    async jwt({ token, user }) {
      // 首次登录时保存用户信息
      if (user) {
        const nextAuthUser = user as unknown as NextAuthUser;
        token.id = nextAuthUser.id;
        token.name = nextAuthUser.username ?? nextAuthUser.name ?? null;
        token.email = nextAuthUser.email ?? null;
        token.image = nextAuthUser.image;
        token.username = nextAuthUser.username ?? null;
        token.is_active = nextAuthUser.is_active;
        token.google_id = nextAuthUser.google_id;
        token.avatar_url = nextAuthUser.avatar_url;
        token.role = nextAuthUser.role ?? "user";
      }

      return token;
    },
    async session({ session, token }): Promise<NextAuthSession> {
      // 将 token 中的信息传递给 session
      if (token && session.user) {
        session.user = { ...token, ...session.user };
      }

      return session as unknown as NextAuthSession;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-key",
});


export const { auth, handlers, signIn, signOut } = nextAuth;