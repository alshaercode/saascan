
import React from "react";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

interface InputValidationProps {
  input: string;
  isAnalyzing: boolean;
}

const InputValidation = ({ input, isAnalyzing }: InputValidationProps) => {
  const getValidationStatus = () => {
    if (isAnalyzing) return { icon: Clock, color: "bg-blue-100 text-blue-800", text: "Analyzing..." };
    if (input.length < 20) return { icon: AlertCircle, color: "bg-red-100 text-red-800", text: "Too Short" };
    if (input.length < 50) return { icon: AlertCircle, color: "bg-yellow-100 text-yellow-800", text: "Add More Details" };
    if (input.length < 100) return { icon: CheckCircle, color: "bg-green-100 text-green-800", text: "Good Length" };
    return { icon: CheckCircle, color: "bg-green-100 text-green-800", text: "Detailed Description" };
  };

  const status = getValidationStatus();
  const Icon = status.icon;

  return (
    <div className="flex items-center justify-between">
      <Badge className={`${status.color} flex items-center gap-1 text-xs`}>
        <Icon className="w-3 h-3" />
        {status.text}
      </Badge>
      <Badge variant="outline" className="text-xs">
        {input.length} characters
      </Badge>
    </div>
  );
};

export default InputValidation;
