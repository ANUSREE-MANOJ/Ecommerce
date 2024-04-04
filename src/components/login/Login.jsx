import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../../redux/userSlice/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
      .string()
      .matches(
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
        "email is not valid"
      )
      .email("Invalid email address")
      .required("email is required"),
      password: yup
        .string()
        .min(8, "Password should be atleast 8 charcters")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "password should contain an uppercase,a lowercase,a number and a specail charcter"
        )
        .required("password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post("http://localhost:3000/login",values);
        console.log(data.success)
        if (data.success) {
          alert(`welcome back ${data.user.username}`);
          dispatch(login(data.user));
          navigate("/");
        } else {
          alert(data.err_msg);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="h-screen w-full">
      <img src="images/bgimg.jpg" alt="" className="h-screen w-full" />
      <div className="flex flex-col justify-center items-center mt-[100px] relative bottom-[700px]">
        <h1 className="font-bold text-white text-2xl">LOGIN</h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col mt-10 ">
          <input
            type="email"
            id="email"
            className="border rounded-md mb-3  p-2 w-[300px]"
            placeholder="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <p className="text-xs text-red-600">{formik?.errors?.email}</p>

          <input
            type="password"
            id="password"
            className="border  p-2 rounded-md"
            placeholder="Password"
            name="password"
            value={formik?.values.password}
            onChange={formik.handleChange}
          />
          <p className="text-xs text-red-600">{formik?.errors?.password}</p>

          <div className="flex justify-between">
            <label htmlFor="remember" className="mb-3 mt-2 text-white">
              <input type="checkbox" id="remember" name="remember" />
              Remember me
            </label>

            <label htmlFor="forgotPassword" className="mb-3 mt-2 text-white">
              Forgot Password?
            </label>
          </div>

          <input
            type="submit"
            className="mt-3 cursor-pointer border rounded-full p-1 text-white font-bold"
            value="Login"
          />
          <h1 className="mt-5 text-white ml-5">
            Don't have an account?
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/sign")}
            >
              Sign Up
            </span>
          </h1>
        </form>
      </div>
    </div>
  );
}

export default Login;
