import React,{useState} from 'react'
import { setMonthlyTargets } from '../api'

export default function LeadView(){
  const [month,setMonth]=useState(()=>{
    const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`
  })
  const [outstandingTarget,setOutstanding]=useState('')
  const [billingTarget,setBilling]=useState('')
  const [msg,setMsg]=useState('')

  const saveTargets=async()=>{
    const j=await setMonthlyTargets({month,outstandingTarget,billingTarget,updatedBy:'TL'})
    setMsg(j.ok?'Targets saved ✅': ('Error: '+(j.error||'unknown')))
  }

  return <div className="space-y-4">
    <div className="card max-w-2xl space-y-3">
      <div className="text-xl font-semibold">Lead: Monthly Targets</div>
      <div className="grid md:grid-cols-2 gap-3">
        <input className="input" type="month" value={month} onChange={e=>setMonth(e.target.value)} />
        <input className="input" placeholder="Outstanding Target (₹)" value={outstandingTarget} onChange={e=>setOutstanding(e.target.value)} />
        <input className="input" placeholder="Billing Target (₹ optional)" value={billingTarget} onChange={e=>setBilling(e.target.value)} />
        <button className="btn" onClick={saveTargets}>Save Targets</button>
      </div>
      {msg && <div className="text-sm">{msg}</div>}
    </div>
    <div className="card">Assign Projects & PM Progress will be wired next.</div>
  </div>
}
