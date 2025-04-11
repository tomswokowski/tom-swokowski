<template>
  <div class="flex min-h-screen bg-gray-100">
    <aside class="w-64 border-r bg-white p-4">
      <nav class="space-y-4">
        <RouterLink to="/dashboard" class="block text-gray-700">🏠 Home</RouterLink>
        <RouterLink to="/dashboard/notes" class="block text-gray-700">📝 Notes</RouterLink>
      </nav>
    </aside>
    <main class="flex-1 p-6">
      <RouterView />
    </main>
  </div>
</template>
