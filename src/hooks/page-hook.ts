import { useRecoilState } from "recoil"
import pageStore from "../store/page-store"

const usePageHook = () => {
    const [page, setPage] = useRecoilState(pageStore);
    const next = () => {
        if (page.pageNumber < page.totalPages) {
            setPage({
                ...page,
                pageNumber: page.pageNumber + 1
            })
        }
    }
    const previous = () => {
        if (page.pageNumber > 1) {
            setPage({
                ...page,
                pageNumber: page.pageNumber - 1
            })
        }
    }
    const initPage = (pageNumber: number, totalPages: number, isGrouped: boolean) => {
        setPage({
            ...page,
            pageNumber,
            totalPages,
            isGrouped
        });
    }
    return {page, previous, next, initPage};
}

export default usePageHook;
