## yarn

Please use yarn to install new dependencies.
DO NOT use npm, since it uses different .lock file, and some dependencies could be missed.

## lodash

Do not install lodash, install the only method you need instead.

For example:

```
yarn add lodash.intersection @types/lodash.intersection
```

## moment.js

Do not use moment.js, it's too heavy and mostly overkill for our projects.
Consider using any other solution suggested by its developers.
https://momentjs.com/docs/#/-project-status/

## Get started

### Environment

1. Настроить hosts (хост будет один на все порталы).
Портал юзеров открыватся на school.tsn.com/users, авторизации - school.tsn.com/auth
    ```
    127.0.0.1 school.tsn.com
    ```

2. Настроить .env (Порт и хост должны совпадать с hosts)

    ```
    PORT=3002
    PUBLIC_URL=/users
    WDS_SOCKET_PATH=/users/sockjs-node
    WDS_SOCKET_HOST=school.tsn.com
    WDS_SOCKET_PORT=3002
    ```

3. Настроить nginx (Порты должны совападать с .env)

    ```
    location /auth {
        proxy_pass http://127.0.0.1:3001;
        proxy_redirect off;
    }
    location /home {
        proxy_pass http://127.0.0.1:3002;
        proxy_redirect off;
    }
    location /users {
        proxy_pass http://127.0.0.1:3002;
        proxy_redirect off;
    }
    ```

### TODOs

Follow TODOs. Fix all PortalTypes.