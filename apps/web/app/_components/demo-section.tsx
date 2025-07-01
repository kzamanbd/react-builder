import Image from "next/image";
import { Button } from "@/components/ui/button";
import { classNames } from "@/lib/utils";

interface DemoSectionProps {
  className?: string;
}

export function DemoSection({ className }: DemoSectionProps) {
  return (
    <section className={classNames("bg-white py-20", className)} id="demo">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="mb-2 text-3xl font-bold text-gray-900 lg:text-4xl">See it in action</h2>
        <p className="mx-auto text-xl text-gray-600">
          Watch how easy it is to build custom pages with our drag-and-drop interface.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-5xl rounded-lg border border-gray-300 p-2 shadow-lg">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src="https://kzmpcgpar3lh532ybiau.lite.vusercontent.net/placeholder.svg?height=720&width=1280"
            alt="Page Builder Demo"
            width={1280}
            height={720}
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button size="lg" variant="outline" className="">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
