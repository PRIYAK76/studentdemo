export async function GET(req) {
    const type = req.nextUrl.searchParams.get('type')
    return Response.json([{ "id": 13, "name": "green", "address": "green" },
    { "id": 14, "name": "yellow", "address": "yellow" }])
}

export async function POST(req) {
    const body = await req.json()
    console.log(body)
    return Response.json([{ "message": "POST success" }])
}