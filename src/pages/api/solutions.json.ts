import type { APIRoute } from 'astro';

// Interface para Feature desde la API
interface Feature {
    id: string;
    solutionId: string;
    featureDescription: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// Interface para Solution desde la API
interface ApiSolution {
    id: string;
    title: string;
    icon: string;
    description: string;
    isActive: boolean;
    order: number;
    createdAt: string;
    updatedAt: string;
    features: Feature[];
}

// Interface para nuestra estructura interna
interface Solution {
    id: string;
    title: string;
    icon: string;
    description: string;
    features: string[];
}

// Datos de respaldo en caso de que la API falle
const fallbackServices: Solution[] = [
    {
        id: "desarrollo",
        title: "Desarrollo Personalizado",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10 13-5-5 5-5"></path><path d="m14 13 5-5-5-5"></path><path d="M20 21H4"></path></svg>`,
        description: "Creamos soluciones de software a medida que transforman y elevan la eficiencia de tu empresa. Olvídate de lo genérico, consigue una herramienta única diseñada para tus necesidades específicas.",
        features: [
            "Análisis detallado de requisitos",
            "Desarrollo a medida",
            "Integración con sistemas existentes",
            "Escalabilidad según necesidades",
            "Soporte técnico continuo"
        ]
    },
    {
        id: "data",
        title: "Data Management",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path></svg>`,
        description: "Gestionamos tus datos corporativos de manera eficiente, transformándolos en información valiosa para la toma de decisiones. Implementamos soluciones que maximizan el valor de tus activos de datos.",
        features: [
            "Diseño de arquitecturas de datos",
            "Sistemas ETL optimizados",
            "Data warehousing",
            "Gobierno de datos",
            "Limpieza y normalización de datos"
        ]
    },
    {
        id: "ia",
        title: "IA y Machine Learning",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v8"></path><path d="m4.93 10.93 1.41 1.41"></path><path d="M2 18h2"></path><path d="M20 18h2"></path><path d="m19.07 10.93-1.41 1.41"></path><path d="M22 22H2"></path><path d="m16 6-4 4-4-4"></path><path d="M16 18a4 4 0 0 0-8 0"></path></svg>`,
        description: "Integrando tecnologías de inteligencia artificial avanzadas como LLM y LangGraph, optimizamos tus sistemas para crear chatbots potentes que se integran con redes sociales y ofrecen respuestas en lenguaje natural. Impulsa tu negocio con soluciones inteligentes que mejoran la interacción con tus clientes.",
        features: [
            "Desarrollo de chatbots avanzados con integración en redes sociales",
            "Respuestas en lenguaje natural impulsadas por LLM",
            "Modelos adaptativos para diversas necesidades empresariales",
            "Optimización de procesos automatizados mediante IA",
            "Análisis de interacción e integración inteligente con plataformas digitales"
        ]
    },
    {
        id: "cloud",
        title: "Infraestructura Cloud",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>`,
        description: "Diseñamos y gestionamos infraestructuras cloud robustas y escalables que se adaptan a las necesidades cambiantes de tu negocio. Optimizamos costos mientras garantizamos rendimiento y seguridad.",
        features: [
            "Arquitectura cloud-native",
            "Migración a la nube",
            "Optimización de costos",
            "Automatización de infraestructura",
            "Monitoreo y gestión continua"
        ]
    },
    {
        id: "digital-growth",
        title: "Crecimiento Digital",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>`,
        description: "Transformamos tu presencia digital con estrategias creativas y efectivas. Ofrecemos diseño gráfico, experiencia de usuario UI/UX, branding, fotografía profesional y servicios de marketing digital que optimizan tu visibilidad en el mercado y te ayudan a alcanzar nuevos públicos. Impulsa tu marca con soluciones integradas que aseguran un crecimiento sólido y sostenido.",
        features: [
            "Diseño gráfico personalizado para impactar visualmente",
            "Estrategias UI/UX orientadas a la mejora de la experiencia del usuario",
            "Desarrollo y gestión de branding para fortalecer tu identidad digital",
            "Fotografía profesional que destaca la esencia de tu marca",
            "Optimización SEO y estrategias de marketing digital efectivas"
        ]
    }

];


export const GET: APIRoute = async () => {
    try {
        const apiBaseUrl = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000';
        console.log(`Fetching solutions from: ${apiBaseUrl}/api/solutions`);

        const response = await fetch(`${apiBaseUrl}/api/solutions`);

        if (!response.ok) {
            console.error(`API responded with status: ${response.status}`);
            throw new Error('Error al obtener las soluciones de la API');
        }

        const apiSolutions: ApiSolution[] = await response.json();

        // Transformar la respuesta de la API al formato deseado
        const services = apiSolutions.map(solution => ({
            id: solution.id,
            title: solution.title,
            icon: solution.icon,
            description: solution.description,
            features: solution.features.map(feature => feature.featureDescription)
        }));

        return new Response(JSON.stringify(services), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error obteniendo soluciones:', error);

        // Devolver datos de respaldo en caso de error
        return new Response(JSON.stringify(fallbackServices), {
            status: 200,  // Devuelve 200 pero con datos de respaldo
            headers: {
                'Content-Type': 'application/json',
                'X-Using-Fallback': 'true'  // Header para indicar que se usan datos de respaldo
            }
        });
    }
};