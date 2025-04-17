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

interface Skill {
  id: string;
  userId: string;
  skillName: string;
  urlCertificate?: string;
  createdAt: string;
  updatedAt: string;
}

interface Engineer {
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

interface ApiResponse {
  items: Engineer[];
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
const fallbackEngineers: Engineer[] = [
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
      { 
        id: "skill-1",
        userId: "dev-1",
        skillName: "Flutter",
        urlCertificate: "https://example.com/cert",
        createdAt: "2025-04-09T20:44:39.560Z",
        updatedAt: "2025-04-09T20:44:39.560Z"
      },
      {
        id: "skill-2",
        userId: "dev-1",
        skillName: "Angular",
        createdAt: "2025-04-09T20:44:39.560Z",
        updatedAt: "2025-04-09T20:44:39.560Z"
      },
      {
        id: "skill-3",
        userId: "dev-1",
        skillName: "Node.js",
        createdAt: "2025-04-09T20:44:39.560Z",
        updatedAt: "2025-04-09T20:44:39.560Z"
      }
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
      {
        id: "skill-4",
        userId: "dev-2",
        skillName: "AWS",
        urlCertificate: "https://example.com/cert",
        createdAt: "2025-04-09T20:44:39.560Z",
        updatedAt: "2025-04-09T20:44:39.560Z"
      },
      {
        id: "skill-5",
        userId: "dev-2",
        skillName: "Docker",
        createdAt: "2025-04-09T20:44:39.560Z",
        updatedAt: "2025-04-09T20:44:39.560Z"
      },
      {
        id: "skill-6",
        userId: "dev-2",
        skillName: "Kubernetes",
        createdAt: "2025-04-09T20:44:39.560Z",
        updatedAt: "2025-04-09T20:44:39.560Z"
      }
    ]
  },
  {
    id: "dev-3",
    firstName: "Ana",
    lastName: "Martínez",
    email: "ana.martinez@kodeksa.lat",
    isActive: true,
    role: "UX/UI Designer",
    slug: "ana-martinez",
    image: "/images/team/ana-martinez.png",
    showCurriculum: true,
    createdAt: "2025-04-09T20:44:39.522Z",
    updatedAt: "2025-04-09T20:44:39.522Z",
    cardConfiguration: {
      id: "card-3",
      userId: "dev-3",
      imageSize: 85,
      bgColor: "#f8eaea",
      textAbove: "UX/UI",
      textAboveColor: "#d04848",
      aboveFontFamily: "'Montserrat', sans-serif",
      aboveFontSize: "3.5rem",
      aboveFontWeight: "800",
      aboveLetterSpacing: "0.23em",
      aboveTextTransform: "uppercase",
      aboveTextTopOffset: "0",
      textBelow: "Designer",
      belowFontWeight: "700",
      belowLetterSpacing: "0.35em",
      belowFontFamily: "'Raleway', sans-serif",
      belowFontSize: "1.5rem",
      belowTextTransform: "uppercase",
      textBelowColor: "#d04848",
      createdAt: "2025-04-09T20:44:39.560Z",
      updatedAt: "2025-04-09T20:44:39.560Z"
    },
    skills: [
      {
        id: "skill-7",
        userId: "dev-3",
        skillName: "Figma",
        createdAt: "2025-04-09T20:44:39.560Z",
        updatedAt: "2025-04-09T20:44:39.560Z"
      },
      {
        id: "skill-8",
        userId: "dev-3",
        skillName: "Adobe XD",
        createdAt: "2025-04-09T20:44:39.560Z",
        updatedAt: "2025-04-09T20:44:39.560Z"
      },
      {
        id: "skill-9",
        userId: "dev-3",
        skillName: "UI Design",
        createdAt: "2025-04-09T20:44:39.560Z",
        updatedAt: "2025-04-09T20:44:39.560Z"
      }
    ]
  }
];

const fallbackMeta = {
  currentPage: 1,
  itemsPerPage: 10,
  totalItems: fallbackEngineers.length,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false
};

export const GET: APIRoute = async ({ url }) => {
  try {
    // Obtener parámetros de consulta
    const page = url.searchParams.get('page') ?? '1';
    const limit = url.searchParams.get('limit') ?? '10';
    
    const apiBaseUrl = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000';
    console.log(`Fetching all engineers from: ${apiBaseUrl}/api/users?page=${page}&limit=${limit}&isActive=true`);
    
    const response = await fetch(`${apiBaseUrl}/api/users?page=${page}&limit=${limit}&isActive=true`);
    
    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`);
      throw new Error('Error al obtener los ingenieros');
    }
    
    const data: ApiResponse = await response.json();
    
    return new Response(JSON.stringify({
      items: data.items,
      meta: data.meta
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error obteniendo todos los ingenieros:', error);
    
    // Devolver datos de respaldo en caso de error
    return new Response(JSON.stringify({
      items: fallbackEngineers,
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