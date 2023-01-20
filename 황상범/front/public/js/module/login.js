import request from "/js/lib/request.js"; // http://localhost:3005/js/lib/request.js

console.log(axios);
console.log(request);

// submit 버튼을 누르면
// input box에 입력된 userid와 userpw의 value를 구해옴
// 해당 value를 가지고 브라우저에서 back-end로 요청을 보냄!
// axios를 통해 응답을 받음
// 이때 응답 내용에는 "token"이 들어 있으므로
// 우리는 Javascript로 cookie를 만들 수 있음!

const frm = document.querySelector("#loginfrm");

frm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    const { userid, userpw } = e.target;
    console.log(userid.value, userpw.value);

    const response = await request.post("/auth", {
      userid: userid.value,
      userpw: userpw.value,
    });

    console.log(response);
    console.log(response.data);

    if (response.data.status >= 400) throw new Error(e);
    else if (response.status >= 200) {
      // cookie 설정
      // 브라우저의 저장소: 1)로컬 스토리지, 2)세션 스토리지, 3)cookie
      // "로컬 스토리지"는 브라우저를 껐다 켜도 남아있는 반면, "세션 스토리지"는 브라우저를 껐다 키면 날아감!
      document.cookie = `token=${response.data.token};`;
      location.href = "/";
    }
  } catch (e) {
    alert("아이디와 패스워드가 다름!!");
  }
});
