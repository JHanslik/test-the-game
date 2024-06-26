import React from "react";

const AssignedSessionsTable = ({ assignedSessions }) => (
  <div className="mb-8  text-center shadow-md rounded-lg overflow-hidden">
    <h2 className="bg-gray-200 text-gray-800 text-2xl font-bold p-3">
      Sessions Assignées
    </h2>
    <div className="">
      <table className="w-full text-sm md:text-lg bg-gray-100 text-black">
        <thead>
          <tr>
            <th className="border ">Room ID</th>
            <th className="border p-2">Univers</th>
            <th className="border ">Gamemaster ID</th>
            <th className="border ">Nom du Gamemaster</th>
          </tr>
        </thead>
        <tbody>
          {assignedSessions.map((session) => (
            <tr key={session.roomId}>
              <td className="border p-2">{session.roomId}</td>
              <td className="border p-2">{session.roomName}</td>
              <td className="border p-2">{session.gamemasterId}</td>
              <td className="border p-2">{session.gamemasterName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AssignedSessionsTable;
