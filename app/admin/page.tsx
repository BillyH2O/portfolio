"use client"

import React from 'react'
import { useAdminStats } from '@/hooks/admin/useAdminStats'
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader'
import StatsGrid from '@/components/admin/dashboard/StatsGrid'
import QuickActionsSection from '@/components/admin/dashboard/QuickActionsSection'
import DashboardLoadingState from '@/components/admin/dashboard/DashboardLoadingState'
import DashboardErrorState from '@/components/admin/dashboard/DashboardErrorState'
import { PasswordProtection } from '@/components/auth/PasswordProtection'

export default function AdminDashboard() {
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "1234";
  
  return (
    <PasswordProtection 
      requiredPassword={adminPassword}
      title="Accès Administration"
      description="Saisissez le code à 4 chiffres pour accéder au panneau d'administration"
      sessionKey="admin_authenticated"
    >
      <AdminContent />
    </PasswordProtection>
  )
}

function AdminContent() {
  const { stats, loading, error, refetch } = useAdminStats()

  if (loading) {
    return <DashboardLoadingState />
  }

  if (error) {
    return <DashboardErrorState error={error} onRetry={refetch} />
  }

  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-0">
      <DashboardHeader />
      <StatsGrid stats={stats} />
      <QuickActionsSection />
    </div>
  )
}
