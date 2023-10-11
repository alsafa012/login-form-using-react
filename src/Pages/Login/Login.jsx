import {
     sendPasswordResetEmail,
     signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useRef, useState } from "react";

const Login = () => {
     const [registerError, setRegisterError] = useState(null);
     const [success, setSuccessMsg] = useState("");
     const emailRef = useRef(null);
     // const [errorMsg, setErrorMsg] = useState(null);
     // const [successMsg, setSuccessMsg] = useState("");

     // setErrorMsg('');
     // setSuccessMsg('');

     const handleLogin = (e) => {
          e.preventDefault();
          const email = e.target.email.value;
          const password = e.target.password.value;
          console.log(email, password);

          setRegisterError("");
          setSuccessMsg("");

          // set user  
          signInWithEmailAndPassword(auth, email, password)
               .then((result) => {
                    console.log(result.user);

                    // for email verifications
                    if (result.user.emailVerified) {
                         setSuccessMsg("User created successfully");
                    } else {
                         alert("not verified");
                    }
               })
               .catch((error) => {
                    console.log(error.message);
                    setRegisterError(error.message);
               });
     };

     
     const handleResetPassword = () => {
          const email = emailRef.current.value;
          // console.log(email)
          if (!email) {
               alert("Please enter your email address");
               return;
          }
          // validation Email
          sendPasswordResetEmail(auth, email)
               .then(() => {
                    alert("Password reset please check email");
               })
               .catch((error) => {
                    console.log(error);
               });
     };

     return (
          <div>
               <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                         <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                              <div className="card-body">
                                   <form onSubmit={handleLogin}>
                                        <div className="form-control">
                                             <label className="label">
                                                  <span className="label-text">
                                                       Email
                                                  </span>
                                             </label>
                                             <input
                                                  ref={emailRef}
                                                  type="text"
                                                  name="email"
                                                  placeholder="email"
                                                  className="input input-bordered"
                                             />
                                        </div>
                                        <div className="form-control">
                                             <label className="label">
                                                  <span className="label-text">
                                                       Password
                                                  </span>
                                             </label>
                                             <input
                                                  type="text"
                                                  name="password"
                                                  placeholder="password"
                                                  className="input input-bordered"
                                             />
                                             <label className="label">
                                                  <a
                                                       onClick={
                                                            handleResetPassword
                                                       }
                                                       href="#"
                                                       className="label-text-alt link link-hover"
                                                  >
                                                       Forgot password?
                                                  </a>
                                             </label>
                                        </div>
                                        <div className="form-control mt-6">
                                             <button className="btn btn-primary">
                                                  Login
                                             </button>
                                             <div>
                                                  {registerError && (
                                                       <p className="text-red-700">
                                                            {registerError}
                                                       </p>
                                                  )}
                                                  {success && (
                                                       <p className="text-green-600">
                                                            {success}
                                                       </p>
                                                  )}
                                             </div>
                                        </div>
                                   </form>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Login;
