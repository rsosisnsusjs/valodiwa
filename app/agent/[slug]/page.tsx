import AgentDetail from '@/app/components/AgentDetail'
import { notFound } from 'next/navigation'

interface Role {
  displayName: string
  displayIcon: string
}

interface Ability {
  slot: string
  displayName: string
  description: string
  displayIcon: string
}

interface Agent {
  uuid: string
  displayName: string
  description: string
  displayIcon: string
  fullPortrait: string
  role: Role | null
  abilities: Ability[]
  backgroundGradientColors?: string[]
}

async function getAgents(): Promise<Agent[]> {
  const res = await fetch(
    'https://valorant-api.com/v1/agents?language=th-TH&isPlayableCharacter=true',
    { cache: 'no-store' }
  )
  
  if (!res.ok) throw new Error('Failed to fetch agents')
  
  const data = await res.json()
  return data.data
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  const agents = await getAgents()
  const agent = agents.find(
    (a) => a.displayName.toLowerCase() === decodeURIComponent(slug).toLowerCase()
  )
  
  if (!agent) return notFound()
  
  const colors = agent.backgroundGradientColors || ['ffffff', 'eeeeee', 'dddddd', 'cccccc']
  const gradient = `linear-gradient(135deg, #${colors[0]}, #${colors[1]}, #${colors[2]}, #${colors[3]})`
  
  // กรณี role เป็น null ให้ใส่ค่า default
  const agentWithRole = {
    ...agent,
    role: agent.role ?? { displayName: 'Unknown', displayIcon: '/default-role-icon.png' }
  }
  
  return <AgentDetail agent={agentWithRole} background={gradient} />
}