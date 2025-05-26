import AgentDetail from '@/app/components/AgentDetail'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

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

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  try {
    const { slug } = await params
    const agents = await getAgents()
    const agent = agents.find(
      (a) => a.displayName.toLowerCase() === decodeURIComponent(slug).toLowerCase()
    )

    if (!agent) {
      return {
        title: 'Agent Not Found | VALODIWA',
        description: 'Agent Not Found',
      }
    }

    return {
      title: `${agent.displayName} | VALODIWA`,
      description: agent.description || agent.displayName,
    }
  } catch (error) {
    console.error("Error fetching bundle metadata:", error);
    return {
      title: 'Error | VALODIWA',
      description: 'An error occurred while fetching agent data.',
    }
  }
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
  
  const agentWithRole = {
    ...agent,
    role: agent.role ?? { displayName: 'Unknown', displayIcon: '/default-role-icon.png' }
  }
  
  return <AgentDetail agent={agentWithRole} background={gradient} />
}