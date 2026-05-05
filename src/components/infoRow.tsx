import { motion } from "framer-motion";

type InfoRowProps = {
  label: string;
  value: string;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2  py-4 border-b border-border bg-card"
      aria-label={`${label} row`}
    >
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground break-words text-right sm:text-left">
        {value}
      </span>
    </motion.div>
  );
}

export default InfoRow;