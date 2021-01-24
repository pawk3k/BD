import EventEmitter from "events"
import React, { ChangeEvent, useState } from "react"
import axios from "axios"
async function loginUser(credentials: unknown) {
  return fetch("http://localhost:8081/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => {
    data.json()
    console.log(data)
  })
  // axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*"
  const config = {
    headers: { "Access-Control-Allow-Origin": "*" },
  }
  // return axios
  //   .get("http://localhost:8081/login", {
  //     headers: { autorization: "Basic" + window.btoa("username : password") },
  //   })
  //   .catch((e) => console.error(e))

  // return axios
  //   .get("http://localhost:8081/api/Autor/autor/101", config)
  //   .then((data) => console.log(data))
}

export default function Login() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const token = await loginUser({
      username,
      password,
    })
  }
  const [username, setUserName] = useState<string>()
  const [password, setPassword] = useState<string>()
  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
