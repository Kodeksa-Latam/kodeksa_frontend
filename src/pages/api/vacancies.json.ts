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

interface ApiResponse {
    items: ApiVacancy[];
    meta: {
        currentPage: number;
        itemsPerPage: number;
        totalItems: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}

// Interface para nuestro formato interno
interface Vacancy {
    title: string;
    type: string;
    experience: string;
    stack: string[];
    slug:string;
    description: string;
}

// Datos de respaldo en caso de que la API falle
const fallbackVacancies: Vacancy[] = [
    {
        title: 'Senior Frontend Developer',
        type: 'Remoto',
        slug: 'senior-frontend-developer',
        experience: '5+ años',
        stack: ['React', 'TypeScript', 'Next.js'],
        description: 'Buscamos un desarrollador frontend senior para liderar proyectos enterprise y mentorear al equipo.'
    }
];

export const GET: APIRoute = async () => {
    try {
        const apiBaseUrl = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000';
        console.log(`Fetching vacancies from: ${apiBaseUrl}/api/vacancies?page=1&limit=4`);
        
        const response = await fetch(`${apiBaseUrl}/api/vacancies?page=1&limit=4`);
        
        if (!response.ok) {
            console.error(`API responded with status: ${response.status}`);
            throw new Error('Error al obtener las vacantes de la API');
        }
        
        const data: ApiResponse = await response.json();
        
        // Transformar la respuesta de la API al formato deseado
        const vacancies: Vacancy[] = data.items.map(vacancy => ({
            title: vacancy.jobTitle,
            type: vacancy.mode,
            experience: `${vacancy.yearsExperience}+ años`,
            slug: vacancy.slug,
            stack: vacancy.stackRequired,
            description: vacancy.shortDescription || vacancy.description
        }));
        
        return new Response(JSON.stringify(vacancies), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error obteniendo vacantes:', error);
        
        // Devolver datos de respaldo en caso de error
        return new Response(JSON.stringify(fallbackVacancies), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'X-Using-Fallback': 'true'
            }
        });
    }
};