// Fonction pour attribuer les gamemasters aux sessions
const assignGamemasters = (roomsData, gamemastersData, onUpdateSessions) => {
  const random_gamemaster_array = (size) =>
    gamemastersData.sort(() => Math.random() - 0.5).slice(0, size);

  // Générer un tableau aléatoire de gamemasters en fonction du nombre de salles disponibles
  const gamemasters = random_gamemaster_array(roomsData.length);

  // Initialisation des sessions avec les salles, statut d'assignation, et autres propriétés nécessaires
  const sessions = roomsData.map((room) => ({
    room: room,
    gamemasterAssigned: false, // Indicateur si un gamemaster a été assigné à cette session
    possibleGamemasters: [], // Tableau des gamemasters possibles pour cette session
    gamemaster: null, // Le gamemaster assigné à cette session
    reason: "", // Raison pour laquelle cette session n'a pas été attribuée
  }));

  let assignedGamemasters = []; // Tableau pour suivre les IDs des gamemasters déjà assignés

  // Trouver les gamemasters possibles pour chaque session en fonction des salles où ils ont été formés
  sessions.forEach((session) => {
    session.possibleGamemasters = gamemasters.filter((gamemaster) =>
      gamemaster.trained_rooms.includes(session.room.id)
    );
  });

  // Trier les sessions par nombre de gamemasters possibles pour prioriser celles avec moins d'options
  sessions.sort(
    (a, b) => a.possibleGamemasters.length - b.possibleGamemasters.length
  );

  let changed;
  // Boucle pour attribuer les gamemasters aux sessions jusqu'à ce qu'aucun changement supplémentaire ne soit possible

  do {
    changed = false; // Réinitialiser le marqueur de changement
    sessions.forEach((session) => {
      if (!session.gamemasterAssigned) {
        // Si aucun gamemaster n'a encore été assigné à cette session

        for (const gamemaster of session.possibleGamemasters) {
          if (!assignedGamemasters.includes(gamemaster.id)) {
            // Si le gamemaster n'est pas déjà assigné à une autre session

            session.gamemaster = gamemaster;
            session.gamemasterAssigned = true;
            assignedGamemasters.push(gamemaster.id);
            changed = true;
            break;
          } else {
            // Si le gamemaster est déjà assigné à une autre session, chercher une réattribution

            const currentSession = sessions.find(
              (s) => s.gamemaster && s.gamemaster.id === gamemaster.id
            );
            if (
              currentSession &&
              currentSession.possibleGamemasters.length > 1
            ) {
              // Si la session actuelle a plus d'un gamemaster possible

              const alternativeGamemaster =
                currentSession.possibleGamemasters.find(
                  (altGM) =>
                    altGM.id !== gamemaster.id &&
                    !assignedGamemasters.includes(altGM.id)
                );

              if (alternativeGamemaster) {
                // Si un gamemaster alternatif est trouvé

                currentSession.gamemaster = alternativeGamemaster;
                currentSession.gamemasterAssigned = true;
                assignedGamemasters = assignedGamemasters.filter(
                  (id) => id !== gamemaster.id
                );
                assignedGamemasters.push(alternativeGamemaster.id);

                session.gamemaster = gamemaster;
                session.gamemasterAssigned = true;
                assignedGamemasters.push(gamemaster.id);
                changed = true;
                break;
              }
            }
          }
        }
        if (!session.gamemasterAssigned) {
          // Si aucun gamemaster ne peut être assigné, définir une raison

          session.reason = "Pas de Gamemaster disponible pour cette salle";
        }
      }
    });
  } while (changed);

  onUpdateSessions(sessions);
};

export default assignGamemasters;
