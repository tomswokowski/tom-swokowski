<template>
  <div>
    <h1 class="mb-4 text-2xl font-bold">Notes</h1>
    <p class="mb-6 text-gray-600">This is your notes page.</p>

    <form @submit.prevent="handleCreateNote" class="mb-6 space-y-4">
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">Title</label>
        <input
          v-model="newNote.title"
          type="text"
          class="w-full rounded border px-3 py-2"
          required
        />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">Content</label>
        <textarea
          v-model="newNote.content"
          rows="4"
          class="w-full rounded border px-3 py-2"
          required
        ></textarea>
      </div>
      <button type="submit" class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Add Note
      </button>
    </form>

    <div v-if="loading">Loading notes...</div>
    <div v-else-if="notes.length === 0">No notes yet.</div>

    <ul v-else class="space-y-4">
      <li v-for="note in notes" :key="note.id" class="rounded border p-4 shadow-sm">
        <h2 class="text-lg font-semibold">{{ note.title }}</h2>
        <p class="whitespace-pre-wrap text-gray-700">{{ note.content }}</p>
        <p class="mt-2 text-sm text-gray-400">Last updated: {{ formatDate(note.updatedAt) }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllNotes, createNote } from '@/api/notes';

const notes = ref([]);
const loading = ref(true);

const newNote = ref({
  title: '',
  content: '',
});

const fetchNotes = async () => {
  try {
    notes.value = await getAllNotes();
  } catch (err) {
    console.error('Failed to fetch notes:', err);
  } finally {
    loading.value = false;
  }
};

const handleCreateNote = async () => {
  if (!newNote.value.title || !newNote.value.content) return;

  try {
    const created = await createNote(newNote.value);
    notes.value.unshift(created);
    newNote.value = { title: '', content: '' };
  } catch (err) {
    console.error('Failed to create note:', err);
  }
};

const formatDate = (iso) => new Date(iso).toLocaleString();

onMounted(fetchNotes);
</script>
