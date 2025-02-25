"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

interface AssistantOnboardingFormData extends Omit<AssistantProfile, 'casesAssisted'> {}

export default function AssistantOnboardingForm() {
  const [profileImage, setProfileImage] = useState<string>('');
  const { register, handleSubmit, formState: { errors } } = useForm<AssistantOnboardingFormData>();

  const onSubmit = (data: AssistantOnboardingFormData) => {
    console.log(data);
  };

  const availableRoles = [
    'Legal Research',
    'Document Preparation',
    'Case Management',
    'Client Communication',
    'Court Filing',
    'Calendar Management'
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="userId" className="block text-sm font-medium">User ID</label>
          <input
            type="text"
            {...register('userId', { required: 'User ID is required' })}
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

        <div>
          <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>

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

        <div>
          <label className="block text-sm font-medium">Roles</label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {availableRoles.map((role) => (
              <div key={role} className="flex items-center">
                <input
                  type="checkbox"
                  value={role}
                  {...register('roles')}
                  className="rounded border-gray-300"
                />
                <label className="ml-2 text-sm">{role}</label>
              </div>
            ))}
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
