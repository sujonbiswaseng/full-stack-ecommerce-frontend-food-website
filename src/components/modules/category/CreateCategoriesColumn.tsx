import CopyableId from "@/components/shared/CopyAndRoutebyId";
import Image from "next/image";

// Token-based, enterprise-ready table cell + header classes
const thClass =
  "text-xs font-semibold px-6 py-4 bg-card text-card-foreground border-b border-border text-left select-none uppercase tracking-wide";
const tdClass =
  "px-6 py-3 align-middle whitespace-nowrap text-sm";

// Enterprise SaaS: production-grade, Stripe/Linear-inspired UI
export const createCategoryColumns = () => [
  {
    key: "id",
    label: (
      <span className={thClass} aria-label="Admin">
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
          <span>id</span>
        </span>
      </span>
    ),
    render: (row: any) => (
      <div className={`${tdClass} font-mono min-w-[110px]`}>
        <CopyableId
          id={row.id}
          href={`/category/${row.id}`}
          className="bg-muted text-secondary rounded-md px-2 py-1 group-hover:bg-accent transition-colors focus-visible:ring-2 focus-visible:ring-ring outline-none"
          showShort={row.id ? row.id.slice(0, 8) + "..." : ""}
          key={row.id}
        />
      </div>
    ),
  },
  {
    key: "adminId",
    label: (
      <span className={thClass} aria-label="Admin">
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
          <span>Admin</span>
        </span>
      </span>
    ),
    render: (row: any) => (
      <div className={`${tdClass} font-mono min-w-[110px]`}>
        <CopyableId
          id={row.adminId}
          href={`/profile/user/${row.adminId}`}
          className="bg-muted text-secondary rounded-md px-2 py-1 group-hover:bg-accent transition-colors focus-visible:ring-2 focus-visible:ring-ring outline-none"
          showShort={row.adminId ? row.adminId.slice(0, 8) + "..." : ""}
          key={row.adminId}
        />
      </div>
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
        className="px-2 block max-w-[180px] truncate font-medium text-card-foreground/90"
        title={row.name}
      >
        {row.name}
      </span>
    ),
  },
  {
    key: "image",
    label: (
      <span className={thClass} aria-label="Image">
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
              alt={row.name || "Category"}
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
    key: "createdAt",
    label: (
      <span className={thClass} aria-label="Created At">
        <span className="inline-flex items-center gap-2">
          <svg
            className="w-4 h-4 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          <span>Created</span>
        </span>
      </span>
    ),
    render: (row: any) => {
      const date = new Date(row.createdAt);
      return (
        <span className="inline-flex items-center justify-center rounded-md bg-background border border-border px-3 py-1 text-xs text-muted-foreground font-mono min-w-[82px] text-center">
          {isNaN(date.getTime()) ? (
            <span className="text-destructive">—</span>
          ) : (
            date.toLocaleDateString(undefined, {
              year: "2-digit",
              month: "short",
              day: "numeric",
            })
          )}
        </span>
      );
    },
  },
];