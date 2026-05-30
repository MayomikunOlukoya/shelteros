import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <span className="text-xl font-semibold tracking-tight">ShelterOS</span>
        <div className="flex items-center gap-3">
          <Button variant="ghost">Sign in</Button>
          <Button>Get started</Button>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center text-center px-8 py-32">
        <span className="text-sm font-medium text-teal-600 mb-4">
          UK · US · Canada
        </span>
        <h1 className="text-5xl font-semibold tracking-tight text-gray-900 max-w-2xl mb-6">
          Find a home you can actually afford
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mb-10">
          ShelterOS searches every social housing register, affordable scheme,
          and rent-to-own opportunity — and tells you exactly what you qualify for.
        </p>
        <div className="flex items-center gap-4">
          <Button size="lg">Find housing now</Button>
          <Button size="lg" variant="outline">How it works</Button>
        </div>
      </section>
    </main>
  )
}