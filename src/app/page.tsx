import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ContactForm } from '@/components/ContactForm'

export default function Home() {
  return (
    <main className="h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center px-6">
        {/* Decorative gradient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-600/20 to-blue-400/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-600/20 to-blue-400/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                We Help Companies
                <span className="block text-blue-400">With AI</span>
              </h1>
              <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto lg:mx-0">
                From strategy to implementation, we partner with organizations to unlock the full potential of artificial intelligence.
              </p>
            </div>

            {/* Right: Contact Form */}
            <div id="contact" className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 ring-1 ring-gray-700">
                <h2 className="text-xl font-semibold text-white mb-1">Get in Touch</h2>
                <p className="text-gray-400 text-sm mb-6">Tell us about your project.</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
