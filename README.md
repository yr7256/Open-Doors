# 🏷️ OPEN DOORS - 배리어프리 장소 추천 서비스

## 👉 [OPEN DOORS Web Page](https://j8b205.p.ssafy.io/)

<br>

## 📆 프로젝트 진행 기간

- 23.02.27(월) ~ 23.04.07(금)
- SSAFY 2학기 특화 프로젝트 - 빅데이터(추천)

<br>

## 📖 기획 배경

- 배리어프리 장소를 추천하여 휠체어 이용자들도 불편함 없이 편의시설을 이용 가능하게 하고자 함.

<br>

## 🔎 개요

- 배리어프리 장소 추천을 통해 휠체어 사용자도 불편함 없이 식당, 카페 등의 시설을 이용할 수 있있도록 함.
- 신규 장소 등록 등을 통한 포인트 적립으로 기부를 가능하게 함.

<br>

## ✔ 주요 기능

- 배리어프리 장소 추천
    - 회원가입 시 등록한 필요한 시설 조건과 사용자가 선택한 장소의 카테고리를 기반으로 추천 방문한 사용자의 리뷰를 기반으로 배리어프리 장소 추천
- 배리어프리 장소 조회 및 검색
    - 지도 기반 배리어프리 장소 마커 표시 및 검색
- 실시간 교통 정보 제공 및 관련 서비스 연결
    - 대전광역시 내 실시간 저상버스 및 장애인 택시 정보 제공
    - 장애인 콜택시 서비스와 전화 연결
- 배리어프리 장소 사용자 리뷰
    - 진입 용이성, 시설 타입에 따른 항목 별 평가를 통해 개인화 추천 시스템에 반영
- 배리어프리 신규 장소 등록
    - 배리어프리로 등록되지 않은 시설에 대한 신규 등록
    - 기부포인트 적립 및 기부함

<br>

## 🛠️ 주요 기술

### Frontend

- React 18.2.0
- TypeScript 4.9.5
- redux 4.2.1

### Backend

- Java 17
- Spring Boot 2.7.9
- Gradle 8.0.2
- Python 3.9.10
- Flask 2.2.3

### BigData

- Numpy1.24.2
- Pandas 2.0.0
- BeautifulSoup 4.12.0
- Selenium 4.8.1.0

### Database

- MySQL 8.0.31

### Infra

- EC2 - Docker, Nginx

## 📐 서비스 아키텍처

<br>

## ✔ 팀원 역할 분배

### 유현근

- Team Leader
- BE
    - ERD 설계
    - 인증 및 인가
    - 배리어프리 장소, 리뷰,  사용자, 관리자, 교통 정보 API

### 이진섭

- BE
    - ERD 설계
    - 인증 및 인가
    - 포인트, 모금함 API
    - CI/CD

### 김성중

- Big Data
    - 장소 데이터 크롤링
    - 추천 알고리즘
- FE
    - 기부하기
    - 교통정보
- BE
    - 실시간 교통정보 API

### 김영록

- FE Leader
    - 배리어프리 지도 구성
    - UI/UX

### 유예지

- FE
    - 로그인, 회원가입, 마이페이지
    - 상세 페이지 구성

<br>

## 📟 프로젝트 관련 링크

- [컨벤션](https://www.notion.so/664ee95a23744c6c916eef6de6649940)
- [와이어프레임](https://www.figma.com/file/3OSUPYoQJpWhmGY5wQyDNZ/Open-doors?node-id=0-1&t=Bz4zJJvgNqk5TtR9-0)
- [ERD](https://www.erdcloud.com/d/KzRS7P4bfciHmw6W9)
- [API](https://www.notion.so/API-1b3df2a166c54ad2ae8e31ddad5a1ba3)
