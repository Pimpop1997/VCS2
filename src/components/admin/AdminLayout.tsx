import React from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Main content area */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </div>
  );
}