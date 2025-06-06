---
title: "Run Node with specific env file"
description: "In this blog, we'll explore using specific environment files like .env.trail or .env.test in our applications, along with scripting for management."
author: authxth
publicationDate: 2023-10-15
tags: ["thoughts", "blog"]
---

In this blog we will discuss how we use a specific env file such as `.env.trail` , `.env.test` , `.env.prod` etc to use in our apllication.
As per many projects the requirement will be that for a specific environment the **Secret Keys** or **Tokens** or some **URLs** in env file must differ. But by default few frameworks supports `.env.test` , `.env.production` , `.env.development`. So what if your project has multiple other environments such as **stage**, **trail**, **pre-prod** etc...

For this we can create our env files with suffix with environment name such as `.env.prod`, then we need an package which will configure the specific **env** file while runtime.

```bash:.env.test
JWT_TOKEN = qwertyuiop
LOGIN_URL_CALLBACK = test.url.com
```

```bash:.env.development
JWT_TOKEN = abcdefghijk
LOGIN_URL_CALLBACK = dev.url.com
```

So we can use popular npm package called `<a href="https://www.npmjs.com/package/env-cmd" >env-cmd</a>` which can be installed to your project by the npm command.

```bash
npm i env-cmd
```

Once the package is installed you can add scripts in `package.json` to use specific env for specific environments.

```json:package.json
{
    "scripts": {
       ... ,
       "test-deploy" : "env-cmd -f .env.test npm run build && npm run start",
       "dev-start" : "env-cmd -f .env.development npm run dev",
       "dev-deploy" : "env-cmd -f .env.development npm run build && npm run start"
    }
}
```

Now when you start application in a specific environment, use the script mentioned in **package.json** file as `npm run dev-start` which will start the dev server with **.env.development** file as env config file. Also you can run `npm run test-deploy` which will take the env file as **env.test** before building & starting the production server.
So this can be helpul for usage of multiple **env** files in multiple environments and you can add scripts based on your needs.