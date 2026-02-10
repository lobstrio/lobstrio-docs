import { ThreeColumnLayoutProps } from "@/lib/types/layout.type";

export default function ThreeColumnLayout({
  sidebar,
  children,
  codeColumn,
}: ThreeColumnLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex max-w-[1600px] w- mx-auto">
        <aside className="hidden lg:block w-[307px] flex-shrink-0">
          <div className="sticky top-0 h-screen overflow-y-auto border-r border-border">
            {sidebar}
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="mx-auto px-12 py-8">
            {children}
          </div>
        </main>

        <aside className="hidden xl:block w-[406px] flex-shrink-0">
          <div className="sticky top-0 h-screen border-l border-border">
            {codeColumn}
          </div>
        </aside>
      </div>
    </div>
  );
}
