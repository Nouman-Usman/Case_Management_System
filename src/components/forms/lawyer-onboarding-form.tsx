"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import getUserEmail from '@/utils/getUserEmail';
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";
import type { LawyerProfile } from "@/types/index.d.ts";
import { EmailAddress } from '@clerk/nextjs/server';


export default function LawyerOnboardingForm() {
  const router = useRouter();
  const [profilePic, setProfilePic] = useState<string>('');
  const [barLicense, setBarLicense] = useState<string>('');
  const [selectedProfilePic, setSelectedProfilePic] = useState<File | null>(null);
  const [selectedLicense, setSelectedLicense] = useState<File | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<LawyerProfile>();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

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

  const renderProgress = () => {
    const progress = ((step - 1) / (totalSteps - 1)) * 100;
    return (
      <div className="w-full mb-8">
        <div className="relative">
          <Progress 
            value={progress} 
            className="h-2 bg-gray-100/50 backdrop-blur-sm" 
          />
          <div className="absolute top-0 left-0 w-full flex justify-between -mt-2">
            {[1, 2, 3].map((stepNumber) => (
              <motion.div
                key={stepNumber}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNumber ? 'bg-primary text-white' : 'bg-gray-200'
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: step === stepNumber ? 1 : 0.8 }}
              >
                {step > stepNumber ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  stepNumber
                )}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-4 text-sm">
          <span className={step >= 1 ? 'text-primary font-medium' : 'text-gray-500'}>Basic Information</span>
          <span className={step >= 2 ? 'text-primary font-medium' : 'text-gray-500'}>Professional Details</span>
          <span className={step >= 3 ? 'text-primary font-medium' : 'text-gray-500'}>Contact & Documents</span>
        </div>
      </div>
    );
  };

  const renderFormStep = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="backdrop-blur-sm bg-white/90 shadow-xl border-0">
            <CardContent className="p-8">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="h-8 w-1 bg-primary rounded-full" />
                    <h2 className="text-2xl font-semibold">Basic Information</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        placeholder="Full Name"
                        {...register('name', { required: true })}
                        className={`border ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.name && <p className="text-red-500 text-sm">Full Name is required</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                      id="phoneNumber"
                      placeholder="1234567890"
                      {...register('phone', { required: true })}
                      className={`border ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.phone && <p className="text-red-500 text-sm">Phone number is required</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                      id="address"
                      placeholder="Your Address"
                      {...register('address', { required: true })}
                      className={`border ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.address && <p className="text-red-500 text-sm">Address is required</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                      id="city"
                      placeholder="City"
                      {...register('city', { required: true })}
                      className={`border ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.city && <p className="text-red-500 text-sm">City is required</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                      id="state"
                      placeholder="State"
                      {...register('state', { required: true })}
                      className={`border ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.state && <p className="text-red-500 text-sm">State is required</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">Zip Code</Label>
                      <Input
                      id="zip"
                      placeholder="Zip Code"
                      {...register('zip', { required: true })}
                      className={`border ${errors.zip ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.zip && <p className="text-red-500 text-sm">Zip code is required</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                      id="country"
                      placeholder="Country"
                      {...register('country', { required: true })}
                      className={`border ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.country && <p className="text-red-500 text-sm">Country is required</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="education">Education</Label>
                      <Input
                      id="education"
                      placeholder="Education"
                      {...register('education', { required: true })}
                      className={`border ${errors.education ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.education && <p className="text-red-500 text-sm">Education is required</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="languages">Languages</Label>
                      <Input
                      id="languages"
                      placeholder="Languages (comma separated)"
                      {...register('languages')}
                      className="border border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="consultationFees">Consultation Fees</Label>
                      <Input
                      id="consultationFees"
                      type="number"
                      placeholder="Consultation Fees"
                      {...register('consultationFees', { required: true, valueAsNumber: true })}
                      className={`border ${errors.consultationFees ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.consultationFees && <p className="text-red-500 text-sm">Consultation fees are required</p>}
                    </div></div>
                      <div className="space-y-2">
                        <Label htmlFor="barCouncilNumber">Bar Council Number</Label>
                        <Input
                          id="barCouncilNumber"
                          placeholder="Bar Council Number"
                          {...register('barCouncilNumber', { required: true })}
                          className={`border ${errors.barCouncilNumber ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.barCouncilNumber && <p className="text-red-500 text-sm">Bar Council Number is required</p>}
                      </div>
                    </div>
                )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="h-8 w-1 bg-primary rounded-full" />
                    <h2 className="text-2xl font-semibold">Professional Details</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>

                      {/* practiceArea name; change it according to the DB attribute */}
                      <Select onValueChange={(value) => register('practiceAreas').onChange({ target: { value } })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Criminal Law">Criminal Law</SelectItem>
                          <SelectItem value="Civil Law">Civil Law</SelectItem>
                          <SelectItem value="Corporate Law">Corporate Law</SelectItem>
                          <SelectItem value="Family Law">Family Law</SelectItem>
                          <SelectItem value="Constitutional Law">Constitutional Law</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="yearsOfPractice">Years of Practice</Label>
                      <Input
                        id="yearsOfPractice"
                        type="number"
                        placeholder="Years of Practice"
                        {...register('experience', { required: true })}
                        className={`border ${errors.experience ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.experience && <p className="text-red-500 text-sm">Years of Practice is required</p>}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="h-8 w-1 bg-primary rounded-full" />
                    <h2 className="text-2xl font-semibold">Contact & Documents</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="profilePic">Profile Picture</Label>
                      <Input
                        id="profilePic"
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePicChange}
                        disabled={isUploading}
                        className="border border-gray-300"
                      />
                      {profilePic && (
                        <div className="mt-2">
                          <Image
                            src={profilePic}
                            alt="Profile Preview"
                            width={100}
                            height={100}
                            className="rounded-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="barLicense">Bar License</Label>
                      <Input
                        id="barLicense"
                        type="file"
                        accept=".pdf,image/*"
                        onChange={handleLicenseChange}
                        disabled={isUploading}
                        className={`border ${errors.barLicenseUrl ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.barLicenseUrl && <p className="text-red-500 text-sm">Bar License is required</p>}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    );
  };

  const onSubmit = async (data: LawyerProfile) => {
    if (step !== totalSteps) {
      nextStep();
      return;
    }
  
    const userId = await getUserId();
    const username = await getData();
    const userEmail = await getUserEmail();
    setIsUploading(true);
    setUploadError(null);
  
    try {
      let profilePicUrl = '';
      let barLicenseUrl = '';
  
      if (selectedProfilePic) {
        const profilePicRef = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          selectedProfilePic
        );
        profilePicUrl = storage.getFileView(BUCKET_ID, profilePicRef.$id);
        console.log('Profile Pic URL:', profilePicUrl);
      }
  
      if (selectedLicense) {
        const licenseRef = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          selectedLicense
        );
        barLicenseUrl = storage.getFileView(BUCKET_ID, licenseRef.$id);
        console.log('Bar License URL:', barLicenseUrl);
      }
  
      // Ensure `languages` is an array
      const languagesArray = Array.isArray(data.languages)
        ? data.languages
        : typeof data.languages === 'string' && data.languages
        ? (data.languages as string).split(',').map((lang) => lang.trim()).filter(Boolean)
        : [];
  
      const formData = {
        ...data,
        email: userEmail,
        profilePic: profilePicUrl,
        barLicenseUrl,
        userId,
        associatedChamberId: "1234",
        verificationStatus: 'pending',
        languages: languagesArray, // Submit as an array
      };
  
      const resp = await databases.createDocument(
        DATABASE_ID,
        LawyerProfile_ID,
        ID.unique(),
        formData
      );
  
      if (resp.$id) {
        const onboardingRes = await completeOnboarding('lawyer');
        if (onboardingRes?.message) {
          router.push('/lawyer/dashboard');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to upload files');
    } finally {
      setIsUploading(false);
    }
  };
  

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Lawyer Registration
          </h1>
          <p className="text-gray-600">Complete your profile to join our legal network</p>
        </div>

        {renderProgress()}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {renderFormStep()}
          
          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="hover:bg-gray-100 transition-colors"
              >
                Previous
              </Button>
            )}
            <Button 
              type="submit"
              className={`ml-auto transition-all duration-200 ${
                step === totalSteps 
                  ? 'bg-primary hover:bg-primary/90' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
              disabled={isUploading}
            >
              {step === totalSteps 
                ? (isUploading ? 'Uploading...' : 'Submit Registration') 
                : 'Continue'}
            </Button>
          </div>
        </form>

        {uploadError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 text-red-500 bg-red-50 p-4 rounded-lg mt-4"
          >
            <AlertCircle className="w-5 h-5" />
            <p>{uploadError}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}