import { getPublicStatsAction } from '@/actions/stats.actions'
import AboutContent from '@/components/about/AboutContent'
import { PublicStats } from '@/types/stats.type'
import React from 'react'

const AboutPage =async () => {
  const res=await getPublicStatsAction()
  console.log(res,'resdat')
  return (
    <div>
      <AboutContent data={res.data as PublicStats} />
    </div>
  )
}

export default AboutPage