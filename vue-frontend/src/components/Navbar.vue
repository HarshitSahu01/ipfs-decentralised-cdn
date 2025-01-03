<template>
  <div>
    <!-- Navbar -->
    <nav class="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div class="flex items-center space-x-3">
        <!-- Logo SVG -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 text-purple-600">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
          <line x1="19" y1="12" x2="5" y2="21"></line>
        </svg>
        <span class="text-lg font-semibold">keel</span>
      </div>
      <ul class="hidden space-x-6 md:flex">
        <li><a href="#" class="text-gray-600 hover:text-gray-900">Product</a></li>
        <li><a href="#" class="text-gray-600 hover:text-gray-900">Docs</a></li>
        <li><a href="#" class="text-gray-600 hover:text-gray-900">Blog</a></li>
      </ul>
      <div class="flex items-center space-x-4">
        <!-- GitHub Icon SVG -->
        <a href="#" class="text-gray-600 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.21.66-.47 0-.23-.01-.83-.01-1.63-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.61.07-.61 1 .07 1.53 1.02 1.53 1.02.89 1.52 2.33 1.08 2.9.83.09-.65.35-1.08.64-1.33-2.22-.25-4.56-1.11-4.56-4.92 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.26.1-2.62 0 0 .84-.27 2.75 1.02A9.47 9.47 0 0 1 12 6.8a9.47 9.47 0 0 1 2.5.34c1.91-1.3 2.75-1.02 2.75-1.02.55 1.36.2 2.37.1 2.62.64.7 1.03 1.59 1.03 2.68 0 3.82-2.34 4.67-4.57 4.91.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.72 0 .26.16.56.67.46A10.02 10.02 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
          </svg>
        </a>
        <!-- Discord Icon SVG -->
        <a href="#" class="text-gray-600 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.89 4.608c-2.015-1.472-4.33-1.723-4.33-1.723l-.218.252c2.635.796 3.85 1.945 3.85 1.945-.735-.414-1.46-.72-2.173-.99a10.362 10.362 0 0 0-5.83 0 12.545 12.545 0 0 0-2.173.99s1.215-1.15 3.85-1.945l-.218-.252s-2.314.251-4.33 1.723C3.67 8.064 3.4 11.312 3.4 11.312c0 0 1.137 1.973 2.063 2.938l-.257.833a11.083 11.083 0 0 0 4.087 1.204l.35-.432c-1.32-.47-2.372-1.18-3.263-1.923.27.15.545.288.827.412a8.741 8.741 0 0 0 7.368 0c.282-.124.558-.262.827-.412-.891.743-1.943 1.453-3.263 1.923l.35.432a11.083 11.083 0 0 0 4.087-1.204l-.257-.833c.926-.965 2.063-2.938 2.063-2.938s-.27-3.248-3.89-6.704zM9.41 12.012c-.793 0-1.437-.74-1.437-1.65s.644-1.65 1.437-1.65c.793 0 1.437.74 1.437 1.65 0 .91-.644 1.65-1.437 1.65zm5.18 0c-.793 0-1.437-.74-1.437-1.65s.644-1.65 1.437-1.65c.793 0 1.437.74 1.437 1.65 0 .91-.644 1.65-1.437 1.65z" />
          </svg>
        </a>
        <button class="px-4 py-2 text-gray-600 border rounded-md hover:text-gray-900">Login</button>
        <button class="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">Book a demo</button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavbarComponent",
};
</script>

<style>
</style>
