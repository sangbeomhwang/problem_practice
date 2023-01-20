import request from "/js/lib/request.js";

// console.log(axios);
// console.log(request);

const checkInput = async (inputId, validation, errorMessage) => {
  document.getElementById(inputId).addEventListener("keyup", async () => {
    let inputValue = document.getElementById(inputId).value;
    if (!validation.test(inputValue)) {
      errorMessage.style.opacity = 1;
      errorMessage.style.transition = "opacity 0.2s ease-in-out";
    } else {
      errorMessage.style.opacity = 0;
      errorMessage.style.transition = "opacity 0.2s ease-in-out";

      if (inputId === "userid") {
        const response = await request.post("/users/idcheck", {
          userid: inputValue,
        });
        console.log(response.data);
        if (response.data !== null) {
          errorMessage.innerHTML = "이미 사용중인 아이디입니다";
          errorMessage.style.color = "red";
        } else {
          errorMessage.innerHTML = "아이디를 사용할 수 있습니다";
          errorMessage.style.color = "green";
        }
        errorMessage.style.opacity = 1;
      }
    }
  });
};

checkInput(
  "userid",
  /^[A-Za-z0-9]{6,16}$/,
  document.getElementsByClassName("alertMessage")[0]
);
checkInput(
  "username",
  /^[A-Za-z가-힣0-9]{2,16}$/,
  document.getElementsByClassName("alertMessage")[1]
);

checkInput(
  "userpw",
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/,
  document.getElementsByClassName("alertMessage")[2]
);

checkInput(
  "phoneNumber",
  /^010[0-9]{8}$/,
  document.getElementsByClassName("alertMessage")[6]
);

checkInput(
  "email",
  /^[A-Za-z0-9]+@[A-Za-z0-9.-_]{1,10}.[A-Za-z]{2,4}$/,
  document.getElementsByClassName("alertMessage")[7]
);

document.getElementById("pwcheck").addEventListener("keyup", () => {
  if (
    document.getElementById("userpw").value !==
    document.getElementById("pwcheck").value
  )
    document.getElementsByClassName("alertMessage")[3].style.opacity = 1;
  else {
    document.getElementsByClassName("alertMessage")[3].innerHTML =
      "비밀번호가 일치합니다";
    document.getElementsByClassName("alertMessage")[3].style.color = "green";
  }
});
