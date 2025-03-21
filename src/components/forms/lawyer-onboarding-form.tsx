"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { 
  storage,
  BUCKET_ID,
  databases,
  DATABASE_ID,
  LawyerProfile_ID
} from '@/lib/appwrite.config';
import { ID } from "appwrite";
import getUserId from '@/utils/userId';
import {completeOnboarding} from '@/app/onboarding/_actions';
import { useRouter } from 'next/navigation';
import getData from "@/utils/getUserData";

interface LawyerProfile {
  userName: string;
  fullName: string;
  barCouncilNumber: string;
  specialization: string;
  yearsOfPractice: number;
  phone: string;
  email: string;
  chamberAddress: string;
  city: string;
  state: string;
  zip: number;
  country: string;
  profilePicUrl: string;
  barLicenseUrl: string;
}

export default function LawyerOnboardingForm() {
  const router = useRouter();
  const [profilePic, setProfilePic] = useState<string>('');
  const [barLicense, setBarLicense] = useState<string>('');
  const [selectedProfilePic, setSelectedProfilePic] = useState<File | null>(null);
  const [selectedLicense, setSelectedLicense] = useState<File | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<LawyerProfile>();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedLicense(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBarLicense(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: LawyerProfile) => {
    const userId = await getUserId();
    const username = await getData();
    setIsUploading(true);
    setUploadError(null);

    // try {
    //   let profilePicUrl = '';
    //   let barLicenseUrl = '';

    //   if (selectedProfilePic) {
    //     const profilePicRef = await storage.createFile(
    //       BUCKET_ID,
    //       ID.unique(),
    //       selectedProfilePic
    //     );
    //     profilePicUrl = storage.getFileView(BUCKET_ID, profilePicRef.$id);
    //   }

    //   if (selectedLicense) {
    //     const licenseRef = await storage.createFile(
    //       BUCKET_ID,
    //       ID.unique(),
    //       selectedLicense
    //     );
    //     barLicenseUrl = storage.getFileView(BUCKET_ID, licenseRef.$id);
    //   }

    //   const formData = {
    //     ...data,
    //     userName: username,
    //     yearsOfPractice: parseInt(data.yearsOfPractice.toString(), 10),
    //     zip: parseInt(data.zip.toString(), 10),
    //     profilePicUrl,
    //     barLicenseUrl,
    //     userId,
    //     verificationStatus: 'pending'
    //   };

    //   const resp = await databases.createDocument(
    //     DATABASE_ID,
    //     LawyerProfile_ID ,
    //     ID.unique(),
    //     formData
    //   );

    //   if (resp.$id) {
    //     const onboardingRes = await completeOnboarding('lawyer');
    //     if (onboardingRes?.message) {
    //       router.push('/lawyer/dashboard');
    //     }
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    //   setUploadError(error instanceof Error ? error.message : 'Failed to upload files');
    // } finally {
    //   setIsUploading(false);
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        {/* Basic Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              {...register('fullName', { required: 'Full name is required' })}
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>
          <div>
            <label htmlFor="barCouncilNumber" className="block text-sm font-medium">Bar Council Number</label>
            <input
              type="text"
              placeholder="Bar Council Number"
              {...register('barCouncilNumber', { required: 'Bar Council Number is required' })}
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>
        </div>

        {/* Professional Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="specialization" className="block text-sm font-medium">Specialization</label>
            <select
              {...register('specialization', { required: 'Specialization is required' })}
              className="mt-1 block w-full rounded-md border p-2"
            >
              <option value="">Select Specialization</option>
              <option value="Criminal Law">Criminal Law</option>
              <option value="Civil Law">Civil Law</option>
              <option value="Corporate Law">Corporate Law</option>
              <option value="Family Law">Family Law</option>
              <option value="Constitutional Law">Constitutional Law</option>
            </select>
          </div>
          <div>
            <label htmlFor="yearsOfPractice" className="block text-sm font-medium">Years of Practice</label>
            <input
              type="number"
              placeholder="Years of Practice"
              {...register('yearsOfPractice', { required: 'Years of practice is required' })}
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
            <input
              type="tel"
              placeholder="Phone Number"
              {...register('phone', { required: 'Phone is required' })}
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>
        </div>

        {/* Chamber Address */}
        <div>
          <label htmlFor="chamberAddress" className="block text-sm font-medium">Chamber Address</label>
          <input
            type="text"
            placeholder="Chamber Address"
            {...register('chamberAddress', { required: 'Chamber address is required' })}
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium">City</label>
            <input
              type="text"
              placeholder="City"
              {...register('city', { required: 'City is required' })}
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium">State</label>
            <input
              type="text"
              placeholder="State"
              {...register('state', { required: 'State is required' })}
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="zip" className="block text-sm font-medium">ZIP Code</label>
            <input
              type="text"
              placeholder="ZIP Code"
              {...register('zip', { required: 'ZIP is required' })}
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium">Country</label>
            <input
              type="text"
              placeholder="Country"
              {...register('country', { required: 'Country is required' })}
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>
        </div>

        {/* File Uploads */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="profilePic" className="block text-sm font-medium">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="mt-1 block w-full"
              disabled={isUploading}
            />
            {profilePic && (
              <Image
                src={profilePic}
                alt="Profile Picture Preview"
                width={100}
                height={100}
                className="mt-2 object-cover rounded"
              />
            )}
          </div>
          <div>
            <label htmlFor="barLicense" className="block text-sm font-medium">Bar License (PDF/Image)</label>
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={handleLicenseChange}
              className="mt-1 block w-full"
              disabled={isUploading}
            />
            {uploadError && (
              <p className="text-red-500 text-sm mt-1">{uploadError}</p>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isUploading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300"
      >
        {isUploading ? 'Uploading...' : 'Register as Lawyer'}
      </button>
    </form>
  );
}