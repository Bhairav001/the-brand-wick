import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState("");

  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("");

  const [confirmPassword, setConfirmpassword] = useState("");
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
        name,
        email,
        username,
        phone,
        password,
        confirmPassword
    };

    if (name === "" || password === "" || email === "" || confirmPassword === "",username===""||phone==="") {
        setAlertMessage("Enter all details first");
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    } else {

      if (password.length < 5) {
        setAlertMessage("Password should be at least 5 characters long");
        setShowAlert(true);
        return;
    }

    if (password !== confirmPassword) {
        setAlertMessage("Password and ConfirmPassword do not match");
        setShowAlert(true);
        return;
    }
    
        try {
            const response = await fetch("https://magnificent-bracelet-bee.cyclic.app/users/register", {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 400 && errorData.msg === "User with this email already exists") {
                    // Show alert for existing user
                    setAlertMessage("User with this email already exists");
                } else {
                    // Show a generic error message for other registration failures
                    setAlertMessage(`Registration failed: ${errorData.msg}`);
                }
            } else {
                // Registration successful
                setAlertMessage("Register successfully done!");
            }

            setShowAlert(true);
        } catch (error) {
            console.log(error);
            setAlertMessage("Something went wrong. Please try again.");
            setShowAlert(true);
        }
    }
};


  function handleAlertClose() {
    setShowAlert(false)
  }

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Registration Form</h1>
        {showAlert && (
          <>{alertMessage == "Enter all details first" ? (<>
            {showAlert && (
              <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <div className="bg-red-500 text-black px-6 py-4 rounded shadow">
                  <p>{alertMessage}</p>
                  <button
                    className="mt-2 bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"

                    onClick={handleAlertClose} 
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </>) : (<>
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
              <div className="bg-blue-500 text-white px-6 py-4 rounded shadow">
                <p>{alertMessage}</p>
                <button
                  className="mt-2 bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                  onClick={handleAlertClose}
                >
                  Close
                </button>
                <button
                  className="mt-2 bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                  onClick={()=>navigate("/login")}
                >
                  Login
                </button>
              </div>
            </div>
          </>)}</>

        )}
        <form className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="name"
              name="name"
              placeholder="bhairav gotam"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="email"
              id="email"
              name="email"
              placeholder="bhairav@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">Username</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="string"
              id="username"
              name="username"
              placeholder="bhairavgotam"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">Phone</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="phone"
              name="phone"
              placeholder="9923951056"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password"
              id="password"
              name="password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">Confirm Password</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="********"
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
            type="submit"
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
