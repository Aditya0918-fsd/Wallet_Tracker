import { create } from "zustand";
export type AppUser = {
  id:string; email:string; name:string; firstName:string; lastName:string;
  emailVerified:boolean; age:number|null; bio:string; avatar:string|null;
  authMethods?:{password:boolean;google:boolean};
};
type AuthState={user:AppUser|null;loading:boolean;setUser:(user:AppUser|null)=>void;setLoading:(loading:boolean)=>void};
export const useAuthStore=create<AuthState>((set)=>({user:null,loading:true,setUser:(user)=>set({user}),setLoading:(loading)=>set({loading})}));
