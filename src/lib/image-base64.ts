export const uploadToCloudinary = async (
  file: File,
  folder = "pandey-computer",
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const res = await fetch("/api/image", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Image upload failed");
  }

  const { url } = await res.json();
  return url;
};

/** @deprecated Use uploadToCloudinary instead */
export const imageToBase64 = uploadToCloudinary;
