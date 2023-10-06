import TaskStatusBar from "@/components/tasks/taskStatusBar";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PromoBLOG",
  description: "Blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <div className="max-w-[1000px] mx-auto px-4 pt-6 pb-20">{children}</div>
        {process.env.NODE_ENV !== "production" && <TaskStatusBar />}
      </body>
    </html>
  );
}
