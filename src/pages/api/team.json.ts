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
  stack?: string[];
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

// Datos de respaldo
const fallbackTeam = [
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
      aboveFontFamily: "'Clash Display', sans-serif",
      aboveFontSize: "3.5rem",
      aboveFontWeight: "700",
      aboveLetterSpacing: "0.23em",
      aboveTextTransform: "uppercase",
      aboveTextTopOffset: "0",
      textBelow: "DEVELOPER",
      belowFontWeight: "700",
      belowLetterSpacing: "0.35em",
      belowFontFamily: "'Clash Display', sans-serif",
      belowFontSize: "1.5rem",
      belowTextTransform: "uppercase",
      textBelowColor: "#ccdbaa",
      createdAt: "2025-04-09T20:44:39.560Z",
      updatedAt: "2025-04-09T20:44:39.560Z"
    },
    stack: ['Flutter', 'Angular', 'Node.js', 'FastApi', 'Flask', 'Java']
  },
  // Puedes agregar más miembros de respaldo aquí...
];

export const GET: APIRoute = async () => {
  try {
    const apiBaseUrl = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000';
    console.log(`Fetching team from: ${apiBaseUrl}/api/users`);
    
    const response = await fetch(`${apiBaseUrl}/api/users?page=1&limit=4&isActive=true`);
    
    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`);
      throw new Error('Error al obtener los miembros del equipo');
    }
    
    const data: ApiResponse = await response.json();
    let team = data.items;
    
    // Aseguramos que todos los miembros tengan un stack (aunque esté vacío)
    team = team.map(member => ({
      ...member,
      stack: member.stack || []
    }));
    
    return new Response(JSON.stringify(team), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error obteniendo equipo:', error);
    
    // Devolver datos de respaldo en caso de error
    return new Response(JSON.stringify(fallbackTeam), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Using-Fallback': 'true'
      }
    });
  }
};