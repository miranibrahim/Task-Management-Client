import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";


const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password)
      .then((result) => {
        console.log(result.user);
        e.target.reset();
        Swal.fire("Log in successful", "Press ok to Continue", "success");
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,

        });
      });

  };
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400">
      <div className="w-full max-w-sm bg-white bg-opacity-90 p-8 rounded-lg shadow-md">
        <form onSubmit={handleLogin}>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Log In</h1>

          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center text-gray-700 mt-4">
          New to this site?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>


  );
};

export default Login;
