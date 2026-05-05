import CopyableId from "@/components/shared/CopyAndRoutebyId";
import { motion } from "framer-motion";

export const createBlogColumns = () => [
  {
    key: "id",
    label: "ID",
    render: (row: any) => (
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex items-center"
      >
        <CopyableId
          id={row.id}
          showShort={row.id?.slice(0, 8)}
          className="font-mono tracking-tight text-xs md:text-xs text-primary-foreground bg-primary rounded-md px-2 py-1 hover:bg-primary/90 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
        />
      </motion.div>
    ),
  },
  {
    key: "title",
    label: "Title",
    render: (row: any) => (
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="font-semibold text-base md:text-sm text-card-foreground truncate max-w-[14rem] md:max-w-xs"
        title={row.title}
      >
        {row.title.slice(0, 32)}
        {row.title.length > 32 && <span className="text-muted-foreground">…</span>}
      </motion.span>
    ),
  },
  {
    key: "content",
    label: "Content",
    render: (row: any) => (
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="text-sm md:text-xs text-muted-foreground line-clamp-2 max-w-[18rem] md:max-w-sm"
        title={row.content}
      >
        {row.content.slice(0, 40)}
        {row.content.length > 40 && <span className="text-muted-foreground">…</span>}
      </motion.span>
    ),
  },
  {
    key: "authorId",
    label: "Author",
    render: (row: any) => (
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex items-center"
      >
        <CopyableId
          id={row.authorId}
          showShort={row.authorId?.slice(0, 8)}
          className="font-mono tracking-tight text-xs md:text-xs text-secondary-foreground bg-secondary rounded-md px-2 py-1 hover:bg-secondary/80 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
        />
      </motion.div>
    ),
  },
  {
    key: "eventId",
    label: "Event",
    render: (row: any) =>
      row.eventId ? (
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex items-center"
        >
          <CopyableId
            id={row.eventId}
            showShort={row.eventId?.slice(0, 8)}
            className="font-mono tracking-tight text-xs md:text-xs text-accent-foreground bg-accent rounded-md px-2 py-1 hover:bg-accent/80 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
          />
        </motion.div>
      ) : (
        <span className="text-xs md:text-xs text-muted-foreground">—</span>
      ),
  },
  {
    key: "createdAt",
    label: "Created",
    render: (row: any) =>
      row.createdAt ? (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-muted-foreground font-medium text-xs md:text-xs whitespace-nowrap"
          title={new Date(row.createdAt).toLocaleString()}
        >
          {new Date(row.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </motion.span>
      ) : (
        <span className="text-muted-foreground text-xs">—</span>
      ),
  },
  {
    key: "updatedAt",
    label: "Updated",
    render: (row: any) =>
      row.updatedAt ? (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-muted-foreground text-xs md:text-xs whitespace-nowrap"
          title={new Date(row.updatedAt).toLocaleString()}
        >
          {new Date(row.updatedAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </motion.span>
      ) : (
        <span className="text-muted-foreground text-xs">—</span>
      ),
  },
];