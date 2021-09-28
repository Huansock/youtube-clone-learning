## Routers

1. 글로벌 라우터
2. 유저 라우터
3. 비디오 라우터

/ = home
/login 로그인
/join = 회원가입
/serch = serch

/users/:id = see user
/users/logout = log out
/users/edit = edit my profile
/users/delete = delete my profile

/videos/:id = see video
/videos/:id/edit = edit my videos
/videos/:id/delete = delete my videos
/videos/upload = upload my videos

기능이 다르당
로그인을 해야 내 비디오를 볼 수 있듯이

:id 이런 걸 파라미터라고 부른다
url에 변수를 넣어줄 수 있다.

## pug를 써서 html을 표현해보자

pug의 partials
conditional
iteration
mixins is smart partials

## 데이터 베이스

post를 하는 방법을 알아봅시다.

제일앞에 /가있으면 절대경로
a(href="/video/edit")--->localhost:4000/video/edit
a(href="video/edit")--->localhost:4000/videos/video/edit
a(href=`${video.id}/edit`)--->localhost:4000/videos/1/edit

## 몽고 db

그니까 몽고 db는 엑셀같은 데이터베이스가 아니라 json형식이기 때문에 쓴다

설치과정이 어려움

파일을 서버에 임포트 해줘야함.

그리고 데이터 모델을 만들어줘야함

QA1
스키마:물리적인 장치로부터 논리적인 데이터 베이스 레코드(data base record)를 매핑(mapping)하는 데 사용되는 정의 정보를 말한다. 즉 쿠키틀 이라고 보면 될거같네요..!

QA2
아~~ 항상 async/await는 대체 왜 필요한 거야? Promise를 기다릴 거면 처음부터 Promise를 안 쓰고 절차형으로 코딩하면 되지! 했는데 외부와 소통할 때(이를테면 다른 서버와..) 애초에 비동기 처리로 제한 되어 있는 상황에서 써야 하는 것이었군요!! 또 멀티쓰레드를 필요로 하는 뭐 Machine Learning 같은 곳에서도 callback으로 지저분하게 하지 않고 await으로 깔끔하게 다 모아서 처리할 수도 있겠고..! Thank you Nico Ssem!!

QA3

1. return의 역할 : 본질적인 return의 역할보다는 function을 마무리짓는 역할로 사용되고 있음.

- 이러한 경우 return이 없어도 정상적으로 동작하지만 실수를 방지하기 위해 return을 사용

2. render한 것은 다시 render할 수 없음

- redirect(), sendStatus(), end() 등등 포함 (express에서 오류 발생)

Q4

1. try/catch를 통한 에러처리, 에러메세지 전달
2. Schema parameter : default
3. Schema CreatedAt에 Date.now()가 아닌 Date.now를 적는 이유 : 생성될때만 실행되도록

Q5

정규식 연습할 수 있는 사이트 https://regex101.com/
정규식에 대한 MDN의 공식 문서 https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions

---

1. mongoose가 부여한 id를 사용하기 위해 id에 숫자만 사용가능하게 설정한 Router부분 변경

- http://regexpal.com 을 통한 정규식 생성하기

2. id를 통해 db 내 색인, 해당 데이터 사용하기

M1

퍼그에서 믹싱이란 특정한 html 문단을 함수로 만들어주는 걸 일컫는다. 물론 자바스크립트를 활용해 문서 내에서 함수를 만들어줄 수 있지만 믹싱을 사용하면 특정 문서 내에서만 쓸 수 있었던 함수를 다른 문서에서도 임포트하여 쓸 수 있다. 이 사이트에서는 비디오 목록을 만드는 데 이것을 활용하였다. 비디오 목록 오브젝트에 접근, 각 하나의 오브젝트마다 video 믹싱을 실행, 반복 이라는 아주 심플한 알고리즘으로 비디오 목록을 만들어 냈다. 이를 통해 새로운 비디오가 업로드 되더라도 우리는 새로운 html을 만들어 줄 필요가 없으며 비디오 목록의 디자인을 손쉽게 바꿀 수 있게 되었다.

Q6

1. Model.findByIdAndUpdate()로 불러오기와 수정 한방에 => 즐겁다
2. Model.exist()
3. 생성이나 업데이트 전 작동해야할 function의 필요성 => Mongoose의 Middleware 활용

Q7

1. findByIdAndUpdate()에서는 save 훅업이 발생하지 않음 => 다른 방법을 알아보자
2. Video.js에 function을 만들어서 관리하기 => 이것도 괜찮음 근데 다른것도 알아보자
3. static을 사용하면 import 없이도 Model.function()형태로 사용이 가능함 => super cool

Q8
세션은 서버측에서 제공해주는 데이터, 쿠키는 클라이언트측에서 저장하고 사용하는 데이터
req.sessiontStore() 사용했을때 한번은 undefined가 나온 이유가 세션은 서버에서 만들어줘야 하는데 클라이언트가 첫 요청때 세션을 가지고있을리 없으니 undefined이 나온거고 그 이후 요청부턴 첫번째 요청때 세션을 만들어서 넘겨줬으니 클라이언트가 해당 값을 쿠키에 저장하고 매 요청때마다 서버에게 전달
세션은 서버가 만들어서 제공해주다보니 서버가 재부팅되면 초기화 된다. (그래서 DB에 저장해서 관리를 한다는 소리. 실 운영에선 서버가 꺼지는 일은 없으니깐.)
세션의 값은 서버가 만들어주는 고유값이다보니 해당 값을 기준으로 클라이언트에서 요청한 건에 대해 유저를 특정지을 수 있다
서버가 세션을 생성한 기점은 middleware로 express-session을 추가했을때부터 생성됨.

Q9

퍼그는 로컬에 접속 가능
Q10
dotenv를 써보자

Q11
Webpack은 .jpg 같은 거는 압축된 jpg 를 주고, JS 는 못생긴 거로, Sass 는 몬생긴 css 로 준다. 압축, 변형, 최소화등 필요한 작업들을 거치고 정리된 코드를 결과물로 준다.

webpack, webpack-cli devDependencies 로 설치

webpack아 여기는 소스파일들이 있고 여기는 너가 결과물을 보낼 폴더야
webpack.config.js 파일에서 webpack 환경설정. 이 파일에서는 되게 몬생긴 JS 만 쓸 수 있다.

중요한 거 두 가지(필수 설정)

- entry: 우리가 처리하고자 하는 파일들(예쁜 js)
- entry: 이 프로퍼티에 우리가 처리하고자 하는 파일의 경로 입력
- output: 결과물
- filename: 이 프로퍼티에 우리 결과물이 될 파일 이름 입력
- path: 이 프로퍼티에 우리 결과물 파일을 어디에 저장할 지 지정 (이 경로는 절대경로여야 해!)

0

Q12
/\.js$/ = RegExp 정규표션식
정규표현식에선 .가 분류 커맨드이므로 그냥 .을 쓸려면 \.을 해줘야 된다.
따라서 \.js는 .js이다

6
