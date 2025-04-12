import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import Swal from "sweetalert2";

import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile, googleSignIn } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const newUser = {
            email: data.email,
            name: data.name,
            profession: data.profession,
          };
          axiosPublic.post("/users", newUser).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "Registration Completed",
                showClass: {
                  popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `,
                },
                hideClass: {
                  popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `,
                },
              });
              reset();
              navigate("/");
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };
  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const user = result.user;
      const newUser = {
        email: user.email,
        name: user.displayName,
        role: "unsubscribed",
      };
      axiosPublic.post("/users", newUser).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400">
      <div className="w-full max-w-md bg-white bg-opacity-95 p-8 rounded-lg shadow-lg my-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h1>

          <input
            type="text"
            placeholder="Photo URL"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
            {...register("photoURL", { required: "Photo URL is required" })}
          />
          {errors.photoURL && <p className="text-red-500 text-sm">{errors.photoURL.message}</p>}

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <select
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
            {...register("profession", { required: "Profession is required" })}
          >
            <option value="">Select Profession</option>
            <option value="developer">Developer</option>
            <option value="corporateProfessional">Corporate Professional</option>
            <option value="banker">Banker</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          {errors.profession && <p className="text-red-500 text-sm">{errors.profession.message}</p>}

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 20,
              pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
            })}
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500 text-sm">Minimum 6 characters</p>
          )}
          {errors.password?.type === "maxLength" && (
            <p className="text-red-500 text-sm">Maximum 20 characters</p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500 text-sm">
              Must include uppercase, lowercase, number, and special character
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-700 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>

        <div className="my-4 text-center text-gray-500">OR</div>

        <div className="flex justify-center space-x-4 text-xl">
          <button onClick={handleGoogleSignIn} className="text-red-500 hover:text-red-600 flex items-center">
            <FaGoogle /> <span>oogle</span>
          </button>
        </div>
      </div>
    </div>

  );
};

export default Register;
