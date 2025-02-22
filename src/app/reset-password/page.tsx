"use client";

import { Suspense } from "react";
import {ResetPassForm} from "@/components/forms/Authentication/resetPass-form";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassForm />
    </Suspense>
  );
}