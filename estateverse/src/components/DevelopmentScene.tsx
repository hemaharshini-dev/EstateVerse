"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { Apartment, RoomName } from "@/data/apartments";
import { apartments as allApartments } from "@/data/apartments";

type Props = { selectedId: string; visibleIds: Set<string>; onSelect: (id: string) => void; resetKey?: number; viewMode: "development" | "apartment"; activeRoom:RoomName; onRoomSelect:(room:RoomName)=>void };
const towerData = [
  { name: "Tower A", x: -5.1, z: 0.7, floors: 13, tint: "#8d776b" },
  { name: "Tower B", x: 0, z: -1, floors: 15, tint: "#a48b78" },
  { name: "Tower C", x: 5.1, z: 0.7, floors: 12, tint: "#817064" },
] as const;

function Tower({ tower, units, selectedId, visibleIds, onSelect }: Pick<Props,"selectedId"|"visibleIds"|"onSelect"> & { tower: typeof towerData[number]; units: Apartment[] }) {
  const unitByPosition = useMemo(() => new Map(units.map((unit) => [`${unit.floor}:${unit.position}`, unit])), [units]);
  const unitPositions = [-1.28, -.64, 0, .64, 1.28];
  const floors = Array.from({ length: tower.floors }, (_, i) => i + 1);
  return <group position={[tower.x, 0, tower.z]}>
    <mesh position={[0, .21, 0]} castShadow receiveShadow><boxGeometry args={[3.65, .42, 2.45]}/><meshStandardMaterial color="#b39b83" roughness={.8}/></mesh>
    <mesh position={[0, .46, 0]} castShadow><boxGeometry args={[3.72, .09, 2.52]}/><meshStandardMaterial color="#d3b99a" roughness={.72}/></mesh>
    {floors.map((floor) => <group key={floor} position={[0, .5 + floor * .43, 0]}>
      <mesh castShadow><boxGeometry args={[3.42, .4, 2.18]}/><meshStandardMaterial color={tower.tint} roughness={.69}/></mesh>
      <mesh position={[0, .2, 0]}><boxGeometry args={[3.53, .035, 2.26]}/><meshStandardMaterial color="#d3b99b" roughness={.8}/></mesh>
      {unitPositions.map((x, position) => {
        const unit = unitByPosition.get(`${floor}:${position}`);
        const match = !!unit && visibleIds.has(unit.id);
        const selected = unit?.id === selectedId;
        const color = selected ? "#f7b17b" : unit ? (match ? "#80ccaa" : "#49504e") : (floor % 3 === 0 ? "#a6bac0" : "#596970");
        return <group key={position} position={[x, 0, 1.105]}>
          <mesh position={[0, 0, .018]} castShadow onClick={(event) => { if (unit && match) { event.stopPropagation(); onSelect(unit.id); } }}>
            <boxGeometry args={[.49, .245, .055]}/>
            <meshStandardMaterial color={color} emissive={selected ? "#e27e43" : (unit && match ? "#33846a" : "#253238")} emissiveIntensity={selected ? 1.1 : (unit && match ? .42 : .16)} metalness={.46} roughness={.27} transparent opacity={unit && !match ? .4 : 1}/>
          </mesh>
          <mesh position={[0, -.18, .12]}><boxGeometry args={[.58, .035, .24]}/><meshStandardMaterial color={selected ? "#e7a373" : "#6a5c50"} metalness={.2} roughness={.65}/></mesh>
        </group>;
      })}
      <mesh position={[1.72, -.01, 0]}><boxGeometry args={[.028, .12, 1.72]}/><meshStandardMaterial color="#d3b99a"/></mesh>
      <mesh position={[-1.72, -.01, 0]}><boxGeometry args={[.028, .12, 1.72]}/><meshStandardMaterial color="#d3b99a"/></mesh>
    </group>)}
    <mesh position={[0, .55 + tower.floors * .43, 0]}><boxGeometry args={[3.68, .14, 2.48]}/><meshStandardMaterial color="#d3b99a" roughness={.72}/></mesh>
    <mesh position={[0, .79 + tower.floors * .43, 0]} castShadow><boxGeometry args={[2.05, .38, 1.6]}/><meshStandardMaterial color="#65574d" roughness={.75}/></mesh>
    <mesh position={[0, 1.02 + tower.floors * .43, 0]}><cylinderGeometry args={[.055, .055, .18, 12]}/><meshStandardMaterial color="#e7a06e" emissive="#d47643" emissiveIntensity={.4}/></mesh>
  </group>;
}

function Tree({ position, size=1 }: { position:[number,number,number]; size?:number }) {
  return <group position={position} scale={size}>
    <mesh position={[0,.35,0]} castShadow><cylinderGeometry args={[.045,.075,.7,7]}/><meshStandardMaterial color="#745b49"/></mesh>
    <mesh position={[0,.86,0]} castShadow><icosahedronGeometry args={[.42,1]}/><meshStandardMaterial color="#4c715e" roughness={.94}/></mesh>
    <mesh position={[.2,.68,.05]} castShadow><icosahedronGeometry args={[.29,1]}/><meshStandardMaterial color="#65846a" roughness={.94}/></mesh>
  </group>;
}

function Interior({ bedrooms,activeRoom,onRoomSelect }: { bedrooms:number;activeRoom:RoomName;onRoomSelect:(room:RoomName)=>void }) {
  const block=(position:[number,number,number],size:[number,number,number],color:string)=><mesh position={position} castShadow receiveShadow><boxGeometry args={size}/><meshStandardMaterial color={color} roughness={.8}/></mesh>;
  const zone=(name:RoomName,position:[number,number,number],size:[number,number,number])=><mesh key={name} position={position} onClick={event=>{event.stopPropagation();onRoomSelect(name);}}><boxGeometry args={size}/><meshStandardMaterial color={activeRoom===name?"#e99562":"#b99a7a"} emissive={activeRoom===name?"#b84e20":"#000000"} emissiveIntensity={activeRoom===name?.35:0} transparent opacity={activeRoom===name?.66:.15} depthWrite={false}/></mesh>;
  return <group>
    <color attach="background" args={["#302a26"]}/><ambientLight intensity={1.5}/><directionalLight position={[-5,10,8]} intensity={2.3} color="#ffe3c5" castShadow/><hemisphereLight args={["#dce5ed","#6e5b4a",.65]}/>
    {block([0,-.12,0],[9,.24,7],"#c8b39a")}
    {/* Open-front cutaway keeps the room layout readable while retaining wall depth. */}
    {block([-4.4,1.05,0],[.2,2.1,7],"#e6ddd1")}{block([4.4,1.05,0],[.2,2.1,7],"#e6ddd1")}{block([0,1.05,-3.4],[8.8,2.1,.2],"#e6ddd1")}
    {block([0,1.02,.05],[.16,2,.95],"#d8c9b6")}{block([0,1.02,-2.2],[.16,2,2.4],"#d8c9b6")}{block([1.2,1.02,1.6],[2.5,2,.14],"#d8c9b6")}
    {/* Furnished living / dining, kitchen, bedroom and bath. */}
    {block([-2.2,.38,1.75],[2.4,.58,.82],"#a47d62")}{block([-3.27,.68,1.75],[.28,.72,.92],"#967257")}{block([-2,.2,.45],[1.15,.13,.64],"#765d4d")}
    {block([-1.8,.55,-1.2],[1.5,.12,.8],"#8b6c52")}{block([-1.8,.28,-1.2],[.12,.55,.12],"#755b46")}
    {block([-2.5,.52,-2.85],[3.2,.72,.72],"#91877c")}{block([-2.5,.9,-2.85],[3.2,.08,.78],"#ded4c8")}
    {block([1.45,.32,-.6],[2.15,.42,2.25],"#b8a897")}{block([1.45,.62,-.85],[2,.18,1.7],"#eee6dc")}{block([1.45,.62,-1.65],[2.1,.9,.18],"#795f4c")}
    {block([1.05,.42,-.45],[.45,.72,.48],"#8d715a")}{block([3.65,.42,-.45],[.45,.72,.48],"#8d715a")}
    {block([3.3,.28,2.35],[1.25,.5,1.1],"#b8c6c1")}{block([3.3,.58,2.35],[.7,.12,.55],"#e5e9e5")}
    {block([.35,.34,2.45],[1.55,.48,.9],"#bcae9c")}{block([.35,.61,2.55],[1.4,.12,.58],"#f0e8de")}
    {bedrooms===3&&<>{block([3,.32,-.6],[1.45,.42,2.25],"#b8a897")}{block([3,.62,-.85],[1.3,.18,1.7],"#eee6dc")}{block([3,.62,-1.65],[1.4,.9,.18],"#795f4c")}{block([2.15,1.02,-1.35],[.14,2,3.5],"#d8c9b6")}{block([1.35,.34,2.45],[1.4,.48,.9],"#bcae9c")}{block([1.35,.61,2.55],[1.3,.12,.58],"#f0e8de")}</>}
    {zone("Living",[-2.4,.025,1.35],[3.8,.025,3.5])}{zone("Kitchen",[-2.4,.025,-2.3],[3.8,.025,1.8])}{bedrooms===3?<>{zone("Bedroom 1",[1.15,.025,-1.35],[1.8,.025,3.5])}{zone("Bedroom 2",[3.25,.025,-1.35],[2,.025,3.5])}{zone("Bedroom 3",[1.35,.025,2.3],[1.4,.025,2.05])}</>:<>{zone("Bedroom 1",[2.3,.025,-1.35],[3.65,.025,3.5])}{zone("Bedroom 2",[.35,.025,2.3],[1.75,.025,2.05])}</>}{zone("Bath",[3.3,.028,1.85],[1.7,.025,1.85])}
  </group>;
}

function Site({ selectedId, visibleIds, onSelect, resetKey=0, viewMode, activeRoom, onRoomSelect }: Props) {
  const controls=useRef<OrbitControlsImpl|null>(null);
  const {camera}=useThree();
  useEffect(()=>{
    const inside=viewMode==="apartment";
    const position:[number,number,number]=inside?[10,10,14]:[17,14,22];
    const target:[number,number,number]=inside?[0,.3,0]:[0,3.6,0];
    camera.position.set(...position);
    controls.current?.target.set(...target);
    controls.current?.update();
  },[viewMode,resetKey,camera]);
  const grouped = (tower: typeof towerData[number]["name"]) => apartmentsForTower(tower);
  function apartmentsForTower(name: typeof towerData[number]["name"]) { return allApartments.filter((unit) => unit.tower === name); }
  return <>
   {viewMode==="development"?<>
    <color attach="background" args={["#d8d6d1"]}/><fog attach="fog" args={["#d8d6d1", 22, 45]}/>
    <ambientLight intensity={1.25}/><directionalLight position={[-8,18,10]} intensity={2.7} color="#fff0dc" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024}/><hemisphereLight args={["#dae7ee", "#80746c", .75]}/>
    <mesh position={[0,-.26,0]} receiveShadow><boxGeometry args={[18,.5,8.8]}/><meshStandardMaterial color="#b8b0a5" roughness={.95}/></mesh>
    <mesh position={[0,.005,0]}><boxGeometry args={[17.6,.05,8.2]}/><meshStandardMaterial color="#d1c9bd" roughness={.96}/></mesh>
    <mesh position={[0,.045,2.6]}><boxGeometry args={[17,.035,2.1]}/><meshStandardMaterial color="#91887d" roughness={.94}/></mesh>
    <mesh position={[0,.067,2.6]}><boxGeometry args={[17,.015,.12]}/><meshStandardMaterial color="#e3d8c7" roughness={.9}/></mesh>
    <mesh position={[0,.08,-3.1]}><boxGeometry args={[6.8,.04,1.25]}/><meshStandardMaterial color="#b3c4c2" roughness={.34} metalness={.12}/></mesh>
    <mesh position={[0,.104,-3.1]}><boxGeometry args={[6.2,.012,.78]}/><meshStandardMaterial color="#d2d8d4" roughness={.4}/></mesh>
    {towerData.map((tower) => <Tower key={tower.name} tower={tower} units={grouped(tower.name)} selectedId={selectedId} visibleIds={visibleIds} onSelect={onSelect}/>)}
    {[
      [-8,.08,-2.3,.9],[-7.1,.08,3.45,.8],[-3.7,.08,3.45,.7],[-1.8,.08,3.45,.9],[3.6,.08,3.45,.75],[7.3,.08,-2.35,.85],[8,.08,3.2,.68],
    ].map(([x,y,z,size],i)=><Tree key={i} position={[x,y,z]} size={size}/>)}
   </>:<Interior bedrooms={allApartments.find(unit=>unit.id===selectedId)?.bedrooms??2} activeRoom={activeRoom} onRoomSelect={onRoomSelect}/>}
    <OrbitControls ref={controls} makeDefault enablePan={false} minDistance={viewMode==="apartment"?6:14} maxDistance={viewMode==="apartment"?15:32} minPolarAngle={.3} maxPolarAngle={1.35}/>
  </>;
}

export default function DevelopmentScene(props: Props) {
  return <Canvas shadows camera={{ position: [17, 14, 22], fov: 36 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
    <Site {...props}/>
  </Canvas>;
}

