import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice/userSlice";
function SignIn() {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .min(3, "username should contain atleast  3 characters")
        .required("username is  required"),
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
      confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("password")], "password must be same"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post("http://localhost:3000/signup", values);
        if (data.success) {

          dispatch(login(data.user));
          navigate("/");
        } else {
          alert(data.err_msg);
          navigate("/login");

        }
      } catch (error) {
        if (error.response && error.response.status === 304) {
          // Handle status code 304 (Not Modified) here
          console.log("Resource not modified");
        } else {
          // Handle other errors
          console.error("Error:", error);
        }
      }
    }
    
  });
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h1 className="font-bold">Signup Page</h1>
      <form onSubmit={formik.handleSubmit} className="mt-10 flex flex-col">
        <label htmlFor="username" className="mb-3">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="border mb-3 rounded-lg p-1"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <p className="text-xs text-red-600">{formik?.errors?.username}</p>
        <label htmlFor="email" className="mb-3">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="border mb-3 rounded-lg p-1"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <p className="text-xs text-red-600">{formik?.errors?.email}</p>
        <label htmlFor="password" className="mb-3">
          Password
        </label>
        <input
          type="text"
          id="password"
          className="border mb-3 rounded-lg p-1"
          name="password"
          value={formik?.values.password}
          onChange={formik.handleChange}
        />
        <p className="text-xs text-red-600">{formik?.errors?.password}</p>

        <label htmlFor="confirmPassword" className="mb-3">
          Confirm Password
        </label>
        <input
          type="text"
          id="confirmPassword"
          className="border mb-3 rounded-lg p-1"
          name="confirmPassword"
          value={formik?.values.confirmPassword}
          onChange={formik.handleChange}
        />
        <p className="text-xs text-red-600">{formik?.errors?.password}</p>

        <input
          type="submit"
          value="Sign Up"
          className="border p-2 rounded-full text-center font-bold cursor-pointer"
        />

        <p className="mt-2">
          Already have an account?
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignIn;

