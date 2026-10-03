export const dynamic = 'force-static';
import {contact} from '@/lib/config';
export default function robots(){return {rules:{userAgent:'*',allow:'/'},sitemap:`${contact.website}/sitemap.xml`};}
