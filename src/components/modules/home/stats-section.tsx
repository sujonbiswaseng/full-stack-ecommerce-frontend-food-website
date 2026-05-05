'use client'

import { FC } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PublicStats } from '@/types/stats.type'

interface StaticsProps {
  stats: PublicStats
}

const statItems = [
  { key: 'totalUsers', label: 'Users', description: 'Registered platform users' },
  { key: 'totalManagers', label: 'Managers', description: 'Active team managers' },
  { key: 'totalAdmins', label: 'Admins', description: 'Platform administrators' },
  { key: 'totalParticipants', label: 'Participants', description: 'Engaged participants' },
  { key: 'totalEvents', label: 'Events', description: 'Hosted events' },
  { key: 'totalReviews', label: 'Reviews', description: 'User reviews submitted' },
  { key: 'totalNewsletters', label: 'Newsletters', description: 'Newsletters sent' },
]

const animationVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: custom * 0.07,
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const Statics: FC<StaticsProps> = ({ stats }) => (
  <section className="w-full bg-background">
    <div className="max-w-[1440px] mx-auto w-full px-4 py-8 sm:px-6 md:px-8 md:py-12 flex flex-col gap-8 items-center">
      <div className="w-full flex flex-col items-center gap-4">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight text-center">
          Platform Public Statistics
        </h2>
        <p className="max-w-xl text-base md:text-lg text-muted-foreground text-center font-medium">
          Up-to-date usage and engagement metrics from our community. All stats update live and reflect platform-wide activity.
        </p>
      </div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {statItems.map((item, idx) => (
          <motion.div
            key={item.key}
            custom={idx}
            initial="hidden"
            animate="visible"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <Card className="group flex flex-col h-full bg-card border border-border rounded-xl shadow-sm transition-all hover:shadow-lg hover:border-accent focus-within:ring-2 ring-accent min-h-[180px]">
              <CardHeader className="flex flex-col items-center justify-center gap-2 pb-2">
                <CardTitle className="text-4xl md:text-5xl font-extrabold text-card-foreground select-none transition-colors group-hover:text-primary">
                  {stats?.[item.key as keyof PublicStats]?.toLocaleString?.() ?? 0}
                </CardTitle>
                <span className="text-lg md:text-xl text-muted-foreground font-semibold tracking-wide select-none">
                  {item.label}
                </span>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-between gap-2">
                <CardDescription className="text-center text-muted-foreground text-sm">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
)

export default Statics