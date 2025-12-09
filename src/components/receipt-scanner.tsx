"use client";

import { useMemo, useState } from "react";
import { Loader2, Scan, Upload, Wand2, FileText, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

type ParsedReceipt = {
  total?: number;
  discountLines: Array<{ label: string; value?: number }>;
  raw: string;
};

export function ReceiptScanner() {
  const [preview, setPreview] = useState<string | null>(null);
  const [ocrText, setOcrText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [parsed, setParsed] = useState<ParsedReceipt | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file?: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const url = reader.result as string;
      setPreview(url);
      setIsLoading(true);
      setError(null);
      try {
        const { createWorker } = await import("tesseract.js");
        const worker = await createWorker("eng");
        const {
          data: { text },
        } = await worker.recognize(url);
        await worker.terminate();
        setOcrText(text.trim());
        setParsed(parseReceipt(text));
      } catch (err) {
        console.error(err);
        setError("OCR failed. Try a clearer photo with good lighting.");
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const guidance = useMemo(
    () => [
      "Capture the entire receipt on a flat surface",
      "Avoid glare; natural light works best",
      "Focus on total and discount lines",
    ],
    [],
  );

  return (
    <Card id="scanner" className="glass gradient-border">
      <CardHeader className="bg-white/60 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-foreground/70">
          <Scan className="h-4 w-4" />
          <span className="text-xs uppercase tracking-[0.15em]">Receipt Scanner</span>
        </div>
        <CardTitle>Scan a receipt for PWD/Senior checks</CardTitle>
        <CardDescription>
          Runs on-device OCR via Tesseract.js. We look for totals and discount lines to help you
          confirm compliance.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border/70 bg-muted/40 p-6 text-center">
            {preview ? (
              <div className="relative w-full overflow-hidden rounded-lg border border-border bg-white">
                <img src={preview} alt="Receipt preview" className="max-h-[320px] w-full object-cover" />
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="absolute right-2 top-2 bg-white/90"
                  onClick={() => {
                    setPreview(null);
                    setParsed(null);
                    setOcrText("");
                  }}
                >
                  Clear
                </Button>
              </div>
            ) : (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
                  <Upload className="h-5 w-5" />
                </div>
                <p className="text-lg font-semibold text-foreground">Upload a receipt photo</p>
                <p className="text-sm text-muted-foreground">
                  JPG/PNG. We process on your device for privacy.
                </p>
              </>
            )}
            <input
              id="file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            <label
              htmlFor="file"
              className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background shadow-sm transition hover:-translate-y-0.5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  Scan receipt
                </>
              )}
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            {guidance.map((tip) => (
              <Badge key={tip} variant="outline" className="text-xs">
                {tip}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-red-50 p-3 text-sm text-destructive">
              <AlertTriangle className="mt-0.5 h-4 w-4" />
              <p>{error}</p>
            </div>
          )}

          <div className="rounded-xl border border-border bg-white/80 p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <FileText className="h-4 w-4" />
              OCR Result
            </div>
            <Textarea
              placeholder="Recognized text will appear here..."
              value={ocrText}
              onChange={(e) => {
                setOcrText(e.target.value);
                setParsed(parseReceipt(e.target.value));
              }}
            />
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Wand2 className="h-4 w-4" />
              Findings
            </div>
            {parsed ? (
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
                  <span className="text-muted-foreground">Detected total</span>
                  <span className="font-semibold">
                    {parsed.total ? `₱${parsed.total.toFixed(2)}` : "Not found"}
                  </span>
                </div>
                {parsed.discountLines.length > 0 ? (
                  parsed.discountLines.map((line, idx) => (
                    <div
                      key={`${line.label}-${idx}`}
                      className="flex items-center justify-between rounded-lg bg-white px-3 py-2"
                    >
                      <span className="text-muted-foreground">{line.label}</span>
                      <span className="font-semibold">
                        {line.value ? `₱${line.value.toFixed(2)}` : "Seen"}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No discount line detected yet.</p>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Upload a receipt to see extracted info.</p>
            )}
          </div>

          <div className="flex items-start gap-2 rounded-lg border border-border/70 bg-white/80 p-3 text-sm text-muted-foreground">
            <AlertTriangle className="mt-0.5 h-4 w-4" />
            <p>
              If a restaurant doesn’t honor the correct PWD/Senior discount, report it to the DTI consumer
              care portal:{" "}
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
        </div>
      </CardContent>
    </Card>
  );
}

function parseReceipt(raw: string): ParsedReceipt {
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const amounts = lines
    .map((line) => {
      const match = line.match(/([\d,]+(?:\.\d{2})?)/);
      return match ? parseFloat(match[1].replace(/,/g, "")) : undefined;
    })
    .filter((n): n is number => Number.isFinite(n));

  let detectedTotal: number | undefined;
  for (const line of lines) {
    if (/total|amount due|amt due/i.test(line)) {
      const match = line.match(/([\d,]+(?:\.\d{2})?)/);
      if (match) {
        detectedTotal = parseFloat(match[1].replace(/,/g, ""));
        break;
      }
    }
  }
  if (!detectedTotal && amounts.length) {
    detectedTotal = Math.max(...amounts);
  }

  const discountLines: Array<{ label: string; value?: number }> = [];
  for (const line of lines) {
    if (/discount|pwd|senior/i.test(line)) {
      const match = line.match(/([\d,]+(?:\.\d{2})?)/);
      discountLines.push({
        label: line,
        value: match ? parseFloat(match[1].replace(/,/g, "")) : undefined,
      });
    }
  }

  return {
    total: detectedTotal,
    discountLines,
    raw,
  };
}
