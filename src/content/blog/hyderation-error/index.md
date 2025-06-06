---
title: "Understanding Hydration Errors in React"
description: "In this blog we will discuss about the most heard error in React called Hydration error and SSR."
author: authxth
publicationDate: 2023-1-12
tags: ["thoughts", "blog"]
---

Many developers have complained about hydration errors, so let's examine what these errors are and what causes them. We need to be familiar with **server side rendering (SSR)** in order to comprehend this. Thus, in SSR, the components or pages are rendered on the server and sent to the client in **HTML** that has been rendered.

The client receives this rendered HTML along with a chunk of code, and attempts to render the exact DOM tree again. This process at the client is known as **Hydration**; if the rendered HTML differs from the server-generated HTML, the client throws a `Hydration Error`.

Hydration, to put it simply, is the process of comparing client-rendered HTML with server-rendered HTML, and all client-side events are bound during this process. Let's look at an example to understand how React's hydration works.

```jsx
'use client'

import { login } from "auth-library/oauth/google"

export default function GoogleLoginButton(){
   return <button onClick={login}>Login with Google</button>
}
```

As a result, in the aforementioned example, the button is hydrated and the click event is binded at the client side while the button is rendered at the server with the supplied text. Hydration seems straightforward until errors occur. These errors can be caused by a number of things, such as missing attributes, elements that are descendants of other elements, dates, etc.

Let's look at a date example, which is a component that displays a date, and see how the error manifests itself.

```jsx
"use client";

export default function CurrentDate() {
  const now = new Date();
  console.log(now); // to log the date on both envs
  return <p>{now.toISOString()}</p>;
}
```

In the example above, everything appears to be in order. However, when this component is rendered on the server, we receive a date value, which does not match the date value when rendered on the client for hydration. As a result, the date value does not match and a Hydration error is raised when comparing the date values. This type of error may be handled by suppressing it or by inspecting a component that should only be used by the client.

As you can see, the error message makes it very evident that the date value on the server and the client are different, which is why the error was raised. This tweet mentions that the date hydration issue in React will be addressed in the future with this patch.
