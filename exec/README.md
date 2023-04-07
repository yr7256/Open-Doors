# 1. Timezone KST 설정
```
# 시간, 날짜, 타임존 확인
$ timedatectl

# 타임존을 Asia/Seoul로 설정
$ sudo timedatectl set-timezone Asia/Seoul
```

# 2. Docker 설치
```
$ sudo apt-get update

$ sudo apt-get install -y ca-certificates \ 
    curl \
    software-properties-common \
    apt-transport-https \
    gnupg \
    lsb-release

# GPG 키 및 저장소 추가
$ sudo mkdir -p /etc/apt/keyrings

$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

$ echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

$ sudo apt-get update

$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

# 3. Docker-compose 설치
```
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

# 4. Nginx 설치 및 SSL 설정
```
# Nginx 설치
$ sudo apt-get install nginx

# 설치 확인
$ sudo nginx -v

# Nginx 시작
$ sudo systemctl start nginx

# Let's Encrypt 설치
$ sudo apt-get install letsencrypt

# 인증서 적용 및 .pem 키 발급
# 아래 명령어 입력 후, 이메일 입력(선택사항), 서비스 이용 동의(필수)
정보 수집(선택사항)을 하고나면 Congratulation!이라는 메시지와 함께 .pem키 발급이 완료된 것을 확인할 수 있다.

$ sudo letsencrypt certonly --standalone -d j8b205.p.ssafy.io

# 발급 경로 확인
$ sudo cd /etc/letsencrypt/live/j8b205.p.ssafy.io

# Nginx 재시작
$ sudo systemctl restart nginx

# Nginx 상태 확인
$ sudo systemctl status nginx
```

# 5. Nginx 설정
```
# .conf 파일 생성
$ cd /etc/nginx/conf.d
$ sudo touch app.conf
$ vi app.conf
```
```
server {
        listen 80 default_server;
        listen [::]:80 default_server;
        access_log on;
        server_name j8b205.p.ssafy.io;

        location / {
                return 301 https://j8b205.p.ssafy.io$request_uri;
        }
}



server {
        listen 443 ssl;
        ssl_certificate /etc/letsencrypt/live/j8b205.p.ssafy.io/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/j8b205.p.ssafy.io/privkey.pem;
        access_log on;
        location /{
                proxy_pass http://localhost:3000;
        }

        location /api {
                proxy_pass http://localhost:8080;
        }

        location /recom{
                proxy_pass http://localhost:5000;
        }
}

```
# 6. MySQL 설치 및 실행
## docker-compose.yml 작성
```
version: "3"
services:
  db:
    image: mysql
    ports:
      - 3306:3306
    environment:
      MYSQL_ROOT_PASSWORD: ^j8b205blackbeat^
      MYSQL_DATABASE: opendoors
    command:
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
    volumes:
      - ./data/mysql:/var/lib/mysql
```
## docker-compose 실행
```
$ docker-compose.yml up -d
```

# 7. Frontend / Backend 빌드 및 도커 허브에 이미지 올리기
## Backend 
```
# spring boot
> ./gradlew.bat clean build 
> ./gradlew.bat build 
> docker build -t [docker hub 계정명]/[repository명]:[태그명] .
> docker push [docker hub 계정명]/[repository명]:[태그명]

# flask
> docker build -t [docker hub 계정명]/[repository명]:[태그명] .
> docker push [docker hub 계정명]/[repository명]:[태그명]
```

## Frontend
```
# react
> npm i
> npm run build
> docker build -t [docker hub 계정명]/[repository명]:[태그명] .
> docker push [docker hub 계정명]/[repository명]:[태그명]
```

# 9. Docker Image Pull 및 컨테이너 실행
## Docker Image pull
```
sudo docker pull [docker hub 계정명]/[repository명]:[태그명]
```
## 컨테이너 실행
```
# Flask
sudo docker run -d -p 5000:5000 --name [name] [flask image id]

# Spring Boot
sudo docker run -d -p 8080:8080 --name [name] [spring image id]

# React
sudo docker run -d -p 3000:3000 --name [name] [react image id]
```