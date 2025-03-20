"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import {
  storage,
  BUCKET_ID,
  databases,
  DATABASE_ID,
  ClientProfile_ID,
  ID
} from '@/lib/appwrite.config';
// import { ID } from "appwrite";
import getUserId from '@/utils/userId';
import { completeOnboarding } from '@/app/onboarding/_actions';
import { useRouter } from 'next/navigation'
import getData from "@/utils/getUserData"

interface ClientProfile {
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: number;
  country: string;
  profilePicUrl: string;
}

export default function ClientOnboardingForm() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<ClientProfile>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ClientProfile) => {
    try {
      const userId = await getUserId();
      const username = await getData();
      setIsUploading(true);
      setUploadError(null);

      if (selectedFile) {
        // Upload file using improved method
        const fileRef = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          selectedFile
        );
        const fileUrl = storage.getFileView(BUCKET_ID, fileRef.$id);
        // const fileUrl = "resting"
        const formData = {
          ...data,
          zip: parseInt(data.zip.toString(), 10),
          profilePicUrl: fileUrl,
          userId: userId,
          Name: username
        };
        console.log(" Form Data is: ", formData)

        try {
          const resp = await databases.createDocument(
            DATABASE_ID,
            ClientProfile_ID,
            ID.unique(),
            formData,
          );
          // resp.then(function (response: any) {
          //   console.log(response);
          // }, function (error: any) {
          //   console.log(error);
          // });
          // console.log("Response is: ", resp)
          if (resp.$id) {
            const onboardingRes = await completeOnboarding('client');
            if (onboardingRes?.message) {
              try {
                await router.push('/client/dashboard');
                router.refresh(); // Force router to refresh
              } catch (navError) {
                console.error('Navigation error:', navError);
                // Fallback navigation
                window.location.href = '/client/dashboard';
              }
            }
          }
        } catch (dbError) {
          console.error('Database Error:', dbError);
          setUploadError('Failed to create profile. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setUploadError(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
          <input
            type="tel"
            placeholder='03000000000'
            {...register('phone', { required: 'Phone is required' })}
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium">Address</label>
          <input
            type="text"
            placeholder='Street 1, House 2 Block 3'
            {...register('address', { required: 'Address is required' })}
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium">City</label>
            <input
              type="text"
              placeholder='Lahore'
              {...register('city', { required: 'City is required' })}
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium">State</label>
            <input
              type="text"
              placeholder='Punjab'
              {...register('state', { required: 'State is required' })}
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="zip" className="block text-sm font-medium">ZIP Code</label>
            <input
              type="number" // Changed from text to number
              placeholder='54000'
              {...register('zip', {
                required: 'ZIP is required',
                valueAsNumber: true, // Convert to number
                validate: (value) => Number.isInteger(value) || 'ZIP must be an integer'
              })}
              className="mt-1 block w-full rounded-md border p-2"
            />
            {errors.zip && <span className="text-red-500 text-sm">{errors.zip.message}</span>}
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium">Country</label>
            <input
              type="text"
              placeholder='Pakistan'
              {...register('country', { required: 'Country is required' })}
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>
        </div>

        <div>
          <label htmlFor="profilePic" className="block text-sm font-medium">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full"
            disabled={isUploading}
          />
          {uploadError && (
            <p className="text-red-500 text-sm mt-1">{uploadError}</p>
          )}
          {profileImage && (
            <div className="mt-2">
              <Image
                src={profileImage}
                alt="Profile Preview"
                width={100}
                height={100}
                className="rounded-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isUploading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300"
      >
        {isUploading ? 'Uploading...' : 'Submit'}
      </button>
    </form>
  );
}
