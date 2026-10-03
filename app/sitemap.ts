export const dynamic = 'force-static';
import {contact} from '@/lib/config';
export default function sitemap(){return ['','/school-digital-marketing','/school-websites','/school-ai-automation','/free-school-audit'].map(path=>({url:contact.website+path,changeFrequency:'monthly' as const,priority:path ? 0.8 : 1}));}
