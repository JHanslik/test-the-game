import React from "react";
import AssignedSessionsTable from "./AssignedSessionsTable";
import UnassignedSessionsTable from "./UnassignedSessionsTable";
import Button from "./Button";

const MainContent = ({ assignedSessions, unassignedSessions, onAssign }) => {
  return (
    <main className="my-8 mx-auto max-w-screen-lg">
      <h1 className="text-4xl font-bold text-center mb-8">
        Assignation des Gamemasters
      </h1>

      <AssignedSessionsTable assignedSessions={assignedSessions} />
      <UnassignedSessionsTable unassignedSessions={unassignedSessions} />

      <div className="flex justify-center">
        <Button onClick={onAssign}>Réassigner les Gamemasters</Button>
      </div>
    </main>
  );
};

export default MainContent;
