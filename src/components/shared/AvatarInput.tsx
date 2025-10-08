"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type AvatarInputProps = {
  name?: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
  defaultPreview?: string;
};

export function AvatarInput({
  name,
  value,
  onChange,
  defaultPreview,
}: AvatarInputProps) {
  const [preview, setPreview] = useState<string | null>(defaultPreview || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(defaultPreview || null);
    }
    onChange?.(file);
  };

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-16 w-16">
        {preview ? (
          <AvatarImage src={preview} alt="Avatar preview" />
        ) : (
          <AvatarFallback>U</AvatarFallback>
        )}
      </Avatar>

      <Input
        type="file"
        name={name}
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}
