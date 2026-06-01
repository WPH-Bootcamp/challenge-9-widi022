import * as React from "react";
import { motion } from "framer-motion";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="container mx-auto px-4 py-8"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
