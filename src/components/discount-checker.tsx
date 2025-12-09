"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Calculator, Info, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DiscountChecker() {
  const [bill, setBill] = useState("1200");
  const [diners, setDiners] = useState("2");
  const [qualified, setQualified] = useState("1");

  const clampDiners = (value: number) => Math.max(value, 1);
  const clampQualified = (value: number, dinersValue: number) =>
    Math.min(Math.max(value, 1), dinersValue);

  const setDinersValue = (value: number) => {
    const dinersValue = clampDiners(value);
    const qualifiedValue = clampQualified(parseInt(qualified) || 1, dinersValue);
    setDiners(dinersValue.toString());
    setQualified(qualifiedValue.toString());
  };

  const setQualifiedValue = (value: number) => {
    const dinersValue = clampDiners(parseInt(diners) || 1);
    const qualifiedValue = clampQualified(value, dinersValue);
    setQualified(qualifiedValue.toString());
  };

  const stepValue = (field: "diners" | "qualified", delta: number) => {
    if (field === "diners") {
      const next = clampDiners((parseInt(diners) || 1) + delta);
      setDinersValue(next);
    } else {
      const dinersValue = clampDiners(parseInt(diners) || 1);
      const next = clampQualified((parseInt(qualified) || 1) + delta, dinersValue);
      setQualified(next.toString());
    }
  };

  const result = useMemo(() => {
    const billValue = parseFloat(bill) || 0;
    const totalDiners = Math.max(parseInt(diners) || 1, 1);
    const qualifiedDiners = Math.min(Math.max(parseInt(qualified) || 1, 1), totalDiners);
    const share = billValue * (qualifiedDiners / totalDiners);

    const baseNet = share / 1.12; // remove VAT portion
    const vatPortion = baseNet * 0.12;
    const discount = baseNet * 0.2;
    const totalSavings = discount + vatPortion;
    const expectedDue = billValue - totalSavings;

    return {
      share,
      vatPortion,
      discount,
      totalSavings,
      expectedDue,
      qualifiedDiners,
      totalDiners,
      billValue,
    };
  }, [bill, diners, qualified]);

  return (
    <Card className="glass gradient-border">
      <CardHeader className="bg-white/60 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-foreground/70">
          <Calculator className="h-4 w-4" />
          <span className="text-xs uppercase tracking-[0.15em]">Manual Checker</span>
        </div>
        <CardTitle>Check the right discount</CardTitle>
        <CardDescription>
          Quick estimator for dine-in/food purchases. Uses 20% PWD/Senior discount + 12% VAT
          exemption on the qualified diner&apos;s share.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-3">
            <Label htmlFor="bill">Bill subtotal (with VAT)</Label>
            <Input
              id="bill"
              type="number"
              min="0"
              inputMode="decimal"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="diners">Total diners sharing the bill</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                className="h-11 w-12 text-lg"
                onClick={() => stepValue("diners", -1)}
              >
                –
              </Button>
              <Input
                id="diners"
                type="number"
                min="1"
                inputMode="numeric"
                value={diners}
                className="text-center"
                onChange={(e) => setDinersValue(parseInt(e.target.value) || 1)}
              />
              <Button
                type="button"
                variant="secondary"
                className="h-11 w-12 text-lg"
                onClick={() => stepValue("diners", 1)}
              >
                +
              </Button>
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="qualified">Qualified diners (PWD/Senior)</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                className="h-11 w-12 text-lg"
                onClick={() => stepValue("qualified", -1)}
              >
                –
              </Button>
              <Input
                id="qualified"
                type="number"
                min="1"
                inputMode="numeric"
                value={qualified}
                className="text-center"
                onChange={(e) => setQualifiedValue(parseInt(e.target.value) || 1)}
              />
              <Button
                type="button"
                variant="secondary"
                className="h-11 w-12 text-lg"
                onClick={() => stepValue("qualified", 1)}
              >
                +
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-dashed border-border/70 bg-muted/60 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Estimated savings for the qualified diner&apos;s share
              </p>
              <div className="text-3xl font-semibold text-foreground">
                ₱{result.totalSavings.toFixed(2)}
              </div>
              <div className="text-xs text-muted-foreground">
                Discount (20%): ₱{result.discount.toFixed(2)} · VAT removed (12%): ₱
                {result.vatPortion.toFixed(2)}
              </div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
              <Percent className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-4 grid gap-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Bill entered</span>
              <span className="font-medium">₱{result.billValue.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Qualified share ({result.qualifiedDiners}/{result.totalDiners} of bill)
              </span>
              <span className="font-medium">₱{result.share.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Expected amount due</span>
              <span className="font-semibold text-emerald-700">
                ₱{Math.max(result.expectedDue, 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-lg border border-border/70 bg-muted/40 p-3 text-sm text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4" />
          <p>
            This tool assumes dine-in food purchases: 20% discount + 12% VAT exemption for the
            qualified diner&apos;s share only. Actual receipts may vary; always verify the line items
            and any service charges.
          </p>
        </div>

        <div className="flex items-start gap-2 rounded-lg border border-border/70 bg-white/80 p-3 text-sm text-muted-foreground">
          <AlertCircle className="mt-0.5 h-4 w-4" />
          <p>
            If a restaurant does not honor the correct PWD/Senior discount, you can report it to the DTI
            consumer care portal:{" "}
            <a
              className="font-semibold text-foreground underline"
              href="https://consumercare.dti.gov.ph/#/home"
              target="_blank"
              rel="noreferrer"
            >
              consumercare.dti.gov.ph
            </a>
            .
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
