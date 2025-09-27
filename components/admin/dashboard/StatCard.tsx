import React from 'react'

interface StatCardProps {
  title: string
  value: number
  icon: React.ReactNode
  color: string
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  return (
    <div className="bg-card border border-border overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`p-3 rounded-md ${color}`}>
              {icon}
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-muted-foreground truncate">{title}</dt>
              <dd className="text-lg font-medium text-foreground">{value}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatCard
