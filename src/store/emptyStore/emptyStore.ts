import { makeAutoObservable } from "mobx";

type EmptyStoreData = {
    text: string;
    buttonText?: string;
    style?: any;
    onButtonPress?: () => void;
}

class VmptyStore {
    constructor() {
        makeAutoObservable(this);
    }

    visible: boolean = false;
    emptyData: EmptyStoreData = {
        text: 'No data',
    };

    toglevisible = () => {
        this.visible = !this.visible;
    };

    show = (data: EmptyStoreData) => {
        this.visible = true;
        this.emptyData = data
    };

    hide = () => {
        this.visible = false;
        this.emptyData = {
            text: 'No data',
        };
    };
}

export default VmptyStore;
