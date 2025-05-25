// app/agents/[slug]/page.tsx
import AgentDetail from '@/app/components/AgentDetail'

async function getAgents() {
  const res = await fetch(
    'https://valorant-api.com/v1/agents?language=th-TH&isPlayableCharacter=true'
  )
  const data = await res.json()
  return data.data
}

export default async function AgentPage({ params }: { params: { slug: string } }) {
  const agents = await getAgents()
  const agent = agents.find(
    (a: any) => a.displayName.toLowerCase() === params.slug
  )

  if (!agent) return <div>Agent not found</div>

  const colors = agent.backgroundGradientColors || ['ffffff', 'eeeeee', 'dddddd', 'cccccc']
  const gradient = `linear-gradient(135deg, #${colors[0]}, #${colors[1]}, #${colors[2]}, #${colors[3]})`

  return <AgentDetail agent={agent} background={gradient} />
}
