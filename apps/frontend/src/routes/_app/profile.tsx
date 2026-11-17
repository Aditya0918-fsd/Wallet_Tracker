import { createFileRoute } from "@tanstack/react-router";
import { Camera, KeyRound, Mail, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { UserAvatar } from "@/components/app-shell.tsx";
import PageHeader from "@/components/page-header.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import Panel from "@/components/wallet/panel.tsx";
import { useWallet } from "@/hooks/use-wallet.ts";
import { updateProfile } from "@/lib/wallet/actions.ts";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "Profile · Wallet Tracker" }] }),
  component: ProfilePage,
});

/** Resize to a small square JPEG so it fits comfortably in browser storage. */
async function resizeImage(file: File, size = 256): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  const s = Math.min(bitmap.width, bitmap.height);
  ctx.drawImage(bitmap, (bitmap.width - s) / 2, (bitmap.height - s) / 2, s, s, 0, 0, size, size);
  return canvas.toDataURL("image/jpeg", 0.85);
}

function ProfilePage() {
  const { data, update, email } = useWallet();
  const [name, setName] = useState(data.profile.name);
  const [age, setAge] = useState(data.profile.age?.toString() ?? "");
  const [bio, setBio] = useState(data.profile.bio);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return setError("Enter your name");
    const ageNum = age.trim() === "" ? null : Number(age);
    if (ageNum !== null && (!Number.isInteger(ageNum) || ageNum < 1 || ageNum > 120)) return setError("Age must be a whole number between 1 and 120");
    setError(null);
    update((d) => updateProfile(d, { name: trimmed, age: ageNum, bio: bio.trim() }));
    toast.success("Profile saved");
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast.error("Please choose an image file");
    if (file.size > 8 * 1024 * 1024) return toast.error("Image must be under 8 MB");
    try {
      const avatar = await resizeImage(file);
      update((d) => updateProfile(d, { avatar }));
      toast.success("Profile picture updated");
    } catch {
      toast.error("Could not read that image");
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader title={<span className="font-display">Profile</span>} description="How you appear in Wallet Tracker." />
      <Panel title="Your details">
        <form onSubmit={save} className="grid gap-6" noValidate>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <UserAvatar className="size-24 text-2xl" />
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              <Button type="button" variant="secondary" size="sm" onClick={() => fileRef.current?.click()}>
                <Camera /> Change photo
              </Button>
              {data.profile.avatar ? (
                <Button type="button" variant="ghost" size="sm" onClick={() => update((d) => updateProfile(d, { avatar: null }))}>
                  <Trash2 /> Remove
                </Button>
              ) : null}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => void onFile(e.target.files?.[0])} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} maxLength={60} onChange={(e) => setName(e.target.value)} placeholder="Priya Sharma" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value.replace(/\D/g, ""))} placeholder="28" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="email" value={email} readOnly disabled className="pl-9" />
            </div>
            <p className="text-xs text-muted-foreground">From your signed-in account.</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" rows={3} maxLength={300} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Saving for a trip to Japan." />
            <p className="text-right text-xs text-muted-foreground">{bio.length}/300</p>
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <div className="flex justify-end">
            <Button type="submit">Save profile</Button>
          </div>
        </form>
      </Panel>
      <Panel title="Password and sign-in" description="Managed by Wallet Tracker account security.">
        <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2">
            <KeyRound className="mt-0.5 size-4 shrink-0" />
            Signed in with email and password? Use "Forgot password" on the sign-in screen to reset or change it.
          </p>
          <Button variant="secondary" size="sm" render={<a href="/auth/sign-in" />} nativeButton={false}>
            Open sign-in
          </Button>
        </div>
      </Panel>
    </div>
  );
}

