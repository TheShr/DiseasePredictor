import { DiseasePredictor } from "@/components/disease-predictor"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme-preference">
      <main className="min-h-screen bg-background">
        <div className="container mx-auto py-10 px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">Chronic Disease Prediction</h1>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Select a disease type and enter your health information to get a prediction for potential chronic disease
            risk factors. This tool uses machine learning models to provide an estimate based on your inputs.
          </p>
          <DiseasePredictor />
        </div>
      </main>
    </ThemeProvider>
  )
}

