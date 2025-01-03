<template>
    <div>
      <!-- Hero Section -->
      <section class="relative bg-gradient-to-r from-orange-100 to-white">
        <!-- Hexagonal Background Pattern -->
        <div class="absolute inset-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" fill="none" class="w-full h-full text-orange-100">
            <pattern id="hexagons" patternUnits="userSpaceOnUse" width="60" height="52" patternTransform="scale(1.5)">
              <polygon points="30,3 60,15 60,37 30,49 0,37 0,15" fill="currentColor"></polygon>
            </pattern>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>
        <div class="relative container mx-auto px-6 py-16 md:py-24 lg:py-32">
          <div class="max-w-2xl mx-auto text-center">
            <p class="text-orange-500 font-semibold text-sm uppercase tracking-wide mb-4">New</p>
            <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
              Build the systems that power your operations
            </h1>
            <p class="mt-6 text-lg text-gray-600">
              Keel bridges the gap between no-code tools and rigid ERP systems, bringing engineers and operators together to solve your most critical ops challenges.
            </p>
            <div class="mt-8 flex justify-center space-x-4">
              <button class="px-6 py-3 text-white bg-green-600 rounded-md hover:bg-green-700">
                Book a demo
              </button>
            </div>
          </div>
          <div class="mt-12 flex justify-center">
            <!-- Hero Image -->
            <img
              src="../assets/folder-svgrepo-com"
              alt="Hero Illustration"
              class="w-full max-w-lg sm:max-w-xl"
            />
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: "HeroSectionComponent",
  };
  </script>
  
  <style>
  </style>
  