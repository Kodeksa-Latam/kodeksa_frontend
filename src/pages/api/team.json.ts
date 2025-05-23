import type { APIRoute } from 'astro';

// Interfaces
interface CardConfiguration {
  id: string;
  userId: string;
  imageSize: number;
  imageLeftOffset?: string;
  bgColor: string;
  textAbove: string;
  textAboveColor: string;
  aboveFontFamily: string;
  aboveFontSize: string;
  aboveFontWeight: string;
  aboveLetterSpacing: string;
  aboveTextTransform: string;
  aboveTextTopOffset: string;
  textBelow: string;
  belowFontWeight: string;
  belowLetterSpacing: string;
  belowFontFamily: string;
  belowFontSize: string;
  belowTextTransform: string;
  textBelowColor: string;
  createdAt: string;
  updatedAt: string;
}

interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  role: string;
  slug: string;
  image: string;
  showCurriculum: boolean;
  createdAt: string;
  updatedAt: string;
  cardConfiguration: CardConfiguration;
  skills?: Skill[];
}

interface Skill{
  skillName:string;
  urlCertificate?: string
}

interface ApiResponse {
  items: TeamMember[];
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

// Datos de respaldo para metadata
const fallbackMeta = {
  currentPage: 1,
  itemsPerPage: 4,
  totalItems: 8, // Simular más elementos para mostrar el botón "Ver todos"
  totalPages: 2,
  hasNextPage: true,
  hasPreviousPage: false
};

// Datos de respaldo
const fallbackTeam: TeamMember[] = [
  {
    id: "dev-1",
    firstName: "Keny",
    lastName: "Ramírez",
    email: "keny@example.com",
    isActive: true,
    role: "Senior Full-stack Developer",
    slug: "keny-ramirez",
    image: "/images/team/keny-ramirez.png",
    showCurriculum: false,
    createdAt: "2025-04-09T20:44:39.522Z",
    updatedAt: "2025-04-09T20:44:39.522Z",
    cardConfiguration: {
      id: "card-1",
      userId: "dev-1",
      imageSize: 90,
      bgColor: "#eae7dc",
      textAbove: "FULL    STACK",
      textAboveColor: "#096551",
      aboveFontFamily: "'Montserrat', sans-serif",
      aboveFontSize: "3.5rem",
      aboveFontWeight: "800",
      aboveLetterSpacing: "0.23em",
      aboveTextTransform: "uppercase",
      aboveTextTopOffset: "0",
      textBelow: "DEVELOPER",
      belowFontWeight: "700",
      belowLetterSpacing: "0.35em",
      belowFontFamily: "'Raleway', sans-serif",
      belowFontSize: "1.5rem",
      belowTextTransform: "uppercase",
      textBelowColor: "#ffffff",
      createdAt: "2025-04-09T20:44:39.560Z",
      updatedAt: "2025-04-09T20:44:39.560Z"
    },
    skills: [
      { skillName: 'Flutter', urlCertificate: 'https://example.com/cert' },
      { skillName: 'Angular'},
      { skillName: 'Node.js'}
    ]
  },
  {
    id: "dev-2",
    firstName: "Josué",
    lastName: "Acosta",
    email: "josue.acosta@kodeksa.lat",
    isActive: true,
    role: "Cloud Engineer",
    slug: "josue-acosta",
    image: "/images/team/josue-acosta.png",
    showCurriculum: false,
    createdAt: "2025-04-09T20:44:39.522Z",
    updatedAt: "2025-04-09T20:44:39.522Z",
    cardConfiguration: {
      id: "card-2",
      userId: "dev-2",
      imageSize: 85,
      bgColor: "#ced9e991",
      textAbove: "Cloud",
      textAboveColor: "#ffffff",
      aboveFontFamily: "'Oswald', sans-serif",
      aboveFontSize: "3.5rem",
      aboveFontWeight: "200",
      aboveLetterSpacing: "0.23em",
      aboveTextTransform: "uppercase",
      aboveTextTopOffset: "0",
      textBelow: "Engineer",
      belowFontWeight: "700",
      belowLetterSpacing: "0.35em",
      belowFontFamily: "'Raleway', sans-serif",
      belowFontSize: "1.5rem",
      belowTextTransform: "uppercase",
      textBelowColor: "#ffffff",
      createdAt: "2025-04-09T20:44:39.560Z",
      updatedAt: "2025-04-09T20:44:39.560Z"
    },
    skills: [
      { skillName: 'AWS', urlCertificate: 'https://example.com/cert' },
      { skillName: 'Docker' },
      { skillName: 'Kubernetes'}
    ]
  }
  // Puedes agregar más miembros de respaldo aquí...
];

export const GET: APIRoute = async ({ url }) => {
  try {
    // Obtener parámetros de consulta
    const page = url.searchParams.get('page') ?? '1';
    const limit = url.searchParams.get('limit') ?? '4';
    
    const apiBaseUrl = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000';
    console.log(`Fetching team from: ${apiBaseUrl}/api/users?page=${page}&limit=${limit}&isActive=true`);
    
    const response = await fetch(`${apiBaseUrl}/api/users?page=${page}&limit=${limit}&isActive=true`);
    
    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`);
      throw new Error('Error al obtener los miembros del equipo');
    }
    
    const data: ApiResponse = await response.json();
    let team = data.items;
    
    // Aseguramos que todos los miembros tengan un stack (aunque esté vacío)
    team = team.map(member => ({
      ...member,
      stack: member.skills || []
    }));
    
    return new Response(JSON.stringify({
      items: team,
      meta: data.meta
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error obteniendo equipo:', error);
    
    // Devolver datos de respaldo en caso de error
    return new Response(JSON.stringify({
      items: fallbackTeam,
      meta: fallbackMeta
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Using-Fallback': 'true'
      }
    });
  }
};