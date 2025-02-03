<template>
    <div class="p-6 bg-gray-100 min-h-screen">
      <div class="bg-white p-4 rounded shadow-md">
        <h2 class="text-xl font-bold mb-4">File Upload</h2>
        <form @submit.prevent="uploadFile" enctype="multipart/form-data" class="flex gap-4">
          <input type="file" @change="handleFileChange" class="border p-2 rounded w-full" name="file"/>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Upload</button>
        </form>
      </div>
      
      <div class="mt-6 bg-white p-4 rounded shadow-md">
        <h2 class="text-xl font-bold mb-4">Uploaded Files</h2>
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-yellow-100">
              <th class="p-2 border">SNO</th>
              <th class="p-2 border">FILE NAME</th>
              <th class="p-2 border">FILE SIZE</th>
              <th class="p-2 border">STATUS</th>
              <th class="p-2 border">GET LINK</th>
              <th class="p-2 border">DELETE</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(file, index) in files" :key="file.name" :class="index % 2 === 0 ? 'bg-white' : 'bg-yellow-50'">
              <td class="p-2 border">{{ index + 1 }}</td>
              <td class="p-2 border">{{ file.name }}</td>
              <td class="p-2 border">{{ file.size }}</td>
              <td class="p-2 border">{{ file.status }}</td>
              <td class="p-2 border text-blue-500 cursor-pointer" @click="copyLink(file.link)">Copy</td>
              <td class="p-2 border text-blue-500 cursor-pointer" @click="editFile(file)">Edit</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useLoginState } from '../stores/loginStateStore';
  import { configStore } from '../stores/configstore';

  const files = ref([
    { name: 'jquery.min.js', size: '234kB', status: 'Public', link: '#', editable: true },
    { name: 'bootstrap.min.js', size: '234kB', status: 'Private', link: '#', editable: true },
    { name: 'vue.min.js', size: '234kB', status: 'Public', link: '#', editable: true },
    { name: 'react.min.js', size: '234kB', status: 'Private', link: '#', editable: true }
  ]);

  const loginState = useLoginState()

  const configState = configStore()

  function backendURL() {
    return configState.backendURL()
  }

  const selectedFile = ref(null);

  const handleFileChange = (event) => {
    selectedFile.value = event.target.files[0];
  };

  const uploadFile = async () => {
    if (!selectedFile.value) return;
    const formData = new FormData();
    formData.append('file', selectedFile.value);
    try {
      const response = await axios.post(`${backendURL}/api/testUpload`, {
        formData,
        credential: loginState.credential
      });
      alert('File uploaded successfully');
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  };

  const copyLink = (link) => {
    navigator.clipboard.writeText(link);
    alert('Link copied!');
  };

  const editFile = (file) => {
    alert(`Editing ${file.name}`);
  };
  </script>
  
  <style>
  th, td {
    text-align: left;
  }
  </style>
  