import { useMemo } from "react";
import { useData } from "../../contexts/DataContext";

const useLastEvent = () => {
  const { data } = useData();

  // utilsie useMemo pour mémoriser le résultat et éviter les reRender inutiles
  return useMemo(
    () =>
      data?.events
        .slice() // on travaille sur une copie pour ne pas altérer l'objet d'origine
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // fonction de tri par date (décroissant)
        ?.at(0), // on prend le 1 er élément de la liste triée, donc le plus récent
    [data]
  );
};

export default useLastEvent;
