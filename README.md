## 사용 스택

![Npm](https://img.shields.io/badge/NPM_14.20.0-CB3837.svg?style=for-the-badge&logo=npm&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/Redux-764ABC.svg?style=for-the-badge&logo=redux&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-004088.svg?style=for-the-badge&logo=Redux-ToolkitlogoColor=white)
![Redux Saga](https://img.shields.io/badge/Redux_Saga-999999.svg?style=for-the-badge&logo=Redux-Saga&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled_components-DB7093.svg?style=for-the-badge&logo=styled-components&logoColor=white)


## Start project

Install
```
npm install
```


### Front-end

start

```
npm run start
```

### Server
start
```
npm run api
```


## 요구사항
1. Redux logger, redux devtools 설정
2. comment CRUD 기능
3. 페이징 처리  

<details>
<summary>상세 보기</summary>
<div markdown="1">

### 프로젝트 구조
![프로젝트 구조](https://user-images.githubusercontent.com/57653953/186341966-d1d0eb74-e79e-41a2-9b06-a542ae605618.png)

- api, redux, container, components 분리
  - 관심사 분리를 위한 프로젝트 구조

### Redux logger, redux devtools 설정
```javascript
const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

const create = () => {
  const store = configureStore({
    reducer: rootReducer(history),
    middleware: [sagaMiddleware, logger],
    devTools: process.env.NODE_ENV !== 'production',
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

export default create;
```
 
### comment CRUD 기능

1. data.json이 서버 역활을 한다.
2. json-server 기본 기능을 이용하여 댓글 목록, 상세 내용, 작성, 수정, 삭제를 구현한다. 
3. 총 댓글수를 불러 오는 API 가 없으므로 /comments 로 받아서 직접 계산 -> server.js
   data.json을 불러와 총 댓글수, 총 페이지 수, 현재 페이지를 반환하는 api 작성

```javascript
server.get('/comments/paging', async (req, res) => {
  const { limit, page } = req.query;
  fs.readFile('./data.json', 'utf-8', function (err, data) {
    if (err) throw err;
    let json = JSON.parse(data);
    const commentsCnt = json.comments.length;
    const totalPage = Math.ceil(commentsCnt / limit);
    res.jsonp({
      totalPage,
      page: parseInt(page),
      limit: parseInt(limit),
      commentsCnt,
    });
  });
});
```

</div>
</details>
