"use client";

import { Upload, X, ImageIcon } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import { sendRequest } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";
import { imageToBase64 } from "@/lib/image-base64";

export default function AddBrandPage() {
  const imageRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const { trigger } = useSWRMutation("/api/brands", sendRequest);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    const imageUrl = imageToBase64(file);
    await trigger({ name: name, image: imageUrl });
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <ImageIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Add New Brand
          </h1>
          <p className="text-gray-600">Upload your brand logo and details</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Brand Name Input */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Brand Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter brand name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Brand Logo
                </label>

                {!file ? (
                  <div className="relative">
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      ref={imageRef}
                      onChange={(e) => {
                        const selectedFile = e.target.files?.[0];
                        if (selectedFile) setFile(selectedFile);
                      }}
                      className="hidden"
                      id="file-upload"
                      required
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center w-full h-64 border-3 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-linear-to-b from-gray-50 to-white hover:from-blue-50 hover:to-blue-50 hover:border-blue-400 transition-all group"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <div className="w-16 h-16 mb-4 bg-linear-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Upload className="w-8 h-8 text-blue-600" />
                        </div>
                        <p className="mb-2 text-base font-semibold text-gray-700">
                          Click to upload image
                        </p>
                        <p className="text-sm text-gray-500">
                          PNG, JPG, WEBP up to 10MB
                        </p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200 bg-linear-to-br from-gray-50 to-white p-4">
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="absolute top-6 right-6 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg z-10"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-4">
                      <Image
                        height={200}
                        width={200}
                        src={file ? URL.createObjectURL(file) : ""}
                        alt="Preview"
                        className="h-full w-full object-cover rounded-xl shadow-md"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Upload className="w-5 h-5" />
                    Add Brand
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Make sure your logo is clear and has a transparent background for
            best results
          </p>
        </div>
      </div>
    </div>
  );
}
