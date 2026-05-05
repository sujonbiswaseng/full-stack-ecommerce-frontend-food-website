import { getPublicStatsAction } from '@/actions/stats.actions'
import AboutContent from '@/components/about/AboutContent'
import Notfounddata from '@/components/Notfounddata'
import { PublicStats } from '@/types/stats.type'
import React from 'react'

const AboutPage =async () => {
  const res=await getPublicStatsAction()
  if(!res.success){
    return (
      <Notfounddata 
        content="Stats data not found"
        emoji="📊"
        path="/"
        btntext="Back to Home"
      />
    )
  }

  return (
    <div>
      <AboutContent data={res.data as PublicStats} />
    </div>
  )
}

export default AboutPage