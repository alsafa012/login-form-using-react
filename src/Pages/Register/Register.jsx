import {
     createUserWithEmailAndPassword,
     sendEmailVerification,
     updateProfile,
} from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
     const [registerError, setRegisterError] = useState(null);
     const [successMsg, setSuccessMsg] = useState("");
     const [showPassword, setShowPassword] = useState(false);

     const handleRegister = (e) => {
          e.preventDefault();

          const name = e.target.name.value;
          const email = e.target.email.value;
          const password = e.target.password.value;
          const checkbox = e.target.terms.checked;
          console.log(email, password, name, checkbox);

          setRegisterError("");
          setSuccessMsg("");

          // checking the password
          if (password.length < 6) {
               setRegisterError("Please enter at least 6 character password");
               return;
          } else if (!/[A-Z]/.test(password)) {
               setRegisterError("Please enter uppercase");
               return;
          } else if (!checkbox) {
               setRegisterError("Please accept our terms and conditions");
               return;
          }
          // create email address
          createUserWithEmailAndPassword(auth, email, password)
               .then((result) => {
                    console.log(result.user);
                    setSuccessMsg("User created successfully");

                    // update profile
                    updateProfile(result.user, {
                         displayName: name,
                         photoURL:"https://example.com/jane-q-user/profile.jpg",
                    })
                    .then(result => {
                         console.log("profile updated");
                    })
                    .catch((error) => {
                         console.log(error);
                    })

                    // send verification email
                    sendEmailVerification(result.user).then(() => {
                         alert("Verification email sent successfully");
                    });
               })

               .catch((error) => {
                    setRegisterError(error.message);
               });
     };

     return (
          <div className="text-center">
               <h1>Registration Here</h1>
               <div className="">
                    <form
                         onSubmit={handleRegister}
                         className="border  w-1/2 mx-auto my-3"
                    >
                         <input
                              className="py-2 w-1/2 rounded-2xl px-2"
                              placeholder=" your name"
                              type="text"
                              name="name"
                              id=""
                         />
                         <br />
                         <br />
                         <input
                              className="border py-2 w-1/2 rounded-2xl px-2"
                              placeholder=" your email"
                              type="email"
                              name="email"
                              id=""
                         />
                         <br />
                         <br />
                         <div className="relative">
                              <input
                                   className="border py-2 w-1/2 rounded-2xl px-2"
                                   placeholder=" your password"
                                   type={showPassword ? "text" : "password"}
                                   name="password"
                                   id=""
                              />

                              <span
                                   className="absolute top-3 right-[26%]"
                                   onClick={() =>
                                        setShowPassword(!showPassword)
                                   }
                              >
                                   {showPassword ? (
                                        <FiEye></FiEye>
                                   ) : (
                                        <FiEyeOff></FiEyeOff>
                                   )}
                              </span>
                         </div>
                         <br />
                         <br />
                         <div className="border">
                              <input type="checkbox" name="terms" id="terms" />
                              <label htmlFor="terms">
                                   Please accept our terms & conditions
                              </label>
                         </div>
                         <input
                              className="btn btn-secondary w-1/2"
                              type="submit"
                              value="Register"
                         />
                    </form>
                    {registerError && (
                         <p className="text-red-700">{registerError}</p>
                    )}
                    {successMsg && (
                         <p className="text-green-600">{successMsg}</p>
                    )}
               </div>
          </div>
     );
};

export default Register;
