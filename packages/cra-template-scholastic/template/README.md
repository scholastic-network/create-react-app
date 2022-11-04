### Docs
https://scholasticnetwork.atlassian.net/wiki/spaces/SN/pages/551485446/Frontend

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