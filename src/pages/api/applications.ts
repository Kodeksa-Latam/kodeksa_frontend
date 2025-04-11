import type { APIRoute } from 'astro';


// Interface para la solicitud de empleo
interface JobApplication {
    vacancyId: string;
    name: string;
    email: string;
    phone: string;
    applicationMotivation: string;
    cvUrl: string;
    isActive: boolean;
}

export const POST: APIRoute = async ({ request }) => {
    try {
        // Procesar el FormData
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const applicationMotivation = formData.get('applicationMotivation') as string;
        const vacancyId = formData.get('vacancyId') as string;
        const cvFile = formData.get('cv') as File;
        
        // Validar campos requeridos
        if (!name || !email || !phone || !applicationMotivation || !vacancyId || !cvFile) {
            return new Response(JSON.stringify({
                success: false,
                message: 'Todos los campos son requeridos'
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        
        // Validar que cvFile sea un archivo
        if (!(cvFile instanceof File)) {
            return new Response(JSON.stringify({
                success: false,
                message: 'CV inválido'
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        
        // Validar tipo de archivo (PDF)
        if (cvFile.type !== 'application/pdf') {
            return new Response(JSON.stringify({
                success: false,
                message: 'El CV debe ser un archivo PDF'
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        
        // Validar tamaño del archivo (10MB max)
        if (cvFile.size > 10 * 1024 * 1024) {
            return new Response(JSON.stringify({
                success: false,
                message: 'El tamaño del CV no debe exceder 10MB'
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // Crear nuevo FormData para enviar a la API externa incluyendo el archivo
        const apiFormData = new FormData();
        apiFormData.append('name', name);
        apiFormData.append('email', email);
        apiFormData.append('phone', phone);
        apiFormData.append('applicationMotivation', applicationMotivation);
        apiFormData.append('vacancyId', vacancyId);
        apiFormData.append('cv', cvFile); // Enviamos el archivo directamente
        
        // En producción, enviar el FormData completo a la API externa
        const apiBaseUrl = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000';
        const apiResponse = await fetch(`${apiBaseUrl}/api/applications`, {
            method: 'POST',
            body: apiFormData // No especificamos Content-Type para que el navegador establezca el boundary correcto
        });
        
        if (!apiResponse.ok) {
            throw new Error(`Error al enviar a la API externa: ${apiResponse.status}`);
        }
        
        const apiData = await apiResponse.json();
        
        // Respuesta exitosa
        return new Response(JSON.stringify({
            success: true,
            message: 'Aplicación recibida con éxito',
            application: apiData
        }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
    } catch (error) {
        console.error('Error al procesar la aplicación:', error);
        
        return new Response(JSON.stringify({
            success: false,
            message: 'Error al procesar la aplicación'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};