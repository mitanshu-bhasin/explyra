import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Company {
  id: string;
  companyName: string;
  ownerName?: string;
  ownerEmail?: string;
  plan?: string;
  planCost?: number;
  planDuration?: number;
  planEndDate?: string;
  status?: string;
  employeeCount?: number;
  expenseCount?: number;
  createdAt?: string;
}

export interface DeletionRequest {
  id: string;
  email: string;
  companyName?: string;
  reason?: string;
  timestamp?: { seconds: number };
}

export async function fetchCompanies(): Promise<Company[]> {
  try {
    const snap = await getDocs(collection(db, "companies"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Company));
  } catch {
    return [];
  }
}

export async function fetchDeletionRequests(): Promise<DeletionRequest[]> {
  try {
    const q = query(collection(db, "deletionRequests"), orderBy("timestamp", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as DeletionRequest));
  } catch {
    return [];
  }
}

export async function updateCompanyPlan(
  companyId: string,
  data: { plan: string; planCost: number; planDuration: number; planEndDate: string }
) {
  await updateDoc(doc(db, "companies", companyId), data);
}

export async function deleteCompany(companyId: string) {
  await deleteDoc(doc(db, "companies", companyId));
}

export async function deleteDeletionRequest(requestId: string) {
  await deleteDoc(doc(db, "deletionRequests", requestId));
}

export async function addAdminUser(email: string) {
  await addDoc(collection(db, "adminUsers"), {
    email,
    addedAt: serverTimestamp(),
  });
}
