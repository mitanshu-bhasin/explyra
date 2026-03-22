"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import OverviewTab from "@/components/sections/OverviewTab";
import CompaniesTab from "@/components/sections/CompaniesTab";
import ManagementTab from "@/components/sections/ManagementTab";
import AdminsTab from "@/components/sections/AdminsTab";
import DeletionRequestsTab from "@/components/sections/DeletionRequestsTab";

function AdminContent() {
  const params = useSearchParams();
  const tab = params.get("tab") ?? "overview";

  return (
    <Suspense>
      {tab === "overview" && <OverviewTab />}
      {tab === "companies" && <CompaniesTab />}
      {tab === "management" && <ManagementTab />}
      {tab === "admins" && <AdminsTab />}
      {tab === "deletion-requests" && <DeletionRequestsTab />}
    </Suspense>
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-slate-200 border-t-indigo-600 rounded-full animate-spin" />
        </div>
      }
    >
      <AdminContent />
    </Suspense>
  );
}
