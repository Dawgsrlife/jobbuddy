interface StatsCardProps {
  title: string
  value: string
  subtitle: string
  color: "blue" | "purple" | "green" | "orange"
}

export function StatsCard({ title, value, subtitle, color }: StatsCardProps) {
  const colorMap = {
    blue: "from-blue-400 to-cyan-400",
    purple: "from-purple-400 to-pink-400",
    green: "from-green-400 to-emerald-400",
    orange: "from-orange-400 to-red-400",
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
      <div className="text-sm text-gray-400 mb-2">{title}</div>
      <div className={`text-3xl font-bold bg-gradient-to-r ${colorMap[color]} bg-clip-text text-transparent mb-1`}>
        {value}
      </div>
      <div className="text-xs text-gray-500">{subtitle}</div>
    </div>
  )
}
