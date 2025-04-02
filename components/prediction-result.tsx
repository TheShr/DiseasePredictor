"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Heart, Activity, Droplet, Loader2 } from "lucide-react"
import type { DiseaseType } from "@/components/disease-predictor"

interface PredictionResultProps {
  result: any
  diseaseType: DiseaseType
  isLoading: boolean
}

export function PredictionResult({ result, diseaseType, isLoading }: PredictionResultProps) {
  if (isLoading) {
    return (
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Processing Prediction</CardTitle>
          <CardDescription>Please wait while we analyze your data</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
          <p className="text-center text-muted-foreground">Analyzing your health information...</p>
        </CardContent>
      </Card>
    )
  }

  if (!result) {
    return (
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Prediction Results</CardTitle>
          <CardDescription>
            {diseaseType
              ? "Complete the form and submit to see your risk assessment"
              : "Select a disease type to begin"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <div className="text-center text-muted-foreground">
            <AlertCircle className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>No data to display yet</p>
            <p className="text-sm mt-2">
              {diseaseType
                ? "Complete the health information form to see your results"
                : "Choose a disease type from the left panel to start"}
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getRiskLevel = (probability: number) => {
    if (probability < 0.2) return { label: "Low", color: "bg-green-500" }
    if (probability < 0.4) return { label: "Moderate", color: "bg-yellow-500" }
    if (probability < 0.7) return { label: "High", color: "bg-orange-500" }
    return { label: "Very High", color: "bg-red-500" }
  }

  const renderDiseaseIcon = () => {
    switch (diseaseType) {
      case "diabetes":
        return <Droplet className="h-8 w-8 text-blue-500 mb-4" />
      case "heart":
        return <Heart className="h-8 w-8 text-red-500 mb-4" />
      case "kidney":
        return <Activity className="h-8 w-8 text-purple-500 mb-4" />
      default:
        return <AlertCircle className="h-8 w-8 text-primary mb-4" />
    }
  }

  const getDiseaseName = () => {
    switch (diseaseType) {
      case "diabetes":
        return "Diabetes"
      case "heart":
        return "Heart Disease"
      case "kidney":
        return "Chronic Kidney Disease"
      default:
        return "Disease"
    }
  }

  const probability = result.probability || 0
  const riskLevel = getRiskLevel(probability)
  const prediction = result.prediction === 1 || result.prediction === true || result.prediction === "Positive"

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Prediction Results</CardTitle>
        <CardDescription>Your estimated risk based on provided information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert className="border-yellow-500/50 bg-yellow-500/10">
          <AlertCircle className="h-4 w-4 text-yellow-500" />
          <AlertTitle>Disclaimer</AlertTitle>
          <AlertDescription>
            This is not a medical diagnosis. Please consult with a healthcare professional for proper evaluation.
          </AlertDescription>
        </Alert>

        <div className="flex flex-col items-center justify-center py-8 text-center">
          {renderDiseaseIcon()}
          <h3 className="text-2xl font-bold mb-2">{getDiseaseName()} Risk Assessment</h3>

          <div className="w-full max-w-md mt-6">
            <div className="flex justify-between mb-2">
              <span>Risk Level</span>
              <span className={`font-medium ${riskLevel.color.replace("bg-", "text-")}`}>{riskLevel.label}</span>
            </div>
            <Progress value={probability * 100} className="h-3" indicatorClassName={riskLevel.color} />
          </div>

          <div className="mt-8 p-6 border rounded-lg w-full max-w-md">
            <p className="text-lg font-medium mb-4">
              {prediction
                ? "Positive prediction for " + getDiseaseName()
                : "Negative prediction for " + getDiseaseName()}
            </p>
            <p className="text-muted-foreground">
              {probability < 0.2
                ? `Your risk factors for ${getDiseaseName().toLowerCase()} appear to be low based on the information provided.`
                : probability < 0.4
                  ? `You have some risk factors for ${getDiseaseName().toLowerCase()}. Consider discussing with your doctor.`
                  : probability < 0.7
                    ? `You have several risk factors for ${getDiseaseName().toLowerCase()}. Consultation with a healthcare provider is recommended.`
                    : `You have significant risk factors for ${getDiseaseName().toLowerCase()}. Please consult with a healthcare provider soon.`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

