import Link from "next/link";
import { FiGithub, FiLayers, FiMail, FiTwitter } from "react-icons/fi";
import { classNames } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={classNames("bg-gray-900 py-16 text-white", className)}>
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gray-900 to-black">
                <FiLayers className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">DnD Builder</span>
            </div>
            <p className="mb-4 text-gray-400">
              The most powerful drag-and-drop page builder for React applications.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com/dnd-builder/react" className="text-gray-400 transition-colors hover:text-white">
                <FiGithub className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com/dndbuilder" className="text-gray-400 transition-colors hover:text-white">
                <FiTwitter className="h-5 w-5" />
              </Link>
              <Link href="/contact" className="text-gray-400 transition-colors hover:text-white">
                <FiMail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/#features" className="transition-colors hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="transition-colors hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#premium" className="transition-colors hover:text-white">
                  Premium
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="transition-colors hover:text-white">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/documentation" className="transition-colors hover:text-white">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/examples" className="transition-colors hover:text-white">
                  Examples
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="transition-colors hover:text-white">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/api-reference" className="transition-colors hover:text-white">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/help-center" className="transition-colors hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/community" className="transition-colors hover:text-white">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/status" className="transition-colors hover:text-white">
                  Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-gray-400">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
            <Link href="/contact" className="transition-colors hover:text-white">
              Contact Us
            </Link>
          </div>
          <p className="text-center">&copy; 2024 DnD Builder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
