
'use client';
import UserOrdersData from "../../../components/orders/UserOrders";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MyOrders = () => {

  const router = useRouter()
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>; // Render a loading state while session is being fetched
  }

  if (!session) {
    return router.push("/login")
    // <p>You need to be logged in to view your orders.</p>; // Handle case when session is not available
  }

  return <UserOrdersData userId={session.user.id} />;
};

export default MyOrders;
