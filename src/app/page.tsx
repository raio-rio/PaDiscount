import { ArrowRight, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DiscountChecker } from "@/components/discount-checker";
import { ReceiptScanner } from "@/components/receipt-scanner";
import { InfoGrid } from "@/components/info-grid";

export default function Page() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(17,24,39,0.04),transparent_35%),radial-gradient(circle_at_top_right,rgba(75,85,99,0.05),transparent_40%)]" />
      <div className="relative mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12 md:py-16">
        <section className="grid gap-8">
          <div className="space-y-4 text-center">
            <a
              href="https://programmingrio.top"
              target="_blank"
              rel="noreferrer"
              className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-xs uppercase tracking-[0.18em] text-foreground transition hover:-translate-y-0.5 hover:shadow-sm"
            >
              <Globe2 className="h-4 w-4" />
              Rio Espinosa
            </a>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight text-foreground md:text-5xl">
                PaDiscount: PWD & Senior Checker
              </h1>
              <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
                PaDiscount is built for food establishments in the Philippines; restaurants, cafes,
                take-out, and delivery meals. Not for retail-only food counters (e.g., whole
                cake/pasalubong shops). 
              </p>
              <p className="text-sm font-medium text-emerald-700">
                Offline-ready: calculator, rules, and recent scans stay cached.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" className="gap-2" asChild>
                <a href="#scanner">
                  Scan receipt
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#checker">Manual checker</a>
              </Button>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                Verify IDs here:{" "}
                <a
                  className="font-semibold text-foreground underline"
                  href="https://pwd.doh.gov.ph/tbl_pwd_id_verificationlist.php"
                  target="_blank"
                  rel="noreferrer"
                >
                  PWD/Senior ID verification list
                </a>
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6">
          <div className="flex items-center gap-3">
            <Badge>For food establishments</Badge>
            <p className="text-sm text-muted-foreground">
              Make sure to ask for receipts that show the discount and VAT removal.
            </p>
          </div>
          <InfoGrid />
        </section>

        <section className="grid gap-4 rounded-2xl border border-border bg-white/80 p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Know your rights!
              </p>
              <h2 className="text-lg font-semibold text-foreground">
                Learn how PWD discounts apply to group meals and shared bills.
              </h2>
              <p className="text-sm text-muted-foreground">
                Guidance from DivinaLaw on proper computation and enforcement.
              </p>
            </div>
            <Button variant="outline" asChild>
              <a
                href="https://www.divinalaw.com/dose-of-law/pwd-discount-to-group-meals/"
                target="_blank"
                rel="noreferrer"
                className="gap-2"
              >
                Open article
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>

        <section id="scanner">
          <ReceiptScanner />
        </section>

        <section id="checker">
          <DiscountChecker />
        </section>

        <footer className="mt-6 rounded-2xl border border-border bg-white/90 px-4 py-6 text-sm text-muted-foreground shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold text-foreground">PaDiscount</p>
              <p>© {new Date().getFullYear()} Rio Espinosa. All rights reserved.</p>
              <p>For public use; always verify against official PH regulations.</p>
            </div>
            <div className="flex flex-wrap gap-3 text-foreground/80">
              <a
                className="underline hover:text-foreground"
                href="https://pwd.doh.gov.ph/tbl_pwd_id_verificationlist.php"
                target="_blank"
                rel="noreferrer"
              >
                ID Verification
              </a>
              <a
                className="underline hover:text-foreground"
                href="https://www.divinalaw.com/dose-of-law/pwd-discount-to-group-meals/"
                target="_blank"
                rel="noreferrer"
              >
                Know your rights
              </a>
              <a
                className="underline hover:text-foreground"
                href="https://programmingrio.top"
                target="_blank"
                rel="noreferrer"
              >
                Portfolio
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
