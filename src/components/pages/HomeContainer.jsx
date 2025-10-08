"use client";

import { useEffect, useMemo, useState } from "react";
import Homepage from "@/components/pages/Homepage";
import { Preloader } from "@/components/Preloader";
import { useNavContext } from "@/utils/navContextProvider";
import { AnimatePresence } from "motion/react";

export default function HomeContainer({ homepage }) {
  const [isLoading, setIsLoading] = useState(true);
  const [runCount, setRunCount] = useState(0);
  const { setNavProps } = useNavContext();

  const thumbnailsList = useMemo(
    () => homepage?.youtubeVideoCollection?.items ?? [],
    [homepage]
  );

   useEffect(() => {
    //  const visited = sessionStorage.getItem("homepageVisited");
    const visitCount = Number(
      sessionStorage.getItem("homepageVisitCount") || "0"
    );
    const newVisitCount = visitCount + 1;
    sessionStorage.setItem("homepageVisitCount", newVisitCount.toString());
     if (visitCount <= 2) {
       sessionStorage.setItem("homepageVisited", "true");
       setRunCount(newVisitCount);
     }
   }, []);

  useEffect(() => {
    setNavProps({ homeLoading: isLoading, itemType: "", searchParam: "", pageType: "" });
  }, [isLoading, setNavProps]);

   return (
     <AnimatePresence initial={false} mode="popLayout">
       {isLoading ? (
         <Preloader
           key="preloader"
           assets={thumbnailsList}
           onDone={() => setIsLoading(false)}
         />
       ) : (
         <Homepage key="homepage" homepage={homepage} hasRun={runCount > 1 ? true : false} />
       )}
     </AnimatePresence>
   );
}


