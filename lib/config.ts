// All portfolio contact details live here. Use YOUR_PHONE_NUMBER / YOUR_WHATSAPP_NUMBER if unconfigured.
export const contact = {
  name: 'Prakash Ravikumar',
  phone: '+917397559527',
  whatsapp: '917397559527',
  phoneDisplay: '+91 73975 59527',
  website: 'https://webdev-prakash.vercel.app',
  portrait: '/prakash-ravikumar-founder.webp',
};
export const auditMessage = 'Hi Prakash, I manage a school/preschool in ______. I would like a free Digital Admission Audit for my school.';
export const aiMessage = 'Hi Prakash, I manage a school/preschool in ______. I would like to discuss making my school AI-ready, starting with approved information and an admission audit.';
export const callHref = `tel:${contact.phone}`;
export const whatsappHref = (message = auditMessage) => `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
