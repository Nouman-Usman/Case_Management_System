"use client";

import { storage, BUCKET_ID, databases, DATABASE_ID, ClientProfile_ID } from '@/lib/appwrite.config';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { ID } from "appwrite";
import getUserId from '@/utils/userId';
import {completeOnboarding} from '@/app/onboarding/_actions';
import { useRouter } from 'next/navigation'
import getData from "@/utils/getUserData"

interface ClientProfile {
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: number; // Changed from string to number
  country: string;
  profilePicUrl: string;
}

export default function ClientOnboardingForm() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ClientProfile>();
  
  const onSubmit = async (data: ClientProfile) => {
    const userId = await getUserId();
    const username = await getData();
    try {
      if (selectedFile) {
        const fileId = `${userId?.slice(0, 20)}_cl_profile`;
        const fileRef = await storage.createFile(
          BUCKET_ID, 
          fileId, 
          selectedFile,
        );

        const publicUrl = `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${fileRef.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`;

        try {
          const formData = {
            ...data,
            zip: parseInt(data.zip.toString(), 10),
            profilePicUrl: publicUrl,
            userId: userId?.slice(0, 20),
            Name: username
          };

          const resp = await databases.createDocument(
            DATABASE_ID,
            ClientProfile_ID,
            ID.unique(),
            formData
          );

          if (resp.$id) {
            const onboardingRes = await completeOnboarding('client');
            if (onboardingRes?.message) {
              console.log('Onboarding completed successfully');
              router.push('/cl-dashboard');
              return;
            }
          }
        } catch (error) {
          console.error('Error creating document:', error);
        }
      }
    } catch (error) {
      console.error('Error uploading file:', error);
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
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setSelectedFile(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                  setProfileImage(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
            className="mt-1 block w-full"
          />
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
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Submit
      </button>
    </form>
  );
}
