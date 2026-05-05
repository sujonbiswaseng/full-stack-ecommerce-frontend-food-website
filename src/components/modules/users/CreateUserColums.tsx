import Image from "next/image";
import CopyableId from "@/components/shared/CopyAndRoutebyId";
import { Badge } from "@/components/ui/badge";

const thClass =
  "text-xs font-semibold px-6 py-4 bg-card text-card-foreground border-b border-border text-left select-none uppercase tracking-wide";
const tdClass = "px-6 py-3 align-middle whitespace-nowrap text-sm";

export const createUserColumns = () => [
  {
    key: "id",
    label: (
      <span className={thClass} aria-label="User ID">
        <span className="inline-flex items-center gap-2">
          <svg
            className="w-4 h-4 text-secondary"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M6.2 19.2A8 8 0 1 1 17.8 19.2" />
          </svg>
          <span>ID</span>
        </span>
      </span>
    ),
    render: (row: any) => (
      <div className={`${tdClass} font-mono min-w-[110px]`}>
        <CopyableId
          id={row.id}
          href={`/profile/user/${row.id}`}
          showShort={row.id ? row.id.slice(0, 8) + "..." : ""}
          className="bg-primary text-primary-foreground rounded-md px-2 py-1 group-hover:bg-accent transition-colors focus-visible:ring-2 focus-visible:ring-ring outline-none"
          key={row.id}
        />
      </div>
    ),
  },
  {
    key: "image",
    label: (
      <span className={thClass} aria-label="Profile Image">
        <span className="inline-flex items-center gap-2">
          <svg
            className="w-4 h-4 text-accent"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="8.5" cy="12.5" r="2.5" />
            <path d="M21 15.5l-5-4-3 3.5-2-2-5 5" />
          </svg>
          <span>Image</span>
        </span>
      </span>
    ),
    render: (row: any) => (
      <span className="flex items-center gap-4 px-2 min-h-[48px]">
        {row.image ? (
          <span className="relative w-12 h-12 bg-input border border-border rounded-lg overflow-hidden focus:outline-none ring-0 flex items-center justify-center">
            <Image
              src={row.image}
              alt={row.name || "Profile"}
              width={48}
              height={48}
              className="object-cover w-full h-full"
              loading="lazy"
              placeholder="empty"
            />
          </span>
        ) : (
          <span className="italic text-muted-foreground text-sm">—</span>
        )}
      </span>
    ),
  },
  {
    key: "name",
    label: (
      <span className={thClass} aria-label="Name">
        <span className="inline-flex items-center gap-2">
          <svg
            className="w-4 h-4 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M4 20v-7.586l7.293-7.293a1 1 0 0 1 1.414 0l7.293 7.293V20H4z" />
            <path d="M8 20v-5h8v5" />
          </svg>
          <span>Name</span>
        </span>
      </span>
    ),
    render: (row: any) => (
      <span
        className="px-2 block max-w-[160px] truncate font-medium text-card-foreground"
        title={row.name}
      >
        {row.name || <span className="text-muted-foreground">—</span>}
      </span>
    ),
  },
  {
    key: "email",
    label: (
      <span className={thClass} aria-label="Email">
        <span className="inline-flex items-center gap-2">
          <svg
            className="w-4 h-4 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
          <span>Email</span>
        </span>
      </span>
    ),
    render: (row: any) => (
      <span className="text-card-foreground/80 px-2 font-mono truncate max-w-[180px]" title={row.email}>
        {row.email}
      </span>
    ),
  },
  {
    key: "role",
    label: (
      <span className={thClass} aria-label="Role">
        <span className="inline-flex items-center gap-2">
          <svg
            className="w-4 h-4 text-secondary"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <span>Role</span>
        </span>
      </span>
    ),
    render: (row: any) => {
      let color =
        row.role === "Admin"
          ? "bg-primary/10 text-primary"
          : row.role === "Customer"
          ? "bg-secondary/10 text-secondary"
          : row.role === "Provider"
          ? "bg-accent/10 text-accent"
          : "bg-muted text-muted-foreground";
      let text = row.role || "Unknown";
      return (
        <Badge
          variant="secondary"
          className={`rounded px-2 py-0.5 text-xs font-medium ${color} capitalize`}
        >
          {text}
        </Badge>
      );
    },
  },
  {
    key: "status",
    label: (
      <span className={thClass} aria-label="Status">
        <span className="inline-flex items-center gap-2">
          <svg
            className="w-4 h-4 text-accent"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          <span>Status</span>
        </span>
      </span>
    ),
    render: (row: any) => {
      let color =
        row.status === "activate"
          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
          : row.status === "suspend"
          ? "bg-accent/10 text-accent"
          : "bg-muted text-muted-foreground";
      let text =
        row.status === "activate"
          ? "Active"
          : row.status === "suspend"
          ? "Suspend"
          : row.status || "—";
      return (
        <Badge
          variant="secondary"
          className={`rounded px-2 py-0.5 text-xs font-medium ${color}`}
        >
          {text}
        </Badge>
      );
    },
  },
  {
    key: "emailVerified",
    label: (
      <span className={thClass} aria-label="Verified">
        <span className="inline-flex items-center gap-2">
          <svg
            className="w-4 h-4 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <span>Verified</span>
        </span>
      </span>
    ),
    render: (row: any) => (
      <Badge
        variant="secondary"
        className={`rounded px-2 py-0.5 text-xs font-medium ${
          row.emailVerified
            ? "bg-primary/10 text-primary"
            : "bg-destructive/10 text-destructive"
        }`}
      >
        {row.emailVerified ? "Yes" : "No"}
      </Badge>
    ),
  },
];