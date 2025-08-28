import {
  Coffee,
  Home,
  Heart,
  Activity,
  Airplay,
  Star,
  LifeBuoy,
  BookOpen,
  Users,
  MapPin,
  Calendar,
  Truck,
  Umbrella,
  Gift,
} from "lucide-react";

interface Benefit {
  id: string;
  label: string;
  icon: React.ElementType;
}

export const benefits: Benefit[] = [
  { id: "flexible_hours", label: "Flexible Working Hours", icon: Activity },
  { id: "remote_work", label: "Remote Work", icon: Home },
  { id: "health_insurance", label: "Health Insurance", icon: Heart },
  { id: "coffee_snacks", label: "Free Coffee & Snacks", icon: Coffee },
  { id: "team_building", label: "Team Building Events", icon: Users },
  { id: "paid_time_off", label: "Paid Time Off", icon: Calendar },
  { id: "gym_membership", label: "Gym Membership", icon: Star },
  { id: "professional_dev", label: "Professional Development", icon: BookOpen },
  { id: "life_insurance", label: "Life Insurance", icon: LifeBuoy },
  { id: "relocation_assist", label: "Relocation Assistance", icon: MapPin },
  { id: "commuter_benefits", label: "Commuter Benefits", icon: Truck },
  { id: "work_anywhere", label: "Work From Anywhere", icon: Airplay },
  { id: "annual_bonus", label: "Annual Bonus", icon: Gift },
  { id: "parental_leave", label: "Parental Leave", icon: Umbrella },
  { id: "employee_recognition", label: "Employee Recognition Program", icon: Star },
];
