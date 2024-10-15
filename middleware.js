import  { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(async function middleware(req) {
    // authorized user
    const url = req.nextUrl.pathname;
    const userRole = req?.nextauth?.token?.user?.role

    if(url?.startsWith("/admin") && userRole !== "admin"){
        return NextResponse.redirect(new URL("/", req.url))
    }

},
{
    callbacks:{
        authorized: ({ token }) => {
            if(!token){
                return false
            }
        }
    }
});


export const config = {
    matcher: ["/admin/:path*", "/me/:path*", "/shipping", "/pay", ] 
}


// export { default } from "next-auth/middleware"

// import { withAuth } from "next-auth/middleware"

// export default withAuth({

//     pages: {
//         signIn: "/login",
//     },
// });


// export const config = { matcher: ["/me"] } 


