import { getAbout } from '@/lib/cosmic'
import { About } from '@/types'

export const revalidate = 3600

export default async function AboutPage() {
  const about = await getAbout() as About | null
  
  if (!about) {
    return (
      <div className="py-16 px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">About</h1>
        <p className="text-gray-600">About information coming soon.</p>
      </div>
    )
  }
  
  const profilePhoto = about.metadata?.profile_photo
  const bio = about.metadata?.bio
  const email = about.metadata?.email
  const phone = about.metadata?.phone
  const instagram = about.metadata?.instagram
  const facebook = about.metadata?.facebook
  
  return (
    <div className="py-16 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-12 text-center">{about.title}</h1>
      
      <div className="grid md:grid-cols-2 gap-12 mb-12">
        {profilePhoto && (
          <div className="flex justify-center items-start">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src={`${profilePhoto.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                alt={about.title}
                className="w-full h-auto"
              />
            </div>
          </div>
        )}
        
        <div className="flex flex-col justify-center">
          {bio && (
            <div 
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: bio }}
            />
          )}
          
          <div className="space-y-4">
            {email && (
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${email}`} className="text-gray-700 hover:text-gray-900 transition-colors">
                  {email}
                </a>
              </div>
            )}
            
            {phone && (
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${phone}`} className="text-gray-700 hover:text-gray-900 transition-colors">
                  {phone}
                </a>
              </div>
            )}
            
            <div className="flex gap-4 mt-6">
              {instagram && (
                <a 
                  href={`https://instagram.com/${instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Instagram
                </a>
              )}
              
              {facebook && (
                <a 
                  href={`https://facebook.com/${facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Facebook
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}