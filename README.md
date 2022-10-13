# Sample app using Openresty & GBC framework

## Install [openresty](https://github.com/openresty) via [asdf](https://asdf-vm.com/)

```
asdf plugin add openresty https://github.com/baysao/asdf-openresty.git
asdf list all openresty
asdf install openresty v1.21.4.1

```

## Install [GBC](https://github.com/baysao/gbc_v2) via [asdf](https://asdf-vm.com/)

```
asdf plugin add gbc https://github.com/baysao/asdf-gbc.git
asdf list all gbc
asdf install gbc v0.0.13
```


## Clone sample app

```
git clone https://github.com/baysao/resty-app app
```

## Sample start with docker-compose


### Create file docker-compose.yml

```
services:
  app:
    privileged: true
    restart: unless-stopped
    image: ubuntu:focal
    container_name: sample_app
    entrypoint: "sleep infinity"
    volumes:
      - ./app:/app:rw
      - /root/.asdf:/root/.asdf:rw
```


### Start docker

```
docker-compose up -d
```

### Setup app

```
docker exec -it sample_app bash

```

### Register GBC version, ex v0.0.13
```
cd /app

ln -sfn /root/.asdf/installs/gbc/v0.0.13 gbc

```

### Register openresty version, ex v1.21.4.1

```
cd /app/bin/

ln -snf ~/.asdf/installs/openresty/v1.21.4.1/openresty

```

### Start app

```
cd /app
./start_server

```

### Check app status

```
cd /app
./cmd_server status

```


### Restart app

```
cd /app/
./cmd_server restart nginx

```

### Open web app via url address of docker instance, ex: `http://127.0.0.1/portal`


