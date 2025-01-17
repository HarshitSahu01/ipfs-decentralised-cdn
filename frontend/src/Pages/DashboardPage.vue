<template>
    <p class="text-2xl font-semibold text-gray-800 mx-8 pt-8 pb-4">
        Your files
    </p>
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
                        Status
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Get Link
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Delete
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="odd:bg-white even:bg-orange-50 border-b border-gray-200" v-for="file in files" :key="file.id">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{ file.id }}
                    </th>
                    <td class="px-6 py-4">
                        {{ file.name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ file.size }}
                    </td>
                    <td class="px-6 py-4">
                        {{ file.status }}
                    </td>
                    <td class="px-6 py-4 text-blue-500 hover:cursor-pointer">
                        Copy
                    </td>
                    <td class="px-6 py-4">
                        <a href="#" class="font-medium text-blue-600 hover:underline">Edit</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
export default {
    name: 'DashboardPage',
    setup(){
        return {
            files: [
                {
                    id: 1,
                    name: 'jquery.min.js',
                    size: '234kB',
                    status: 'Public'
                },
                {
                    id: 2,
                    name: 'bootstrap.min.js',
                    size: '234kB',
                    status: 'Private'
                },
                {
                    id: 3,
                    name: 'vue.min.js',
                    size: '234kB',
                    status: 'Public'
                },
                {
                    id: 4,
                    name: 'react.min.js',
                    size: '234kB',
                    status: 'Private'
                }
            ]
        }
    }
};
</script>

<style scoped></style>