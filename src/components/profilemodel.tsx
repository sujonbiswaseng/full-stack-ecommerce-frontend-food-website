"use client";
import { Pencil, Save, Trash2 } from "lucide-react";
import InfoRow from "./infoRow";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Status, StatusIndicator, StatusLabel } from "./ui/status";
import { useState } from "react";
import { Input } from "./ui/input";
import ShareProfileButton from "./profileshare";
import { deleteuserown, updateUser } from "@/actions/user.actions";
import { TUpdateUserInput, TUser } from "@/types/user.type";
import { updateUserSchema } from "@/validations/auth.validation";
import { cn } from "@/lib/utils";
import Image from "next/image";

function ProfileModal({ user }: { user: TUser }) {
  const router = useRouter();
  const [useinfo, setuserinfo] = useState<TUser>({ ...user });
  const [inputvalue, setinputvalue] = useState<Partial<TUpdateUserInput>>({});
  const [editfield, seteditfield] = useState<
    string | boolean | "bgimage" | "name" | "phone" | "isActive"
  >("");
  if (!user) {
    toast("user not found", { autoClose: 2000, theme: "colored" });
    router.push("/");
  }
  const defaultProfile =
    "https://images.pexels.com/photos/952670/pexels-photo-952670.jpeg";
  const handleUpdateUser = async <k extends keyof TUser>(
    field: k,
    value: TUser[k]
  ) => {
    if (value == null) {
      toast.error("please provide a value", {
        theme: "colored",
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }
    const parseData = updateUserSchema.safeParse({ [field]: value });
    if (!parseData.success) {
      const errors = parseData.error.flatten().fieldErrors;
      Object.values(errors).forEach((err) => {
        if (err) {
          toast.error(err[1], {
            position: "bottom-right",
            autoClose: 2000,
          });
        }
      });
      return;
    }
    try {
      const toastid = toast.loading(`"user ${field} updating...."`, {
        theme: "dark",
        position: "bottom-right",
        autoClose: 2000,
      });
      const res = await updateUser({ [field]: value });
      if (res.error) {
        toast.dismiss(toastid);
        toast.error(res.message || `"user ${field} update failed"`, {
          theme: "dark",
          position: "bottom-right",
          autoClose: 2000,
        });
        return;
      }
      toast.dismiss(toastid);
      toast.success(
        res.result?.message || `"user ${field} update successfully"`,
        {
          theme: "dark",
          position: "bottom-right",
          autoClose: 2000,
        }
      );
      setuserinfo((prev) => ({ ...prev, [field]: value }));
    } catch (error: any) {
      toast.error(`someting went wrong please try again`);
    }
  };
  const handleDelete = async () => {
    const toastid = toast.loading("user deleting....");
    const res = await deleteuserown();
    if (res.error) {
      toast.dismiss(toastid);
      toast.error(res.message || "user account delete fail");
      return;
    }
    toast.dismiss(toastid);
    toast.success(res.result?.message || "user account delete successfully");
    router.push("/");
    router.refresh();
    window.location.reload();
  };

  return (
    <div
      className={cn(
        "w-full max-w-[700px] mx-auto rounded-2xl bg-card text-card-foreground shadow-xl mt-6 md:mt-10 lg:mt-20",
        "px-4 sm:px-6 md:px-8 py-6 sm:py-8"
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex flex-col md:flex-row items-center justify-between border-b border-border",
          "min-h-[120px] mb-6 gap-6 p-4 md:p-6 bg-cover bg-center rounded-2xl"
        )}
        style={{
          backgroundImage: useinfo.bgimage
            ? `url(${useinfo.bgimage})`
            : undefined,
        }}
      >
        <div className="flex items-center gap-4 w-full md:w-auto">
          {editfield !== "image" ? (
            <div className="flex gap-3 items-center">
              <div className="relative group">
                <Image
                  src={useinfo.image || defaultProfile}
                  alt="profile"
                  width={100}
                  height={100}
                  className={cn(
                    "object-cover rounded-full border-2 border-border shadow",
                    "w-[68px] h-[68px] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px]"
                  )}
                  priority={true}
                />
                <button
                  className={cn(
                    "absolute bottom-2 right-2 z-10 bg-secondary p-1 rounded-md shadow hover:bg-accent transition-colors",
                    "flex items-center justify-center h-7 w-7"
                  )}
                  aria-label="Edit profile picture"
                  onClick={() => seteditfield("image")}
                  type="button"
                >
                  <Pencil className="text-primary w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className={cn(
              "flex items-center gap-2 bg-input rounded-md w-full max-w-xs p-2"
            )}>
              <Input
                className={cn(
                  "bg-input focus:ring-2 focus:ring-ring placeholder:text-muted-foreground w-full"
                )}
                onChange={(e) =>
                  setinputvalue({ ...inputvalue, image: e.target.value })
                }
                value={inputvalue.image ?? ""}
                placeholder="Enter your image url"
                aria-label="Profile image URL"
              />
              <button
                className="flex items-center justify-center h-9 w-9 rounded-md bg-primary text-primary-foreground hover:bg-accent transition"
                aria-label="Save profile picture"
                onClick={() => {
                  handleUpdateUser("image", inputvalue.image as string);
                  seteditfield("");
                }}
                type="button"
              >
                <Save className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        <div className="w-full md:w-auto flex justify-end">
          <div className="flex items-center gap-4">
            {editfield !== "bgimage" ? (
              <button
                className={cn(
                  "ml-auto flex items-center gap-2 px-3 py-2 rounded-md bg-secondary hover:bg-accent transition",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
                aria-label="Edit background"
                onClick={() => seteditfield("bgimage")}
                type="button"
              >
                <Pencil className="text-primary w-4 h-4" />
                <span className="sr-only">Edit background</span>
              </button>
            ) : (
              <div className={cn(
                "flex items-center gap-2 bg-input rounded-md w-full max-w-xs p-2"
              )}>
                <Input
                  className={cn(
                    "bg-input focus:ring-2 focus:ring-ring placeholder:text-muted-foreground w-full"
                  )}
                  onChange={(e) =>
                    setinputvalue({ ...inputvalue, bgimage: e.target.value })
                  }
                  value={inputvalue.bgimage ?? ""}
                  placeholder="Enter your background image url"
                  aria-label="Background image URL"
                />
                <button
                  className="flex items-center justify-center h-9 w-9 rounded-md bg-primary text-primary-foreground hover:bg-accent transition"
                  aria-label="Save background image"
                  onClick={() => {
                    handleUpdateUser("bgimage", inputvalue.bgimage as string);
                    seteditfield("");
                  }}
                  type="button"
                >
                  <Save className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="divide-y divide-border">
        {editfield !== "name" ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 gap-2">
            <Label className="text-muted-foreground mb-1 sm:mb-0">Name</Label>
            <div className="flex gap-2 items-center">
              <span className="text-foreground font-medium">{useinfo?.name}</span>
              <button
                className={cn(
                  "h-8 w-8 flex items-center justify-center rounded hover:bg-accent transition"
                )}
                aria-label="Edit name"
                onClick={() => seteditfield("name")}
                type="button"
              >
                <Pencil className="text-primary w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 gap-2">
            <Input
              className={cn(
                "bg-input focus:ring-2 focus:ring-ring text-foreground"
              )}
              onChange={(e) =>
                setinputvalue({ ...inputvalue, name: e.target.value })
              }
              value={inputvalue.name ?? ""}
              placeholder="Enter your name"
              aria-label="Name"
            />
            <button
              className="h-8 w-8 flex items-center justify-center rounded bg-primary text-primary-foreground hover:bg-accent transition mt-2 sm:mt-0"
              aria-label="Save name"
              onClick={() => {
                handleUpdateUser("name", inputvalue.name as string);
                seteditfield("");
              }}
              type="button"
            >
              <Save className="w-4 h-4" />
            </button>
          </div>
        )}

        <InfoRow label="Email Address" value={user.email} />

        {editfield !== "phone" ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 gap-2">
            <Label className="text-muted-foreground mb-1 sm:mb-0">Phone</Label>
            <div className="flex gap-2 items-center">
              <span className="text-foreground">
                {useinfo?.phone || "017********"}
              </span>
              <button
                className="h-8 w-8 flex items-center justify-center rounded hover:bg-accent transition"
                aria-label="Edit phone"
                onClick={() => seteditfield("phone")}
                type="button"
              >
                <Pencil className="text-primary w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 gap-2">
            <Input
              className="bg-input focus:ring-2 focus:ring-ring text-foreground"
              onChange={(e) =>
                setinputvalue({ ...inputvalue, phone: e.target.value })
              }
              value={inputvalue.phone ?? ""}
              placeholder="Enter your phone number"
              aria-label="Phone number"
            />
            <button
              className="h-8 w-8 flex items-center justify-center rounded bg-primary text-primary-foreground hover:bg-accent transition mt-2 sm:mt-0"
              aria-label="Save phone"
              onClick={() => {
                handleUpdateUser("phone", inputvalue.phone as string);
                seteditfield("");
              }}
              type="button"
            >
              <Save className="w-4 h-4" />
            </button>
          </div>
        )}

        <InfoRow label="Role" value={user.role as string} />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 gap-2">
          <Label className="text-muted-foreground mb-1 sm:mb-0">Status</Label>
          <div>
            {user.status === "activate" ? (
              <Status variant="success">
                <StatusIndicator />
                <StatusLabel className="text-foreground">{user.status}</StatusLabel>
              </Status>
            ) : (
              <Status variant="error">
                <StatusIndicator />
                <StatusLabel className="text-foreground">{user.status}</StatusLabel>
              </Status>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 gap-2">
          <Label className="text-muted-foreground mb-1 sm:mb-0">Email Verified</Label>
          <div>
            {user.emailVerified ? (
              <Status variant="success">
                <StatusIndicator />
                <StatusLabel className="text-foreground">Yes</StatusLabel>
              </Status>
            ) : (
              <Status variant="error">
                <StatusIndicator />
                <StatusLabel className="text-foreground">No</StatusLabel>
              </Status>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 gap-2">
          <Label className="text-muted-foreground mb-1 sm:mb-0">Active</Label>
          {editfield !== "isActive" ? (
            <div className="flex gap-2 items-center">
              {useinfo.isActive ? (
                <Status variant="success">
                  <StatusIndicator />
                  <StatusLabel className="text-foreground">Online</StatusLabel>
                </Status>
              ) : (
                <Status variant="error">
                  <StatusIndicator />
                  <StatusLabel className="text-foreground">Offline</StatusLabel>
                </Status>
              )}
              <button
                className={cn(
                  "h-8 w-8 flex items-center justify-center rounded hover:bg-accent transition"
                )}
                aria-label="Edit active status"
                onClick={() => seteditfield("isActive")}
                type="button"
              >
                <Pencil className="text-primary w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <input
                aria-label="Is Active"
                type="checkbox"
                checked={Boolean(inputvalue.isActive)}
                onChange={(e) =>
                  setinputvalue((prev: any) => ({
                    ...prev,
                    isActive: e.target.checked,
                  }))
                }
                className={cn(
                  "form-checkbox h-5 w-5 rounded border border-border text-primary focus:ring-2 focus:ring-ring transition"
                )}
              />
              <button
                className="h-8 w-8 flex items-center justify-center rounded bg-primary text-primary-foreground hover:bg-accent transition"
                aria-label="Save active status"
                onClick={() => {
                  handleUpdateUser("isActive", inputvalue.isActive as boolean);
                  seteditfield("");
                }}
                type="button"
              >
                <Save className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 gap-2">
          <span className="text-sm text-muted-foreground">Profile</span>
          <ShareProfileButton userId={user.id} userName={user.name} />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 gap-2">
          <span className="text-sm text-muted-foreground">Account</span>
          <button
            onClick={handleDelete}
            className={cn(
              "flex items-center gap-2 px-5 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow transition mt-2 sm:mt-0"
            )}
            type="button"
            aria-label="Delete account"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
