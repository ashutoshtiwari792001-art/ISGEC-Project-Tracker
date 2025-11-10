export const API_BASE = "https://script.google.com/macros/s/AKfycbwAOykiO-B37VEcJ6i3etdI5rtPmn_LdmZBJCnqJmSEU9Z3B1mM4HVQCVHScl-IXwme/exec";
export const API_KEY = "ISGEC2025";

export async function getHomeSummary(month){
  const url = `${API_BASE}?action=homeSummary&month=${month}`;
  const r = await fetch(url); return r.json();
}

export async function getProjects(){
  const r = await fetch(`${API_BASE}?action=projects`); return r.json();
}

// Attempt to fetch assignments list (if backend exposes it). Fallback empty.
export async function getAssignments(){
  try{ const r = await fetch(`${API_BASE}?action=assignments`); const j = await r.json(); return j.assignments||[]; }
  catch(e){ return []; }
}

export async function addProject(payload){
  const r = await fetch(API_BASE, { method:'POST', headers:{'Content-Type':'application/json','x-api-key':API_KEY}, body: JSON.stringify({action:'addProject',...payload}) });
  return r.json();
}

export async function addBilling(payload){
  const r = await fetch(API_BASE, { method:'POST', headers:{'Content-Type':'application/json','x-api-key':API_KEY}, body: JSON.stringify({action:'addBilling',...payload}) });
  return r.json();
}

export async function setMonthlyTargets(payload){
  const r = await fetch(API_BASE, { method:'POST', headers:{'Content-Type':'application/json','x-api-key':API_KEY}, body: JSON.stringify({action:'setMonthlyTargets',...payload}) });
  return r.json();
}

export const fmtINR = (n)=> new Intl.NumberFormat('en-IN').format(Math.round(n||0));
