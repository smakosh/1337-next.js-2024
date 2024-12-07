'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const slides = [
  {
    title: "Next.js: The Evolution of Modern Web Development",
    content: "Welcome to this presentation on Next.js and its role in modern web development."
  },
  {
    title: "About Me",
    content: (
      <ul className="list-disc list-inside">
        <li>Ismail Ghallou aka Smakosh</li>
        <li>Unemployed frontend developer with 8 years of experience</li>
        <li>Worked on multiple projects using Next.js like:</li>
        <ol className="list-disc list-inside pl-6">
          <li><a href="https://linksdao.io/?utm_source=smakosh" target='_blank'>Links DAO</a></li>
          <li><a href="https://heronfinance.com/?utm_source=smakosh" target='_blank'>Heron Finance</a></li>
          <li><a href="https://www.sanfranciscogolf.com/?utm_source=smakosh" target='_blank'>SF Golf courses</a></li>
          <li><a href="https://www.dopp.finance/?utm_source=smakosh" target='_blank'>Dopp Finance</a></li>
        </ol>
      </ul>
    )
  },
  {
    title: "Evolution of the Web",
    content: (
      <div>
        <h3 className="font-bold mb-2">MPA (Multi-Page Applications)</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Early days of web: server-rendered HTML, full-page reloads</li>
          <li>Benefits: SEO-friendly, simplicity</li>
          <li>Drawbacks: performance issues with frequent reloads</li>
        </ul>
        <h3 className="font-bold mb-2">SPA (Single Page Applications)</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Rise of JavaScript frameworks (e.g., React, Angular, Vue)</li>
          <li>Client-side rendering for smoother user experience</li>
          <li>Benefits: fast interactions, better UX</li>
          <li>Drawbacks: poor initial load time, SEO challenges</li>
        </ul>
        <h3 className="font-bold mb-2">Modern SSR (Server-Side Rendering)</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Combining the best of both worlds: fast initial loads and SEO-friendly</li>
          <li>Examples: frameworks like Next.js</li>
        </ul>
        <h3 className="font-bold mb-2">React Server Components (RSCs)</h3>
        <ul className="list-disc list-inside">
          <li>A paradigm shift: streaming components to the browser</li>
          <li>Optimized for performance and resource efficiency</li>
        </ul>
      </div>
    )
  },
  {
    title: "What is Next.js?",
    content: (
      <div>
        <p className="mb-4">A React framework for production-grade web apps</p>
        <h3 className="font-bold mb-2">Key Benefits:</h3>
        <ul className="list-disc list-inside">
          <li>Performance</li>
          <li>Flexibility</li>
          <li>Ease of use</li>
          <li>Built-in tools for common web development challenges</li>
        </ul>
      </div>
    )
  },
  {
    title: "Core Features of Next.js",
    content: (
      <div>
        <h3 className="font-bold mb-2">File-based Routing</h3>
        <p className="mb-4">Simplifies routing by using file system structure</p>
        <h3 className="font-bold mb-2">Data Fetching</h3>
        <p className="mb-4">getStaticProps, getServerSideProps and RSC.</p>
        <h3 className="font-bold mb-2">API Routes / Route handlers</h3>
        <p className="mb-4">Building serverless APIs in your Next.js app</p>
        <h3 className="font-bold mb-2">Image Optimization</h3>
        <p className="mb-4">Out-of-the-box image handling</p>
        <h3 className="font-bold mb-2">Built-in CSS and Styling</h3>
        <p className="mb-4">Styled JSX, CSS Modules, and Tailwind CSS support</p>
        <h3 className="font-bold mb-2">Middleware and Edge Functions</h3>
        <p>Running lightweight server-side logic</p>
      </div>
    )
  },
  {
    title: "Advanced Features",
    content: (
      <div>
        <h3 className="font-bold mb-2">Dynamic Routing</h3>
        <p className="mb-4">Catch-all routes and dynamic segments</p>
        <h3 className="font-bold mb-2">Internationalization</h3>
        <p className="mb-4">Built-in i18n support</p>
        <h3 className="font-bold mb-2">Incremental Static Regeneration (ISR)</h3>
        <p className="mb-4">Updating static content without rebuilding the entire site</p>
        <h3 className="font-bold mb-2">App Directory and RSCs</h3>
        <p>The latest updates to the framework</p>
      </div>
    )
  },
  {
    title: "Live Demo",
    content: (
      <div>
        <p className="mb-4">Building a simple Next.js app showcasing:</p>
        <ul className="list-disc list-inside">
          <li>File-based routing</li>
          <li>Fetching data with getStaticProps or getServerSideProps and moving to RSC.</li>
          <li>How RSCs work in a real app</li>
          <li>Server actions</li>
        </ul>
      </div>
    )
  },
  {
    title: "Ecosystem and Tooling",
    content: (
      <div>
        <h3 className="font-bold mb-2">Vercel</h3>
        <p className="mb-4">Deployment and advanced features</p>
        <h3 className="font-bold mb-2">Integrations</h3>
        <ul className="list-disc list-inside">
          <li>Databases</li>
          <li>Content Management Systems (CMS)</li>
          <li>APIs</li>
        </ul>
      </div>
    )
  },
  {
    title: "Q&A and Resources",
    content: (
      <div>
        <h3 className="font-bold mb-2">Learning Resources</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Official Next.js documentation</li>
          <li>Next.js tutorials</li>
          <li>Online courses</li>
        </ul>
        <h3 className="font-bold">Questions?</h3>
        <p>Open floor for audience questions</p>
      </div>
    )
  },
  {
    title: "Thank You!",
    content: "hello@smakosh.com"
  }
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextSlide = () => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        nextSlide()
      } else if (event.key === 'ArrowLeft') {
        prevSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      }
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      }
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24 bg-gradient-to-r from-slate-900 to-slate-700">
      <div className="w-full max-w-4xl">
      <Button variant="link" className='p-0' asChild>
        <Link href="/" className='inline-flex items-center text-white'>
        <ArrowLeft />
        Back
        </Link>
      </Button>
      </div>
      <Card className="w-full max-w-4xl h-[600px] bg-white/10 backdrop-blur-md rounded-lg shadow-xl overflow-hidden flex flex-col">
        <CardContent className="p-8 flex-grow overflow-y-auto relative">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0 p-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">{slides[currentSlide].title}</h2>
              <div className="text-base sm:text-lg text-gray-200">{slides[currentSlide].content}</div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <div className="flex justify-between p-4 bg-white/20 backdrop-blur-sm mt-auto">
          <Button
            onClick={prevSlide}
            variant="outline"
            size="icon"
            className="rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </Button>
          <span className="text-lg font-semibold text-white">
            {currentSlide + 1} / {slides.length}
          </span>
          <Button
            onClick={nextSlide}
            variant="outline"
            size="icon"
            className="rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </Button>
        </div>
      </Card>
    </main>
  )
}

