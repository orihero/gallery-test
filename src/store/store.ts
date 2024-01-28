import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";
import { PhotosStore } from "./imgStore/imgStore";
import EmptyStore from "./emptyStore/emptyStore";


export class AppRootStore {
    photosStore: PhotosStore;
    emptyStore: EmptyStore;

    constructor() {
        makeAutoObservable(this);
        this.photosStore = new PhotosStore(this);
        this.emptyStore = new EmptyStore();
        this.run();
    }

    private run = () => {
        runInAction(() => {
            const list: Promise<void>[] = [
                this.photosStore.getPhotos()
            ];

            Promise.all(list)
                .then(() => {
                    console.log("All requests are done!");
                })
                .catch(() => console.log("Requests failed!"));
        });
    };
}

const rootStore = new AppRootStore();
export default createContext(rootStore);
