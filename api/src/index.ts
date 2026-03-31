import { createClient } from '@supabase/supabase-js';

export interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

      // GET /api/tools - Get all tools
      if (path === '/api/tools' && request.method === 'GET') {
        const { data: tools, error } = await supabase
          .from('tools')
          .select(`
            *,
            categories:category_id (
              id,
              name,
              slug
            )
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Flatten category data for easier consumption
        const formattedTools = tools?.map(tool => ({
          ...tool,
          category_name: tool.categories?.name,
          category_slug: tool.categories?.slug,
          categories: undefined
        }));

        return new Response(JSON.stringify(formattedTools), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // GET /api/tools/:id - Get single tool
      if (path.match(/^\/api\/tools\/\d+$/) && request.method === 'GET') {
        const id = parseInt(path.split('/').pop() || '0');
        const { data: tool, error } = await supabase
          .from('tools')
          .select(`
            *,
            categories:category_id (
              id,
              name,
              slug
            )
          `)
          .eq('id', id)
          .single();

        if (error || !tool) {
          return new Response(JSON.stringify({ error: 'Tool not found' }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const formattedTool = {
          ...tool,
          category_name: tool.categories?.name,
          category_slug: tool.categories?.slug,
          categories: undefined
        };

        return new Response(JSON.stringify(formattedTool), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // GET /api/categories - Get all categories
      if (path === '/api/categories' && request.method === 'GET') {
        const { data: categories, error } = await supabase
          .from('categories')
          .select('*, tools(count)')
          .order('name');

        if (error) throw error;

        return new Response(JSON.stringify(categories), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // GET /api/categories/:slug/tools - Get tools by category
      if (path.match(/^\/api\/categories\/[^\/]+\/tools$/) && request.method === 'GET') {
        const slug = path.split('/')[3];

        // First get category by slug
        const { data: category, error: categoryError } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', slug)
          .single();

        if (categoryError || !category) {
          return new Response(JSON.stringify({ error: 'Category not found' }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Get tools for this category
        const { data: tools, error } = await supabase
          .from('tools')
          .select(`
            *,
            categories:category_id (
              id,
              name,
              slug
            )
          `)
          .eq('category_id', category.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const formattedTools = tools?.map(tool => ({
          ...tool,
          category_name: tool.categories?.name,
          category_slug: tool.categories?.slug,
          categories: undefined
        }));

        return new Response(JSON.stringify(formattedTools), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // POST /api/tools - Create new tool
      if (path === '/api/tools' && request.method === 'POST') {
        const body = await request.json();
        const { data: tool, error } = await supabase
          .from('tools')
          .insert({
            name: body.name,
            description: body.description,
            url: body.url,
            category_id: body.category_id,
            logo_url: body.logo_url || null,
            pricing: body.pricing || 'free'
          })
          .select()
          .single();

        if (error) throw error;

        return new Response(JSON.stringify(tool), {
          status: 201,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Health check
      if (path === '/health' || path === '/') {
        return new Response(JSON.stringify({
          status: 'ok',
          message: 'Minimax Aiverse API',
          timestamp: new Date().toISOString()
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // 404 for unknown routes
      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};
