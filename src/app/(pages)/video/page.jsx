import ListPage from "@/components/pages/ListPage";
import { getPropData } from "@/utils/client";
import { GET_VIDEO_CONTENT } from "@/gql/queries";
import { Suspense } from "react";

export default async function VideoPage({ searchParams }) {
    const activeItem = (await searchParams).v;
    const res = await getPropData(GET_VIDEO_CONTENT, { activeItem });

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ListPage
                list={res.activeItem.items}
                pageDetails={undefined}
                sidebarLabel={"Video"}
                searchParam={"v"} />
        </Suspense>
    );
}