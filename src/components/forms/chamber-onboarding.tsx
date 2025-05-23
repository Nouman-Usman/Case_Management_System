"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { 
storage,
BUCKET_ID,
databases,
DATABASE_ID,
ChamberProfileID 
} from '@/lib/appwrite.config';
import { ID } from "appwrite";;
import getUserId from '@/utils/userId';
import {completeOnboarding} from '@/app/onboarding/_actions';
import { useRouter } from 'next/navigation'
import getData from "@/utils/getUserData"

interface ChamberProfile {
  ChamberName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: number;
  country: string;
  profilePicUrl: string;
}

export default function ChamberOnboardingForm() {
  const router = useRouter();
  const [chamberLogo, setChamberLogo] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<ChamberProfile>();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setChamberLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ChamberProfile) => {
    const userId = await getUserId();
    const username = await getData();
    setIsUploading(true);
    setUploadError(null);

    try {
      if (selectedFile) {
        // Upload file using improved method
        const fileRef = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          selectedFile
        );

        // Get the file URL using the storage.getFileView method
        const fileUrl = storage.getFileView(BUCKET_ID, fileRef.$id);

        const formData = {
          ...data,
          zip: parseInt(data.zip.toString(), 10),
          profilePicUrl: fileUrl,
          userId: userId,
        };

        const resp = await databases.createDocument(
          DATABASE_ID,
          ChamberProfileID,
          ID.unique(),
          formData
        );

        if (resp.$id) {
          const onboardingRes = await completeOnboarding('chamber');
          if (onboardingRes?.message) {
            router.push('/chamber/dashboard');
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        {/* Chamber Basic Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Chamber Name</label>
            <input
              type="text" placeholder='Chamber Name'
              {...register('ChamberName', { required: 'Chamber name is required' })}
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
          <input
            type="tel" placeholder='12345678900'
            {...register('phone', { required: 'Phone is required' })}
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>
        </div>


        {/* Chamber Location */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium">Address</label>
          <input
            type="text" placeholder='123, Street Name'
            {...register('address', { required: 'Address is required' })}
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium">City</label>
            <input
              type="text" placeholder='Lahore'
              {...register('city', { required: 'City is required' })}
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium">State</label>
            <input
              type="text" placeholder='Punjab'
              {...register('state', { required: 'State is required' })}
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="zip" className="block text-sm font-medium">ZIP Code</label>
            <input
              type="text" placeholder='54000'
              {...register('zip', { required: 'ZIP is required' })}
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium">Country</label>
            <input
              type="text" placeholder='Pakistan'
              {...register('country', { required: 'Country is required' })}
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>
        </div>

        {/* Chamber Logo */}
        <div>
          <label htmlFor="chamberLogo" className="block text-sm font-medium">Chamber Logo</label>
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
          {chamberLogo && (
            <div className="mt-2">
              <Image
                src={chamberLogo}
                alt="Chamber Logo Preview"
                width={150}
                height={150}
                className="object-contain"
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
        {isUploading ? 'Uploading...' : 'Register Chamber'}
      </button>
    </form>
  );
}