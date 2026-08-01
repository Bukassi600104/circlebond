"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { Camera, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";

async function csrfToken() {
  const response = await fetch("/api/auth/csrf", { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to start a secure upload.");
  return ((await response.json()) as { csrfToken: string }).csrfToken;
}

export function ProfileSettings({
  displayName,
  email,
  phone,
  profileImage,
}: {
  displayName: string;
  email: string | null;
  phone: string | null;
  profileImage: string | null;
}) {
  const router = useRouter();
  const previewUrl = useRef<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(profileImage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
    };
  }, []);

  function selectPhoto(file: File | null) {
    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
    previewUrl.current = file ? URL.createObjectURL(file) : null;
    setSelectedFile(file);
    setPreview(previewUrl.current);
    setError("");
    setSuccess("");
  }

  async function uploadPhoto(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedFile || loading) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const csrf = await csrfToken();
      const form = new FormData();
      form.set("photo", selectedFile);
      const response = await fetch("/api/profile/photo", {
        method: "POST",
        headers: { "X-CSRF-Token": csrf },
        body: form,
      });
      const data = (await response.json()) as {
        error?: string;
        profileImage?: string;
      };
      if (!response.ok || !data.profileImage) {
        throw new Error(data.error ?? "Unable to update your profile photo.");
      }
      setCurrentImage(data.profileImage);
      selectPhoto(null);
      setSuccess("Profile photo updated.");
      router.refresh();
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Unable to update your profile photo.",
      );
    } finally {
      setLoading(false);
    }
  }

  const initials = displayName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  const visibleImage = preview ?? currentImage;

  return (
    <div className="bc-profile-settings">
      <form className="bc-profile-photo" onSubmit={uploadPhoto}>
        <div className="bc-profile-photo__avatar">
          {visibleImage ? (
            <Image
              src={visibleImage}
              alt={`${displayName}'s profile photo`}
              width={112}
              height={112}
              sizes="112px"
              unoptimized
            />
          ) : (
            <span aria-label={`${displayName}'s initials`}>{initials}</span>
          )}
        </div>
        <div className="bc-profile-photo__controls">
          <strong>Profile photo</strong>
          <p>JPG, PNG or WebP, up to 5 MB.</p>
          <label htmlFor="profile-photo">
            <Camera size={16} aria-hidden="true" />
            {currentImage ? "Choose a new photo" : "Add profile photo"}
          </label>
          <input
            id="profile-photo"
            name="photo"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) =>
              selectPhoto(event.currentTarget.files?.[0] ?? null)
            }
          />
          {selectedFile && (
            <Button type="submit" loading={loading} disabled={loading}>
              Save photo
            </Button>
          )}
        </div>
      </form>
      {success && (
        <p
          className="bc-profile-message bc-profile-message--success"
          role="status"
        >
          <CheckCircle2 size={16} aria-hidden="true" />
          {success}
        </p>
      )}
      {error && (
        <p
          className="bc-profile-message bc-profile-message--error"
          role="alert"
        >
          {error}
        </p>
      )}

      <dl>
        <div>
          <dt>Display name</dt>
          <dd>{displayName}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>{email ?? "Not added"}</dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>{phone ?? "Not added"}</dd>
        </div>
      </dl>
    </div>
  );
}
