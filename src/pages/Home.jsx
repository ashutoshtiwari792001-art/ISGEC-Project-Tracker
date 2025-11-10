import React, {useEffect, useState} from 'react'
import { getHomeSummary, fmtINR } from '../api'

export default function Home(){
  const [month, setMonth] = useState(()=>{
    const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`
  })
  const [data,setData]=useState({outstandingTarget:0,billed:0,projectsCount:0})
  useEffect(()=>{ (async()=>{
    const j = await getHomeSummary(month)
    if(j && j.ok){ setData(j) }
  })() },[month])

  const pct = Math.min(100, Math.round((data.billed/Math.max(1,data.outstandingTarget))*100))
  const size=220, stroke=14, r=(size-stroke)/2, c=2*Math.PI*r
  const billedDash = (pct/100)*c

  return <div className="space-y-4">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="card lg:col-span-2">
        <div className="text-sm text-slate-500 mb-2">Month:
          <input type="month" className="ml-2 border rounded px-2 py-1" value={month} onChange={e=>setMonth(e.target.value)} />
        </div>
        <div className="flex items-center gap-6 flex-wrap justify-center">
          <div style={{width:size,height:size, position:'relative'}}>
            <svg width={size} height={size}>
              <circle cx={size/2} cy={size/2} r={r} stroke="#e5e7eb" strokeWidth={stroke} fill="none"/>
              <circle cx={size/2} cy={size/2} r={r} stroke="#0B62A3" strokeWidth={stroke} fill="none"
                strokeDasharray={`${billedDash} ${c-billedDash}`} strokeLinecap="round"
                transform={`rotate(-90 ${size/2} ${size/2})`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="text-xs text-slate-500">Billed</div>
              <div className="text-xl font-bold">₹ {fmtINR(data.billed)}</div>
              <div className="text-[11px] text-slate-500">{pct}% of target</div>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase text-slate-500">Outstanding Target</div>
            <div className="text-xl font-bold">₹ {fmtINR(data.outstandingTarget)}</div>
            <div className="mt-3 text-xs uppercase text-slate-500">Projects</div>
            <div className="text-xl font-bold">{data.projectsCount}</div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="font-semibold">Quick KPIs</div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div><div className="text-xs uppercase text-slate-500">Billed</div><div className="text-lg font-bold">₹ {fmtINR(data.billed)}</div></div>
          <div><div className="text-xs uppercase text-slate-500">Remaining</div><div className="text-lg font-bold">₹ {fmtINR(Math.max(0,(data.outstandingTarget||0)-(data.billed||0)))}</div></div>
        </div>
      </div>
    </div>
  </div>
}
