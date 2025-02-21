"use client";

import { Suspense } from "react";
import {ResetPassForm} from "@/components/forms/resetPass-form";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassForm />
    </Suspense>
  );
}