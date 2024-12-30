'use strict'
document.addEventListener("DOMContentLoaded", () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const getcurrentUser = async () => {
    if (!accessToken) {
      document.location = "/";
      return
    }
    try {
      const response = await fetch('https://dummyjson.com/auth/me', {
        method: "GET",
        headers: {
          "Authorization": accessToken,
        },
      })
      if (response.status === 401) {
        document.location = "/";
        sessionStorage.removeItem('accessToken')
        return
      }
      if (response.status !== 200) {
        throw new Error("Could not fetch data");
      }
      const jsonData = await response.json();
      sessionStorage.setItem("user", JSON.stringify(jsonData))
      const user = JSON.parse(sessionStorage.getItem("user"))
      document.getElementById("user-greet").textContent = `Welcome ${user.firstName}  ${user.lastName}!`
    } catch (err) {
      console.log("Err :", err)
    }
  };
  getcurrentUser()
  document.getElementById('logout-btn').addEventListener('click', () => {
    sessionStorage.removeItem("accessToken");
    document.location = "/"
  })


});

