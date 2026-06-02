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
    <div className='flex justify-center mb-6'>

      <input
        type='file'
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'
      />

      {!image ? (
        <div className='w-28 h-28 flex items-center justify-center bg-orange-50 rounded-full relative cursor-pointer'>

          <LuUser className='text-4xl text-orange-500' />

          <button
            type='button'
            className='w-8 h-8 flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full absolute -bottom-1 -right-1'
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>

        </div>
      ) : (
        <div className='relative'>

          <img
            src={preview || previewUrl}
            alt='profile'
            className='w-28 h-28 rounded-full object-cover'
          />

          <button
            type='button'
            className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1'
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>

        </div>
      )}

    </div>
  )
}

export default ProfilePhotoSelector