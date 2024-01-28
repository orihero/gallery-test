import { get, makeAutoObservable, runInAction } from "mobx";
import { AppRootStore } from "../store";
import { Operation } from "../../utils/Operation";
import { Photo } from "../../types/types";
import APIs from "../../api/api";


export class PhotosStore {

    app: AppRootStore;
    constructor(app: AppRootStore) {
        makeAutoObservable(this);
        this.app = app;
    }

    getPhotosOperation = new Operation<Photo[]>([])
    getMorePhotosOperation = new Operation<Photo[]>([])
    allPhotos: Photo[] = [];
    loading: boolean = false;
    loadingMore: boolean = false;
    currentPage: number = 1;
    currentPhoto: Photo | null = null;

    getPhotos = async () => {
        runInAction(() => {
            this.loading = true;
        })
        await this.getPhotosOperation.run(() => APIs.getPhotos(1))
        if (this.getPhotosOperation.isSuccess) {
            runInAction(() => {
                this.allPhotos = this.getPhotosOperation.data
            })
        }
        if (this.getPhotosOperation.isError) {
            if (this.getPhotosOperation.error?.status === 404) {
                this.app.emptyStore.show({
                    text: "Images not found",
                })
            }
        }
        runInAction(() => {
            this.loading = false;
        })
    }

    getMorePhotos = async () => {
        runInAction(() => {
            this.loadingMore = true;
        })
        await this.getMorePhotosOperation.run(() => APIs.getPhotos(this.currentPage + 1))
        if (this.getMorePhotosOperation.isSuccess) {
            runInAction(() => {
                this.allPhotos = [...this.allPhotos, ...this.getMorePhotosOperation.data]
                this.currentPage += 1;
            })
        }
        if (this.getMorePhotosOperation.isError) {
            if (this.getPhotosOperation.error?.status === 404) {
                this.app.emptyStore.show({
                    text: "Images not found",
                })
            }
        }
        runInAction(() => {
            this.loadingMore = false;
        })
    }

    setCurrentPhoto = (photo: Photo) => {
        runInAction(() => {
            this.currentPhoto = photo;
        })
    }

}