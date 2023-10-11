import {
     createUserWithEmailAndPassword,
     sendEmailVerification,
     updateProfile,
} from "firebase/auth";
import { FiEye, FiEyeOff } from "react-icons/fi";
import auth from "../../Firebase/firebase.config";
import { useState } from "react";
const HeroRegister = () => {
     const [showPass, setShowPass] = useState(false);
     const [errorMsg, setErrorMsg] = useState(null);
     const [successMsg, setSuccessMsg] = useState("");

     const handleHeroRegister = (e) => {
          e.preventDefault();
          const name = e.target.name.value;
          const email = e.target.email.value;
          const password = e.target.password.value;
          const checkBox = e.target.terms.checked;
          // console.log(email, password);
          setErrorMsg("");
          setSuccessMsg("");
          // condition part
          if (password.length < 6) {
               setErrorMsg("Password must be at least 6 characters");
               return;
          } else if (!/[A-Z]/.test(password)) {
               setErrorMsg(
                    "Password must contain at least one uppercase character"
               );
               return;
          } else if (!checkBox) {
               setErrorMsg("Please fill terms & conditions");
               return;
          }
          // create email
          createUserWithEmailAndPassword(auth, email, password)
               .then((result) => {
                    console.log(result.user);
                    setSuccessMsg("User created successfully");
                    // update profile
                    updateProfile(result.user,{
                         displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
                    })
                    .then(resule=>{
                         console.log("profile updated successfully");
                    })
                    .catch(error => {
                         console.log(error.message);
                    })


                    // email verification
                    sendEmailVerification(result.user).then(() => {
                         alert("User created successfully");
                    });
               })
               .catch((error) => {
                    console.log(error.message);
                    setErrorMsg(error.message);
               });
     };

     return (
          <div>
               <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                         <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                              <div className="card-body">
                                   <form onSubmit={handleHeroRegister}>
                                        <div className="form-control">
                                             <label className="label">
                                                  <span className="label-text">
                                                       Name
                                                  </span>
                                             </label>
                                             <input
                                                  type="text"
                                                  name="name"
                                                  placeholder="your name"
                                                  className="input input-bordered"
                                             />
                                        </div>
                                        <div className="form-control">
                                             <label className="label">
                                                  <span className="label-text">
                                                       Email
                                                  </span>
                                             </label>
                                             <input
                                                  type="email"
                                                  name="email"
                                                  placeholder="email"
                                                  className="input input-bordered"
                                             />
                                        </div>
                                        <div className="form-control relative">
                                             <label className="label">
                                                  <span className="label-text">
                                                       Password
                                                  </span>
                                             </label>
                                             <input
                                                  type={
                                                       showPass
                                                            ? "text"
                                                            : "password"
                                                  }
                                                  name="password"
                                                  placeholder="password"
                                                  className="input input-bordered"
                                             />
                                             <span
                                                  className="absolute top-[36%] right-3"
                                                  onClick={() =>
                                                       setShowPass(!showPass)
                                                  }
                                             >
                                                  {showPass ? (
                                                       <FiEye></FiEye>
                                                  ) : (
                                                       <FiEyeOff></FiEyeOff>
                                                  )}
                                             </span>
                                             <div className="space-y-2 mt-3">
                                                  <input
                                                       type="checkbox"
                                                       name="terms"
                                                       id="terms"
                                                  />
                                                  <label
                                                       className="ml-2"
                                                       htmlFor="terms"
                                                  >
                                                       Please accept our
                                                       <a
                                                            className="label-text-alt link link-hover"
                                                            href=""
                                                       >
                                                            terms & conditions
                                                       </a>
                                                  </label>

                                                  
                                             </div>
                                        </div>
                                        <div className="form-control mt-6">
                                             <button className="btn btn-primary">
                                                  Login
                                             </button>
                                             <div>
                                                  {successMsg && (
                                                       <p>{successMsg}</p>
                                                  )}
                                                  {errorMsg && (
                                                       <p>{errorMsg}</p>
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

export default HeroRegister;
