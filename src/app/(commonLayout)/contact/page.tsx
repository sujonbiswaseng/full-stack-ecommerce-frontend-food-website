import { getPublicStatsAction } from '@/actions/stats.actions'
import ContactContent from '@/components/modules/contact/ContactForm'
import { PublicStats } from '@/types/stats.type'
import React from 'react'

const ContactPage = async() => {
 
  return (
    <div>
      <ContactContent/>
    </div>
  )
}

export default ContactPage