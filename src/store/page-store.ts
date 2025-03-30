import { atom } from "recoil";

const pageStore = atom({
    key: "mui-form-page",
    default: {
        pageNumber: 1,
        totalPages: 1,
        isGrouped: false
    }
});

export default pageStore;
