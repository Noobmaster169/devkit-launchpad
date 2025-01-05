"use client";
import { GradientText } from '@/components/gradient-text'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Code, Zap, Rocket, RefreshCw, Icon } from 'lucide-react'
import { GradientBlob } from '@/components/gradient-blob'
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="">
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <div className="absolute inset-0 -z-10">
        <GradientBlob />
      </div>
      <section className="container mx-auto py-64 text-center z-10">
        <h1 className="text-6xl font-bold mb-6 mt-6">
          The ultimate tool kit for development on
        </h1>
        <h1 className="text-6xl font-bold mb-6">
          <GradientText>Solana Devnet</GradientText>
        </h1>
        <p className="text-xl mt-12 mx-auto max-w-4xl">
          DevKit Launchpad is a Token & AMM Launchpad Tool on Solana Devnet.
        </p>
        <p className="text-xl mb-12 mt-4 mx-auto max-w-4xl">
          Users can launch their own Token & AMM Pools on Devnet to simulate Token Swapping & Liqudity Pools for development purposes.
        </p>
        <Link href="/dashboard">
          <Button className="bg-cyan-400 hover:bg-cyan-500 text-white px-12 py-8 rounded-full text-2xl font-semibold">
            Get Started
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-800 bg-opacity-50 py-20">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-center">
            <GradientText>"Testing & Development with Ease"</GradientText>
          </h1>
          <p className="text-lg mb-12 mt-4 mx-auto max-w-4xl text-center">
            Devkit Launchpad makes it easier for developers to test their programs on Solana
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Code className="w-20 h-20 text-green-400" />}
              title="Simulated Environment"
              description="Test your Solana programs in Devnet environment before deployment."
            />
            <FeatureCard
              icon={<Rocket className="w-20 h-20 text-blue-400" />}
              title="Token Launch"
              description="Create and launch your own tokens on Solana Devnet with ease."
            />
            <FeatureCard
              icon={<RefreshCw className="w-20 h-20 text-green-400" />}
              title="AMM Pools"
              description="Build and test Automated Market Maker pools to simulate token swapping."
            />
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="container mx-auto pt-20 pb-12">
        <h2 className="text-5xl font-bold mb-12 text-center">
          <GradientText>What to use it for</GradientText>
        </h2>
        <ul className="space-y-4 max-w-xl mx-auto text-xl">
          {[
            "Simulate transactions like Mainnet",
            "Test your programs on devnet",
            "Launch your token on devnet",
            "Build AMMs on Devnet for liquidity & token swapping"
          ].map((item, index) => (
            <li key={index} className="flex items-center space-x-2">
              <ArrowRight className="text-blue-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA Section */}
      <section className="pt-16 pb-20 bg-gradient-to-t from-[#142c41] to-[#0a0a0a]">
        <div className="container mx-auto text-center">
          <Card className="bg-gray-600 bg-opacity-20 backdrop-blur-md border-none">
            <CardContent className="p-16 text-center">
              <h2 className="text-4xl font-bold mb-6">
                Ready to supercharge your <GradientText>Solana Development</GradientText>?
              </h2>
              <p className="text-xl mb-8 text-gray-300">
                Join DevKit Launchpad and take your Solana Development Projects to the next level.
              </p>
              <Link href="/dashboard">
                <Button className="bg-cyan-400 hover:bg-cyan-500 text-white px-16 py-8 rounded-full text-2xl font-semibold">
                  Get Started
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 bg-opacity-50 py-8">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; 2025 DevKit Launchpad. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </main>
  )
}

function FeatureCard({ icon, title, description }:any) {
  return (
    <Card className="bg-gray-700 border-none m-2">
      <CardContent className="p-6 text-center py-10">
        <div className="mb-6 flex justify-center">{icon}</div>
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        <p className="text-gray-300 text-lg">{description}</p>
      </CardContent>
    </Card>
  )
}

