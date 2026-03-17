import Header from "./Header";
import Footer from "./Footer";
import { ThreeColumnLayoutProps } from "@/lib/types/layout.type";
import SidebarScrollContainer from "./SidebarScrollContainer";

export default function ThreeColumnLayout({
  sidebar,
  children,
  codeColumn,
}: ThreeColumnLayoutProps) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="flex max-w-[1600px] mx-auto">
          <aside className="hidden lg:block w-[307px] flex-shrink-0">
            <SidebarScrollContainer>
              {sidebar}
            </SidebarScrollContainer>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="mx-auto px-12 py-8">
              {children}
            </div>
          </main>

          <aside className="hidden xl:block w-[406px] flex-shrink-0">
            <div className="sticky top-[61px] h-[calc(100vh-61px)] border-l border-border">
              {codeColumn}
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
}
