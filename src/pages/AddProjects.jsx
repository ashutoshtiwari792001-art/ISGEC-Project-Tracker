import React, {useState} from 'react'
import { addProject } from '../api'

export default function AddProjects(){
  const [form,setForm]=useState({code:'',name:'',pm:'',client:'',start:'',end:'',status:'Active'})
  const [msg,setMsg]=useState('')
  const onChange=e=>setForm({...form,[e.target.name]:e.target.value})
  const save=async()=>{
    if(!form.code||!form.name||!form.pm){ setMsg('Project Code, Name, PM are required'); return }
    const j=await addProject(form); setMsg(j.ok? 'Saved ✅' : ('Error: '+(j.error||'unknown')))
  }
  return <div className="card max-w-3xl">
    <div className="text-xl font-semibold mb-2">Add Project</div>
    <div className="grid md:grid-cols-2 gap-3">
      <input className="input" placeholder="Project Code" name="code" value={form.code} onChange={onChange}/>
      <input className="input" placeholder="Project Name" name="name" value={form.name} onChange={onChange}/>
      <input className="input" placeholder="Project Manager" name="pm" value={form.pm} onChange={onChange}/>
      <input className="input" placeholder="Client (optional)" name="client" value={form.client} onChange={onChange}/>
      <input className="input" type="date" name="start" value={form.start} onChange={onChange}/>
      <input className="input" type="date" name="end" value={form.end} onChange={onChange}/>
      <select className="input" name="status" value={form.status} onChange={onChange}>
        <option>Active</option><option>Hold</option><option>Closed</option>
      </select>
      <button className="btn" onClick={save}>Save</button>
    </div>
    {msg && <div className="mt-3 text-sm">{msg}</div>}
  </div>
}
