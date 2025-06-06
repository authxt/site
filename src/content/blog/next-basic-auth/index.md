---
title: "Basic auth in NextJS without library"
description: "Implementing basic authentication in Next.js 14 is straightforward."
author: authxth
publicationDate: 2023-12-24
tags: ["thoughts", "blog"]
---

In this blog post, we'll talk about a more straightforward method of authenticating NextJs applications. Many novice developers have been dissatisfied with NextJs' peculiar and intricate auth solutions.

We will use server actions and JWT to construct a basic auth solution.
To begin, let's create a file called `auth.ts` in the lib folder and a login function that requires user credentials.

```ts
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// Please store in env variables
const JWTSECRET = new TextEncoder().encode("secret-key-jwt");

async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now") // can increase time
    .sign(JWTSECRET);
}

// exported function to login
export async function login(credentials: UserCredentials) {
  // logic for verify user credentials from db
  // user from db
  const user = { email: credentials.email };
  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ user, expires });

  cookies().set("session", session, { expires, httpOnly: true });
}
```

After receiving the user credentials and using a database to confirm the user's validity, the login function encrypts the user payload using JWT. It then returns a token that is stored in cookies.
To obtain the user information contained in the cookie, you can utilise a helper function. Let's do it in the same file, which does require a decrypt function in order to decode the session token.

```ts
async function decrypt(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, JWTSECRET, {
      algorithms: ["HS256"],
    });
    return payload?.user;
  } catch {
    return null;
  }
}

// exported function to access user info
export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return (await decrypt(session)) as { email: string };
}
```

Currently, we have the login and getSession functions to allow users to log in. Let's create a logout function that would finally remove the token to log users out of the application.

```ts
// exported function to logout
export async function logout() {
  // remove session from cookie
  cookies().set("session", "", { expires: new Date(0) });
}
```

Everything functions as it should, but there is still a catch: what happens if the token expires? Let's manage that using NextJs middleware. Essentially, we will refresh the session whenever a request is received, adding a new token expiration time. To update the session in the auth file itself and export it for use in middleware, let's write a helper method.

```ts
export async function updateSession(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  if (!session) return null;

  const user = (await decrypt(session)) as { email: string };
  const expires = new Date(Date.now() + 10 * 1000);
  const newSession = await encrypt({ user, expires });

  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: newSession,
    httpOnly: true,
    expires,
  });
  return res;
}
```

The `updateSession` function, which receives NextRequest and updates the returned new Response with the updated session cookie, is exported from the auth file.

```ts
import { NextRequest } from "next/server";
import { updateSession } from "./lib/auth";

export async function middleware(req: NextRequest) {
  return await updateSession(req);
}
```

The functions that we imported from the auth file are now ready to be used. If the user is present, the page can be viewed; if not, the user is redirected to the auth page via the getSession action. and when also when user is logged in the logout can be done by logout button that calls logout action that also indeed take to auth page.

```tsx
import { getSession, logout } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getSession();
  if (!user) redirect("/auth");
  return (
    <div>
      <div>Logged in as : {user.email}</div>
      <form
        action={async () => {
          "use server";
          await logout();
          redirect("/auth");
        }}
      >
        <button type="submit">Logout</Button>
      </form>
    </div>
  );
}
```

The code for the auth page, which calls the login within an server action to authenticate and then reroutes to the homepage, is shown below.

```tsx
import { login } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function AuthPage() {
  async function handleAuth(formData: FormData) {
    "use server";
    await login({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
    redirect("/");
  }

  return (
    <form action={handleAuth} >
      <input required name="email" type="email" />
      <input required  name="password" type="password" />
      <button type="submit">Login</button>
    </form>
  );
}
```

This example, in essence, uses server action, sessions, and JWT to demonstrate basic auth in NextJs. You should utilise the auth library to handle security breaches, though, and keep in mind that this is only an example.
