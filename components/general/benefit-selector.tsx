import { benefits } from "@/app/utils/list-of-benefits";
import { Badge } from "../ui/badge";
import { ControllerRenderProps } from "react-hook-form";

interface Props {
  field: ControllerRenderProps;
}

export function BenefitSelector({ field }: Props) {
  function toggleBenefit(benefitId: string) {
    const currentBenefits = field.value || [];

    const newBenefits = currentBenefits.includes(benefitId)
      ? currentBenefits.filter((id: string) => id !== benefitId)
      : [...currentBenefits, benefitId];

    field.onChange(newBenefits);
  }

  return (
    <div className="">
      <div className="flex flex-wrap gap-3">
        {benefits.map((benefit) => {
          const isSelected = (field.value || []).includes(benefit.id);
          const Icon = benefit.icon;
          return (
            <Badge
              onClick={() => toggleBenefit(benefit.id)}
              key={benefit.id}
              variant={isSelected ? "default" : "outline"}
              className="flex items-center gap-1 px-5 py-1.5 rounded-full text-sm cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              <Icon className="w-3 h-3" />
              <span>{benefit.label}</span>
            </Badge>
          );
        })}
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        Selected Benefits:{" "}
        <span className="text-primary">{(field.value || []).length}</span>
      </div>
    </div>
  );
}
