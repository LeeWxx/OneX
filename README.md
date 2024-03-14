# 🚀 OneX

## 📌 프로젝트 소개

- OneX는 합리적인 권리금으로 가게가 매매되는 것을 목표로 하는 점포 거래 플랫폼입니다.
- 완성된 상태가 아니며, 현재 개발 단계에 있습니다.

## 📌 기술 스택

- Front-end: React, TaiiwindCSS
- Back-end: Node.js, express
- DB: MongoDB

## 📌 페이지

- 메인 화면: /
- 매물 등록: /stores/new
- 매물 정보: /stores/:sid
- 로그인: /auth/login 
- 회원 가입: /auth/join


## 📌 프로젝트 구조

### Front
``` 
├── App.js
├── context
│   └── auth-context.js
├── hooks
│   ├── form-hook.js
│   └── http-hook.js
├── index.css
├── index.js
├── layout
│   ├── Header.js
│   ├── MainLayout.js
│   └── NavLink.js
├── store
│   ├── components
│   │   ├── DescriptionItem.js
│   │   ├── DescriptionList.js
│   │   ├── SearchBox.js
│   │   ├── StoreItem.js
│   │   ├── StoreList.js
│   │   └── TopBar.js
│   └── pages
│       ├── KakaoMap.css
│       ├── KakaoMap.js
│       ├── Main.js
│       ├── NewStore.js
│       ├── SideBar.js
│       └── StoreInfo.js
├── ui
│   ├── ImageUpload.js
│   └── Input.js
├── user
│   ├── components
│   └── pages
│       ├── Join.js
│       └── Login.js
└── utill
    └── validators.js
```

### Back

```
.
├── controllers
│   ├── stores-controllers.js
│   └── users-controllers.js
├── index.js
├── middleware
│   └── file-upload.js
├── models
│   ├── http-error.js
│   ├── store.js
│   └── user.js
├── routes
│   ├── stores-routes.js
│   └── users-routes.js
├── services
└── utill
    └── location.js
```
