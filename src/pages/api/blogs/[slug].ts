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
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  slug: string;
  image: string;
  isActive: boolean;
  showCurriculum: boolean;
  createdAt: string;
  updatedAt: string;
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
  user?: User;
}

// Datos de respaldo en caso de que la API falle
const fallbackPosts: Record<string, BlogPost> = {
 
};

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const slug = params.slug;
    
    if (!slug) {
      return new Response(JSON.stringify({ error: 'Slug no proporcionado' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    const apiBaseUrl = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000';
    console.log(`Fetching blog post by slug from: ${apiBaseUrl}/api/blogs/slug/${slug}`);
    
    const response = await fetch(`${apiBaseUrl}/api/blogs/slug/${slug}`);
    
    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`);
      throw new Error(`Error al obtener el artículo con slug: ${slug}`);
    }
    
    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error obteniendo post específico:', error);
    
    // Comprobar si tenemos un post de respaldo con este slug
    const slug = params.slug || '';
    if (fallbackPosts[slug]) {
      return new Response(JSON.stringify(fallbackPosts[slug]), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-Using-Fallback': 'true'
        }
      });
    }
    
    // Si no tenemos respaldo, devolver un error
    return new Response(JSON.stringify({ 
      error: `No se pudo encontrar el artículo con slug: ${slug}` 
    }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};