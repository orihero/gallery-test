import ApiService from "./ApiService";

const apiService = new ApiService();

const APIs = {
    getPhotos: (page: number) => apiService.methods.get(`/photos?page=${page}&per_page=30`),
    getPhoto: (id: string) => apiService.methods.get(`/photos/${id}`),
    getPhotoDownloadLink: (id: string) =>
        apiService.methods.get(`/photos/${id}/download`),
};

export default APIs;
