import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Input from "../../components/inputs/Input";
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/userContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from "../../utils/uploadImage";

const SignUP = ({ setCurrentPage }) => {

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle SignUp Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = ("");

    if(!fullName){
      setError("Please enter full name.");
      return;
    }

    if(!validateEmail(email)){
      setError("Please Enter a valid email address.");
      return;
    }

    if(!password){
      setError("Please enter the password");
      return;
    }

    setError("");

    //Sign up API Call

    

    try {

      //Upload image if present
      if(profilePic){
        const imageUploadRea = await uploadImage(profilePic);
        profileImageUrl = imageUploadRea.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token } = response.data;

      if(token){
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
        
      }

      

      

    } catch (error) {

      if (error.response && error.response.data.message) {
        setError(error.response.data.message);

      } else {
        setError("Something went wrong. Please try again.");
      }
    }

  };

  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>

      <h3 className='text-lg font-semibold text-black'>
        Create an Account
      </h3>

      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp}>

        <ProfilePhotoSelector
          image={profilePic}
          setImage={setProfilePic}
        />

        <div className='grid grid-cols-1 gap-2'>

          <Input
            value={fullName}
            onChange={setFullName}
            label="Full Name"
            placeholder="John Doe"
            type="text"
          />

          <Input
            value={email}
            onChange={setEmail}
            label="Email Address"
            placeholder="doe@example.com"
            type="email"
          />

          <Input
            value={password}
            onChange={setPassword}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

        </div>

        {error && (
          <p className='text-red-500 text-xs pb-2.5 mt-2'>
            {error}
          </p>
        )}

        <button
          type='submit'
          className='btn-primary mt-4'
        >
          SIGN UP
        </button>

        <p className='text-[13px] text-slate-800 mt-3'>
          Already have an account?{" "}

          <button
            type="button"
            className='font-medium text-amber-500 hover:text-amber-600 underline cursor-pointer'
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>

        </p>

      </form>

    </div>
  );
};

export default SignUP;