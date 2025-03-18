'use client';
import React from 'react'
import { Button } from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import getUserId from '@/utils/userId';

export default async function AssistantDahboard() {
  const userId  = await getUserId()
  console.log("User Id without slice", userId)
  const Id = userId?.slice(16,userId.length) 
  
    return <p className='flex flex-col items-center justify-center m-10 col-span-2'>
      This is the protected assistant dashboard restricted to users with the `{Id}` and details.</p>
}