import {prisma} from "@/lib/db";

export async function POST(request: Request) {
    const data = await request.json();

    await prisma.user.update({
        where: {
            email: data.data.object.billing_details.email
        },
        data: {
            hasAccess: true
        }
    })


    return Response.json(null, {status: 200});
}