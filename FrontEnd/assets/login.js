function loginListener() {
    const formLogin = document.querySelector(".login-form");
    const error = document.querySelector(".error")
  
    formLogin.addEventListener("submit", async function (e) {
      e.preventDefault()
      const email = document.querySelector("#email-form")
      const password = document.querySelector("#password-form")
      //
      const login = {
        email: email.value,
        password: password.value
      };
      //
      const chargeUtile = JSON.stringify(login);
      //
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: chargeUtile,
      });
      user = await response.json()
      console.log(user)
      if (response.ok) {
        window.localStorage.setItem("token", user.token)
        window.location.href = "./index.html"
      }
      else {
        error.setAttribute("style", "display: block;")
      }

    });
  }

  loginListener()