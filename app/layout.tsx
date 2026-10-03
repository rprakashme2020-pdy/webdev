import type { Metadata, Viewport } from 'next';
import { contact } from '@/lib/config';
import './globals.css';
export const metadata: Metadata = {
 metadataBase: new URL(contact.website),
 title: 'Digital Admission Growth & AI for Schools | Prakash Ravikumar',
 description: 'School and preschool digital marketing in Pondicherry, Puducherry and Chennai. Connect websites, Google, social media, WhatsApp, admission CRM and AI. Start with a free school digital admission audit.',
 alternates: {canonical:'/'},
 openGraph: {title:'More parents should know about your school.',description:'School Admission Engine + AI by Prakash Ravikumar. Start with a free Digital Admission Audit.',url:contact.website,siteName:'Prakash Ravikumar',type:'website',locale:'en_IN'},
 twitter:{card:'summary',title:'Digital Admission Growth & AI for Schools | Prakash Ravikumar',description:'Discover a practical admission system for schools in Pondicherry and Chennai.'},
 robots:{index:true,follow:true}
};
export const viewport: Viewport = {width:'device-width',initialScale:1,themeColor:'#f7f8f2'};
export default function RootLayout({children}:{children:React.ReactNode}) {
 const schema = {'@context':'https://schema.org','@type':'ProfessionalService',name:contact.name,url:contact.website,telephone:contact.phone,description:'Digital admission growth and AI services for schools and preschools.',areaServed:[{'@type':'City',name:'Puducherry'},{'@type':'City',name:'Chennai'}],serviceType:['School website development','Local SEO','School social media marketing','Admission CRM','School WhatsApp automation','AI for schools']};
 return <html lang="en"><body><a href="#main" className="skip-link">Skip to content</a><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>{children}</body></html>;
}
