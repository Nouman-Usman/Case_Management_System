"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

interface LawyerOnboardingFormData extends Omit<LawyerProfile, 'rating' | 'reviews' | 'casesHandled' | 'casesWon' | 'casesLost'> {}

export default function LawyerOnboardingForm() {
  const [profileImage, setProfileImage] = useState<string>('');
  const { register, handleSubmit, formState: { errors } } = useForm<LawyerOnboardingFormData>();

  const availablePracticeAreas = [
    'Criminal Law',
    'Civil Law',
    'Corporate Law',
    'Family Law',
    'Real Estate Law',
    'Immigration Law',
    'Intellectual Property',
    'Tax Law'
  ];

  const availableLanguages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Chinese',
    'Arabic',
    'Hindi',
    'Urdu'
  ];

  const onSubmit = (data: LawyerOnboardingFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        {/* Basic Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>
        </div>

        {/* Contact & Location */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
          <input
            type="tel"
            {...register('phone', { required: 'Phone is required' })}
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium">Address</label>
          <input
            type="text"
            {...register('address', { required: 'Address is required' })}
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium">City</label>
            <input
              type="text"
              {...register('city', { required: 'City is required' })}
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium">State</label>
            <input
              type="text"
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
              {...register('zip', { required: 'ZIP is required' })}
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium">Country</label>
            <input
              type="text"
              {...register('country', { required: 'Country is required' })}
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>
        </div>

        {/* Professional Information */}
        <div>
          <label className="block text-sm font-medium">Practice Areas</label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {availablePracticeAreas.map((area) => (
              <div key={area} className="flex items-center">
                <input
                  type="checkbox"
                  value={area}
                  {...register('practiceAreas')}
                  className="rounded border-gray-300"
                />
                <label className="ml-2 text-sm">{area}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium">Years of Experience</label>
          <input
            type="text"
            {...register('experience', { required: 'Experience is required' })}
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>

        <div>
          <label htmlFor="education" className="block text-sm font-medium">Education</label>
          <textarea
            {...register('education', { required: 'Education is required' })}
            rows={3}
            className="mt-1 block w-full rounded-md border p-2"
            placeholder="Enter your educational background"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Languages</label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {availableLanguages.map((language) => (
              <div key={language} className="flex items-center">
                <input
                  type="checkbox"
                  value={language}
                  {...register('languages')}
                  className="rounded border-gray-300"
                />
                <label className="ml-2 text-sm">{language}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="consultationFees" className="block text-sm font-medium">Consultation Fees</label>
          <input
            type="number"
            {...register('consultationFees', { required: 'Consultation fees is required' })}
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>

        <div>
          <label htmlFor="profilePic" className="block text-sm font-medium">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
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
