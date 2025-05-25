import AgentCard from '@/app/components/AgentCard'

type Agent = {
  uuid: string
  displayName: string
  displayIcon: string
  role: {
    displayName: string
    displayIcon: string
  } | null
  backgroundGradientColors: string[]
}

async function getAgents(): Promise<Agent[]> {
  const res = await fetch('https://valorant-api.com/v1/agents?language=th-TH&isPlayableCharacter=true')
  const data = await res.json()
  return data.data
}

export default async function AgentsPage() {
  const agents = await getAgents()

  const sortedAgents = agents.sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
  )

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8">
      {sortedAgents.map((agent) => (
        <AgentCard
          key={agent.uuid}
          uuid={agent.uuid}
          displayName={agent.displayName}
          displayIcon={agent.displayIcon}
          role={agent.role}
          backgroundGradientColors={agent.backgroundGradientColors}
        />
      ))}
    </div>
  )
}
