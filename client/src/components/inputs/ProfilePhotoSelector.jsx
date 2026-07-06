import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu'

const ProfilePhotoSelector = ({
  image,
  setImage,
  preview,
  setPreview
}) => {

  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Update image state
      setImage(file);

      // Create preview URL
      const imageUrl = URL.createObjectURL(file);

      if (setPreview) {
        setPreview(imageUrl);
      }

      setPreviewUrl(imageUrl);
    }
  };

  // Open file chooser
  const onChooseFile = () => {
    inputRef.current.click();
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setImage(null);
     if (setPreview) {
    setPreview(null);
  }
    setPreviewUrl(null);
  };

  return (
    <div className='flex justify-center mb-6 font-body'>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      <input
        type='file'
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'
      />

      {!image ? (
        <div className='w-28 h-28 flex items-center justify-center bg-[#34D399]/10 border border-[#34D399]/20 rounded-full relative cursor-pointer'>

          <LuUser className='text-4xl text-[#34D399]' />

          <button
            type='button'
            className='w-8 h-8 flex items-center justify-center bg-[#0E1116] hover:bg-[#1c2230] text-white rounded-full absolute -bottom-1 -right-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399] focus-visible:ring-offset-2'
            onClick={onChooseFile}
          >
            <LuUpload size={14} />
          </button>

        </div>
      ) : (
        <div className='relative'>

          <img
            src={preview || previewUrl}
            alt='profile'
            className='w-28 h-28 rounded-full object-cover border-2 border-[#34D399]/30'
          />

          <button
            type='button'
            className='w-8 h-8 flex items-center justify-center bg-[#FF6B4A] hover:bg-[#ff8064] text-white rounded-full absolute -bottom-1 -right-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B4A] focus-visible:ring-offset-2'
            onClick={handleRemoveImage}
          >
            <LuTrash size={14} />
          </button>

        </div>
      )}

    </div>
  )
}

export default ProfilePhotoSelector