import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Testimonials } from '@/components/Testimonials'
import { Pricing } from '@/components/Pricing'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Header />
      <Hero />
      <About />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  )
}
