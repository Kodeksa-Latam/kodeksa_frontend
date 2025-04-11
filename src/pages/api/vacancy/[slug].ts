import type { APIRoute } from 'astro';

// Interface para la respuesta de la API externa
interface ApiVacancy {
    id: string;
    jobTitle: string;
    slug: string;
    mode: string;
    yearsExperience: number;
    shortDescription: string;
    description: string;
    stackRequired: string[];
    isActive: boolean;
    status: string;
    createdAt: string;
    updatedAt: string;
}

// Datos de respaldo en caso de que la API falle
const fallbackVacancies: Record<string, ApiVacancy> = {
    "senior-frontend-developer": {
        id: "1",
        jobTitle: "Senior Frontend Developer",
        slug: "senior-frontend-developer",
        mode: "Remoto",
        yearsExperience: 5,
        shortDescription: "Buscamos un desarrollador frontend senior para liderar proyectos enterprise y mentorear al equipo.",
        description: "Empresa líder en el sector tecnológico busca un Senior Frontend Developer con experiencia comprobada para unirse a nuestro equipo. El candidato seleccionado liderará el desarrollo de interfaces de usuario para aplicaciones web enterprise, colaborará con equipos multidisciplinarios y mentoreará a desarrolladores junior. Se requiere dominio de React, TypeScript y experiencia con arquitecturas frontend modernas. Ofrecemos trabajo remoto, salario competitivo y oportunidades de crecimiento profesional.",
        stackRequired: ["React", "TypeScript", "Next.js", "Redux", "Testing"],
        isActive: true,
        status: "open",
        createdAt: "2025-04-10T15:30:00.000Z",
        updatedAt: "2025-04-10T15:30:00.000Z"
    }
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
        console.log(`Fetching vacancy details from: ${apiBaseUrl}/api/vacancies/slug/${slug}`);
        
        const response = await fetch(`${apiBaseUrl}/api/vacancies/slug/${slug}`);
        
        if (!response.ok) {
            console.error(`API responded with status: ${response.status}`);
            throw new Error('Error al obtener los detalles de la vacante');
        }
        
        const vacancy: ApiVacancy = await response.json();
        
        return new Response(JSON.stringify(vacancy), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error(`Error obteniendo detalles de la vacante ${slug}:`, error);
        
        // Devolver datos de respaldo si está disponible para este slug
        if (fallbackVacancies[slug]) {
            return new Response(JSON.stringify(fallbackVacancies[slug]), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Using-Fallback': 'true'
                }
            });
        }
        
        // Si no hay datos de respaldo para este slug
        return new Response(JSON.stringify({ error: 'Vacante no encontrada' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};