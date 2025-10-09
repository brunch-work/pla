"use client";

import { useEffect, useMemo, useState } from "react";
import Homepage from "@/components/pages/Homepage";
import { Preloader } from "@/components/Preloader";
import { useNavContext } from "@/utils/navContextProvider";
import { AnimatePresence } from "motion/react";
import { useLoader } from "@/utils/loader.jsx";

export default function HomeContainer({ homepage }) {
  const [isLoading, setIsLoading] = useState(useLoader.getState().showLoader);
  const { setNavProps } = useNavContext();

  const thumbnailsList = useMemo(
    () => homepage?.youtubeVideoCollection?.items ?? [],
    [homepage]
  );

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
         <Homepage key="homepage" homepage={homepage} />
       )}
     </AnimatePresence>
   );
}


