<template>
  <div>
    <RouterLink to="/dashboard/notes" class="mb-4 inline-block text-blue-600 hover:underline"
      >← Back to Notes</RouterLink
    >
    <h1 class="mb-4 text-2xl font-bold">Create Note</h1>

    <form @submit.prevent="handleCreateNote" class="space-y-4">
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">Title</label>
        <input v-model="note.title" type="text" class="w-full rounded border px-3 py-2" required />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">Content</label>
        <textarea
          v-model="note.content"
          rows="6"
          class="w-full rounded border px-3 py-2"
          required
        ></textarea>
      </div>
      <button type="submit" class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Create
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createNote } from '@/api/notes';

const router = useRouter();
const note = ref({ title: '', content: '' });

const handleCreateNote = async () => {
  try {
    const newNote = await createNote(note.value);
    router.push(`/dashboard/notes/${newNote.id}`);
  } catch (err) {
    console.error('Failed to create note:', err);
  }
};
</script>
