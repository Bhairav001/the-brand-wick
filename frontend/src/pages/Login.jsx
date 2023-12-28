import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate()
  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e){
    e.preventDefault();

    if (data.email === "" || data.password === "") {
      setAlertMessage("Please enter all details first...!");
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } else {
      setAlertMessage("");

      fetch("http://localhost:8080/users/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("res", res);
         console.log(res.token)
          if (res.token.length>0) {
            localStorage.setItem("token", res.token);
            setAlertMessage("Login Successfully...!");
            console.log("data")
            // alert("login sucess")
          } else {
            setAlertMessage("Wrong Credentials");
          }

          setShowAlert(true);
        })
        .catch((err) => {
          console.log(err.message);
          setAlertMessage("Wrong Credentials");
          setShowAlert(true);
        });
    }
  }


  function handleAlertClose(){
    setShowAlert(false)
  }
  return (
    <div className="font-sans">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
          <div className="card bg-red-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
          <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
            <label htmlFor="" className="block mt-3 text-sm text-gray-700 text-center font-semibold">
              Login
            </label>
            {showAlert && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className={`bg-${alertMessage.includes('Wrong Credentials') ? 'red' : 'blue'}-500 text-white px-6 py-4 rounded shadow`}>
            <p>{alertMessage}</p>
            <button
              className="mt-2 bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={handleAlertClose}
            >
              Close
            </button>
            {alertMessage === 'Login Successfully...!' && (
              <button
                className="mt-2 bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                onClick={() => navigate('/')}
              >
                Dashboard
              </button>
            )}
          </div>
        </div>
      )}


            <form method="#" action="#" className="mt-10" onSubmit={handleSubmit}>

              <div>
                <input
                  type="email"
                  placeholder="bhairav@gmail.com"
                  value={data.email}
                  name='email'
                  onChange={handleChange}
                  className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>

              <div className="mt-7">
                <input
                  type="password"
                  value={data.password}
                  name='password'
                  placeholder="************"
                  onChange={handleChange}
                  className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>

              <div className="mt-7 flex">
                <label htmlFor="remember_me" className="inline-flex items-center w-full cursor-pointer">
                  <input
                    id="remember_me"
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    name="remember"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Reducer
                  </span>
                </label>

                <div className="w-full text-right">
                  <a className="underline text-sm text-gray-600 hover:text-gray-900" href="#">
                    Remember click?
                  </a>
                </div>
              </div>

              <div className="mt-7">
                <button
                  className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                  type="submit"
                >
                  Login
                </button>
              </div>

              <div className="flex mt-7 items-center text-center">
                <hr className="border-gray-300 border-1 w-full rounded-md" />
                <label className="block font-medium text-sm text-gray-600 w-full">
                  details of user
                </label>
                <hr className="border-gray-300 border-1 w-full rounded-md" />
              </div>

              <div className="flex mt-7 justify-center w-full">
                <button
                  className="mr-5 bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                >
                  Facebook
                </button>

                <button
                  className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                >
                  Google
                </button>
              </div>

              <div className="mt-7">
                <div className="flex justify-center items-center">
                  <label className="mr-2">don't know password?</label>
                  <a
                    href="#"
                    className="text-blue-500 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                  >
                    login with google
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
