import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { LuSparkles } from "react-icons/lu";
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
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center font-body'>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      <span className='w-9 h-9 rounded-lg bg-[#34D399]/10 flex items-center justify-center mb-4'>
        <LuSparkles size={16} className='text-[#34D399]' />
      </span>

      <h3 className='font-display text-2xl font-semibold text-[#0E1116]'>
        Create your account
      </h3>

      <p className='text-sm text-[#5B6472] mt-1 mb-6'>
        Join us today and start prepping smarter, not longer.
      </p>

      <form onSubmit={handleSignUp} className='flex flex-col'>

        <ProfilePhotoSelector
          image={profilePic}
          setImage={setProfilePic}
        />

        <div className='grid grid-cols-1 gap-4 mt-4'>

          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
          />

          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="doe@example.com"
            type="email"
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

        </div>

        {error && (
          <p className='text-[#FF6B4A] text-sm pb-1 mt-3'>
            {error}
          </p>
        )}

        <button
          type='submit'
          className='w-full bg-[#0E1116] text-sm font-semibold text-white px-6 py-3 rounded-full hover:bg-[#1c2230] transition-colors cursor-pointer mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399] focus-visible:ring-offset-2'
        >
          Sign up
        </button>

        <p className='text-[13px] text-[#5B6472] mt-3 text-center'>
          Already have an account?{" "}

          <button
            type="button"
            className='font-semibold text-[#34D399] hover:text-[#28b981] underline underline-offset-2 cursor-pointer'
            onClick={() => setCurrentPage("login")}
          >
            Log in
          </button>

        </p>

      </form>

    </div>
  );
};

export default SignUP;