import { inngest } from "@/app/utils/inngest/client";
import { serve } from "inngest/next";
import { handleJobExpiration, sendPeriodicJobListings } from "./functions";


// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    handleJobExpiration,
    sendPeriodicJobListings
  ],
});