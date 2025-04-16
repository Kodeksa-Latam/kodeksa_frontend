import type { APIRoute } from 'astro';

// Interfaces para el usuario y sus propiedades relacionadas
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

interface Curriculum {
  id: string;
  userId: string;
  aboutMe: string;
  githubSlug: string;
  linkedinSlug: string;
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

interface WorkExperience {
  id: string;
  userId: string;
  role: string;
  companyName: string;
  fromYear: string;
  untilYear: string;
  roleDescription: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
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
  curriculum?: Curriculum;
  skills?: Skill[];
  workExperiences?: WorkExperience[];
}

// Datos de respaldo en caso de que la API falle
const fallbackUsers: Record<string, User> = {
 
};

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;
  
  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug no proporcionado' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  try {
    const apiBaseUrl = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000';
    console.log(`Fetching user details from: ${apiBaseUrl}/api/users/slug/${slug}`);
    
    const response = await fetch(`${apiBaseUrl}/api/users/slug/${slug}`);
    
    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`);
      throw new Error('Error al obtener los detalles del usuario');
    }
    
    const user: User = await response.json();
    
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error(`Error obteniendo detalles del usuario ${slug}:`, error);
    
    // Devolver datos de respaldo si está disponible para este slug
    if (fallbackUsers[slug]) {
      return new Response(JSON.stringify(fallbackUsers[slug]), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-Using-Fallback': 'true'
        }
      });
    }
    
    // Si no hay datos de respaldo para este slug
    return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};