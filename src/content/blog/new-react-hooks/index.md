---
title: "New use & useOptimistic hooks in React package"
description: "React new hooks in action."
author: authxth
publicationDate: 2024-12-15
tags: ["thoughts", "blog"]
---


There are two new hooks added to the React package, which is still experimental as of the writing of this blog. This hook allows for progressive improvements to the UI for server and client interactions.

### use hook

`use` is a React Hook that lets you read the value of a resource
like a `Promise` or `context`. You can just
call this hook inside of your component and pass a promise or context and it
What distinguishes this hook from others is that it may be invoked within loops,
conditionals, or any block. However, it is still necessary to call components
and hooks exclusively. will return you a value.{" "}

```js
const value = use(resource);
```

### Usage

#### Reading context values.

The use hook is similar to the useContext hook in that it accepts a Context and returns a value if that component is wrapped in the Context, but it may be used inside conditionals and loops, making it more powerful than useContext. React recommends this hooks over useContext because they are more versatile.

```jsx
"use client";
import ThemeContext from "@/contexts";
import Button from "@/components";

export default function GetStartedButton({ newUI, children }) {
  if (newUI) {
    const theme = use(ThemeContext); // hook inside if condition
    return <Button theme={theme}>{children}</Button>;
  }
  return <button>{children}</button>; //simple button
}
```

## Stream data from server to client.

A Promise can be passed from a Server Component to a Client Component and resolved in the Client Component with the use Hook. You can also resolve the Promise in a Server Component with `await` and pass the required data to the Client Component as a prop.

```jsx
export default async function Home() {
  const feeds = await getFeed();
  const trends = await getTrends();
  return (
    <div>
      <Feed data={feeds} />
      <Explore data={trends} />
    </div>
  );
}
```

But using `await` in a Server Component will block its rendering until the `await` statement is finished. Passing a Promise from a Server Component to a Client Component prevents the Promise from blocking the rendering of the Server Component.

```jsx
export default async function Home() {
  const feedsPromise = getFeed();
  const trendsPromise = getTrends();
  return (
    <div>
      <Suspense fallback="Loading feed...">
        <Feed data={feedsPromise} />
      </Suspense>
      <Suspense fallback="Loading trends...">
        <Explore data={trendsPromise} />
      </Suspense>
    </div>
  );
}
```

```jsx
export default async function Feed({data}) {
  const resolvedData=use(data)
  return ...
}
```

The `use` hook auto integrates with Suspense and Error boundaries when promise is resolve it shows the fallback and when error occured in promise the Error boundary can handle the error.

<Note>
  See it to it that the promise value should be JSON serializable when passed
  from server to client promise
</Note>

### useOptimistic hook

UseOptimistic is a React Hook that allows you to optimistically update the UI. When you do an async operation on the client side and wait for the server to react, rather than blocking the UI with a spinner, you can optimistically load the appropriate UI, and when the async task is completed, the real data is displayed.

```js
const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);
```

### Usage

#### Optimistically updating forms.

```jsx
export default function MessagesContainer({ messages, send }) {
  const [optimisticMessages, addMessage] = useOptimistic(messages,
  (state,newMessage)=>({...state,newMessage})
  );
  const [inputMessage, setInputMessage] = useState("");

  function handleSend(){
    const message=inputMessage;
    setInputMessage("");
    addMessage({
        body:message,
        pending:true,
        key:uuid()
    })
    await send(message);
  }

  return (
    <div>
      {messages.map((message) => (
        <Message {...message} />
      ))}
      <div>
        <input value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
        <button onClck={handleSend}>Send</button>
      </div>
    </div>
  );
}

function Message({body,pending}){
  return <p>{body} {pending && " - sending..."}</p>
}
```

So, when you create a message and send it, the message with the suffix sending appears optimistically in the UI, improving the user experience, and when the revalidated message arrives from the parent, the pending will no longer be present.