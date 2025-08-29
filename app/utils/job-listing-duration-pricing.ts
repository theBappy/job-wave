interface Props {
  days: number;
  price: number;
  description: string;
}

export const jobListingDurationPricing: Props[] = [
  {
    days: 30,
    price: 79,
    description: "Standard listing",
  },
  {
    days: 60,
    price: 149,
    description: "Extended visibility",
  },
  {
    days: 90,
    price: 229,
    description: "Maximum exposure",
  },
];
