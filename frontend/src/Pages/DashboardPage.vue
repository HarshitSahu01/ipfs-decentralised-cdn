<template>
    <p class="text-2xl font-semibold text-gray-800 mx-8 pt-8 pb-4">
        Your files
    </p>

    <div v-if="loading" class="text-center text-xl font-semibold text-gray-700 mt-4">
        Loading...
    </div>

    <div v-else class="flow-root">
        <div class="flex items-center justify-center w-full md:w-64 mx-auto mb-2">
            <label for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to
                            upload</span> or drag and drop</p>

                    <p class="text-xs text-gray-500 dark:text-gray-400">
                        <span v-if="uploadFieldFileName">{{ uploadFieldFileName }}</span>
                        <span v-else> MAX File size 5MB </span>

                    </p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" @change="updateFileName" />
            </label>
        </div>
        <div class="flex items-center justify-center gap-6 mb-2">
            <button @click="uploadFile">
                Upload file!
            </button>
        </div>
    </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg md:mx-8">
        <table class="w-full text-sm text-left rtl:text-right text-gray-700">
            <thead class="text-xs text-gray-700 uppercase bg-orange-100">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Sno
                    </th>
                    <th scope="col" class="px-6 py-3">
                        File Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        File Size
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Open file
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Copy link
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Delete
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="odd:bg-white even:bg-orange-50 border-b border-gray-200" v-for="(file, index) in files"
                    :key="index">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{ index + 1 }}
                    </th>
                    <td class="px-6 py-4">
                        {{ file.name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ file.size }}B
                    </td>
                    <td class="px-6 py-4 text-blue-500 hover:cursor-pointer">
                        <a :href="`https://ipfs.io/ipfs/${file.hash}`">Open</a>
                    </td>
                    <td class="px-6 py-4 text-blue-500 hover:cursor-pointer special">
                        <button @click="clipboard(`https://ipfs.io/ipfs/${file.hash}`)">Copy link</button>
                    </td>
                    <td class="px-6 py-4">
                        <button @click="deleteFile(file.hash)">Delete</button>
                    </td>
                </tr>
            </tbody>
            <tr v-if="files.length === 0">
                <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                    No files uploaded yet
                </td>
            </tr>
        </table>
    </div>

</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useLoginState } from '../stores/loginStateStore';
import { configStore } from '../stores/configStore';
import { toast } from 'vue3-toastify';
import '../assets/vue3-toastify.css';

export default {
    name: 'DashboardPage',
    setup() {
        return {
            uploadFieldFileName: ref(""),
            selectedFile: ref(null),
            loginState: useLoginState(),
            files: ref([]),
            loading: ref(false),
            configState: configStore()
        };
    },

    mounted() {
        this.getFiles();
    },

    computed: {
        backendURL() {
            return this.configState.backendURL();
        }
    },

    methods: {
        redirectToUpload() {
            this.$router.push({ path: '/TestUploadPage' });
        },
        clipboard(link){
            navigator.clipboard.writeText(link).then(() => {
                toast.success('Link copied to clipboard!');
            }).catch(() => {
                toast.error('Error copying link to clipboard!');
            });
        },

        async uploadFile() {
            if (this.selectedFile) {
                this.loading = true;
                const formData = new FormData();
                formData.append('file', this.selectedFile);
                try {
                    formData.append('credential', this.loginState.credential);
                    const response = await axios.post(`https://express-backend-2b4s.onrender.com/api/uploadFile`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    toast.success('File uploaded successfully!');
                    this.getFiles();
                } catch (error) {
                    console.error('Error uploading file:', error);
                    toast.error('Error uploading file: '+ error)
                } finally {
                    this.loading = false;
                }
            } else {
                toast.error('First selecct a file!')
            }
        },

        updateFileName(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedFile = file;
                this.uploadFieldFileName = file.name;
            } else {
                this.uploadFieldFileName = "";
                this.selectedFile = null;
            }
            console.log('Selected file:', this.uploadFieldFileName);
        },


        getFiles() {
            this.loading = true;
            axios.post(`https://express-backend-2b4s.onrender.com/api/getFiles`, { credential: this.loginState.credential })
                .then(response => {
                    this.files = response.data.data;
                    // console.log(response.data);
                })
                .catch(error => {
                    console.error('Error fetching files:', error);
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        async deleteFile(fileRefParam) {
            if (!fileRefParam) {
                toast.error('File reference parameter is missing!');
                return;
            }

            this.loading = true;
            axios.post(`https://express-backend-2b4s.onrender.com/api/deleteFile`, { fileRefParam, credential: this.loginState.credential })
                .then(response => {
                    toast.success('File deleted successfully ', response.data);
                    this.getFiles();
                })
                .catch(error => {
                    console.error('Error deleting file:', error);
                    toast.error('Error deleting file');
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    },
};
</script>

<style scoped>
button {
    padding: 15px 30px;
    font-size: 18px;
    font-weight: bold;
    border: none;
    border-radius: 12px;
    color: #FFFFFF;
    background: linear-gradient(135deg, #f8bc6d, #FFECD4);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

button:hover {
    transform: scale(1.1);
    background: linear-gradient(135deg, #aa9071, #FFEDD5);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

button:active {
    transform: scale(0.95);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
</style>
