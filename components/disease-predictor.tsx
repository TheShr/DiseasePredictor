"use client"

import { useState } from "react"
import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PredictionResult } from "@/components/prediction-result"
import { DiseaseTypeSelector } from "@/components/disease-type-selector"
import { DiabetesForm } from "@/components/disease-forms/diabetes-form"
import { HeartDiseaseForm } from "@/components/disease-forms/heart-disease-form"
import { KidneyDiseaseForm } from "@/components/disease-forms/kidney-disease-form"

export type DiseaseType = "diabetes" | "heart" | "kidney" | null

export function DiseasePredictor() {
  const [diseaseType, setDiseaseType] = useState<DiseaseType>(null)
  const [predictionResult, setPredictionResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDiseaseTypeSelect = (type: DiseaseType) => {
    setDiseaseType(type)
    setPredictionResult(null)
    setError(null)
  }

  const handlePredictionSubmit = async (formData: any) => {
    if (!diseaseType) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          disease_type: diseaseType,
          features: formData,
        }),
      })

      if (!response.ok) {
        throw new Error("Prediction request failed")
      }

      const result = await response.json()
      setPredictionResult(result)
    } catch (err) {
      console.error("Error making prediction:", err)
      setError("Failed to get prediction. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const renderDiseaseForm = () => {
    switch (diseaseType) {
      case "diabetes":
        return <DiabetesForm onSubmit={handlePredictionSubmit} isLoading={isLoading} />
      case "heart":
        return <HeartDiseaseForm onSubmit={handlePredictionSubmit} isLoading={isLoading} />
      case "kidney":
        return <KidneyDiseaseForm onSubmit={handlePredictionSubmit} isLoading={isLoading} />
      default:
        return <DiseaseTypeSelector onSelect={handleDiseaseTypeSelect} />
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>
            {diseaseType
              ? `${diseaseType.charAt(0).toUpperCase() + diseaseType.slice(1)} Disease Prediction`
              : "Select Disease Type"}
          </CardTitle>
          <CardDescription>
            {diseaseType
              ? "Enter your health details to get a prediction"
              : "Choose the type of chronic disease to predict"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {renderDiseaseForm()}

          {diseaseType && (
            <Button variant="outline" className="mt-6 w-full" onClick={() => setDiseaseType(null)} disabled={isLoading}>
              Change Disease Type
            </Button>
          )}
        </CardContent>
      </Card>

      <PredictionResult result={predictionResult} diseaseType={diseaseType} isLoading={isLoading} />
    </div>
  )
}

