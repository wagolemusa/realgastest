/** @type {import('next').NextConfig} */

// import withPWA from "@ducanh2912/next-pwa";

// const pwaConfig = {
//     dest: "public",
//     cacheOnFrontEndNav: true,
//     aggressiveFrontEndNavCaching: true,
//     reloadOnOnline: true,
//     disable: false,
//     workboxOptions: {
//         disableDevLogs: true,
//     }
// };
// https://godisgreatgas.com
// "https://testgasapp-fe8069d27cfc.herokuapp.com",
const nextConfig = {
    env: {
        ENVIRONMENT_URL: "https://gasmen-7852478929a9.herokuapp.com",
        NEXTAUTH_URL: "https://gasmen-7852478929a9.herokuapp.com",
        DB_URL: "mongodb+srv://homiemusa:djrefuge@cluster0.fk517ja.mongodb.net/npcdatabase?retryWrites=true&w=majority", 
        CLOUND_NAME:"xycoders",
        CLOUDINARY_API_KEY: "837887428819121",
        CLOUDINARY_API_SECRET: "fxqLgjYaglPh0PViyCbB-cseWoE",
        NEXTAUTH_SECRET: "refugewisemusawagole456565543",
        STRIPE_PUBLIC_KEY: 'pk_test_51AXQQfDtSmo7ipf18rtyXOfKlXbzQBjm3hq7TQJIFFIcBbLrufa3chFTWAt17h9ck3dZX3RJagPqYxvOmRpjTIjx00P80JJDxI',
        STRIPE_PRIVATE_KEY: 'sk_test_51AXQQfDtSmo7ipf134DFxpL3fH75bb9QY8IjxvCXgeYPDCxZfqMARGQxUmSZXV1eQy3cuEnA2ljw7hcrXiYFlVVm00YiGlvmSP',
        AFRICASTALKING_API_KEY: 'atsk_33da5082f5a46f33de2359045ff47cccce68db3d88141dea46ba25662821e49951d3675e',
        AFRICASTALKING_USERNAME:'refuge'
    },
    images: {
        domains: ["res.cloudinary.com"],
    },
};

// export default withPWA(pwaConfig)(nextConfig);

export default nextConfig