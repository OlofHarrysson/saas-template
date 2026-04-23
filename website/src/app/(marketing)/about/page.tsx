import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Olof Harrysson, an AI developer turned indie maker building digital products that solve real problems.",
};

export default function AboutPage() {
  return (
    <div className="bg-base-200 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="card border border-base-300 bg-base-100 shadow-xl">
          <div className="card-body items-center gap-6 text-center">
            <div className="avatar mb-2">
              <div className="h-40 w-40 rounded-full sm:h-50 sm:w-50">
                <Image
                  src="/assets/profile.png"
                  alt="Olof Harrysson"
                  width={200}
                  height={200}
                  priority
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-base-content/70 sm:text-base">
                This project is created by
              </p>
              <h1 className="text-2xl font-bold text-base-content sm:text-3xl">
                Olof Harrysson
              </h1>
            </div>

            <p className="max-w-xl text-sm leading-relaxed text-base-content/70 sm:text-base">
              After 6 years as an AI developer, I&apos;m now building my own
              digital products. I&apos;m working solo, building micro-projects
              that solve specific problems for specific people.
            </p>

            <Link
              href="https://www.madebyolof.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary gap-2 text-sm sm:text-base"
            >
              Learn more about me
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
