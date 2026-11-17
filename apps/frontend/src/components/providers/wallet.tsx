import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { WalletContext, type WalletContextValue } from "@/hooks/use-wallet.ts";
import { apiRequest } from "@/lib/api.ts";
import { clearWallet, getWallet, parseWallet, replaceWallet, subscribe, updateWallet } from "@/lib/wallet/store.ts";
import type { WalletData } from "@/lib/wallet/types.ts";

type Props={userId:string;name:string;email:string;fallback:ReactNode;children:ReactNode};
const collections=["transactions","categories","tasks","budgets","recurring","notifications"] as const;
type Collection=typeof collections[number];
function hasRecords(d:WalletData){return d.transactions.length+d.categories.length+d.tasks.length+d.budgets.length+d.recurring.length+d.notifications.length>0;}
function recordIds(d:WalletData,key:Collection){return new Set(d[key].map((row)=>row.id));}
async function syncWallet(data:WalletData,previous:WalletData|null){
 await apiRequest("/wallet",{method:"PUT",body:JSON.stringify(data)});
 if(previous){
  for(const kind of collections){
   const current=recordIds(data,kind);
   for(const id of recordIds(previous,kind)){
    if(!current.has(id))await apiRequest("/wallet/delete",{method:"POST",body:JSON.stringify({kind,id})});
   }
  }
 }
}
export default function WalletProvider({userId,name,email,fallback,children}:Props){
 const[walletState,setWalletState]=useState<{userId:string;data:WalletData}|null>(null);
 const data=walletState?.userId===userId?walletState.data:null;
 const hydrated=useRef(false);const failureShown=useRef(false);
 const persistTimer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
 const synced=useRef<WalletData|null>(null);
 const chain=useRef<Promise<void>>(Promise.resolve());
 const query=useQuery({queryKey:["wallet",userId],queryFn:()=>apiRequest<unknown>("/wallet"),staleTime:30_000,retry:1});
 useEffect(()=>{hydrated.current=false;synced.current=null;return()=>{hydrated.current=false;if(persistTimer.current)clearTimeout(persistTimer.current);};},[userId,name]);
 useEffect(()=>{
  if(query.isPending)return;
  let active=true;
  void(async()=>{
   try{
    if(query.isError)throw query.error;
    const remote=parseWallet(JSON.stringify(query.data),name);if(!remote)throw new Error("The server returned invalid wallet data.");
    const local=getWallet(userId,name);let initial=remote;
    if(!hasRecords(remote)&&hasRecords(local)){await apiRequest("/wallet",{method:"PUT",body:JSON.stringify(local)});initial=local;}
    else replaceWallet(userId,remote);
    if(active){synced.current=initial;setWalletState({userId,data:initial});hydrated.current=true;updateWallet(userId,name,(wallet)=>wallet);}
   }catch(error){
    if(active){setWalletState({userId,data:getWallet(userId,name)});toast.error("Wallet API is unavailable",{description:error instanceof Error?error.message:"Changes are saved in this browser until the connection is restored."});}
   }
  })();
  return()=>{active=false;};
 },[query.isError,query.isPending,query.data,query.error,userId,name]);
 useEffect(()=>subscribe(()=>{
  setWalletState({userId,data:getWallet(userId,name)});
  if(!hydrated.current)return;
  if(persistTimer.current)clearTimeout(persistTimer.current);
  persistTimer.current=setTimeout(()=>{
   const snapshot=getWallet(userId,name);
   chain.current=chain.current.then(async()=>{await syncWallet(snapshot,synced.current);synced.current=snapshot;failureShown.current=false;}).catch((error:unknown)=>{
    if(!failureShown.current)toast.error("Could not sync wallet data",{description:error instanceof Error?error.message:"Your data remains in this browser for now."});
    failureShown.current=true;
   });
  },400);
 }),[userId,name]);
 const update=useCallback((fn:(d:WalletData)=>WalletData)=>updateWallet(userId,name,fn),[userId,name]);
 const replace=useCallback((wallet:WalletData)=>replaceWallet(userId,wallet),[userId]);
 const reset=useCallback(()=>clearWallet(userId,name),[userId,name]);
 const value=useMemo<WalletContextValue|null>(()=>data?{data,update,replace,reset,email,money:{currency:data.settings.currency,locale:data.settings.numberLocale}}:null,[data,update,replace,reset,email]);
 if(!value)return<>{fallback}</>;
 return <WalletContext value={value}>{children}</WalletContext>;
}
