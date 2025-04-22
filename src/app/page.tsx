"use client";

// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { databases, DATABASE_ID, USER_COLLECTION_ID } from "@/lib/appwrite.config";

// export default function Home() {
//   const router = useRouter();

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
//       <main className="flex flex-col gap-8 items-center">
//         <h1 className="text-2xl font-bold">Welcome to Case Management System</h1>
//         <Button
//           onClick={() => router.push("/sign-up")}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           sign-up
//         </Button>
//         <Button
//           onClick={() => router.push("/sign-in")}
//           className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//         >
//           sign In
//         </Button>
        
//       </main>
//     </div>
//   );
// }


import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
  Check,
  ChevronRight,
  Scale,
  Bell,
  Brain,
  Calendar,
  Briefcase,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react"

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className=" px-5 sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-purple-600" />
            <span className="  text-xl font-semibold tracking-tight">Hi Law</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
            >
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors">
              Pricing
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors">
              Resources
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-sm font-medium text-gray-600 hover:text-purple-600 hidden sm:block">
              Sign In
            </Link>
            <Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-5"onClick={() => router.push("/sign-up") }>Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-28 lg:py-36">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-[1fr_500px] lg:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none">
                    Elevate Your Legal Practice with Hi Law
                  </h1>
                  <p className="max-w-[600px] text-gray-500 text-lg md:text-xl leading-relaxed">
                    The all-in-one platform that helps legal professionals manage cases, automate routine tasks, and
                    leverage AI to deliver exceptional client service.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-6 py-6" onClick={() => router.push("/sign-up") }>
                    Start Free Trial
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="rounded-full px-6 py-6 border-gray-200">
                    Watch Demo
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm pt-2">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="inline-block h-8 w-8 rounded-full bg-gray-200 ring-2 ring-white" />
                    ))}
                  </div>
                  <div className="text-gray-500">
                    Trusted by <span className="font-medium text-gray-900">1,000+</span> law firms nationwide
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600/20 to-purple-400/20 blur-xl"></div>
                <Image
                  src="/placeholder.svg?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Legal Dashboard Preview"
                  className="relative mx-auto aspect-video overflow-hidden rounded-2xl object-cover shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-28 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2 max-w-[800px]">
                <div className="inline-block rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-700">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Streamline Your Legal Workflow</h2>
                <p className="text-gray-500 text-lg md:text-xl max-w-[700px] mx-auto mt-4">
                  Hi Law provides the essential tools to manage your legal practice efficiently and effectively.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 py-8 md:grid-cols-2 lg:gap-16">
              <div className="grid gap-8">
                <div className="group relative bg-white p-6 rounded-2xl shadow-sm transition-all hover:shadow-md">
                  <div className="absolute top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div className="pl-16">
                    <h3 className="text-xl font-semibold mb-2">Case Management</h3>
                    <p className="text-gray-500">
                      Organize all case details, documents, and communications in one secure, accessible platform.
                    </p>
                  </div>
                </div>
                <div className="group relative bg-white p-6 rounded-2xl shadow-sm transition-all hover:shadow-md">
                  <div className="absolute top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <Bell className="h-6 w-6" />
                  </div>
                  <div className="pl-16">
                    <h3 className="text-xl font-semibold mb-2">Automated Reminders</h3>
                    <p className="text-gray-500">
                      Never miss a deadline with intelligent reminders for court dates, filings, and client meetings.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-8">
                <div className="group relative bg-white p-6 rounded-2xl shadow-sm transition-all hover:shadow-md">
                  <div className="absolute top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <Brain className="h-6 w-6" />
                  </div>
                  <div className="pl-16">
                    <h3 className="text-xl font-semibold mb-2">Legal AI Expert</h3>
                    <p className="text-gray-500">
                      Leverage AI to draft documents, research case law, and provide legal insights in seconds.
                    </p>
                  </div>
                </div>
                <div className="group relative bg-white p-6 rounded-2xl shadow-sm transition-all hover:shadow-md">
                  <div className="absolute top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="pl-16">
                    <h3 className="text-xl font-semibold mb-2">Time & Billing</h3>
                    <p className="text-gray-500">
                      Track billable hours, generate invoices, and process payments all within one integrated system.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2 max-w-[800px]">
                <div className="inline-block rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-700">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Trusted by legal professionals</h2>
                <p className="text-gray-500 text-lg md:text-xl max-w-[700px] mx-auto mt-4">
                  See what attorneys and law firms have to say about Hi Law.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl gap-8 py-8 md:grid-cols-3">
              {[
                {
                  quote:
                    "Hi Law has transformed our practice. The case management system alone has increased our efficiency by 35%, allowing us to take on more clients.",
                  author: "Robert Henderson",
                  role: "Managing Partner, Henderson & Associates",
                },
                {
                  quote:
                    "The Legal AI Expert feature has revolutionized our research process. What used to take hours now takes minutes, with more comprehensive results.",
                  author: "Jessica Martinez",
                  role: "Senior Attorney, Martinez Legal Group",
                },
                {
                  quote:
                    "As a solo practitioner, Hi Law gives me the tools to compete with larger firms. The automated reminders ensure I never miss a deadline.",
                  author: "David Washington",
                  role: "Independent Attorney",
                },
              ].map((testimonial, i) => (
                <div key={i} className="relative bg-white p-8 rounded-2xl shadow-sm">
                  <div className="mb-6 text-gray-500 italic leading-relaxed">"{testimonial.quote}"</div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gray-100"></div>
                    <div>
                      <div className="font-medium text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-20 md:py-28 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2 max-w-[800px]">
                <div className="inline-block rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-700">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Plans for every practice</h2>
                <p className="text-gray-500 text-lg md:text-xl max-w-[700px] mx-auto mt-4">
                  Choose the plan that fits your practice size and needs. All plans include a 14-day free trial.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl gap-8 py-8 md:grid-cols-3">
              {[
                {
                  name: "Solo Practitioner",
                  price: "$49",
                  description: "Perfect for independent attorneys managing their own practice.",
                  features: [
                    "Case management for up to 50 active cases",
                    "Automated reminders",
                    "Basic document automation",
                    "10GB document storage",
                    "Email support",
                  ],
                },
                {
                  name: "Small Firm",
                  price: "$99",
                  description: "Ideal for small law firms with multiple attorneys working together.",
                  features: [
                    "Up to 5 attorney accounts",
                    "Case management for up to 200 active cases",
                    "Advanced document automation",
                    "Legal AI Expert access",
                    "Time & billing integration",
                    "50GB document storage",
                    "Priority support",
                  ],
                },
                {
                  name: "Large Practice",
                  price: "$249",
                  description: "For established firms with complex needs and multiple practice areas.",
                  features: [
                    "Unlimited attorney accounts",
                    "Unlimited case management",
                    "Advanced Legal AI capabilities",
                    "Custom workflow automation",
                    "Client portal access",
                    "Unlimited document storage",
                    "Dedicated account manager",
                    "API access for custom integrations",
                  ],
                },
              ].map((plan, i) => (
                <div
                  key={i}
                  className={`relative bg-white p-8 rounded-2xl ${
                    i === 1
                      ? "shadow-xl ring-1 ring-purple-100 before:absolute before:-inset-px before:-z-10 before:rounded-[17px] before:bg-gradient-to-b before:from-purple-600 before:to-purple-400 before:blur-sm"
                      : "shadow-sm"
                  }`}
                >
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <p className="text-gray-500 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full rounded-full py-6 ${
                      i === 1
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200"
                    }`}
                  >
                    {i === 1 ? "Get Started" : "Start Free Trial"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl bg-gradient-to-r from-purple-50 to-purple-100 p-8 md:p-12 rounded-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
                Ready to transform your legal practice?
              </h2>
              <p className="text-gray-600 text-lg md:text-xl max-w-[600px] mx-auto mb-8">
                Join hundreds of legal professionals already using Hi Law to streamline their workflow and serve clients
                better.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-8 py-6 text-white">
                  Start Your Free Trial
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="rounded-full px-8 py-6 border-gray-200 bg-white">
                  Schedule a Demo
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-6">No credit card required. 14-day free trial.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-100 py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Scale className="h-6 w-6 text-purple-600" />
                <span className="text-lg font-semibold">Hi Law</span>
              </div>
              <p className="text-gray-500 max-w-xs">
                The all-in-one platform for legal professionals to manage cases, automate tasks, and leverage AI.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium mb-4">Product</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="#" className="text-gray-500 hover:text-purple-600">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-500 hover:text-purple-600">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-500 hover:text-purple-600">
                      Integrations
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-500 hover:text-purple-600">
                      Updates
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-4">Company</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="#" className="text-gray-500 hover:text-purple-600">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-500 hover:text-purple-600">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-500 hover:text-purple-600">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-500 hover:text-purple-600">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Stay updated</h3>
              <p className="text-gray-500 mb-4">Subscribe to our newsletter for the latest updates and features.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-full px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
                <Button className="rounded-full bg-purple-600 hover:bg-purple-700">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">© 2023 Hi Law. All rights reserved.</div>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-400 hover:text-gray-600">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-600">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-gray-500 hover:text-purple-600">
                Terms
              </Link>
              <Link href="#" className="text-gray-500 hover:text-purple-600">
                Privacy
              </Link>
              <Link href="#" className="text-gray-500 hover:text-purple-600">
                Security
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
