import React from "react";

const UnassignedSessionsTable = ({ unassignedSessions }) => (
  <div className="mb-8  text-center shadow-md rounded-lg overflow-hidden">
    <h2 className="bg-gray-200 text-gray-800 text-2xl font-bold p-3">
      Sessions Non Assignées
    </h2>
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse w-full bg-gray-100 text-black">
        <thead>
          <tr>
            <th className="border p-2">Room ID</th>
            <th className="border p-2">Univers</th>
            <th className="border p-2">Raison</th>
          </tr>
        </thead>
        <tbody>
          {unassignedSessions.map((session) => (
            <tr key={session.roomId}>
              <td className="border p-2">{session.roomId}</td>
              <td className="border p-2">{session.roomName}</td>
              <td className="border p-2">{session.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default UnassignedSessionsTable;
