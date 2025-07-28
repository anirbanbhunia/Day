"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Sparkles, ArrowDown } from "lucide-react"
import Image from "next/image"
import dynamic from "next/dynamic"
import img1 from "@/components/images/i7.jpeg"
import img2 from "@/components/images/i6.jpeg"
import img3 from "@/components/images/i5.jpeg"
import img4 from "@/components/images/i4.jpeg"
import img5 from "@/components/images/i3.jpeg"
import img6 from "@/components/images/i2.jpeg"
import img7 from "@/components/images/img1.jpeg"

// Create a client-only component for Tenor GIFs
const TenorGif = dynamic(
  () =>
    Promise.resolve(
      ({ postId, aspectRatio, fallback }: { postId: string; aspectRatio: string; fallback: React.ReactNode }) => {
        const [isLoaded, setIsLoaded] = useState(false)

        useEffect(() => {
          // Load Tenor script
          const script = document.createElement("script")
          script.src = "https://tenor.com/embed.js"
          script.async = true
          script.onload = () => {
            setIsLoaded(true)
            // Process embeds after script loads
            if ((window as any).TenorEmbed) {
              ;(window as any).TenorEmbed.process()
            }
          }
          document.head.appendChild(script)

          return () => {
            if (document.head.contains(script)) {
              document.head.removeChild(script)
            }
          }
        }, [])

        if (!isLoaded) {
          return <>{fallback}</>
        }

        return (
          <div
            className="tenor-gif-embed"
            data-postid={postId}
            data-share-method="host"
            data-aspect-ratio={aspectRatio}
            data-width="100%"
          >
            <a href={`https://tenor.com/view/gif-${postId}`}>Loading...</a>
          </div>
        )
      },
    ),
  { ssr: false },
)

export default function BirthdayWebsite() {
  const [currentSection, setCurrentSection] = useState(0)
  const [showLetter, setShowLetter] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [glitterParticles, setGlitterParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>(
    [],
  )

  // Add this after your state declarations
  const memories = [
    {
      src: img1,
      alt: "Ganga Arati",
      caption: "Ganga Arati 🕉️✨",
    },
    {
      src: img2,
      alt: "vuk",
      caption: "Bohot vuk lag geya tha yrrr...😋",
    },
    {
      src: img3,
      alt: "Shopping...",
      caption: "Shopping...😚",
    },
    {
      src: img7,
      alt: "Baba Ka Darsan",
      caption: "Baba Ka Darsan 🙏🕉️",
    },
    {
      src: img5,
      alt: "Our first date",
      caption: "First Meet 💕",
    },
    {
      src: img6,
      alt: "Weekend getaway",
      caption: "Me & my love ❤️🌚✨",
    },
  ]

  // Create glitter rain effect
  useEffect(() => {
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }))
    setGlitterParticles(particles)
  }, [])

  const createFlyingHearts = () => {
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const heart = document.createElement("div")
        heart.innerHTML = "💖"
        heart.style.position = "fixed"
        heart.style.left = Math.random() * window.innerWidth + "px"
        heart.style.top = window.innerHeight + "px"
        heart.style.fontSize = "2rem"
        heart.style.pointerEvents = "none"
        heart.style.zIndex = "1000"
        heart.style.animation = "flyUp 3s ease-out forwards"
        document.body.appendChild(heart)
        setTimeout(() => {
          if (document.body.contains(heart)) {
            document.body.removeChild(heart)
          }
        }, 3000)
      }, i * 200)
    }
  }

  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      @keyframes flyUp {
        to {
          transform: translateY(-120vh) rotate(360deg);
          opacity: 0;
        }
      }
      @keyframes glitterFall {
        to {
          transform: translateY(120vh) rotate(720deg);
          opacity: 0;
        }
      }
      @keyframes glow {
        0%, 100% {
          text-shadow: 0 0 20px #ff69b4, 0 0 30px #ff69b4, 0 0 40px #ff69b4;
        }
        50% {
          text-shadow: 0 0 30px #ff1493, 0 0 40px #ff1493, 0 0 50px #ff1493;
        }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .glowing-text {
        animation: glow 2s ease-in-out infinite;
      }
      .floating {
        animation: float 3s ease-in-out infinite;
      }
      .fade-in-up {
        animation: fadeInUp 1s ease-out forwards;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const scrollToNext = () => {
    setCurrentSection(currentSection + 1)
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Glitter Rain Effect */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {glitterParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute text-yellow-400 text-lg"
            style={{
              left: `${particle.x}%`,
              top: `-10%`,
            }}
            animate={{
              y: ["0vh", "120vh"],
              rotate: [0, 720],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
              ease: "linear",
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Section 1: Birthday Wish */}
      <AnimatePresence>
        {currentSection === 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 1 }}
            className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-pink-200 via-purple-200 to-rose-200"
          >
            {/* Main Birthday Wish */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="text-center mb-8"
            >
              <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 glowing-text mb-4">
                Happy Birthday
              </h1>
              <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 glowing-text">
                My Babu Simmu 💖
              </h2>
            </motion.div>
            {/* Wish From Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-center mb-8"
            >
              <p className="text-2xl md:text-3xl font-semibold text-purple-700 mb-2 fade-in-up">
                Wish from your Bacchu...
              </p>
              <p className="text-xl md:text-2xl font-medium text-pink-600 fade-in-up">with lots of love 💕</p>
            </motion.div>
            {/* Quby Sticker */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, type: "spring", stiffness: 200 }}
              className="mb-8 floating"
            >
              <div className="w-32 h-32 md:w-40 md:h-40">
                <TenorGif
                  postId="10450862751152685702"
                  aspectRatio="1"
                  fallback={
                    <div className="bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center text-4xl w-full h-full">
                      🎂
                    </div>
                  }
                />
              </div>
            </motion.div>
            {/* Flying Hearts Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="mb-8"
            >
              <Button
                onClick={createFlyingHearts}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-4 text-xl rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Heart className="w-6 h-6 mr-2" />
                Send Love 💖
              </Button>
            </motion.div>
            {/* Scroll Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1 }}
              className="text-center"
            >
              <p className="text-lg md:text-xl text-purple-600 font-medium mb-4 floating">Niche jao bacchuu... 👇</p>
              <Button onClick={scrollToNext} variant="ghost" className="text-purple-600 hover:text-purple-800">
                <ArrowDown className="w-8 h-8 animate-bounce" />
              </Button>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Section 2: Our Memories */}
      <AnimatePresence>
        {currentSection === 1 && (
          <motion.section
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-purple-200 via-pink-200 to-rose-200 py-16"
          >
            {/* Our Memories Heading */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 glowing-text mb-6">
                Our Memories 💕
              </h2>
              {/* Crystal Amaru Sticker */}
              <div className="w-24 h-24 md:w-32 md:h-32 mx-auto floating">
                <TenorGif
                  postId="13419239015106351850"
                  aspectRatio="1.27907"
                  fallback={
                    <div className="bg-gradient-to-br from-purple-300 to-pink-300 rounded-full flex items-center justify-center text-3xl w-full h-full">
                      💎
                    </div>
                  }
                />
              </div>
            </motion.div>
            {/* Photo Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-4 mb-12"
            >
              {memories.map((memory, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.2, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="relative"
                >
                  <Card className="overflow-hidden shadow-xl border-4 border-pink-200 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-0">
                      <div className="relative">
                        <Image
                          src={memory.src || "/placeholder.svg"}
                          alt={memory.alt}
                          width={200}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent"></div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white text-sm font-semibold bg-black/50 rounded px-2 py-1">
                            {memory.caption}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            {/* Scroll Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="text-center"
            >
              <p className="text-lg md:text-xl text-purple-600 font-medium mb-4 floating">
                Jaldi niche jaoo babuuu... 👇
              </p>
              <Button onClick={scrollToNext} variant="ghost" className="text-purple-600 hover:text-purple-800">
                <ArrowDown className="w-8 h-8 animate-bounce" />
              </Button>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Section 3: Final Celebration */}
      <AnimatePresence>
        {currentSection === 2 && (
          <motion.section
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-rose-200 via-pink-200 to-purple-200 py-16"
          >
            {/* Celebration Button */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="text-center mb-8"
            >
              <div className="mb-6 floating">
                <div className="text-6xl mb-4">🎉</div>
              </div>
              <Button
                onClick={() => setShowCelebration(true)}
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-12 py-6 text-2xl rounded-full shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Sparkles className="w-8 h-8 mr-3" />
                Clickk karoo babu 💖
              </Button>
            </motion.div>
            {/* Celebration GIF */}
            <AnimatePresence>
              {showCelebration && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="mb-8"
                  onAnimationComplete={() => {
                    setTimeout(() => setShowLetter(true), 1000)
                  }}
                >
                  <div className="w-48 h-48 md:w-64 md:h-64 floating">
                    <TenorGif
                      postId="949860903714863715"
                      aspectRatio="1"
                      fallback={
                        <div className="bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full flex items-center justify-center text-6xl w-full h-full">
                          🎊
                        </div>
                      }
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Love Letter */}
            <AnimatePresence>
              {showLetter && (
                <motion.div
                  initial={{ opacity: 0, y: 100, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, duration: 1 }}
                  className="max-w-2xl mx-auto px-4"
                >
                  <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-4 border-pink-300 shadow-2xl">
                    <CardContent className="p-8 md:p-12 text-center">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="text-4xl mb-6"
                      >
                        💌
                      </motion.div>
                      <h3 className="text-2xl md:text-3xl font-bold text-purple-700 mb-6 glowing-text">
                        My Dearest Simmu 💖
                      </h3>
                      <div className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 space-y-4">
                        <p>
                          On this special day, I want you to know that you mean the world to me. Every moment with you
                          is a treasure, every smile you share lights up my universe.
                        </p>
                        <p>
                          I promise to stay by your side for the rest of my life, celebrating not just your birthdays,
                          but every single day we get to spend together. You make everything more beautiful, more
                          meaningful, more joyful.
                        </p>
                        <p>
                          Here's to many more birthdays together, filled with laughter, love, and endless happiness. You
                          deserve all the love in the world, and I'm so grateful I get to be the one to give it to you.
                        </p>
                      </div>
                      <div className="text-xl md:text-2xl font-bold text-rose-600 mb-6">
                        Lots of love from your baby Anirban 💕
                      </div>
                      <div className="text-lg text-purple-600 mb-6">To Smriti ✨</div>
                      {/* Hug GIF */}
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="w-32 h-32 md:w-40 md:h-40 mx-auto"
                      >
                        <TenorGif
                          postId="4585064738068342394"
                          aspectRatio="1.36813"
                          fallback={
                            <div className="bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center text-4xl w-full h-full">
                              🤗
                            </div>
                          }
                        />
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}
