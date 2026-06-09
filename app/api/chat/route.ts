export const dynamic = 'force-static';

export async function GET() {
  return Response.json({ status: "disabled", reason: "static export" });
}
