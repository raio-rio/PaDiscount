import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, UtensilsCrossed, ReceiptText, Sparkles } from "lucide-react";

const rules = [
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "20% + VAT exempt",
    body: "PWD and Senior discounts apply to meals of the qualified person. The share is VAT-exempt and gets 20% off.",
    tag: "R.A 9994 & 10754",
  },
  {
    icon: <UtensilsCrossed className="h-5 w-5" />,
    title: "Dine-in & take-out",
    body: "For restaurants, cafes, take-out/delivery meals. Not for retail-only counters (e.g., whole cakes/pasalubong shops).",
    tag: "Only food",
  },
  {
    icon: <ReceiptText className="h-5 w-5" />,
    title: "Look for line items",
    body: "Receipts should show the discount and VAT removal. Keep IDs handy for verification.",
    tag: "Transparent receipts",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "One benefit per transaction",
    body: "PWD/Senior discounts cannot stack with other promos. The higher discount usually applies.",
    tag: "No stacking",
  },
];

export function InfoGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {rules.map((rule) => (
        <Card key={rule.title} className="h-full border border-border bg-white">
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground">
                {rule.icon}
              </div>
              <div>
                <CardTitle className="text-base">{rule.title}</CardTitle>
                <CardDescription>{rule.body}</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="text-[11px] uppercase">
              {rule.tag}
            </Badge>
          </CardHeader>
          <CardContent />
        </Card>
      ))}
    </div>
  );
}
