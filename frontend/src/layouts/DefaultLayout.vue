<template>
  <div>
    <nav class="flex gap-4 bg-zinc-900 p-4 text-white">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <main class="p-4">
      <slot />
    </main>
  </div>
</template>
