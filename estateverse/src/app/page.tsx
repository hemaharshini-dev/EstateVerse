"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BedDouble, Building2, Check, Compass, Home as HomeIcon, MapPin, Maximize2, Move3d, Play, RotateCcw, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

type RoomName="Living room"|"Kitchen"|"Bedroom"|"Bathroom";
const rooms:RoomName[]=["Living room","Kitchen","Bedroom","Bathroom"];
const roomCopy:Record<RoomName,{subtitle:string;detail:string;size:string;icon:string}>= {
  "Living room":{subtitle:"A little room to breathe.",detail:"Open-plan living and dining area with full-height balcony doors.",size:"18′ × 14′",icon:"01"},
  Kitchen:{subtitle:"Made for everyday rituals.",detail:"L-shaped kitchen with stone counters and a separate utility nook.",size:"10′ × 9′",icon:"02"},
  Bedroom:{subtitle:"Your own quieter corner.",detail:"Primary bedroom with wardrobe wall and an attached ensuite.",size:"14′ × 12′",icon:"03"},
  Bathroom:{subtitle:"A calm start and end to the day.",detail:"Contemporary fittings, walk-in shower and warm natural finishes.",size:"8′ × 6′",icon:"04"},
};

function Box({position,scale,color,rotation=0,radius=0}:{position:[number,number,number];scale:[number,number,number];color:string;rotation?:number;radius?:number}) {
  return <mesh position={position} rotation={[0,rotation,0]} castShadow receiveShadow><boxGeometry args={scale}/><meshStandardMaterial color={color} roughness={radius?0.5:.82} metalness={radius}/></mesh>;
}
function FloorPlan({active,onSelect}:{active:RoomName;onSelect:(room:RoomName)=>void}) {
  const {camera}=useThree(); const controls=useRef<OrbitControlsImpl>(null);
  useEffect(()=>{
    const targets:Record<RoomName,[number,number,number]>={"Living room":[-1.7,0,1.2],Kitchen:[-1.7,0,-1.25],Bedroom:[1.45,0,1.1],Bathroom:[1.55,0,-1.35]};
    const target=targets[active]; const positions:Record<RoomName,[number,number,number]>={"Living room":[-5,7,8],Kitchen:[-5,7,6],Bedroom:[6,7,8],Bathroom:[6,7,6]};
    camera.position.set(...positions[active]); camera.lookAt(...target); camera.updateProjectionMatrix();
    if(controls.current){controls.current.target.set(...target);controls.current.update();}
  },[active,camera]);
  const highlight=(name:RoomName)=>active===name?"#d28c5e":"#8b7867";
  return <>
    <ambientLight intensity={1.2}/><directionalLight position={[4,9,6]} intensity={2.8} color="#ffe2c8" castShadow/><Environment preset="apartment"/>
    <group position={[0,-.12,0]}>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.08,0]} receiveShadow><planeGeometry args={[9.15,7.1]}/><meshStandardMaterial color="#ded0bc" roughness={.93}/></mesh>
      <mesh position={[-2.3,.015,0]} onClick={(e)=>{e.stopPropagation();onSelect("Living room");}}><boxGeometry args={[4.45,.055,3.45]}/><meshStandardMaterial color={highlight("Living room")}/></mesh>
      <mesh position={[-2.3,.016,-2.1]} onClick={(e)=>{e.stopPropagation();onSelect("Kitchen");}}><boxGeometry args={[4.45,.055,.72]}/><meshStandardMaterial color={highlight("Kitchen")}/></mesh>
      <mesh position={[2.25,.015,0]} onClick={(e)=>{e.stopPropagation();onSelect("Bedroom");}}><boxGeometry args={[4.25,.055,3.45]}/><meshStandardMaterial color={highlight("Bedroom")}/></mesh>
      <mesh position={[2.25,.016,-2.1]} onClick={(e)=>{e.stopPropagation();onSelect("Bathroom");}}><boxGeometry args={[4.25,.055,.72]}/><meshStandardMaterial color={highlight("Bathroom")}/></mesh>
      {/* Cutaway walls keep the furniture visible from above. */}
      <Box position={[-4.5,.63,0]} scale={[.16,1.35,7]} color="#eee7dd"/><Box position={[4.5,.63,0]} scale={[.16,1.35,7]} color="#eee7dd"/><Box position={[0,.63,-3.5]} scale={[9,1.35,.16]} color="#eee7dd"/>
      <Box position={[0,.63,3.5]} scale={[2.2,1.35,.16]} color="#eee7dd"/><Box position={[-3.15,.63,3.5]} scale={[2.5,1.35,.16]} color="#eee7dd"/><Box position={[3.1,.63,3.5]} scale={[2.7,1.35,.16]} color="#eee7dd"/>
      <Box position={[0,.6,-.25]} scale={[.13,1.2,2.4]} color="#e4d7c7"/><Box position={[0,.6,-2.85]} scale={[.13,1.2,.8]} color="#e4d7c7"/><Box position={[0,.6,2.9]} scale={[.13,1.2,1.2]} color="#e4d7c7"/>
      {/* Living and dining */}
      <Box position={[-2.8,.27,1.25]} scale={[2.1,.42,.72]} color="#8f6652"/><Box position={[-2.8,.54,1.62]} scale={[2.1,.62,.14]} color="#a77a63"/><Box position={[-3.75,.51,1.28]} scale={[.14,.54,.8]} color="#a77a63"/>
      <Box position={[-1.3,.24,.75]} scale={[1.05,.18,.72]} color="#cba67f"/><Box position={[-1.3,.1,.75]} scale={[.12,.2,.12]} color="#765c48"/><Box position={[-1.3,.1,1.38]} scale={[.12,.2,.12]} color="#765c48"/>
      <Box position={[-1.35,.28,-.48]} scale={[1.25,.56,.7]} color="#584c43"/><Box position={[-1.35,.58,-.48]} scale={[1.15,.08,.6]} color="#b79472"/>
      {/* Kitchen */}
      <Box position={[-3.25,.45,-2.55]} scale={[2.25,.85,.55]} color="#b6a18a"/><Box position={[-3.25,.91,-2.55]} scale={[2.32,.08,.62]} color="#ddd1bf"/><Box position={[-1.6,.36,-2.75]} scale={[.65,.7,.75]} color="#716b63"/>
      {/* Bedroom */}
      <Box position={[2.1,.21,1.1]} scale={[2.4,.23,1.65]} color="#cbb89e"/><Box position={[2.1,.45,1.4]} scale={[2.4,.36,.16]} color="#826750"/><Box position={[2.1,.37,.92]} scale={[2.15,.12,1.1]} color="#eee5d8"/><Box position={[1.45,.47,.35]} scale={[.55,.12,.38]} color="#f4efe6"/><Box position={[2.65,.47,.35]} scale={[.55,.12,.38]} color="#f4efe6"/>
      <Box position={[3.9,.55,1.5]} scale={[.68,1.1,2.5]} color="#89715c"/>
      {/* Bathroom */}
      <Box position={[3.4,.22,-2.7]} scale={[1.55,.34,.9]} color="#d7cec1"/><Box position={[3.4,.42,-2.65]} scale={[.5,.12,.32]} color="#f2eee8"/><Box position={[1.55,.25,-2.72]} scale={[.7,.4,.55]} color="#eee9e0"/><Box position={[1.55,.47,-2.72]} scale={[.55,.06,.48]} color="#c6b9a7"/>
    </group>
    <OrbitControls ref={controls} enablePan={false} minDistance={6} maxDistance={13} minPolarAngle={.45} maxPolarAngle={1.25} makeDefault/>
  </>;
}

export default function Home(){
  const [tab,setTab]=useState<"details"|"tour">("details"); const [room,setRoom]=useState<RoomName>("Living room"); const [roomViews,setRoomViews]=useState(0); const [showVisit,setShowVisit]=useState(false); const [visitSent,setVisitSent]=useState(false);
  const roomData=roomCopy[room];
  const selectRoom=(next:RoomName)=>{setRoom(next);setRoomViews(n=>n+1);};
  return <main className="estate-app">
    <header className="app-header"><a className="brand" href="#"><span className="brand-icon"><Building2 size={18}/></span><span>estate<b>verse</b><small>PROPERTY PREVIEW</small></span></a><div className="header-project"><span className="project-dot"/> AURELIA HEIGHTS <span className="header-slash">/</span> APARTMENT A-0802</div></header>
    <div className="app-content">
      <div className="intro"><div><div className="eyebrow">AURELIA HEIGHTS <span>·</span> FINANCIAL DISTRICT, HYDERABAD</div><h1>A home, seen from the inside.</h1><p>Explore apartment A-0802 at your own pace.</p></div><div className="intro-chip"><span/> UNDER CONSTRUCTION <span className="chip-dot">·</span> HANDOVER DEC 2027</div></div>
      <div className="experience-card">
        <div className="tabbar" role="tablist" aria-label="Apartment views"><button role="tab" aria-selected={tab==="details"} className={tab==="details"?"active":""} onClick={()=>setTab("details")}><HomeIcon size={15}/>Apartment details</button><button role="tab" aria-selected={tab==="tour"} className={tab==="tour"?"active":""} onClick={()=>setTab("tour")}><Move3d size={15}/>3D tour <span className="new-badge">INTERACTIVE</span></button><span className="tab-spacer"/><span className="unit-id">UNIT <b>A-0802</b></span></div>
        <AnimatePresence mode="wait">
        {tab==="details"?<motion.section key="details" className="detail-view" role="tabpanel" initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-4}} transition={{duration:.2}}>
          <div className="detail-hero"><div className="hero-copy"><span className="available-tag"><i/> AVAILABLE</span><h2>A thoughtful<br/>place to call home.</h2><p>Bright, well-planned living in the heart of Hyderabad’s Financial District.</p><button className="primary-button" onClick={()=>setShowVisit(true)}>Request a visit <ArrowRight size={15}/></button></div><div className="floor-art" aria-label="Illustration of a modern apartment building"><div className="art-glow"/><div className="art-building"><div className="art-roof"/>{Array.from({length:8},(_,i)=><div key={i} className="art-floor"><span/><span/><span/></div>)}<div className="art-base"/></div><div className="art-side-line line-one"/><div className="art-side-line line-two"/><div className="art-caption"><span/> AURELIA HEIGHTS <small>UNIT A-0802</small></div></div></div>
          <div className="facts-grid"><div className="fact"><BedDouble size={16}/><div><small>CONFIGURATION</small><b>2 BHK</b></div></div><div className="fact"><Maximize2 size={15}/><div><small>AREA</small><b>1,240 <span>sq.ft.</span></b></div></div><div className="fact"><Compass size={15}/><div><small>FACING</small><b>East</b></div></div><div className="fact"><Building2 size={15}/><div><small>FLOOR</small><b>08 <span>of 13</span></b></div></div></div>
          <div className="detail-lower"><div><h3>Designed for daily life</h3><p>An open living area, a practical kitchen, and a quiet bedroom—every space has room to work.</p><div className="amenities"><span><Check size={12}/> Balcony</span><span><Check size={12}/> Covered parking</span><span><Check size={12}/> Clubhouse access</span></div></div><div className="price-card"><small>APARTMENT A-0802</small><b>₹77 lakh</b><span>Indicative price · local demo data</span><button onClick={()=>setTab("tour")}>Take the 3D tour <ArrowRight size={13}/></button></div></div>
        </motion.section>:<motion.section key="tour" className="tour-view" role="tabpanel" initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-4}} transition={{duration:.2}}>
          <div className="tour-heading"><div><span className="eyebrow">APARTMENT A-0802 <span>·</span> 1,240 SQ.FT.</span><h2>Walk through your future home.</h2><p>Click a room in the model or choose it from the list. Drag to look around.</p></div><button className="reset-view" onClick={()=>selectRoom("Living room")}><RotateCcw size={13}/> Reset view</button></div>
          <div className="tour-layout"><div className="scene"><div className="scene-chip"><span/> LIVE 3D MODEL</div><div className="scene-hint"><Move3d size={12}/> DRAG TO ROTATE <span>·</span> SCROLL TO ZOOM</div><Canvas shadows camera={{position:[-5,7,8],fov:42}} gl={{antialias:true,alpha:true}}><color attach="background" args={["#211d1a"]}/><FloorPlan active={room} onSelect={selectRoom}/></Canvas><div className="scene-footer"><span>ROOM FOCUS <b>{room.toUpperCase()}</b></span><span>{roomViews} room views</span></div></div>
            <aside className="room-panel"><div className="room-panel-top"><span className="eyebrow">EXPLORE THE APARTMENT</span><b>Choose a room</b></div><div className="room-list">{rooms.map((name)=><button key={name} className={`room-choice ${room===name?"active":""}`} onClick={()=>selectRoom(name)}><span className="room-number">{roomCopy[name].icon}</span><span className="room-choice-copy"><b>{name}</b><small>{roomCopy[name].size}</small></span>{room===name?<span className="room-current"><Play size={10} fill="currentColor"/></span>:<ArrowRight size={14}/>}</button>)}</div><motion.div className="room-note" key={room} initial={{opacity:0,y:4}} animate={{opacity:1,y:0}}><span className="eyebrow">{room.toUpperCase()} · {roomData.size}</span><h3>{roomData.subtitle}</h3><p>{roomData.detail}</p></motion.div><button className="tour-details-link" onClick={()=>setTab("details")}><ArrowLeft size={13}/> Apartment details</button></aside></div>
        </motion.section>}
        </AnimatePresence>
      </div>
      <footer className="app-footer"><span>ESTATEVERSE <span>·</span> AURELIA HEIGHTS</span><span><MapPin size={12}/> Financial District, Hyderabad</span><span>INTERACTIVE PROPERTY PREVIEW</span></footer>
    </div>
    <AnimatePresence>{showVisit&&<motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setShowVisit(false)}><motion.div className="visit-modal" initial={{opacity:0,y:12,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:10}} onClick={e=>e.stopPropagation()}>{visitSent?<><div className="success-mark"><Check size={21}/></div><h2>Thanks for your interest.</h2><p>This is a local demo, so your request hasn’t been sent anywhere.</p><button className="primary-button" onClick={()=>{setShowVisit(false);setVisitSent(false);}}>Done <Check size={14}/></button></>:<><button className="modal-close" onClick={()=>setShowVisit(false)} aria-label="Close"><X size={16}/></button><span className="eyebrow">AURELIA HEIGHTS · A-0802</span><h2>Request a visit</h2><p>Share your details and we’ll arrange a walkthrough.</p><label>Your name<input placeholder="e.g. Ananya Rao"/></label><label>Email address<input type="email" placeholder="you@example.com"/></label><button className="primary-button modal-submit" onClick={()=>setVisitSent(true)}>Send request <ArrowRight size={14}/></button><small className="demo-note">Demo only · no information leaves this page.</small></>}</motion.div></motion.div>}</AnimatePresence>
  </main>;
}
