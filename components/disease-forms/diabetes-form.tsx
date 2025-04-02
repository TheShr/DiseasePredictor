"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const diabetesFormSchema = z.object({
  pregnancies: z.coerce
    .number()
    .min(0, { message: "Pregnancies must be at least 0" })
    .max(20, { message: "Pregnancies must be less than 20" }),
  glucose: z.coerce
    .number()
    .min(0, { message: "Glucose must be at least 0" })
    .max(300, { message: "Glucose must be less than 300" }),
  bloodPressure: z.coerce
    .number()
    .min(0, { message: "Blood pressure must be at least 0" })
    .max(200, { message: "Blood pressure must be less than 200" }),
  skinThickness: z.coerce
    .number()
    .min(0, { message: "Skin thickness must be at least 0" })
    .max(100, { message: "Skin thickness must be less than 100" }),
  insulin: z.coerce
    .number()
    .min(0, { message: "Insulin must be at least 0" })
    .max(1000, { message: "Insulin must be less than 1000" }),
  bmi: z.coerce
    .number()
    .min(10, { message: "BMI must be at least 10" })
    .max(50, { message: "BMI must be less than 50" }),
  diabetesPedigreeFunction: z.coerce
    .number()
    .min(0, { message: "Diabetes pedigree function must be at least 0" })
    .max(2.5, { message: "Diabetes pedigree function must be less than 2.5" }),
  age: z.coerce
    .number()
    .min(18, { message: "Age must be at least 18" })
    .max(120, { message: "Age must be less than 120" }),
})

interface DiabetesFormProps {
  onSubmit: (data: z.infer<typeof diabetesFormSchema>) => void
  isLoading: boolean
}

export function DiabetesForm({ onSubmit, isLoading }: DiabetesFormProps) {
  const form = useForm<z.infer<typeof diabetesFormSchema>>({
    resolver: zodResolver(diabetesFormSchema),
    defaultValues: {
      pregnancies: 0,
      glucose: 100,
      bloodPressure: 70,
      skinThickness: 20,
      insulin: 80,
      bmi: 25,
      diabetesPedigreeFunction: 0.5,
      age: 45,
    },
  })

  const handleSubmit = (values: z.infer<typeof diabetesFormSchema>) => {
    onSubmit(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="pregnancies"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  Pregnancies
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Number of times pregnant</p>
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
            name="glucose"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  Glucose (mg/dL)
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Plasma glucose concentration (2 hours after glucose tolerance test)</p>
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
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Clinical Measurements</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="bloodPressure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Blood Pressure (mm Hg)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Diastolic blood pressure</p>
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
              name="skinThickness"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Skin Thickness (mm)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Triceps skin fold thickness</p>
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
              name="insulin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Insulin (μU/ml)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">2-Hour serum insulin</p>
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
              name="bmi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    BMI (kg/m²)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Body Mass Index (weight in kg/(height in m)²)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="diabetesPedigreeFunction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Diabetes Pedigree Function
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            A function which scores likelihood of diabetes based on family history
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age (years)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Processing..." : "Predict Diabetes Risk"}
        </Button>
      </form>
    </Form>
  )
}

