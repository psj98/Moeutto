# FROM node:16.14.0 
FROM node:20.8.1
# http -> https 시 웹소켓 오류 때문에 ( 웹 소켓 사용시 지워야함 ) 
ENV WDS_SOCKET_PORT 0
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm install -g pnpm
RUN pnpm install
# 현재 디렉토리의 모든 파일을 도커 컨테이너 워킹 디렉토리에 저장
COPY . .
EXPOSE 3000
CMD ["npm","start"]
