# Todo Frontend

TODO NEXT JS FRONTEND</br>
It is a personal project

It is part of **[TODO BACKEND](https://github.com/logsbydeepak/todo-backend)**

### **[LIVE DEMO](https://todo-frontend-project-prod.vercel.app)**

### Clone project

```bash
git clone https://github.com/logsbydeepak/todo-frontend
```

## Table of contents

- **[Project requirement](#project-requirement)**
- **[Run in development](#run-in-development)**
  - [With Docker Compose](#with-docker-compose)
  - [With devcontainer](#with-devcontainer)

### Project requirement

- [Node](https://nodejs.org/)

### Run in `development`

1. create `.env.local` file with the properties of

```
NEXT_PUBLIC_API_BASE_URL
```

`sample value`

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/v1
```

2. install package

```bash
npm install
```

3. start

```bash
npm run dev
```

APP will start at http://localhost:3000

### With `Docker Compose`

1. run docker compose

```bash
docker-compose -p todo_dev_frontend -f docker/dev/docker-compose.yml up -d
```

2. attach to container

```bash
docker exec -it todo_dev_frontend_next /bin/sh
```

3. **[Run](#run)**

## With `devcontainer`

1. [Installation](https://code.visualstudio.com/docs/remote/containers#_installation)

2. **[Run](#run)**
