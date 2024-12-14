import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Solutions } from '@/components/Solutions'
import { Testimonials } from '@/components/Testimonials'
import { Pricing } from '@/components/Pricing'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import LinkedInTicker from '@/components/LinkedInTicker'
import { getLinkedInPosts } from '@/lib/linkedInPosts'

export default async function Home() {
  const posts = await getLinkedInPosts();
  console.log(`Rendering ${posts.length} LinkedIn posts`);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Header />
      <Hero />
      <Solutions />
      <Testimonials />
      <Pricing />
      <Contact />
      <LinkedInTicker posts={posts} />
      <Footer />
    </main>
  )
}
