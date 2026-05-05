import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import CopyableId from "@/components/shared/CopyAndRoutebyId";
import { TResponseMeals } from "@/types/meals.type";
import { IgetReviewData } from "@/types/reviews.type";
import { TResponseUserData } from "@/types/user.type";

const USER_STATUS_STYLES: Record<
  string,
  { badge: string; label: string }
> = {
  ACTIVE: { badge: "variant=success", label: "Active" },
  INACTIVE: { badge: "variant=secondary", label: "Inactive" },
  BLOCKED: { badge: "variant=warning", label: "Blocked" },
  DELETED: { badge: "variant=destructive", label: "Deleted" },
};

type ViewUserDataProps = {
  viewMode: boolean;
  viewData?: TResponseUserData<{
    reviews: IgetReviewData[];
    event: TResponseMeals[];
    accounts: { password: string }[];
  }>;
};

const ViewUserData: React.FC<ViewUserDataProps> = ({ viewMode, viewData }) => {
  if (!viewMode || !viewData) return null;

  const { status, name, email, image, phone, role, emailVerified, createdAt, accounts = [] } = viewData;

  const statusMeta =
    USER_STATUS_STYLES[status as keyof typeof USER_STATUS_STYLES] ?? {
      badge: "variant=secondary",
      label: status ?? "Unknown"
    };

  return (
    <motion.section
      className="w-full max-w-[32rem] mx-auto bg-card text-card-foreground shadow-2xl rounded-3xl border border-border overflow-hidden"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      aria-label={name ? `Details for ${name}` : "User details"}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-8 pb-0 bg-gradient-to-r from-accent/40 via-primary/10 to-background">
        <div className="flex-shrink-0 flex justify-center items-center w-32 h-32 rounded-full shadow bg-background border-4 border-primary/20 relative overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={name || "User"}
              fill
              className="object-cover rounded-full"
              sizes="128px"
              priority
            />
          ) : (
            <span
              className="text-primary/30 text-6xl select-none"
              role="img"
              aria-label="User placeholder"
            >
              👤
            </span>
          )}
        </div>
        <div className="flex-1 w-full min-w-0 flex flex-col gap-2">
          <h2 className="font-extrabold text-3xl text-primary truncate break-all">{name || "-"}</h2>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="inline-flex items-center gap-1 font-normal text-muted-foreground text-base">
              <svg
                width={18}
                height={18}
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
                className="shrink-0"
              >
                <path
                  d="M15 2v2m-6-2v2m-5 4h16M5 6v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6"
                  stroke="currentColor"
                  strokeWidth={1.3}
                />
              </svg>
              {email || "-"}
            </span>
            <Badge variant={statusMeta.badge.split("=")[1] as any} className="capitalize">{statusMeta.label}</Badge>
            <Badge variant="secondary" className="capitalize">{role}</Badge>
            <Badge
              variant={"default"}
              className="whitespace-nowrap"
            >
              {emailVerified ? "Email Verified" : "Email Not Verified"}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="inline-block text-muted-foreground text-sm">
              Joined:{" "}
              <span className="text-primary font-medium">
                {createdAt ? new Date(createdAt).toLocaleString() : "N/A"}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-border my-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-8 pb-8 bg-card">
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm font-medium mb-1">
            Phone
          </span>
          <span className="font-mono text-base text-foreground bg-input rounded-lg px-3 py-2 border border-border block">
            {phone || "—"}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm font-medium mb-1">
            Email Verified
          </span>
          <span
            className={`font-mono text-base rounded-lg px-3 py-2 border ${
              emailVerified
                ? "bg-success/10 text-success border-success/20"
                : "bg-destructive/10 text-destructive border-destructive/20"
            }`}
            role="status"
            aria-label={emailVerified ? "Email verified" : "Email not verified"}
          >
            {emailVerified ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm font-medium mb-1">
            Created At
          </span>
          <span className="font-mono text-base text-foreground bg-input rounded-lg px-3 py-2 border border-border">
            {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm font-medium mb-1">
            Password(s)
          </span>
          <div className="space-y-2">
            {accounts && accounts.length > 0 ? (
              <CopyableId
                href={accounts[0].password}
                id={accounts[0].password}
              />
            ) : (
              <span className="text-muted-foreground text-base">—</span>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ViewUserData;