import type { APIRoute } from 'astro';

// Interfaces para la respuesta de la API
interface BlogSection {
  id: string;
  blogId: string;
  order: number;
  type: 'paragraph' | 'heading' | 'subheading' | 'image' | 'list';
  content: string | null;
  src: string | null;
  alt: string | null;
  caption: string | null;
  style: string | null;
  items: string[] | null;
  createdAt: string;
  updatedAt: string;
}

interface Author {
  name: string;
  avatar: string;
  role: string;
}



interface BlogPost {
  id: string;
  userId: string;
  title: string;
  slug: string;
  image: string;
  shortDescription: string;
  categories: string[];
  isActive: boolean;
  author: Author;
  createdAt: string;
  updatedAt: string;
  sections: BlogSection[];
}

interface ApiResponse {
  items: BlogPost[];
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

// Datos de respaldo en caso de que la API falle
const fallbackPosts: BlogPost[] = [];

// Respuesta de fallback completa
const fallbackResponse: ApiResponse = {
  items: fallbackPosts,
  meta: {
    currentPage: 1,
    itemsPerPage: 4,
    totalItems: fallbackPosts.length,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false
  }
};

export const GET: APIRoute = async ({ request, url }) => {
  try {
    // Obtener parámetros de la URL
    const page = url.searchParams.get('page') ?? '1';
    const limit = url.searchParams.get('limit') ?? '4';
    
    const apiBaseUrl = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000';
    console.log(`Fetching blog posts from: ${apiBaseUrl}/api/blogs?page=${page}&limit=${limit}&includeSections=true`);
    
    const response = await fetch(`${apiBaseUrl}/api/blogs?page=${page}&limit=${limit}`);
    
    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`);
      throw new Error('Error al obtener los artículos del blog');
    }
    
    const data: ApiResponse = await response.json();
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error obteniendo posts del blog:', error);
    
    // Devolver datos de respaldo en caso de error
    return new Response(JSON.stringify(fallbackResponse), {
      status: 200, // Devuelve 200 pero con datos de respaldo
      headers: {
        'Content-Type': 'application/json',
        'X-Using-Fallback': 'true' // Header para indicar que se usan datos de respaldo
      }
    });
  }
};