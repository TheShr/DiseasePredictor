"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const heartDiseaseFormSchema = z.object({
  age: z.coerce
    .number()
    .min(18, { message: "Age must be at least 18" })
    .max(120, { message: "Age must be less than 120" }),
  sex: z.string().min(1, { message: "Please select your sex" }),
  cp: z.string().min(1, { message: "Please select chest pain type" }),
  trestbps: z.coerce
    .number()
    .min(50, { message: "Resting BP must be at least 50" })
    .max(250, { message: "Resting BP must be less than 250" }),
  chol: z.coerce
    .number()
    .min(100, { message: "Cholesterol must be at least 100" })
    .max(600, { message: "Cholesterol must be less than 600" }),
  fbs: z.string().min(1, { message: "Please select fasting blood sugar" }),
  restecg: z.string().min(1, { message: "Please select resting ECG results" }),
  thalach: z.coerce
    .number()
    .min(50, { message: "Max heart rate must be at least 50" })
    .max(250, { message: "Max heart rate must be less than 250" }),
  exang: z.string().min(1, { message: "Please select exercise induced angina" }),
  oldpeak: z.coerce
    .number()
    .min(0, { message: "ST depression must be at least 0" })
    .max(10, { message: "ST depression must be less than 10" }),
  slope: z.string().min(1, { message: "Please select slope of peak exercise ST segment" }),
  ca: z.string().min(1, { message: "Please select number of major vessels" }),
  thal: z.string().min(1, { message: "Please select thalassemia status" }),
})

interface HeartDiseaseFormProps {
  onSubmit: (data: z.infer<typeof heartDiseaseFormSchema>) => void
  isLoading: boolean
}

export function HeartDiseaseForm({ onSubmit, isLoading }: HeartDiseaseFormProps) {
  const form = useForm<z.infer<typeof heartDiseaseFormSchema>>({
    resolver: zodResolver(heartDiseaseFormSchema),
    defaultValues: {
      age: 55,
      sex: "",
      cp: "",
      trestbps: 120,
      chol: 200,
      fbs: "",
      restecg: "",
      thalach: 150,
      exang: "",
      oldpeak: 0,
      slope: "",
      ca: "",
      thal: "",
    },
  })

  const handleSubmit = (values: z.infer<typeof heartDiseaseFormSchema>) => {
    onSubmit(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sex</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sex" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Male</SelectItem>
                    <SelectItem value="0">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="cp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  Chest Pain Type
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Type of chest pain experienced</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select chest pain type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Typical Angina</SelectItem>
                    <SelectItem value="2">Atypical Angina</SelectItem>
                    <SelectItem value="3">Non-anginal Pain</SelectItem>
                    <SelectItem value="4">Asymptomatic</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="trestbps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Resting Blood Pressure
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Resting blood pressure in mm Hg</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="chol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serum Cholesterol (mg/dl)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="fbs"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  Fasting Blood Sugar &gt; 120 mg/dl
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Is fasting blood sugar greater than 120 mg/dl?</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Yes</SelectItem>
                    <SelectItem value="0">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="restecg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resting ECG Results</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ECG results" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">Normal</SelectItem>
                    <SelectItem value="1">ST-T Wave Abnormality</SelectItem>
                    <SelectItem value="2">Left Ventricular Hypertrophy</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thalach"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Heart Rate Achieved</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="exang"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exercise Induced Angina</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Yes</SelectItem>
                    <SelectItem value="0">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="oldpeak"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  ST Depression
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">ST depression induced by exercise relative to rest</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <div className="pt-2">
                    <Slider
                      min={0}
                      max={6.2}
                      step={0.1}
                      defaultValue={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                  </div>
                </FormControl>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0</span>
                  <span>{field.value}</span>
                  <span>6.2</span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slope"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slope of Peak Exercise ST Segment</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select slope" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Upsloping</SelectItem>
                    <SelectItem value="2">Flat</SelectItem>
                    <SelectItem value="3">Downsloping</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ca"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Major Vessels Colored by Fluoroscopy</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thal"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  Thalassemia
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          A blood disorder that affects the body's ability to produce hemoglobin
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select thalassemia status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Normal</SelectItem>
                    <SelectItem value="2">Fixed Defect</SelectItem>
                    <SelectItem value="3">Reversible Defect</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Processing..." : "Predict Heart Disease Risk"}
        </Button>
      </form>
    </Form>
  )
}

