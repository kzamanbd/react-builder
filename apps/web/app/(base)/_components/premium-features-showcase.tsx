import { Badge } from "@/components/ui/badge";
import { LuPackage } from "react-icons/lu";
import { classNames } from "@/lib/utils";

interface PremiumFeaturesShowcaseProps {
  className?: string;
}

export function PremiumFeaturesShowcase({ className }: PremiumFeaturesShowcaseProps) {
  return (
    <section className={classNames("bg-gradient-to-r from-gray-900 to-black py-20", className)} id="premium">
      <div className="container mx-auto px-4 text-center text-white">
        <Badge variant="secondary" className="mb-4 border-white/30 bg-white/20 text-white">
          ✨ Premium Features
        </Badge>
        <h2 className="mb-6 text-3xl font-bold lg:text-4xl">Unlock Advanced Components</h2>
        <p className="mx-auto mb-12 text-xl opacity-90">
          Take your page builder to the next level with our premium component library
        </p>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
              <LuPackage className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-semibold">Tabs Component</h3>
            <p className="text-sm opacity-80">Interactive tabbed interfaces</p>
          </div>

          <div className="rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
              <LuPackage className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-semibold">Drawer Component</h3>
            <p className="text-sm opacity-80">Sliding panel navigation</p>
          </div>

          <div className="rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
              <LuPackage className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-semibold">Dropdown Menus</h3>
            <p className="text-sm opacity-80">Advanced dropdown controls</p>
          </div>

          <div className="rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
              <LuPackage className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-semibold">Slider Components</h3>
            <p className="text-sm opacity-80">Interactive range sliders</p>
          </div>
        </div>
      </div>
    </section>
  );
}
