export function EngineerSpec() {
  return (
    <section className="px-6 md:px-12 max-w-7xl mx-auto py-24 border-t border-black/10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">Speed</h3>
          <p className="text-4xl font-medium tracking-tight text-foreground">10m → 30s</p>
          <p className="text-sm text-gray-600 leading-relaxed max-w-[25ch]">Cut test suite runtime by migrating CI and using static analysis.</p>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">Cost</h3>
          <p className="text-4xl font-medium tracking-tight text-foreground">−70%</p>
          <p className="text-sm text-gray-600 leading-relaxed max-w-[25ch]">Reduced monthly cloud bill with zero downtime through storage migration.</p>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">Delivery</h3>
          <p className="text-4xl font-medium tracking-tight text-foreground">Zero to Prod</p>
          <p className="text-sm text-gray-600 leading-relaxed max-w-[25ch]">Full event-sourced backend shipped in 10 days.</p>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">Quality</h3>
          <p className="text-4xl font-medium tracking-tight text-foreground">WCAG in CI</p>
          <p className="text-sm text-gray-600 leading-relaxed max-w-[25ch]">Near-zero visual regressions via Playwright.</p>
        </div>
      </div>
    </section>
  );
}
