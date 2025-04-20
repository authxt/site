---
title: "Setting Up tRPC with Next.js App Router"
description: ""
author: authxth
publicationDate: 2023-12-15
tags: ["thoughts", "blog"]
---


tRPC is great for building fullstack applications within a monorepo with type safety. tRPC is essentially an RPC call with added type safety, meaning if the procedure changes, the client will receive hints about type issues. RPC stands for Remote Procedure Calls—an alternative to REST and GraphQL. In REST, we call a URL with a payload using HTTP verbs, whereas RPCs are similar but, instead of calling URLs, we call functions.

tRPC is based on routers and procedures, where each procedure is callable as an endpoint. Procedures can be of type query, mutation, or subscription. tRPC creates a main router, commonly named appRouter, and the type of this router is imported on the client to infer the types of procedure calls. tRPC also provides seamless integration with @tanstack/react-query, enabling usage on the client side through auto-generated hooks. Server-side calls are also possible by creating a callable using a factory function.

tRPC can be used with multiple frameworks, but using it with Next.js is seamless and helps you understand the server–client model of React more clearly. In Next.js applications, there’s an imaginary boundary between the frontend and backend. Using Server Components for data fetching ensures type safety, but client-side fetching isn’t type-safe by default. This is where tRPC shines—when combined with @tanstack/react-query, it enables seamless, type-safe client-side fetching.

It also unlocks powerful features like prefetching data on the server and hydrating it on the client, removing the need for redundant client-side fetches. On-demand fetching on the client is still fully supported when needed. Let's start with the setup in our Next.js application, specifically using the App Router. First, initialize a simple Next.js App Router project. Then, we’ll need a few libraries to set up tRPC properly.


