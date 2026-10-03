export const dynamic = 'force-static';
import {contact} from '@/lib/config';
export default function sitemap(){return [{url:contact.website,changeFrequency:'monthly' as const,priority:1}];}
