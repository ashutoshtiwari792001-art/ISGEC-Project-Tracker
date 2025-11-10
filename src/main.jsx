import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import './index.css'
import Home from './pages/Home.jsx'
import AddBilling from './pages/AddBilling.jsx'
import AddProjects from './pages/AddProjects.jsx'
import ManagerView from './pages/ManagerView.jsx'
import LeadView from './pages/LeadView.jsx'
import Remarks from './pages/Remarks.jsx'

function Sidebar(){
  const items=[
    ['/','Home'],
    ['/add-billing','Add Billing'],
    ['/add-projects','Add Projects'],
    ['/manager-view','Manager View'],
    ['/lead-view','Lead View'],
    ['/remarks','Remarks'],
  ]
  return <aside className="w-64 bg-isgecBlue text-white p-4">
    <div className="text-xs uppercase opacity-80 mb-2">Menu</div>
    {items.map(([to,label])=>(
      <NavLink key={to} to={to} className={({isActive})=>`block px-3 py-2 rounded ${isActive?'bg-white/15':'hover:bg-white/10'}`}>{label}</NavLink>
    ))}
    <div className="mt-6 text-[10px] opacity-60">© ISGEC</div>
  </aside>
}

function TopBar(){
  return <div className="h-16 bg-white border-b border-slate-200 flex items-center gap-3 px-4">
    <img src="/ISGEC_logo.png" className="h-9" />
    <h1 className="text-lg font-bold title-anim">ISGEC – Project Tracking Dashboard</h1>
  </div>
}

function App(){
  return <div className="h-screen flex">
    <Sidebar/>
    <div className="flex-1 flex flex-col">
      <TopBar/>
      <main className="p-4 overflow-auto">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/add-billing" element={<AddBilling/>}/>
          <Route path="/add-projects" element={<AddProjects/>}/>
          <Route path="/manager-view" element={<ManagerView/>}/>
          <Route path="/lead-view" element={<LeadView/>}/>
          <Route path="/remarks" element={<Remarks/>}/>
        </Routes>
      </main>
    </div>
  </div>
}

createRoot(document.getElementById('root')).render(<BrowserRouter><App/></BrowserRouter>)
