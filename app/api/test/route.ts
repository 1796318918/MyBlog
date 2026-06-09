export const dynamic = 'force-static';

export async function GET() {
  return new Response("static export ok", { status: 200 });
}
