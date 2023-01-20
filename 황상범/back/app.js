// "app"이라는 변수(router, 미들웨어 부분을 포함)를 내보내기만 하는 역할
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const qs = require("qs");
const router = require("./routes");
const axios = require("axios");
const config = require("./config");
const HttpException = config.exception.HttpException;

// npm install cors cookie-parser
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

// router
app.use(router);

const HOST = "https://kauth.kakao.com";
const REST_API_KEY = "9a285f5350f79220ec0446c74333435f";
const REDIRECT_URI = "http://localhost:3000/oauth/kakao";
const CLIENT_SECRET = "Pwkk19c9PKZyLW3EAisCoCdMCqjjc6os";

// controller에서 하나의 router가 될 영역
app.get("/oauth/kakao", async (req, res, next) => {
  // (step 2) token 받기: 인가 코드를 가지고 "access_token"을 받아오는 부분
  // console.log(req.query);
  const { code } = req.query;

  const host = `${HOST}/oauth/token`;
  const headers = {
    "Content-type": `application/x-www-form-urlencoded`,
  };
  const body = qs.stringify({
    grant_type: "authorization_code",
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code,
    client_secret: CLIENT_SECRET,
  });

  const response = await axios.post(host, body, headers);
  console.log(response.data); // 여기서는 token만 받아옴!!

  // token을 가지고 회원정보를 조회해야 함!

  // (step 3) 회원정보 가져오기
  try {
    const { access_token } = response.data;
    const host = `https://kapi.kakao.com/v2/user/me`;
    // body 정보는 필요없기에 "null"로 처리함!
    const user = await axios.post(host, null, {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log(user);

    // 우리 DB에 저장하는 것이 가장 좋다!
    // user 정보를 우리 DB에 저장해놓고

    // 형태가 다를 수 있어 우리 형태의 토큰으로 재발급함
  } catch (e) {}

  // front server에 redirect를 요청함
  res.redirect("http://localhost:3005");
});

app.use((error, req, res, next) => {
  if (error instanceof HttpException) {
    res.json({
      isError: true,
      message: error.message,
      status: error.status,
    });
  } else if (error instanceof Error) {
    res.json({
      isError: true,
      message: error.message,
    });
  }
});

module.exports = app;
