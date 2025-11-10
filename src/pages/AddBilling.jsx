import React, {useEffect, useState} from 'react'
import { getAssignments, addBilling, getProjects } from '../api'

export default function AddBilling(){
  const [assigned,setAssigned]=useState([])
  const [useAssigned,setUseAssigned]=useState(true)
  const [msg,setMsg]=useState('')
  const [form,setForm]=useState({date:'',code:'',name:'',so:'',amount:'',pm:'',pmRemark:''})

  useEffect(()=>{ (async()=>{
    const asg = await getAssignments()
    setAssigned(asg||[])
    setUseAssigned(asg && asg.length>0)
  })() },[])

  const onChange=e=>{
    const {name,value} = e.target
    let next={...form,[name]:value}
    if(name==='code' && useAssigned){
      const row = assigned.find(r=> (r['Project Code']||'')===value)
      if(row){ next.name=row['Project Name']||''; next.pm=row['Project Manager']||'' }
    }
    setForm(next)
  }

  const save=async()=>{
    if(!form.code || !form.name || !form.so || !form.amount || !form.date){ setMsg('All required fields must be filled'); return }
    const j = await addBilling(form)
    setMsg(j.ok? 'Billing saved ✅' : ('Error: '+(j.error||'unknown')))
  }

  return <div className="card max-w-3xl space-y-3">
    <div className="text-xl font-semibold">Add Billing</div>
    <div className="text-sm text-slate-600">If project is assigned by Lead, choose from dropdown; otherwise enter manually.</div>

    <div className="flex items-center gap-2 text-sm">
      <input id="toggle" type="checkbox" checked={useAssigned} onChange={e=>setUseAssigned(e.target.checked)} />
      <label htmlFor="toggle">Use Assigned Projects (if available)</label>
    </div>

    {useAssigned ? (
      <div className="grid md:grid-cols-2 gap-3">
        <select className="input" name="code" value={form.code} onChange={onChange}>
          <option value="">Select Assigned Project Code</option>
          {assigned.map((r,i)=>(<option key={i} value={r['Project Code']}>{r['Project Code']}</option>))}
        </select>
        <input className="input" placeholder="Project Name" name="name" value={form.name} onChange={onChange} readOnly />
        <input className="input" placeholder="Project Manager" name="pm" value={form.pm} onChange={onChange} readOnly />
        <input className="input" placeholder="SO Number (required)" name="so" value={form.so} onChange={onChange} />
        <input className="input" placeholder="Amount (₹)" name="amount" value={form.amount} onChange={onChange} />
        <input className="input" type="date" name="date" value={form.date} onChange={onChange} />
        <textarea className="input md:col-span-2" placeholder="Remarks (optional)" name="pmRemark" value={form.pmRemark} onChange={onChange}/>
      </div>
    ) : (
      <div className="grid md:grid-cols-2 gap-3">
        <input className="input" placeholder="Project Code" name="code" value={form.code} onChange={onChange} />
        <input className="input" placeholder="Project Name" name="name" value={form.name} onChange={onChange} />
        <input className="input" placeholder="Project Manager" name="pm" value={form.pm} onChange={onChange} />
        <input className="input" placeholder="SO Number (required)" name="so" value={form.so} onChange={onChange} />
        <input className="input" placeholder="Amount (₹)" name="amount" value={form.amount} onChange={onChange} />
        <input className="input" type="date" name="date" value={form.date} onChange={onChange} />
        <textarea className="input md:col-span-2" placeholder="Remarks (optional)" name="pmRemark" value={form.pmRemark} onChange={onChange}/>
      </div>
    )}

    <button className="btn" onClick={save}>Save Billing</button>
    {msg && <div className="text-sm mt-2">{msg}</div>}
  </div>
}
