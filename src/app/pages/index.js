"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import Footer from "../components/Footer";
import roomsData from "../data/rooms.json";
import gamemastersData from "../data/gamemasters.json";
import assignGamemasters from "../utils/assignGamemasters"; // Adapter pour import
import "../styles/tailwind.css";

const IndexPage = () => {
  const [assignedSessions, setAssignedSessions] = useState([]);
  const [unassignedSessions, setUnassignedSessions] = useState([]);

  useEffect(() => {
    assignGamemasters(roomsData, gamemastersData, updateSessions);
  }, []);

  const updateSessions = (sessions) => {
    const assigned = sessions
      .filter((session) => session.gamemasterAssigned)
      .map((session) => ({
        roomId: session.room.id,
        roomName: session.room.name,
        gamemasterId: session.gamemaster.id,
        gamemasterName: session.gamemaster.name,
      }))
      .sort((a, b) => a.roomId - b.roomId);

    const unassigned = sessions
      .filter((session) => !session.gamemasterAssigned)
      .map((session) => ({
        roomId: session.room.id,
        roomName: session.room.name,
        reason: session.reason,
      }))
      .sort((a, b) => a.roomId - b.roomId);

    setAssignedSessions(assigned);
    setUnassignedSessions(unassigned);
  };

  const handleAssignGamemasters = () => {
    assignGamemasters(roomsData, gamemastersData, updateSessions);
  };

  return (
    <div className="container mx-auto px-4 min-h-full">
      <Header />

      <MainContent
        assignedSessions={assignedSessions}
        unassignedSessions={unassignedSessions}
        onAssign={handleAssignGamemasters}
      />

      <Footer />
    </div>
  );
};

export default IndexPage;
