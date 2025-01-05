"use client";
import { GradientText } from '@/components/gradient-text'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Code, Zap, Rocket, RefreshCw, ChevronsLeftRightEllipsis } from 'lucide-react'
import { GradientBlob } from '@/components/gradient-blob'
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden pt-32 sm:py-32 sm:pt-52">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="absolute inset-0 -z-10">
            <GradientBlob />
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-5xl sm:text-6xl font-extrabold mb-6 mt-6 leading-tight">
              The ultimate tool kit for development on
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                Solana Devnet
              </span>
            </h1>
            <p className="text-base md:text-xl mt-8 mx-auto max-w-4xl text-gray-300">
              DevKit Launchpad is a Token & AMM Launchpad Tool on Solana Devnet.
            </p>
            <p className="text-base md:text-xl mt-2 mx-auto max-w-4xl text-gray-300">
              Users can launch their own Token & AMM Pools on Devnet to simulate Token Swapping & Liquidity Pools for development purposes.
            </p>
            <Link href="/dashboard" className="mt-12 inline-block">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-12 py-6 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition duration-300">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              "Testing & Development with Ease"
            </span>
          </h2>
          <p className="text-lg mb-12 mt-4 mx-auto max-w-4xl text-center text-gray-300">
            Devkit Launchpad makes it easier for developers to test their programs on Solana
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Code className="w-16 h-16 text-cyan-400" />}
              title="Simulated Environment"
              description="Test your Solana programs in Devnet environment before deployment."
            />
            <FeatureCard
              icon={<Rocket className="w-16 h-16 text-blue-400" />}
              title="Token Launch"
              description="Create and launch your own tokens on Solana Devnet with ease."
            />
            <FeatureCard
              icon={<RefreshCw className="w-16 h-16 text-cyan-400" />}
              title="AMM Pools"
              description="Build and test Automated Market Maker pools to simulate token swapping."
            />
            <FeatureCard
              icon={<ChevronsLeftRightEllipsis className="w-16 h-16 text-blue-400" />}
              title="API Integration"
              description="Test your AMM transaction as simple as one API call. (Coming Soon)"
            />
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              What to use it for
            </span>
          </h2>
          <ul className="space-y-6 max-w-2xl mx-auto text-xl">
            {[
              "Simulate transactions like Mainnet",
              "Test your programs on devnet",
              "Launch your token on devnet",
              "Build AMMs on Devnet for liquidity & token swapping"
            ].map((item, index) => (
              <li key={index} className="flex items-center space-x-4 bg-gray-800 rounded-lg p-4 shadow-md">
                <ArrowRight className="text-cyan-400 flex-shrink-0" />
                <span className="text-gray-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Step By step Guide*/}
      <section id="use-cases" className="pb-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              How to use it
            </span>
          </h2>
        </div>
        <div className="md:w-[900px] mx-auto">
        <div className="flex items-center justify-between w-full py-4">
            <Image
              src="/dashboard.png"
              width={400}
              height={200}
              alt="phone"
              className="hidden md:block -ml-20"
            />
            <div className="flex flex-col w-full gap-4 flex-shrink-0 pl-16">
              <h1 className="text-4xl font-bold text-p4 max-md:h5">
                1. Open Dashboard & Connect Wallet
              </h1>
              <p className="body-3 text-gray-400">
                Simple & Secure connection to your wallet, no complicated
                setups required.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full py-4">
            <div className="flex flex-col gap-4 flex-shrink-0 pl-16 md:pl-0">
              <h1 className="text-4xl font-bold text-p4 max-md:h5">
                2. Create New Tokens
              </h1>
              <p className="body-3 text-gray-400">
                Create and Mint your own tokens in a few clicks.
              </p>
            </div>
            <Image
              src="/create-token.png"
              width={400}
              height={200}
              alt="phone"
              className="hidden md:block"
            />
          </div>
          <div className="flex items-center justify-between w-full py-4">
            <Image
              src="/initialize-amm.png"
              width={400}
              height={200}
              alt="phone"
              className="hidden md:block -ml-20"
            />
            <div className="flex flex-col w-full gap-4 flex-shrink-0 pl-16">
              <h1 className="text-4xl font-bold text-p4 max-md:h5">
                3. Initialize AMM Pool
              </h1>
              <p className="body-3 text-gray-400">
                Create an AMM Pool easily using new token or exsiting ones.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full py-4">
            <div className="flex flex-col gap-4 flex-shrink-0 pl-16 md:pl-0">
              <h1 className="text-4xl font-bold text-p4 max-md:h5">
                4. Deposit Liquidity
              </h1>
              <p className="body-3 text-gray-400">
                Add your tokens into the AMM Pool.
              </p>
            </div>
            <Image
              src="/deposit-liquidity.jpeg"
              width={400}
              height={200}
              alt="phone"
              className="hidden md:block"
            />
          </div>
          <div className="flex items-center justify-between w-full py-4">
            <Image
              src="/swap-token.png"
              width={400}
              height={200}
              alt="phone"
              className="hidden md:block -ml-20"
            />
            <div className="flex flex-col w-full gap-4 flex-shrink-0 pl-16">
              <h1 className="text-4xl font-bold text-p4 max-md:h5">
                5. Swap Tokens
              </h1>
              <p className="body-3 text-gray-400">
                Simulate AMM transactions for your Solana Program testing.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full py-4">
            <div className="flex flex-col gap-4 flex-shrink-0 pl-16 md:pl-0">
              <h1 className="text-4xl font-bold text-p4 max-md:h5">
              (Coming Soon) API Integration
              </h1>
              <p className="body-3 text-gray-400">
                Fetch Swap Instructions and add it in your own tests, similar to Jupiter API.
              </p>
            </div>
            <Image
              src="/api-integration.png"
              width={400}
              height={200}
              alt="phone"
              className="hidden md:block"
            />
          </div>
        </div>
        
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-blue-900 to-cyan-900 border-none shadow-2xl">
            <CardContent className="p-8 sm:p-16 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Ready to supercharge your{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                  Solana Development
                </span>
                ?
              </h2>
              <p className="text-xl mb-8 text-gray-300">
                Join DevKit Launchpad and take your Solana Development Projects to the next level.
              </p>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-12 py-6 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition duration-300">
                  Get Started
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>&copy; 2025 DevKit Launchpad. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-none shadow-lg hover:shadow-xl transition duration-300">
      <CardContent className="p-6 text-center">
        <div className="mb-6 flex justify-center">{icon}</div>
        <h3 className="text-2xl font-semibold mb-4 text-cyan-300">{title}</h3>
        <p className="text-gray-300 text-lg">{description}</p>
      </CardContent>
    </Card>
  )
}

