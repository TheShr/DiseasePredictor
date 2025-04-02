"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Droplet, Activity } from "lucide-react"
import type { DiseaseType } from "@/components/disease-predictor"

interface DiseaseTypeSelectorProps {
  onSelect: (type: DiseaseType) => void
}

export function DiseaseTypeSelector({ onSelect }: DiseaseTypeSelectorProps) {
  return (
    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
      <Card
        className="p-6 cursor-pointer hover:bg-accent transition-colors flex flex-col items-center text-center"
        onClick={() => onSelect("diabetes")}
      >
        <Droplet className="h-12 w-12 text-blue-500 mb-4" />
        <h3 className="text-lg font-medium mb-2">Diabetes</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Predict risk of diabetes based on health metrics and lifestyle factors
        </p>
        <Button variant="outline" className="mt-auto w-full">
          Select
        </Button>
      </Card>

      <Card
        className="p-6 cursor-pointer hover:bg-accent transition-colors flex flex-col items-center text-center"
        onClick={() => onSelect("heart")}
      >
        <Heart className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-medium mb-2">Heart Disease</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Assess cardiovascular health and heart disease risk factors
        </p>
        <Button variant="outline" className="mt-auto w-full">
          Select
        </Button>
      </Card>

      <Card
        className="p-6 cursor-pointer hover:bg-accent transition-colors flex flex-col items-center text-center"
        onClick={() => onSelect("kidney")}
      >
        <Activity className="h-12 w-12 text-purple-500 mb-4" />
        <h3 className="text-lg font-medium mb-2">Kidney Disease</h3>
        <p className="text-sm text-muted-foreground mb-4">Evaluate kidney function and chronic kidney disease risk</p>
        <Button variant="outline" className="mt-auto w-full">
          Select
        </Button>
      </Card>
    </div>
  )
}

