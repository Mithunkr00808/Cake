import { db, auth } from "@/lib/firebase-admin";
import { FiMail, FiShield, FiUsers } from "react-icons/fi";
import CustomersClient from "./_components/CustomersClient";

export const dynamic = "force-dynamic";

type CustomerRecord = {
  id: string;
  email?: string;
  name?: string;
  phone?: string;
};

type CustomerOrder = {
  id: string;
  total: number;
  status: string;
  createdAt: string | null;
  itemCount: number;
};

export default async function AdminCustomersPage() {
  let customers: CustomerRecord[] = [];
  const customerOrders: Record<string, CustomerOrder[]> = {};

  try {
    // Fetch users directly from Firebase Auth
    const listUsersResult = await auth.listUsers(1000);
    customers = listUsersResult.users.map((userRecord) => ({
      id: userRecord.uid,
      email: userRecord.email,
      name: userRecord.displayName,
      phone: userRecord.phoneNumber,
    }));

    // Fetch subset of orders and group by userId for order history
    const ordersSnap = await db.collection("orders").orderBy("createdAt", "desc").limit(500).get();
    ordersSnap.docs.forEach((doc) => {
      const data = doc.data();
      const userId = data.userId;
      
      // We also handle cases where customer is stored but userId might not be explicitly linked 
      // but in Cake, we recently fixed linking orders to user UID.
      const matchId = userId || data.customer?.email; 
      
      if (!matchId) return;

      if (!customerOrders[matchId]) {
        customerOrders[matchId] = [];
      }

      const items = Array.isArray(data.items) ? data.items : [];
      customerOrders[matchId].push({
        id: doc.id,
        total: data.total || data.subtotal || 0,
        status: data.status || "pending",
        createdAt: data.createdAt
          ? new Date(
              data.createdAt.seconds ? data.createdAt.seconds * 1000 : data.createdAt
            ).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : null,
        itemCount: items.reduce(
          (sum: number, item: { quantity?: number }) => sum + (item.quantity || 1),
          0
        ),
      });
    });
  } catch (error) {
    console.error("Failed to load customers page:", error);
  }

  const reachableCount = customers.filter((c) => Boolean(c.email)).length;
  const totalSpend = Object.values(customerOrders)
    .flat()
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-500">
          Client Registry
        </p>
        <h1 className="font-serif text-4xl tracking-tight text-gray-900">
          Customers
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-gray-500">
          View customer profiles and their purchase history from the admin workspace.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <FiUsers className="size-5" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">
            Profiles
          </p>
          <p className="mt-2 font-serif text-3xl text-gray-900">
            {customers.length}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-700">
            <FiMail className="size-5" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">
            Reachable
          </p>
          <p className="mt-2 font-serif text-3xl text-gray-900">
            {reachableCount}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-green-700">
            <FiShield className="size-5" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">
            Lifetime Revenue
          </p>
          <p className="mt-2 font-serif text-3xl text-gray-900">
            ₹{totalSpend.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <CustomersClient customers={customers} customerOrders={customerOrders} />
    </div>
  );
}
