"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const kidneyDiseaseFormSchema = z.object({
  age: z.coerce
    .number()
    .min(18, { message: "Age must be at least 18" })
    .max(120, { message: "Age must be less than 120" }),
  bp: z.coerce
    .number()
    .min(50, { message: "Blood pressure must be at least 50" })
    .max(250, { message: "Blood pressure must be less than 250" }),
  sg: z.string().min(1, { message: "Please select specific gravity" }),
  al: z.string().min(1, { message: "Please select albumin level" }),
  su: z.string().min(1, { message: "Please select sugar level" }),
  rbc: z.string().min(1, { message: "Please select RBC result" }),
  pc: z.string().min(1, { message: "Please select pus cell result" }),
  pcc: z.string().min(1, { message: "Please select pus cell clumps result" }),
  ba: z.string().min(1, { message: "Please select bacteria result" }),
  bgr: z.coerce
    .number()
    .min(50, { message: "Blood glucose must be at least 50" })
    .max(500, { message: "Blood glucose must be less than 500" }),
  bu: z.coerce
    .number()
    .min(10, { message: "Blood urea must be at least 10" })
    .max(200, { message: "Blood urea must be less than 200" }),
  sc: z.coerce
    .number()
    .min(0.4, { message: "Serum creatinine must be at least 0.4" })
    .max(15, { message: "Serum creatinine must be less than 15" }),
  sod: z.coerce
    .number()
    .min(100, { message: "Sodium must be at least 100" })
    .max(200, { message: "Sodium must be less than 200" }),
  pot: z.coerce
    .number()
    .min(2, { message: "Potassium must be at least 2" })
    .max(8, { message: "Potassium must be less than 8" }),
  hemo: z.coerce
    .number()
    .min(3, { message: "Hemoglobin must be at least 3" })
    .max(20, { message: "Hemoglobin must be less than 20" }),
  pcv: z.coerce
    .number()
    .min(15, { message: "PCV must be at least 15" })
    .max(60, { message: "PCV must be less than 60" }),
  wc: z.coerce
    .number()
    .min(2000, { message: "WBC count must be at least 2000" })
    .max(25000, { message: "WBC count must be less than 25000" }),
  htn: z.string().min(1, { message: "Please select hypertension status" }),
  dm: z.string().min(1, { message: "Please select diabetes mellitus status" }),
  cad: z.string().min(1, { message: "Please select coronary artery disease status" }),
  appet: z.string().min(1, { message: "Please select appetite status" }),
  pe: z.string().min(1, { message: "Please select pedal edema status" }),
  ane: z.string().min(1, { message: "Please select anemia status" }),
})

interface KidneyDiseaseFormProps {
  onSubmit: (data: z.infer<typeof kidneyDiseaseFormSchema>) => void
  isLoading: boolean
}

export function KidneyDiseaseForm({ onSubmit, isLoading }: KidneyDiseaseFormProps) {
  const form = useForm<z.infer<typeof kidneyDiseaseFormSchema>>({
    resolver: zodResolver(kidneyDiseaseFormSchema),
    defaultValues: {
      age: 50,
      bp: 80,
      sg: "",
      al: "",
      su: "",
      rbc: "",
      pc: "",
      pcc: "",
      ba: "",
      bgr: 120,
      bu: 40,
      sc: 1.2,
      sod: 135,
      pot: 4.5,
      hemo: 14,
      pcv: 40,
      wc: 8000,
      htn: "",
      dm: "",
      cad: "",
      appet: "",
      pe: "",
      ane: "",
    },
  })

  const handleSubmit = (values: z.infer<typeof kidneyDiseaseFormSchema>) => {
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
            name="bp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Pressure (mm/Hg)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Urine Test Results</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="sg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Specific Gravity
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Concentration of particles in urine</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select specific gravity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1.005">1.005</SelectItem>
                      <SelectItem value="1.010">1.010</SelectItem>
                      <SelectItem value="1.015">1.015</SelectItem>
                      <SelectItem value="1.020">1.020</SelectItem>
                      <SelectItem value="1.025">1.025</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="al"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Albumin</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select albumin level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="su"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sugar</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sugar level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rbc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Red Blood Cells</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select RBC result" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="abnormal">Abnormal</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pus Cell</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pus cell result" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="abnormal">Abnormal</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pcc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pus Cell Clumps</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select result" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="present">Present</SelectItem>
                      <SelectItem value="notpresent">Not Present</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ba"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bacteria</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select result" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="present">Present</SelectItem>
                      <SelectItem value="notpresent">Not Present</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h3 className="text-lg font-medium mt-6">Blood Test Results</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="bgr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Glucose Random (mg/dL)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Urea (mg/dL)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serum Creatinine (mg/dL)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sodium (mEq/L)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Potassium (mEq/L)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hemo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hemoglobin (g/dL)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pcv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Packed Cell Volume
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Percentage of red blood cells in blood</p>
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
              name="wc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>White Blood Cell Count (cells/cmm)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h3 className="text-lg font-medium mt-6">Medical History</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="htn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hypertension</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diabetes Mellitus</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coronary Artery Disease</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="appet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Appetite</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Pedal Edema
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Swelling of the feet and ankles</p>
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
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ane"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anemia</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Processing..." : "Predict Kidney Disease Risk"}
        </Button>
      </form>
    </Form>
  )
}

